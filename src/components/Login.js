import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import './login.scss'

const Login = () => {

const [email,setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

  //to block login page once you logged in
  useEffect(()=> {
    const auth = localStorage.getItem('user');

    //if authorized user it will directly navigate the user to home page
    if(auth){
      navigate('/');
    }
  }, []);

const handleLogin = async() => {
    console.log(email, password);
    let result = await fetch('http://localhost:4000/login', {
        method: 'post',
        body: JSON.stringify({email,password}),
        headers: {
           "Content-Type" : "application/json"
        }
    });
    result = await result.json();
    // console.log(result);
    if(result.auth){
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
    }else{
        alert("Please enter valid details");
    }
}

  return (
    <div className="main-container">
      <div className="login-container">
        <h2 className="title">Login here</h2>
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

        <button className="login" onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  );
};

export default Login;
