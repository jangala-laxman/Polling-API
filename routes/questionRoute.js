const express = require('express');
const router = express.Router()
const Question = require('../models/question');
const Options = require('../models/options')
router.post('/create', async(req,res) => {
    const question = new Question({
        title: req.body.title
    })
    try{
        const questionSave = await question.save();
        res.status(200).json(questionSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

router.post('/:id/options/create', async (req, res) => {
    const id = req.params.id;
    const newOptions = new Options({
        text : req.body.text,
        votes : req.body.votes,
        link_to_vote: req.body.link_to_vote,
        question : id
    })
    try{
        
        
        const que = await Question.findByIdAndUpdate({_id:id},{$push:{options:newOptions}})
        console.log(que)
        
        // que.options = await Options.find({question : req.params.id})
        const optionToSave = await newOptions.save()
        res.status(200).json(optionToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

router.get('/', async (req, res) => {
    try{
        const questions = await Question.find();
        res.json(questions)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async (req,res) => {
    try{
        const question = await Question.findById(req.params.id);
        res.json(question);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.patch('/update/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const updateQuestion = req.body;
        const options = {new: true};

        const result = await Question.findByIdAndUpdate(
            id, updateQuestion, options
        )
        res.send(result);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete('/:id/delete', async (req, res) => {
    try{
        const id = req.params.id;
        const deleteQuestion = await Question.findByIdAndDelete(id)
        const options = await Options.deleteMany({'question':{$in:id}})
        console.log(options)
        res.send(`${deleteQuestion.title} has been deleted..`)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;