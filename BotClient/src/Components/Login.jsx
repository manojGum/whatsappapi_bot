import "./style.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name , value)
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = () => {
    if (user.email && user.password) {
      axios
        .post("http://localhost:5656/users/login", {
          email: user.email,
          passwordHash: user.password,
        })
        .then((res) => {
          // console.log(res.data)
          // alert(res.data.msg);
          setLoginUser(res.data);
          navigate("/home");
        });
    } else {
      alert("invlid input");
    }
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center min-vh-100">
      <div className="form_container p-4 rounded bg-white">
        <h3 className="text-center">Sing In</h3>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="form-control"
          />
        </div>
        <div className="mb-2 d-inline-flex align-items-center pl-4">
          <input type="checkbox" className="custom-control-input" id="check" />
          <label htmlFor="check" className="custom-control-label ms-2">
            Remember me
          </label>
        </div>
        <div className="d-grid">
          <button onClick={login} className="btn btn-primary">
            Sign In
          </button>
        </div>
        <p className='text-end mt-9'>
        <Link to="forgot-password"> Forgot Password?</Link>    <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
