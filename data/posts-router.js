const express = require('express');
const router = express.Router();
const Posts = require('./db');


router.post('/', (req, res) => {
    const {title,contents}=req.body
    Posts.insert({title,contents})
    .then(post => {
        if(post){
      res.status(201).json(post);
        } else if (!title.post || !contents.post){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
  });

  router.post('/:id/comments', (req, res) => {
    // Posts.findPostComments(req.params.id)
    const commentsInfo = { ...req.body, post_id: req.params.id }
    Posts.insertComment(commentsInfo)
        .then( comment => {
            if (comment) { 
                res.status(201).json(comment);
            } else if (!comment.post_id) {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else if (!comment.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment."})
            }
        })
        .catch( error => {
            console.log(error);
                res.status(500).json({ message: "There was an error while saving the comment to the database."})
        })
})

  
router.get("/", (req, res)=>{
    Posts.find()
    .then(post => 
       
        res.status(200).json(post)
        
      )
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved.",
        });
      });
})
router.get("/:id", (req, res)=>{
    const {id}=req.params
    Posts.findById(id)
    .then(post => {
        if(post){
        res.status(200).json(post);
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved.",
        });
      });
})
router.get('/:id/comments', (req, res)=>{
    Posts.findCommentById(req.params.id)
    .then(post => {
        if(post){
        res.status(200).json(post);
        }else if (!post.id){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json(
            { error: "The comments information could not be retrieved." },
        );
      });
})
router.delete('/:id', (req, res)=>{
    const {id}=req.params
    Posts.remove(id)
    .then(post=>{
        if(post){
        res.status(200).json(post)
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
             error: "The post could not be removed",
        });
})
})
router.put('/:id', (req, res)=>{
    const {id}=req.params
    const changes =req.body
    Posts.update(id, changes)
    .then(post=>{
      
        if(changes.title || changes.contents){
            res.status(200).json(post)
        }else if (!changes.title || !changes.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;