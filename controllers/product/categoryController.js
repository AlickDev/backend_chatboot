const Model = require('../../models/index')
const { validationResult } = require('express-validator');

// index
exports.index = async (req, res, next) => {
  res.status(200).json({
    data: {
      message: 'This is category',
    },
  });
};

// get all data
exports.getAll = async (req, res, next) => {
  try {
    const categories = await Model.tb_category.findAll();

    res.status(200).json({
      data: categories,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while fetching categories',
    });
  }
};

// insert category
exports.insert = async (req, res, next) => {
  const { categoryName } = req.body;

  // validation category_name
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      message: 'Information not correct',
    });
    return;
  }

  try {
    const existingCategory = await Model.tb_category.findOne({
      where: { category_name: categoryName },
    });
    if (existingCategory) {
      res.status(400).json({
        error: true,
        message: 'This category already exists!',
      });
      return;
    }

    await Model.tb_category.create({ category_name: categoryName });
    res.status(200).json({
      error: false,
      message: 'Category created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while creating the category',
    });
  }
};

// find category by id
exports.findByID = async (req, res, next) => {
  try {
    const { category_id } = req.params;


    const category = await Model.tb_category.findByPk(category_id);
    if (!category) {
      res.status(404).json({
        error: false,
        message: 'Category not found',
      });
      return;
    }



    res.status(200).json({
      error: false,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while finding the category',
    });
  }
};

//update the category
exports.UpdateCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { categoryName } = req.body;
    const category = await Model.tb_category.findByPk(category_id);
    if (!category) {
      res.status(404).json({
        error: false,
        message: 'Category not found',
      });
      return;
    }

    await Model.tb_category.update(
      {
        category_name: categoryName,
      },
      {
        where: { category_id: category_id }
      }

    );
    res.status(200).json({
      error: false,
      message: 'Category updated successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while finding the category',
    });
  }
}


