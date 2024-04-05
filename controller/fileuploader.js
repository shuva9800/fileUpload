const cloumodel = require("../model/cloudmodel");

exports.fileUpload= async (req,res) => {
    try{
        const file= req.files.file;
        console.log("uploaded file is:-" , file);
        // path = current directory + path where to upload + extentions

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

        file.mv(path, (err)=>{console.log(err)});

        res.status(200).json({
            success:true,
            message: "file uploaded successfully"
        })

    }
    catch(error){
        console.log(error);
    }
}


