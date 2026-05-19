import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { signIn } from "../services/services";
import {
  setCurrentAccessToken,
  setCurrentUser,
} from "../services/axiosClient";



const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    setError("");

    const response = await signIn({
      email,
      password,
    });

    //console.log("login responce",response)

    // backend response
    const token = response.data.token;
    const user = response.data.user;



    // save token & user
    setCurrentAccessToken(token);
    setCurrentUser(user);

    // role based redirect
    if (user.role === "superadmin") {
      navigate("/dashboard/superadmin");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (error) {
    console.log(error);

    setError(
      error?.response?.data?.message ||
      "Invalid email or password"
    );
  }
};

  return (
    <div
      className={`min-h-screen flex ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* LEFT SIDE (INFO PANEL NOW) */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div
          className={`absolute inset-0 ${
            dark ? "bg-black opacity-90" : "bg-gray-100"
          }`}
        ></div>

        <div className="relative max-w-md px-8">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to <span className="opacity-70">BIOMIMICRY TECH</span>
          </h2>

         <p className="opacity-70 leading-relaxed">
  Monitor real-time water quality, track device performance, and gain actionable insights to ensure optimal system efficiency.
</p>
        </div>
      </div>

      {/* RIGHT SIDE (LOGIN FORM NOW) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">

        {/* Logo */}
        {/* <h1 className="text-2xl font-bold mb-6">IHS</h1> */}

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">
            Bioindication<span className="opacity-70">TECH</span>
          </h2>

          <p className="mb-6 opacity-70">
            Welcome to Bioindication
          </p>                                                                        

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}      

          {/* Email */}
          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-3 opacity-50" size={18} />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-3 py-3 rounded-lg outline-none ${
                dark
                  ? "bg-[#111] border border-gray-800"
                  : "bg-gray-100 border"
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-3 opacity-50" size={18} />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none ${
                dark
                  ? "bg-[#111] border border-gray-800"
                  : "bg-gray-100 border"
              }`}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-xs opacity-70"
            >
              {show ? "HIDE" : "VIEW"}
            </button>
          </div>

          <p className="text-sm text-red-500 mb-4 cursor-pointer">
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
          >
            LOGIN
          </button>

          {/* Demo Accounts */}
          <div
            className={`mt-6 p-4 rounded-lg text-xs ${
              dark ? "bg-[#111]" : "bg-gray-100"
            }`}
          >
            <p className="font-semibold mb-2">Demo Accounts</p>
            <p>Super Admin: admins@gmail.com / 123456</p>
            <p>Admin: admin@admin.com / admin123</p>  
            {/* <p>Doctor: doctor@doctor.com / doctor123</p> */}
            <p>user: usefr3@test.com / 12345326</p>
          </div>
        </div>
      </div>

      {/* 🌙☀️ Floating Toggle Button */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition 
        bg-gray-800 text-white hover:scale-105"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Login;