// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {users.map((user) => {
          // Check if a locally updated avatar exists for this user.
          const updatedAvatar = localStorage.getItem(`avatar_${user.id}`);
          const avatarToShow = updatedAvatar || user.avatar;
          return (
            <div key={user.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img 
                src={avatarToShow} 
                alt={`${user.first_name} ${user.last_name}`} 
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="font-semibold text-lg mb-2">
                {user.first_name} {user.last_name}
              </p>
              <div className="flex space-x-4">
                <Link 
                  to={`/edit/${user.id}`} 
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-10 space-x-4">
        {page > 1 && (
          <button 
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <button 
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersList;
