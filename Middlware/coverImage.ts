import multer from 'multer';



// setting the multer configurationn to handle file upload 
const storage = multer.memoryStorage()
const upload = multer({storage}).single('ImageCoverUpload')









export default upload
 