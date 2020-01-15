const express = require('express');
const User = require('./user-model.js');
const router = express.Router();
const Protected = require('../auth/restricted-middleware')

router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:username', Protected, (req, res ) => {
  const { username } = req.params;

  User.findBy({username})
  .then(user  => {
    res.status(200).json(user)
  })
})

router.get('/:id', Protected, (req, res) => {
  const { id } = req.params;

 User.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});


router.put('/:id', Protected, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  User.update(changes, id)
  .then(user => {
    if (user) {
      res.json({ updated: user });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', Protected, (req, res) => {
  const { id } = req.params;

 User.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

//all posts by username
router.get('/:id/posts', Protected, (req, res) => {
  const { id } = req.params

  User.findPosts(id)
  .then(posts => {
      res.status(200).json(posts)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ error: `error getting ${u.username}posts`})
  });
});

module.exports = router;