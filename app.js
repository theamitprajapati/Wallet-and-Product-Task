require('./models/connnection');
const express = require('express');
const bodyparser = require('body-parser');
const walletController = require('./controllers/walletController');
const productController = require('./controllers/productController');
var app = express();
app.use(bodyparser.json());
app.listen(5000, () => {
    console.log('Server Running : 5000');
});
app.get('/',function(req,res){
  res.send("OK");
})
app.use('/wallet', walletController);
app.use('/product', productController);
