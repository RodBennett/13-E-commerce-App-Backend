const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
     });
     res.status(200).json(allTagData)
   } catch (err) {
   }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
  });
    if(!oneTagData) {
      res.status(404).json({ message: "No tag with that id" });
      return;
    }
    res.status(200).json(oneTagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((newTag) => {
    res.json(newTag)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    id: req.body.id,
  })
  .then((updateTag) => {
    res.json(updateTag)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    id: req.body.id,
  })
  .then((deletedTag) => {
    res.json(deletedTag)
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;
