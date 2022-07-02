import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./header.scss"

const Header = () => {

  const auth = localStorage.getItem('user');

  const navigate = useNavigate();

  //to clear the localStorageData as well to logged out user
  const logOut = () => {
    localStorage.clear();
    navigate('/signup');
  }


  return (
    <div className="header">
    <h1 className="logo">E-comm</h1>
    { auth ? 
        <ul className="nav-items">
            <li><Link to= "/">Product</Link></li>
            <li><Link to= "/add">Add Product</Link></li>
            <li><Link to= "/update">Update Product</Link></li>
            <li><Link to= "/profile">Profile</Link></li>
            <li><Link onClick={logOut} to="/signup">logout 
            ({JSON.parse(auth).name})</Link></li>
            
        </ul>
        : <ul className="nav-items">
          <li><Link to = "/signup">SignUp</Link></li>
            <li><Link to = "/login">Login</Link></li>
        </ul>
    }
    </div>
  )
}

export default Header