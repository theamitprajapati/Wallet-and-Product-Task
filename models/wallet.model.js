const mongoose = require('mongoose');
var walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    walletId: {
        type: String,
        required: 'This field is required.'
    },
    balance: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true
  });
  module.exports =  mongoose.model('wallet', walletSchema);
