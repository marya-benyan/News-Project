import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import background from "../../images/background.jpeg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        { email, password },
        { withCredentials: true }
      );
  
      const { user } = response.data;
  
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "journalist") {
        navigate("/journalist");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-96 bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-5">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full text-white">
          <div className="relative mb-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white rounded-lg px-4 py-2 text-white focus:outline-none placeholder:text-white/50 focus:bg-white/5 backdrop-blur-sm"
              placeholder="Email"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-white rounded-lg px-4 py-2 text-white focus:outline-none placeholder:text-white/50 focus:bg-white/5 backdrop-blur-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#1e293b] text-white font-medium rounded-lg shadow-md hover:bg-[#1e251b]"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 mt-4 bg-white text-[#1e293b] bg-[#cecab3] font-medium rounded-lg shadow-md hover:bg-gray-200"
          >
            <FcGoogle size={24} /> Login with Google
          </button>
          <p className="text-center mt-4 text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1e293b] font-semibold hover:text-[#1e251b]">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
