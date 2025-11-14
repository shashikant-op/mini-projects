"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [token,settoken]=useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "",role:"" });
  const BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (isLogin) {
        result = await axios.post(`${BACKEND_URL}/login`, {
          email: form.email,
          password: form.password,
        });
      } else {
        result = await axios.post(`${BACKEND_URL}/register`, form);
      }

      localStorage.setItem("token", result.data.token);

      router.push("/me");

    } catch (err) {
  console.log("Backend error:", err.response?.data);
  alert(err.response?.data?.error || "Unknown backend error");
}
  };

  return (
    <div className=" h-screen bg-gradient-to-t from-purple-900 to-white to-30% flex items-center justify-center   px-4">
      
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
                <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            </div>
          
            
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          <button
            type="submit"
            className="w-full cursor-pointer !bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

       

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 !bg-transparent hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>

         
        
        </p>
      </div>
    </div>
  );
};

export default AuthPage;