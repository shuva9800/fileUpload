const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileschema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    imageUrl:{
        type: 'string',
    },
    tags:{
        type: 'string'
    },
    email:{
        type: 'string',
        required:true
    }
});
// mail send a after successful upload
fileschema.post("save", async function(doc){
    try{
    // doc is the details of database upload responce
         console.log(process.env.USER, process.env.USER_PASSWORD);
         const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.USER_PASSWORD,
            }
         })

         const info = await transporter.sendMail({
            from:`shuva bhowmik`,
            to:doc.email,
            subject: `file uploade successfully`,
            html:`<h2>hello jee</h2> <p>file link:- <a href=${doc.imageUrl}>${doc.imageUrl}</a></p>`
         })
         console.log("info is:-", info)
    }
    catch(err){
        console.log(err);
    }
})




module.exports = mongoose.model("file", fileschema);