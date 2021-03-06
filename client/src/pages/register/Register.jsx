import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [role, setRole] = useState('seller')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
     
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        role
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err)
      setError(true)
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />


        <label>
          What is your Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="farmer">Farmer</option>
            <option  value="seller">Seller</option>
            
          </select>
        </label>
       



        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      { error && <span
        style={{color:'red',marginTop:"10px"}}
      >Something is Wrong !</span>}
    </div>
  );
}
