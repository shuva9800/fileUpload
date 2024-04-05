const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = ()=> {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("DataBase connect successfully"))
    .catch((error)=>{
        console.log(error);
        console.log("essue in DataBase connection");
        process.exit(1);
    })
}

module.exports = dbConnect;

