const express = require('express');
const router = express.Router();
const Posts = require('./db');


router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(()=>{
        req.body?res.status(201).json(req.body):
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."})
    })
    .catch(error=>{
        res.status(500).json({
            error: `There was an error while saving the post
            to the database ${error}`
        })
    })
  });

  router.post('/:id/comments', (req, res) => {
      const {id}=req.params
      const change=req.body
    Posts.insertComment(id, change)
        .then(()=>{
            change?res.status(201).json(req.body)
            :!change? res.status(400).json({ 
                errorMessage: "Please provide text for the comment."})
            :res.status(404).json({message:"The post with the specified ID does not exist."})
       
        })
        .catch( error => {
            console.log(error);
                res.status(500).json({ 
                    message: "There was an error while saving the comment to the database."})
        })
})

  
router.get("/", (req, res)=>{
    Posts
    .find()
    .then(post =>{  
        res.status(200).json(post)  
    })
      .catch(error => {
        res.status(500).json({
            error: `The posts information could not be retrieved. ${error}`
        });
      });
})
router.get("/:id", (req, res)=>{
    const {id}=req.params
    Posts.findById(id)
    .then(post => {
        post? res.status(200).json(post):
        res.status(404).json({ 
            message: "The post with the specified ID does not exist."
        })
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
    const {id}=req.params
    Posts.findCommentById(id)
    .then(post => {   
     post?res.status(200).json(post):
        res.status(404).json({ 
            message: "The post with the specified ID does not exist." 
        })
        
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
        
    post ?  res.status(200).json(post):
    res.status(404).json({ message: "The post with the specified ID does not exist." })
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
    const updateID =req.body
    Posts.update(id, updateID)
    .then(updateID=>{
    updateID ? res.status(200).json(updateID):
    !updateID ? res.status(400).json({ errorMessage: "Please provide title and contents for the post." }):
    res.status(404).json({ message: "The post with the specified ID does not exist." })
        
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;