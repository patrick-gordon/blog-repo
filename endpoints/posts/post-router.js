const express = require('express')
const Post = require('./post-model');
const User = require('../users/user-model');

const router = express.Router();

router.get('/', (req,res) => {
    Post.find()
    .then(posts => {
        res.json(posts);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to get posts' });
    });
});

router.post('/:id', (req, res) => {
    const postData = req.body;
    const username = req.params
    

    User.findByUsername(username)
    Post.add(postData)
    .then(newPost => {
        res.status(201).json(newPost)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to create new post' })
    });
});


router.put('/id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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