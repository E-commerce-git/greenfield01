import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/redux/useAuth";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">User List</h1>
        <Link
          to="/dashboard"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{user.userName}</h3>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-4">Role: {user.role}</p>
              <button
                onClick={() => handleViewProfile(user.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
        
        {users.length === 0 && !loading && !error && (
          <div className="text-center text-gray-600 mt-8">
            No users found
          </div>
        )}
      </main>
    </div>
  );
};

export default UserList;