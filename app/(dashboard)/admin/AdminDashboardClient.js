"use client";

import React from "react";

export default function AdminDashboardClient({ user }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300">Welcome back, {user?.name || "Admin"}!</p>
        <div className="mt-4 p-4 bg-slate-900 rounded border border-slate-700">
          <pre className="text-xs text-gray-400 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
