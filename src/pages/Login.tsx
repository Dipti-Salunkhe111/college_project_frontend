import React, { useState } from "react";
import { loginUser, signupUser } from "../services/users";

export interface LoginProps {
    onLoginSuccess: (path: string) => void;
    onClose: () => void;
    initialPath: string;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, initialPath }) => {
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
    console.log(name, value); // Add this to log inputs
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };
  
  

// Updated signup section of the Login component
if (!showLogin) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar"
          className="h-16 w-16 rounded-full object-cover border-4 border-blue-500"
        />
      </div>

      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={signupData.full_name}
            onChange={handleSignupInputChange}
            required
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleSignupInputChange}
            required
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupInputChange}
            required
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupInputChange}
            required
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleSignupInputChange}
            required
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => setShowLogin(true)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-96 max-w-md">
      <div className="flex justify-center mb-6">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar"
          className="h-20 w-20 rounded-full object-cover border-4 border-blue-500"
        />
      </div>

      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => setShowLogin(false)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;