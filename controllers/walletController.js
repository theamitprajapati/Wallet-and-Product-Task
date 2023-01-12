const express = require("express");
var router = express.Router();
const Wallet = require('../models/wallet.model');
const Transaction = require('../models/transaction.model');
const Product = require('../models/product.model');

//1.Wallet Setup
router.post("/", (req, res) => {
  const body = req.body;
  if(!body.name || !body.balance){
    return res.send({error:1,message:'name and balance field is requred'});
  }
  var wallet = new Wallet();
  wallet.walletId = 'WT'+Date.now();
  wallet.name = body.name;
  wallet.balance = body.balance;
  wallet.save((err, doc) => {
    if(err) return res.send({error:1,message:err.message});  
    return res.send({error:0,result:doc});
  });
});

//2.Wallet Details
router.get("/:walletId", (req, res) => { 
  Wallet.findOne({walletId:req.params.walletId}, (err, doc) => {
    if(err) return res.send({error:1,message:err.message});  
    return res.send({error:0,result:doc});
  });
});


// 3 Add credit to the wallet
router.post("/:walletId/transaction", async (req, res) => {
  const body = req.body;
  const walletId = req.params.walletId;
  const wallet = await Wallet.findOne({walletId});
  if(!wallet){
    return res.send({error:1,message:'WalletId  Not fund ?'}); 
  }

  let totalBalance = Number(wallet.balance) + Number(body.balance);
  await Wallet.updateOne({walletId},{$set:{balance:totalBalance.toFixed(4)}});
  

  var transactioin = new Transaction();
  transactioin.transactionId = 'TX'+Date.now();
  transactioin.walletId = walletId;
  transactioin.balance = body.balance;
  transactioin.type = 'credit';
  transactioin.description = body?.description;
  transactioin.save((err, doc) => {
    if(err) return res.send({error:1,message:err.message});  
    return res.send({error:0,result:doc});
  });
});

//5.Purchase a product
router.post("/:walletId/purchase", async (req, res) => {
  const body = req.body;
  const walletId = req.params.walletId;
  console.log(walletId);
  if(!body.productId){
    return res.send({error:1,message:'productId field is requred'});
  } 
  const wallet = await Wallet.findOne({walletId});
  const product = await Product.findOne({productId:body.productId});
  if(!product){
    return res.send({error:1,message:'ProductId Not fund ?'}); 
  }

  if(!wallet){
    return res.send({error:1,message:'WalletId  Not fund ?'}); 
  }

  if(wallet.balance < product.amount ){
    return res.send({error:1,message:'The product amount exceeds the wallet amount?'});
  }


  let totalBalance = wallet.balance - product.amount;
  await Wallet.updateOne({walletId},{$set:{balance:totalBalance.toFixed(4)}});
  

  var transactioin = new Transaction();
  transactioin.transactionId = 'TX'+Date.now();
  transactioin.productId = body.productId;
  transactioin.walletId = walletId;
  transactioin.balance = product.amount;
  transactioin.type = 'debit';
  transactioin.description = body?.description;
  transactioin.save((err, doc) => {
    if(err) return res.send({error:1,message:err.message});  
    return res.send({error:0,result:doc});
  });
});


//6. List transactions
router.get("/:walletId/transaction", (req, res) => {
  Transaction.find({walletId:req.params.walletId},(err, docs) => {
    if(err) return res.send({error:1,message:err.message});  
    return res.send({error:0,result:docs});
  });
});

module.exports = router;
