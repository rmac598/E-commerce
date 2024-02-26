const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tags){
      res.status(200).json({message: 'no tags here'});
      return
    }
   res.json(tags);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tags) {
      res.status(404).json({ message: 'sorry wrong tags, must have the wrong store' });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    // sends message if user requests to update ID that does not exist
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagById) {
      res.status(200).json({message: 'No tags found'});
      return;
    };

    res.status(200).json(updateTag);
    console.log("Tag updated!");

  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deltag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deltag){
      res.status(200).json({message: 'no tag'});
      return;
    };
  
    res.json(deltag);
  }catch(err){
    res.status(500).json(err);
  };

});

module.exports = router;
