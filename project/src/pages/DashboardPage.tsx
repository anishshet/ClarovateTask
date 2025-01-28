import React from 'react';
import { BarChart } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <p className="text-gray-600">
        Welcome to your dashboard! This page is accessible to both users and admins.
      </p>
    </div>
  );
}