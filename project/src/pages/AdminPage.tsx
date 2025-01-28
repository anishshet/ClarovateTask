import React from 'react';
import { Shield } from 'lucide-react';

export function AdminPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
      </div>
      <p className="text-gray-600">
        This is a protected admin page. Only users with admin role can access this page.
      </p>
    </div>
  );
}