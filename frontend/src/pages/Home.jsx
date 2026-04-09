import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await API.get("/home");
        setMessage(res.data.message);
      } catch (err) {
        // alert("Unauthorized! Please login again");
        // localStorage.removeItem("token");
        // navigate("/login");
        handleLogout();
      }
    };

    fetchHome();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 remove token
    navigate("/login");               // 🔥 redirect
  };
  return (
    <div>
      <h2>Home</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home