const express = require('express')
const Post = require('./post-model');
const User = require('../users/user-model');
const Protected = require('../auth/restricted-middleware')

const router = express.Router();

router.get('/', Protected, (req, res) => {
    Post.find()
    .then(posts => {
        res.json(posts);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to get posts' });
    });
});

router.post('/:id', Protected, (req, res) => {
  console.log(req.params);
    const postData = req.body;
    const id = req.params 
    

    User.findBy(id);
    Post.add(postData)
    .then(newPost => {
        res.status(201).json(newPost)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new post' })
    });
});


router.put('/id', Protected, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Post.update(changes, id)
    .then(post => {
        if(post) {
            res.json({ updated: post})
        } else {
            res.status(404).json({ message: 'Could not find post with given id' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update post' });
      });
})

router.delete('/:id', Protected, (req, res) => {
    const { id } = req.params;
  
   Post.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find post with given id' });
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to delete post' });
    });
  });

  module.exports = router;