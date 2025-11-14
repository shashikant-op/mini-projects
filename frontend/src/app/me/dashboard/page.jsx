"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
        console.log("Dashboard /me response:", data); // debug
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => router.push("/"));
  }, [mounted, router]);

  if (!mounted || loading)
    return <div className="p-8 flex flex-center text-gray-600 animate-pulse">Loading...</div>;

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            <span className="text-3xl text-purple-800">Welcome, </span>{user.name} ({user.role})
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-md border shadow-sm">
            Overview card
          </div>
          <div className="bg-white p-6 rounded-md border shadow-sm">
            Activity 
          </div>
        </section>
      </div>
    </div>
  );
}
