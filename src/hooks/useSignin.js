import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useSignin = () => {
    const navigate = useNavigate();

  const signin = async (username, email, password, category, address, phone) => {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        category: category,
        address: address,
        phone_number: phone,
      }),
    });

    if (response.status === 201) {
      alert("Your Account Has Been Created");
      toast.success("Your Account Has Been Created");
      navigate('/login');
    } else {
      
      toast.error("check some connection" , {
        theme:"dark"
      })
    }
  };

  //=========================================

  const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          email: email,
          password: password
        }
      ),
    });

    if(response.ok){
        const data = await response.json();
        localStorage.setItem('x-auth-token' , data.token)
        console.log(localStorage.getItem('x-auth-token'));
        navigate('/Home');
    }
    else{
      const errorData = await response.json();
      console.log(errorData.message || "An error occurred");
      alert(errorData.message || "Login failed. Please try again.");
    }
  };

  return { signin, login };
};

