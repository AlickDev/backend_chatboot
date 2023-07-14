const { index, getAllProducts, insertProduct, insertImage, deleteImage } = require("../controllers/product/productController");
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images/img_products'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalExtension = file.originalname.split('.').pop(); // Get the original file extension
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalExtension); // Set the filename with the original file extension
    }
  });

  const imageFilter = function (req, file, cb) {
    // Accept image files only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: imageFilter });



router.get('/product/index', index);
router.get('/product/all', getAllProducts);
router.post('/product/insert', insertProduct);

// product
router.post('/product/image/insert', upload.single('product_img'), insertImage);
router.delete('/product/image/delete', deleteImage);

module.exports= router;
