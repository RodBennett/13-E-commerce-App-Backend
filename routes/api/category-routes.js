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

  // create a new category
  router.post('/', async (req, res) => {
      // create a new category
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(
  {
    id: req.body.id,
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    },
   }
  )
  .then((updateCategory) => {
    res.json(updateCategory)
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

    try {
      const deletedCategory = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!deletedCategory) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
      }
      res.status(200).json(deletedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  






  //   Category.destroy({
//     where: {
//       id: req.body.id,
//     }
//   }).then((deleteCategory) => {
//     res.json(deleteCategory)
//   })
// });

module.exports = router;
