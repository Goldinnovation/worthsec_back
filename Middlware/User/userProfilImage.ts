import multer from "multer";

// const {fileURLToPath} = require('url')

import { fileURLToPath } from 'url';
import path, { join } from "path";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


 
const upload = multer({dest: join(__dirname, "../public/CoverImageDirect")});



const storage = multer.diskStorage({

    
    destination: function(req,file,cb){
        
        
        cb(null, 'public')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
        // console.log(file)
    }
})

const userProfilImageFile = multer({storage:storage}).single('UserProfilImage')
console.log(userProfilImageFile)
// module.exports = userProfilImageFile


export default userProfilImageFile