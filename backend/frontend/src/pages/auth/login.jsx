import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';

const Login = () => {
  const { user, setUser, isEng } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { showPassword, ...data } = formData;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const { error } = await res.json();
        return;
      }

      const result = await res.json();
      localStorage.setItem('user', JSON.stringify(result));
      setUser(result);
      console.log(result);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center  bg-gray-50 dark:bg-gray-900 py-6">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200">{isEng ? 'Login' : 'ግባ'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-[80%] md:w-[40%]">
        <label htmlFor="email" className="text-gray-700 dark:text-gray-300 mb-3">
          <input
            type="email"
            id="email"
            name="email"
            placeholder={isEng ? 'Enter your email' : 'ኢሜይልዎን ይግቡ'}
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </label>
        <label htmlFor="password" className="text-gray-700 dark:text-gray-300 mb-3">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder={isEng ? 'Enter your password' : 'የይለፍ ቃልዎን ይግቡ'}
            value={formData.password}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-3 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </label>
        <div className="flex justify-end items-center mb-4">
          <label htmlFor="showPassword" className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600"
            />
            <span className="text-gray-600 dark:text-gray-300">{isEng ? 'Show Password' : 'የይለፍ ቃል ይታይ'}</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isEng ? `${!loading ? 'Login' : 'Logging...'}` : `${!loading ? 'ግባ' : 'Logging...'}`}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        {isEng ? "Don't have an account?" : 'አካውንት የለዎትም?'} <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;