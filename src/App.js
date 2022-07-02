import './App.css';
import Header from "./components/Header.js"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Footer from "./components/Footer.js"
import Signup from "./components/SignUp"
import Login from "./components/Login"
import PrivateComp from "./components/PrivateComp"
import AddProduct from "./components/AddProduct"
import ProductList from "./components/ProductList"
import UpdateProduct from "./components/UpdateProduct"
import Profile from "./components/Profile"

function App() {
  return (
    <> 
    <BrowserRouter>
    <Header/>

    <Routes>

    <Route element={<PrivateComp/>}>
      <Route path="/" element={<ProductList/>}></Route>
      <Route path="/add" element={<AddProduct/>}></Route>
      <Route path="/update/:id" element={<UpdateProduct/>}></Route>
      <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Route>

      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    
    </BrowserRouter>

    <Footer/>
    </>
  );
}

export default App;
