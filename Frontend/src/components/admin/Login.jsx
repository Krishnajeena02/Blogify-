import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext.jsx";

const Login = () => {
  const { setToken, navigate } = useAppContext();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isRegister
        ? "/api/user/register"
        : "/api/user/login";

      const payload = isRegister
        ? { name, email, password }
        : { email, password };

      const res = await axios.post(url, payload);

      if (res) {
        toast.success(res.data.message);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          navigate("/admin");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border border-indigo-600/30 shadow-xl shadow-indigo-600/15 rounded-lg">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-white"></span>{" "}
              {isRegister ? "Register" : "Login"}
            </h1>
            <p className="font-light">
              {isRegister
                ? "Create admin account"
                : "Enter your credentials to access the admin panel"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {isRegister && (
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                  required
                />
              </div>
            )}

            <div className="flex flex-col">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black w-full cursor-pointer text-white py-3 font-medium rounded hover:bg-black/90 transition"
            >
              {loading
                ? "Please wait..."
                : isRegister
                ? "Register"
                : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsRegister(!isRegister)} 
              className="text-indigo-600 font-medium cursor-pointer hover:underline "
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
