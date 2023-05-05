const router = require('express').Router();
// const { json } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: Product
  });
  res.send(
    JSON.stringify(tags, null, 2)
  )
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag_id = req.params.id
  const tag = await Tag.findAll({
    where: {
      id: tag_id
    },
    include: Product
  })
  res.send(
    JSON.stringify(tag, null, 2)
  )
});

router.post('/', async (req, res) => {
  // create a new tag
  const createTag = await Tag.create ({
    tag_name: req.body.tag_name
  })
  res.send(
    JSON.stringify(createTag, null, 2)
  )
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag_id = req.params.id
  const tag = await Tag.update(
    {
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: tag_id
      },
    }
  )
  res.send(
    JSON.stringify(tag, null, 2)
  )
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tag_id = req.params.id
  const tag = await Tag.destroy(
    {
      where: {
        id: tag_id
      },
    }
  )
  res.send(
    JSON.stringify(tag, null, 2)
  )
});

module.exports = router;
