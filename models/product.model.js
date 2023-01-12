const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }	
},{
    timestamps: true
  });
module.exports = mongoose.model('product', productSchema);