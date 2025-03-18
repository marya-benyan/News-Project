import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../../images/background.jpeg";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      
      const response = await axios.post(
        "http://localhost:8000/auth/signup", 
        { full_name, email, password },
        { withCredentials: true }  
      );
      
      const { user } = response.data;

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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
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
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full text-white">
          <div className="relative mb-4">
            <input
              type="text"
              required
              value={full_name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-white rounded-lg px-4 py-2 text-white focus:outline-none"
              placeholder="Name"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white rounded-lg px-4 py-2 text-white focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-white rounded-lg px-4 py-2 text-white focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#1e293b] text-white font-medium rounded-lg shadow-md hover:bg-[#1e251b]"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 mt-4 bg-white text-[#1e293b] bg-[#cecab3] font-medium rounded-lg shadow-md "
          >
            <FcGoogle size={24} /> Login with Google
          </button>
          <p className="text-center mt-4 text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1e293b] font-semibold hover:text-[#1e251b]"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
