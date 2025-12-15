const mongoose = require('mongoose');
require('dotenv').config(); 

const dbconect = () =>{
    mongoose.connect(process.env.HOST ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{console.log('comection sucessfull')})
    .catch((error)=>{console.log('comection failed');
        console.error(error.message);
        process.exit(1);
    });
}

module.exports= dbconect;
