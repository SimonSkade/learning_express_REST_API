const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch(err){
		res.send({message:err})
	}
});

//submit a post
router.post("/", async (req, res) => {
	console.log(req.body);
	const new_post = new Post({
		title: req.body.title,
		description: req.body.description
	});
	const savedPost = await new_post.save();
	res.json(savedPost);
}); //post requests do not work yet correctly. Just try to create a quick react app. I want to do that anyway.

//specific post
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch(err){
		res.json({message: err});
	}
});


//delete post
router.delete("/:postId", async (req,res) => {
	try{
		const deletedPost = await Post.remove({_id: req.params.postId});
		res.json(deletedPost);
	} catch(err){
		res.json({message: err});
	}
});


//update a post
router.patch("/:postId", async (req,res) => {
	try{
		const updatedPost = await Post.updateOne({ _id: req.params.postId}, {$set: { title: req.body.title }});
		res.json(updatedPost);
	} catch(err){
		res.json({message: err});
	}
})

module.exports = router;
