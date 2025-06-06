const mongoose = require('mongoose');

function connecttoDB(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("CONNECTED TO MONGODB");
    })
}

module.exports = connecttoDB;