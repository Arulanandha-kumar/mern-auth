import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
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
            await API.post("/signup", form);
            alert("Signup successful!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8">
            <h2 className="text-[#d97757] text-center text-3xl font-bold mb-4">Signup</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input name="email" autoComplete="off" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Signup</button>
                <p className="mt-5 text-center text-gray-800">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#ff7a59", fontWeight: "bold" }}>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup