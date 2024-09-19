import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { deleteStart, deleteSuccess, deleteFailure, signoutStart, signoutFailure, signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: ''
  });
  const [userdata, setUserdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.email) {
      getUser();
    }
  }, [currentUser]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUserdata(data);
      setFormData(prev => ({ ...prev, avatar: data.avatar || currentUser.photoURL }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        console.error('Error uploading file:', error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prev => ({ ...prev, avatar: downloadURL }));
          setFilePercent(0); // Reset the progress after completion
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Updating...');
    try {
      const res = await fetch(`/api/user/update/${userdata._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updatedUser = await res.json();
      setUserdata(updatedUser);
      setSubmitStatus('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setSubmitStatus('Error updating profile.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        dispatch(deleteStart());
        const res = await fetch(`/api/user/delete/${userdata._id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete account');
        const data = await res.json();
        dispatch(deleteSuccess(data));
      } catch (error) {
        dispatch(deleteFailure(error.message));
      }
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/auth/signout');
      if (!res.ok) throw new Error('Failed to sign out');
      const data = await res.json();
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <div className="pt-8">
      <div className="max-w-md mx-auto my-0 p-5 border border-gray-300 rounded-lg shadow-md flex flex-col">
        <h2 className="text-center font-bold text-gray-800">Profile</h2>
        <input
          onChange={handleFileChange}
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full mx-auto my-2 cursor-pointer"
          src={formData.avatar || currentUser.photoURL}
          alt="Profile"
        />
        <div className="text-center my-2">
          {fileUploadError && <p className="text-red-600">Error uploading image</p>}
          {filePercent > 0 && filePercent < 100 && (
            <p>
              File uploading <span className="text-green-600">{filePercent}%</span>
            </p>
          )}
          {filePercent === 100 && <p className="text-green-600">File uploaded successfully</p>}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="flex flex-col items-center p-5" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              className="p-2 mb-2 text-lg bg-gray-200 rounded-lg w-full"
              type="text"
              placeholder="Username"
              name="username"
              defaultValue={userdata.username}
            />
            <input
              onChange={handleChange}
              className="p-2 mb-2 text-lg bg-gray-200 rounded-lg w-full"
              type="text"
              placeholder="Email"
              name="email"
              defaultValue={userdata.email}
            />
            <input
              onChange={handleChange}
              className="p-2 mb-2 text-lg bg-gray-200 rounded-lg w-full"
              type="password"
              placeholder="Password"
              name="password"
            />
            <div className="flex justify-between gap-5 mt-2 w-full">
              <button
                className="p-2 bg-green-600 text-white rounded-lg w-1/2 cursor-pointer"
                type="submit"
              >
                UPDATE
              </button>
              <button
                onClick={() => navigate('/createListing')}
                className="p-2 bg-green-600 text-white rounded-lg w-1/2 cursor-pointer"
                type="button"
              >
                CREATE LISTING
              </button>
            </div>
          </form>
        )}
        {submitStatus && <p className="ml-5 mt-0">{submitStatus}</p>}
        <div className="flex justify-between mt-4">
          <p onClick={handleDelete} className="text-red-600 cursor-pointer hover:text-red-800">
            Delete account
          </p>
          <p onClick={handleSignout} className="text-red-600 cursor-pointer hover:text-red-800">
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
}
