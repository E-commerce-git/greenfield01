import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/redux/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate("/login");
  };

  const handleUsersClick = () => {
    navigate('/users');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Menu</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={handleUsersClick}
                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  location.pathname === '/users' ? 'bg-gray-700' : ''
                }`}
              >
                <span className="ml-2">Users</span>
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Section */}
        <section className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">Here you can manage users and other admin tasks.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;