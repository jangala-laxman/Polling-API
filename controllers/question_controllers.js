const express = require('express');
const Question = require('../models/question');
const Options = require('../models/options')

const createQuestion = async(req,res)=>{
    const question = new Question({
        title: req.body.title
    })
    try{
        const questionSave = await question.save();
        console.log("body : " + req.body.title)
        res.status(200).json(questionSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
let options = []
const createOptions = async(req,res)=>{
    const id = req.params.id;
    let n = 1;
    const question = await Question.findById(req.params.id)
    if(question.options.length == 0 ){
        n = 1
    }else{
        n = question.options.length+1
    }
    const newOptions = new Options({
        id:n,
        text : req.body.text,
        votes : req.body.votes,
        link_to_vote: `http://localhost:3000/options/${n}/add_vote`,
    })
    
    options.push({
        id:n,
        text : req.body.text,
        votes : req.body.votes,
        link_to_vote: `http://localhost:3000/options/${n}/add_vote`,
    })
    try{
        if(n<=4){            
            const que = await Question.findByIdAndUpdate({_id:id},{$push:{
                options:newOptions
            }})
            console.log(que)
            // que.options = await Options.find({question : req.params.id})
            const optionToSave = await newOptions.save()
            n++;            
            res.status(200).json(optionToSave)
        }else{
            res.send("options limit exceeded")
        }
        // const que = await Question.findByIdAndUpdate({_id:id},{$push:{options:newOptions}})
       
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const fetchAllQuestions = async(req,res)=>{
    try{
        const questions = await Question.find();
        res.json(questions)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getQuestionsByID = async(req,res)=>{
    try{
        const question = await Question.findById(req.params.id);
        res.json(question);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateQuestionsById = async(req,res)=>{
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
}

const deleteQuestionsById = async(req,res)=>{
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
}


module.exports = {
    createQuestion, 
    createOptions, 
    fetchAllQuestions,
    getQuestionsByID,
    updateQuestionsById,
    deleteQuestionsById
};