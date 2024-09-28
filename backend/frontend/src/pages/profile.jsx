import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useUser from '../zustand/useUser';

export default function Profile() {
  const { pathname } = useLocation();
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
        <p className="text-gray-500 text-lg">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center  h-screen bg-white dark:bg-gray-800 p-4 pt-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">User Profile</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <img
          src={'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{user.username}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
      </div>

      <div className='text-green-600 font-bold text-2xl md:text-3xl mt-10'>Profile updating Coming soon...</div>
    </div>
  );
}
