import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSignin } from '../../hooks/useSignin';
import image from '../Auth/secure.png'


const Login = () => {
  const {login} = useSignin();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")

    const handleSubmit = async (e)=>{
      e.preventDefault();
      
      try {
        await login(email, password);
      } catch (error) {
        console.error("Login failed", error);
      }

    }


  return (
    <div className="parent">
        <div className="left">
            <h1>Welcome,</h1>
            <h2>To The FurEver Store 🛍️</h2>
            <p>Sign Up And Create Your Account</p>

            <form onSubmit={handleSubmit} >
             
              <p>Email 📩</p>
              <input type='email' placeholder="Email Address "  onChange={(e)=> setemail(e.target.value)}></input>
              <p>Password 🔑</p>
              <input type='password' placeholder="Password " onChange={(e)=> setpassword(e.target.value)}></input>
              <br />
              <br />
                <input className='button' type="submit" value="Login Account 👆"/>
                <p className='login'>Don't Have An Account? <Link to="/Auth">  <span> Create Now</span> </Link></p>
              
            </form>
        </div>
        <div className="right">
          <img src={image} alt="s" />
          <h1>Let's Explore The Pawsome Store Now!</h1>
          <p>"Join us today! Create your account and give your pet the care they deserve with just a few clicks."</p>
        </div>
    </div>
  )
  
}

export default Login