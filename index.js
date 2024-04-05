const express = require("express");
const app= express();
require("dotenv").config();

const PORT= process.env.PORT || 3000;
//middleware
app.use(express.json());
const fileupload= require("express-fileupload");
app.use(fileupload());

app.listen(PORT, ()=>{console.log(`app started successfully at ${PORT}`)});

//database connection
const databaseconnection = require("./config/database");
databaseconnection();
//cloudinary connection
const cloudbase= require("./config/cloudinary");
cloudbase();

const uploadrouter= require("./routes/cloudrouter");
app.use("/api/v1", uploadrouter);



app.get("/", (req,res)=>{
    res.send(`<h1>WELL COME TO HOME PAGE</h1>`);
})
