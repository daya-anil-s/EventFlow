"use client";

import React from "react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface Props {
  user: User;
}

export default function ParticipantDashboardClient({ user }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Participant Dashboard</h1>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300">Welcome back, {user?.name || "Participant"}!</p>
        <p className="text-sm text-gray-500 mt-2">Ready to hack?</p>
      </div>
    </div>
  );
}
