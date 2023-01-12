const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String
    },
    balance: {
        type: Number
    },
    productId: {
        type: String
    },
    walletId: {
        type: String
    },
    type: {
        type: String
    }, 
    description: {
        type: String
    }	
},{
    timestamps: true
  });
module.exports = mongoose.model('transaction', transactionSchema);