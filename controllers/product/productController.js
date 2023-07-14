const Model = require('../../models/index');
const { validationResult } = require('express-validator');
const paginate = require("express-paginate");
const { Sequelize } = require('sequelize');

const fs = require('fs-extra');



exports.index = async (req, res, next) => {
  res.status(200).json({
    message: 'product'
  })
};

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    let page = parseInt(req.query.page); // Extract the page query parameter

    // Handle invalid or missing page values
    if (isNaN(page) || page <= 0) {
      page = 1; // Default to the first page if the value is not a valid positive number
    }

    const offset = (page - 1) * limit; // Calculate the offset based on the requested page

    const result = await Model.tb_product.findAndCountAll({
      offset: offset,
      limit: limit,
    });


    const pageCount = Math.ceil(result.count / limit);

    res.status(200).json({
      error: false,
      data: result.rows,
      pages: paginate.getArrayPages(req)(3, pageCount, page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while fetching products',
    });
  }
};



exports.insertProduct = async (req, res, next) => {
  try {
    const { product_name, quantity, price, description, image_path, category_id } = req.body;
    await Model.tb_product.create({
      product_name: product_name,
      quantity: quantity,
      price: price,
      description: description,
      image_path: image_path,
      category_id: category_id
    })
    res.status(201).json({
      error: false,
      message: 'Product created successfully'
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while inserting products',
    });
  }
}




//insert image
exports.insertImage = async (req, res, next) => {
  try {
    const file = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = `${baseUrl}/uploads/images/img_products/${file.filename}`;

    res.status(200).json({
      error: false,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while inserting the image',
    });
  }
};



exports.deleteImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    console.log(imageUrl);

    // Extract the filename from the imageUrl
    const filename = imageUrl.split('/').pop();

    // Construct the path to the image file
    const imagePath = path.resolve('uploads/images/img_products', filename);

    // Delete the image file
    await fs.unlink(imagePath);

    res.status(200).json({
      error: false,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while deleting the image',
    });
  }
};




