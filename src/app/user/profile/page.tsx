"use client";

import { User, Mail } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";

export default function UserProfile() {
  const { auth } = useAuth();

  console.log("User Profile Auth Data:", auth);

  // Example fallback (in case auth loads slowly)
  const fullName = auth?.fullName || "User Name";
  const email = auth?.email || "user@email.com";

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">{fullName}</h1>

          <p className="text-sm text-gray-500">Registered User</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm text-gray-800 font-medium">{fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="text-sm text-gray-800 font-medium">{email}</p>
            </div>
          </div>
        </div>

        {/* Future Action Buttons */}
        <div className="mt-8">
          <button
            disabled
            className="w-full py-2.5 rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
