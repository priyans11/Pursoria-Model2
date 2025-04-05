
const multer =require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });



module.exports = upload; // This will be used in the routes to handle file uploads