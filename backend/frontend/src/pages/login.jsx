import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import Oauth from '../component/oauth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    const { showPassword, ...data } = formData;

    dispatch(signInStart());

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
        dispatch(signInFailure(error.message));
        return;
      }

      const result = await res.json();
      dispatch(signInSuccess(result)); // Assuming result contains user data or token
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="flex flex-col items-center  w-full justify-center h-[80vh] bg-gray-100">
      <h1 className="text-2xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-[35%]  p-8 bg-white rounded-lg shadow-md">
        <label htmlFor="email" className="text-base mb-1">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 text-base border border-gray-300 rounded mb-4 w-full"
            required
          />
        </label>
        <label htmlFor="password" className="text-base mb-1">
          <div className="flex items-center justify-between">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-2 text-base border border-gray-300 rounded mb-4 w-full"
              required
            />
          </div>
        </label>
        <div className="flex justify-end mb-2">
          <label htmlFor="showPassword" className="text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleInputChange}
              className="mr-1"
            />
            Show Password
          </label>
        </div>
        <button type="submit" className="px-6 py-3 text-base bg-gray-800 text-white rounded hover:bg-gray-700 transition">
          Login
        </button>
        <Oauth />
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </form>
      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;