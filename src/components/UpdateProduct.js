import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import "./updateproduct.scss"

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    //to get the url parameters
    const params = useParams();

    //to navigate to home page
    const navigate = useNavigate();

    useEffect (() =>{
      getProductDetails();
    }, []);

    //to prefill the form
    const getProductDetails = async() => {
      console.log(params);
      let result = await fetch(`http://localhost:4000/product/${params.id}`,{
        headers:{
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      result= await result.json();
      console.log(result);
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.company)
    }

//to update the form
    const updateProduct = async () => {
            console.log(name, price, category, company);
            let result = await fetch(`http://localhost:4000/product/${params.id}`,{
              method: 'Put',
              body: JSON.stringify({name, price, category, company}),
              headers: {
                'Content-type' : 'application/json',
                  authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            });
            result = await result.json();
            console.log(result);
            navigate('/')
    }
    

  return (
    <div className="updateproduct">
    <div className="updateproduct-container"> 
        <h1 className="title">Update Product</h1>
        <input type="text" 
        placeholder="Enter product name" className="inputBox" value={name}
        onChange={(e) => {setName(e.target.value)}}
        />

        <input type="text" 
        placeholder="Enter product price" className="inputBox"
        value={price}
        onChange={(e) => {setPrice(e.target.value)}}
        />

        <input type="text" 
        placeholder="Enter product category" className="inputBox"
        value={category}
        onChange={(e) => {setCategory(e.target.value)}}
        />
      
        <input type="text" 
        placeholder="Enter product company" className="inputBox" value={company}
        onChange={(e) => {setCompany(e.target.value)}}
        />

        <button className="updateProductButton"
        onClick= {updateProduct}>Update Product</button>
        </div>
    </div>
  )
}

export default UpdateProduct