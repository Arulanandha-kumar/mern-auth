import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.token); // 🔥 store token

      alert("Login success!");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl p-8">
      <h2 className="text-[#d97757] text-center text-3xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p className="mt-5 text-center text-gray-800">
          Don't have an account?{" "}
          <Link to="/" style={{ color: "#ff7a59", fontWeight: "bold" }}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login