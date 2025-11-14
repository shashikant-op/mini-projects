"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      
      return;
    }

    fetch(`${BACKEND_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-xl animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 border border-gray-200">

        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Profile
        </h1>

        <div className="space-y-4 text-gray-700 text-base">
          <p className="p-3 bg-gray-100 rounded-xl border border-gray-200">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="p-3 bg-gray-100 rounded-xl border border-gray-200">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="p-3 bg-gray-100 rounded-xl border border-gray-200">
            <span className="font-medium">Role:</span> {user.role}
          </p>
        </div>

        {/* Dashboard Button */}
        <button
          onClick={() => router.push("/me/dashboard")}
          className="mt-6 w-full py-3 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition"
        >
          Go to Dashboard
        </button>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="mt-4 w-full py-3 bg-purple-800 hover:bg-purple-600 text-white font-medium rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
