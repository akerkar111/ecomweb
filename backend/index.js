const express = require('express');
const cors = require("cors")
const Jwt = require('jsonwebtoken')
const dbconnection = require("./db/dbconnection");
const User = require("./db/user");
const Product = require("./db/Product");
const app = express();

//Middleware
app.use(express.json());

//to integrate node with react
app.use(cors());

const jwtkey = 'e-comm';


//To insert data in db(Registration API)
app.post("/register", async(req,res) => {
    let user = await new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey, {expiresIn: "2h"}, (err, token) => {
        if(err){
            res.send({result: "Something went wrong, please try after sometime"});
        }
        res.send({result, auth: token})
    })
    // res.send(user)
    // res.send(result);
})


//Login API(to login user)
app.post("/login", async(req, res)=> {
    // console.log(req.body);
    if(req.body.password  && req.body.email){
        let user = await User.findOne(req.body).select('-password');

        //using JWT token 
        if(user){
            Jwt.sign({user}, jwtkey, {expiresIn: "2h"}, (err, token) => {
                if(err){
                    res.send({result: "Something went wrong, please try after sometime"});
                }
                res.send({user, auth: token})
            })
        }else{
            res.send({result: "No user found"})
        }
    }else{
        res.send({result: "No user found"})
    }
})


//Add product API
app.post("/addproduct",verifyToken, async(req,res)=>{
    console.log(req.body);
    let product = await new Product(req.body);
    let result = await product.save();
    res.send(result);
})


//Product List API
app.get("/products",verifyToken, async(req,res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result: "No Products found"});
    }
})


// app.get("/profile", async(req,res) => {
//     let 
// })


//Delete product API
app.delete("/product/:id",verifyToken, async(req,res)=> {
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})


//API use for prefill Update Product form
app.get("/product/:id",verifyToken, async(req,res)=> {
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"No Record Found"})
    }
})


//Update Product API
app.put("/product/:id", verifyToken, async(req,res) => {
    let result = await Product.updateOne({_id:req.params.id},{
        $set: req.body
    });
    res.send(result);
})


//To search from DB(search api)
app.get("/search/:key", verifyToken, async(req,res)=> {
    let result = await Product.find({
        "$or" : [
            {name: {$regex : req.params.key}},
            {category: {$regex : req.params.key}},
            {company: {$regex : req.params.key}},
        ]
    });
    res.send(result);
})


//Middleware(to verify token)
function verifyToken(req, res, next){
    let token  = req.headers["authorization"];
    if(token) {
        token = token.split('')[1];
        Jwt.verify(token, jwtkey, (err, valid) => {
            if(err){
                res.status(401).send({result : "Please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result: "Please add token with header"})
    }
}



app.listen(4000);
