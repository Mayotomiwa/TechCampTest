import { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useDataContext } from '../context/AppContext';

export default function SearchBar() {
  const { setLoginOpen } = useDataContext();
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement your search logic here
  };

  const openLoginModal = () => {
    setLoginOpen(true); // Open the login modal
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* Login Button */}
      <button
        onClick={openLoginModal}
        className="absolute top-4 right-4 flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaUser className="mr-2" />
        Login
      </button>

      {/* Search Bar */}
      <div className="flex items-center justify-center mt-8">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md"
        >
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-80 pl-12 pr-4 py-3 text-lg border-none rounded-l-lg focus:ring-blue-500 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 text-lg text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
