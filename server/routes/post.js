const express = require("express");
const Post = require('../models/post'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
.get('/', async (_req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.send(posts);
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})
  .post('/Read', async (req, res) => {
    try {
        const post = await Post.Read(req.body.id, req.body.postcontent);
        res.send({...post });
      } catch(error) {
        res.status(401).send({ message: error.message });
      }
  })

  
  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.id, req.body.postcontent);
      res.send({...post, postcontent: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })
  .put('/edit', async (req, res) => {
    try {
      let note = await Post.editNotes(req.body);
      res.send({...this.post, postcontent});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;