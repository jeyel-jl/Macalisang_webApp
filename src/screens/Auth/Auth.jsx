import React, { useState } from 'react';
import './Auth.css';
import { useSignin } from '../../hooks/useSignin';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../Auth/secure.png';

const Auth = () => {
  const [category, setCategory] = useState("Admin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { signin } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signin(username, email, password, category, address, phone);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <div className="parent">
        <div className="left">
          <h1>Welcome,</h1>
          <h2>To The FurEver Store 🛒</h2>
          <p>Sign Up And Create Your Account</p>

          <form onSubmit={handleSubmit}>
            <p>Username 🔛</p>
            <input
              type="text"
              placeholder="Your Name "
              onChange={(e) => setUsername(e.target.value)}
            ></input>

            <p>Email 📩</p>
            <input
              type="email"
              placeholder="Email Address "
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <p>Password 🔑</p>
            <input
              type="password"
              placeholder="Password "
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <p>Address 🏠</p>
            <input
              type="text"
              placeholder="Your Address "
              onChange={(e) => setAddress(e.target.value)}
            ></input>

            <p>Phone Number 📞</p>
            <input
              type="text"
              placeholder="Your Phone Number "
              onChange={(e) => setPhone(e.target.value)}
            ></input>

            <div className="dropdown">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              >
                <option value="Admin">Admin⚡ </option>
                <option value="User">User 🚀 </option>
              </select>
              <br />
              <br />
              <p>You Are Signing as {category} 🖌️ </p>
              <br />

              <input
                className="button"
                type="submit"
                value="Create Account 👆"
              />
              <p className="login">
                Already Have An Account?{' '}
                <Link to="/Login">
                  {' '}
                  <span> Login Now</span>{' '}
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={image} alt="s" />
          <h1>Let's Explore The Pawsome Store Now!</h1>
          <p>
            "Join us today! Create your account and give your pet the care they
            deserve with just a few clicks."
          </p>
        </div>
      </div>
      <ToastContainer className="toast" />
    </>
  );
};

export default Auth;
