const categoryController = require("../controllers/product/categoryController")
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();

router.get('/category/index', categoryController.index);
router.get('/category/all', categoryController.getAll);
router.post('/category/create', categoryController.insert);
router.get('/category/byid/:category_id', categoryController.findByID);
router.patch('/category/update/:category_id', categoryController.UpdateCategory);

module.exports= router;
