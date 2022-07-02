import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./productlist.scss"

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        let result = await fetch ("http://localhost:4000/products", {
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setProducts(result);
    }
    // console.log(products);


    const deleteProduct = async(id) => {
        let result = await fetch (`http://localhost:4000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if(result){
            getProducts();
        }
    };


    const searchHandle = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:4000/search/${key}`, {
                headers:{
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
        }  
        }else{
            getProducts()
        }
    }

  return (
    <div className="productlist">
        <h2 className="title">Product List</h2>
        <hr className= "hr"/>
        
        <input type = "text"  className="search-product" placeholder="Search Product" onChange={searchHandle}/>

        <table className="productable">
        <thead>
            <tr className="table-headingrows">
                <th className="tableheading">S. no</th>
                <th className="tableheading">Name</th>
                <th className="tableheading">Price</th>
                <th className="tableheading">Category</th>
                <th className="tableheading">Company</th>
                <th className="tableheading">Operations</th>
            </tr>
        </thead>
        <tbody>
            {
                products.length > 0 ? products.map((item, index) =>
            <tr key= {item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                <button className="delbtn" 
                onClick={() => deleteProduct(item._id)}>Delete</button>
                <button className="updatebtn">
                <Link to ={"/update/"+item._id} className="updatelink">Update</Link></button>
                </td>
            </tr>
           ) : <tr>
               <td>No Record Found</td>
           </tr>
           }
        </tbody>
        </table>
    </div>
  )
}

export default ProductList