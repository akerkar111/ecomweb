import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./signup.scss";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 //to block sign up page once you sign in
  useEffect(()=> {
    const auth = localStorage.getItem('user');

    if(auth){
      navigate('/');
    }
  }, []);
  
 
  //To register the user
  const collectData = async() => {
    console.log(name,email,password);
    let result = await fetch("http://localhost:4000/register", {
      method : "post",
      body : JSON.stringify({name,email,password}),
      headers : {
        "Content-Type" : "application/json"
      }
    });
    result = await result.json();
    console.log(result);

    //to add data inside localStorage
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));

    //after successful signup we should navigate user to home page
    if(result){
      navigate('/');
    }
    else{
      alert('Signup properly');
    }
    
  }

  return (
      <div className="main-container">
    <div className="signup-container">
      <h2 className="title">Register</h2>
      <input
        className="name"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="email"
        type="email_id"
        placeholder="Enter Email_id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="pass"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="submit" onClick={collectData}>
        SignUp
      </button>
    </div>
    </div>
  );
};

export default SignUp;
