const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
     });
     res.status(200).json(allCategoryData)
   } catch (err) {
   }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
  });
    if(!oneCategoryData) {
      res.status(404).json({ message: "No product with that id" });
      return;
    }
    res.status(200).json(oneCategoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
      id: req.body.id,
      category_name: req.body.categoy_name,
    })
    .then((newCategory) => {
      res.json(newCategory)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    id: req.body.id,
    category_name: req.body.category_name,
  })
  .then((updateCategory) => {
    res.json(updateCategory)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.body.id,
    }
  }).then((deleteCategory) => {
    res.json(deleteCategory)
  })
});

module.exports = router;
