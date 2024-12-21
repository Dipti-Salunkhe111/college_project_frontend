import React, { useState } from "react";
import { loginUser } from "../services/users";

interface LoginProps {
  onLoginSuccess: (path: string) => void; // Callback to handle login success
  onClose: () => void; // Callback to close the modal
  initialPath: string; // The path the user tried to access
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, initialPath }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await loginUser(email, password);

      // Save token to local storage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("username", email); // Save username

      // Pass the initial path to the onLoginSuccess callback
      onLoginSuccess(initialPath);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-96 max-w-md">
      <div className="flex justify-center mb-6">
        {/* Avatar Image */}
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
            onClick={() => alert("Redirect to signup")}
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