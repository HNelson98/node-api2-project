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