const express = require('express')
const Question = require('../models/question')
const Options = require('../models/options')


const deleteOption = async(req,res)=>{
    try{
        const id = req.params.id;        
        const option = await Options.findById(id)
        // console.log(option.question._id)
        let k;
        const question = await Question.findById({_id:option.question._id})
        for(let i=0;i<question.options.length;i++){
            if(question.options[i] == id){
                k=i;
                console.log(i)
            }
        }
        // await question.updateOne({$unset:{'options.':''}})
        let options = question.options
        options.pull(id)
        await question.updateOne({options:options})
        await option.deleteOne()
        console.log(question)
        res.send(`Option with ${option.text} has been deleted..`)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
}

const addVotesToOptions = async(req,res)=>{

    try{
        const id = req.params.id
        const option = await Options.findById(id)
        let votes = option.votes

        const result = await option.updateOne({votes:votes+1})
        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const getOptionsById = async(req,res)=>{
    try{
        const o = await Options.findById(req.params.id);
        res.json(o);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {deleteOption, addVotesToOptions, getOptionsById};