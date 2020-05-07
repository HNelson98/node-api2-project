const express = require('express');
const Posts = require("./data/db")
const router = express.Router()


//get all the posts
router.get('/', (req, res) =>{
    Posts.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})


//get post by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    Posts.findById(id)
    .then(post =>{
        if(post.length > 0){
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })

})

//get all the comments on a post
router.get('/:id/comments', (req, res) =>{
    const id = Number(req.params.id)

    Posts.findCommentById(id)
    .then(comments => {
        if(comments.length > 0){
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

//add new post
router.post('/', (req, res) => {
    const {title, contents} = req.body

    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else {
        Posts.insert(req.body)
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(err => {
            console.log("POST POST ERROR", err)
        })
    }

})

module.exports = router