import React, { useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AuthLayout() {
  const { user, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/dashboard" className="text-xl font-semibold text-gray-900">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.username}</span>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Left-side Vertical Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Content */}
        <div className="flex flex-col h-full">
          {/* Nav Header */}
          <div className="h-16 flex items-center justify-end px-4 border-b border-gray-200">
            <button
              onClick={() => setIsNavOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsNavOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsNavOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}