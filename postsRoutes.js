const express = require('express');
const Posts = require("./data/db")
const router = express.Router()


//get all the posts
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


//get post by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    Posts.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })

})

//get all the comments on a post
router.get('/:id/comments', (req, res) => {
    const id = Number(req.params.id)

    Posts.findPostComments(id)
        .then(comments => {
            if (comments.length > 0) {
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
    const { title, contents } = req.body

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }

})

//add new comment
router.post('/:id/comments', (req, res) => {
    const { text } = req.body
    const newComment = req.body
    const id = Number(req.params.id)


    if (id !== newComment.post_id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {

    Posts.insertComment(newComment)
        .then(comment => {
            if (!text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else
                res.status(201).json(comment)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })

    }
});


//delete 
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
if(!id){
    res.status(404).json({ message: "The post with the specified ID does not exist." })
} else {
    console.log(id)
    Posts.remove(id)
    .then( post => {
        res.status(201).json({message: "post deleted succsesfully"})
    })
    .catch( err =>{
        res.status(500).json({ error: "The post could not be removed" })
    })
}
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { title, contents } = req.body

    Posts.update(id, req.body)
        .then(post => {
            if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else if (post.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(id, req)
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })

})
module.exports = router