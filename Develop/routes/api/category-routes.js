const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection');
const { load } = require('dotenv');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: Product
  });
  res.send(
    JSON.stringify(categories, null, 2)
  )
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category_id = req.params.id
  const category = await Category.findAll({
    where: {
      id: category_id
    },
    include: Product
  })
  res.send(
    JSON.stringify(category, null, 2)
  )
});

router.post('/', async (req, res) => {
  // create a new category
  const createCategory = await Category.create ({
    category_name: req.body.category_name
  })
  res.send(
    JSON.stringify(createCategory, null, 2)
  )
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category_id = req.params.id
  const category = await Category.update(
    {
      category_name: req.body.category_name
    }, 
    {
      where: {
        id: category_id
      },
    }
  )
  res.send(
    JSON.stringify(category, null, 2)
  )
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category_id = req.params.id
  const category = await Category.destroy(
    {
      where: {
        id: category_id
      },
    }
  )
  res.send(
    JSON.stringify(category, null, 2)
  )
});

module.exports = router;
