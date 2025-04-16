import React, { useState } from "react";
import { loginUser, signupUser } from "../services/users";
import { motion } from "framer-motion";

export interface LoginProps {
  onLoginSuccess: (path: string) => void;
  onClose: () => void;
  initialPath: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose, initialPath }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await loginUser(email, password);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", email);
      onLoginSuccess(initialPath);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const { access_token } = await signupUser({
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        full_name: signupData.full_name
      });

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", signupData.email);
      onLoginSuccess(initialPath);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  if (!showLogin) {
    return (
      <motion.div
        className="bg-[#f8f8f5] rounded-none border border-[#eaeae5] shadow-md p-6 w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Avatar"
            className="h-16 w-16 rounded-full object-cover border-4 border-[#90a870]"
          />
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded-none mb-3 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={signupData.full_name}
              onChange={handleSignupInputChange}
              required
              className="w-full p-2 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleSignupInputChange}
              required
              className="w-full p-2 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupInputChange}
              required
              className="w-full p-2 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupInputChange}
              required
              className="w-full p-2 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupInputChange}
              required
              className="w-full p-2 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-[#90a870] text-white font-medium rounded-none hover:bg-[#7d9460] transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#555]">
            Already have an account?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-[#90a870] cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-[#f8f8f5] rounded-none border border-[#eaeae5] shadow-md p-8 w-96 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-center mb-6">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar"
          className="h-20 w-20 rounded-full object-cover border-4 border-[#90a870]"
        />
      </div>

      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-3 rounded-none mb-4 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#333] mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#333] mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-[#eaeae5] rounded-none bg-[#f0f0e8] focus:outline-none focus:ring-2 focus:ring-[#90a870]"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#90a870] text-white font-medium rounded-none hover:bg-[#7d9460] transition-colors duration-300"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-[#555]">
          Don't have an account?{" "}
          <span
            onClick={() => setShowLogin(false)}
            className="text-[#90a870] cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;