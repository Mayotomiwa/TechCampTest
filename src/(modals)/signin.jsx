import { useState } from 'react';
import { useDataContext } from '../contexts/DataContext';

// eslint-disable-next-line react/prop-types
const Signin = ({ isOpen, onClose }) => {
  const { loginUser } = useDataContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      await loginUser(userData);
      // Handle successful login actions here if needed
      onClose(); // Close modal on successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error state or feedback to user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
