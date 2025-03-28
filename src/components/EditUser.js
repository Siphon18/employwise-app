// src/components/EditUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://reqres.in/api/users/${id}`);
      const data = res.data.data;
      setUser({ 
        first_name: data.first_name, 
        last_name: data.last_name, 
        email: data.email || '' 
      });
      setAvatarPreview(data.avatar); // set initial avatar preview from API
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate update using a PUT request (Note: Reqres doesn't update avatars)
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      // Save the updated avatar locally if available
      if (avatarPreview) {
        localStorage.setItem(`avatar_${id}`, avatarPreview);
      }
      navigate('/users');
    } catch (err) {
      setError('Update failed. Please try again.');
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={avatarPreview || 'https://via.placeholder.com/150'}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full mb-4 transition-transform duration-300 hover:scale-110"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mb-4"
            />
          </div>
          <div>
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              required
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              required
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
