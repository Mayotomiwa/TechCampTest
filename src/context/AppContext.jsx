/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../data/DATA'; // Import all API functions from api.js

// Create a cache object for storing fetched data

// Context initialization
const DataContext = createContext();

// Custom hook to use DataContext
export const useDataContext = () => useContext(DataContext);


// Context Provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await api.searchBooks('react'); // Example initial data fetch
        setData(fetchedData);
        setFilteredData(fetchedData); // Initialize filtered data with the full dataset
        console.log('Data fetched successfully:', fetchedData);
      } catch (error) {
        setError(error.message); // Set error message
        console.error('Error fetching data:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  // Function to filter data based on search query
  useEffect(() => {
    filterData(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, data]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle select all checkbox change
  const handleSelectAllChange = (checked) => {
    const newCheckedItems = {};
    filteredData.forEach((item) => {
      newCheckedItems[item.id] = checked;
    });
    setCheckedItems(newCheckedItems);
    setSelectAllChecked(checked);
  };

  // Function to filter data based on search query
  const filterData = (query) => {
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Function to register a new user
  const registerUser = async (userData) => {
    try {
      const response = await api.registerUser(userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  // Function to login user
  const loginUser = async (credentials) => {
    try {
      const response = await api.loginUser(credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Function to verify OTP
  const verifyOtp = async (otpData) => {
    try {
      const response = await api.verifyOtp(otpData);
      return response.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  // Context value
  const contextValue = {
    data,
    filteredData,
    searchQuery,
    setSearchQuery,
    checkedItems,
    handleCheckboxChange,
    handleSelectAllChange,
    selectAllChecked,
    registerUser,
    loginUser,
    verifyOtp,
    error,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
      {error && <p>Error: {error}</p>}
    </DataContext.Provider>
  );
};
