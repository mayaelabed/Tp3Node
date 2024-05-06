const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const mongoose = require('mongoose')

router.post('/add', async (req, res) => {
    try {
        const body = req.body.body;
        const postDate=new Date();
        const post = new Post({ body, postDate });
        await post.save();
        res.status(201).send('posted!');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('id invalide !');
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { body: body }, { new: true });
        if (updatedPost) {
            res.status(200).send('modifié !');
        } else {
            res.status(404).send('non trouvé !');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/all', async (req,res)=>{
    try{
        const allposts = await Post.find();
        res.status(200).send(allposts);
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('id invalide !');
        }
        const findById = await Post.findById(id);

        if (findById) {
            res.status(200).send(findById);
        } else {
            res.status(404).send('aucun post trouvé avec cet id');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('id invalide !');
        }
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
            res.status(200).send('Supprimé !');
        } else {
            res.status(404).send('aucun post trouvé avec cet ID');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});



module.exports=router;
