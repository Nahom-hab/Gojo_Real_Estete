import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    const { showPassword, ...data } = formData;
    setLoading(true);
    try {
      const response = await fetch('/api/auth/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, username: data.username }),
      });
      const { message, userExists } = await response.json()
      console.log(message);

      if (!userExists) {
        const res = await fetch('/api/auth/sendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const message = await res.json()
          console.log(message);


          navigate('/otpcheck', { state: data });
        } else {
          const errorData = await res.json();
          setSignupError(errorData.message || 'Signup failed');
        }

      } else {
        setSignupError(message)
      }

    } catch (error) {
      console.error('Error signing up:', error);
      setSignupError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="flex flex-col items-center justify-center  h-[90vh] md:h-[90vh] bg-gray-50 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-[40%] space-y-4">
        <label htmlFor="username" className="block">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </label>
        <label htmlFor="email" className="block">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </label>
        <label htmlFor="password" className="block">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </label>
        <label htmlFor="confirmPassword" className="block">
          <input
            type={formData.showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </label>
        <div className="flex justify-end pr-2">
          <label htmlFor="showPassword" className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span>Show Password</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {passwordError && <div className="text-red-500 mt-2 text-sm">{passwordError}</div>}
        {signupError && <div className="text-red-500 mt-2 text-sm">{signupError}</div>}
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </div>
  );

};

export default SignupPage;
