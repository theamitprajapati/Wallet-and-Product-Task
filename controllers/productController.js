const express = require("express");
var router = express.Router();
const Product = require('../models/product.model');

//4.Product Listing
router.get("/", (req, res) => {  
  Product.find((err, doc) => { 
      if(err) return res.send({error:1,message:err.message});      
	    return res.send({error:0,result:doc});
  });
});


router.post("/", (req, res) => { 
  const body = req.body;
  if(!body.name || !body.amount){
    return res.send({error:1,message:'name,amount and description field is requred'});
  } 
  var product = new Product();
  product.productId = 'PR'+Date.now();
  product.name = body.name;
  product.amount = (Number(body.amount)).toFixed(4);
  product.description = body.description;
  product.save((err, doc) => { 
      if(err) return res.send({error:1,message:err.message});      
	    return res.send({error:0,result:doc});
  });
});

module.exports = router;
