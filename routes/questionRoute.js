const express = require('express');
const router = express.Router()

const {
    createQuestion, 
    createOptions, 
    fetchAllQuestions,
    getQuestionsByID,
    updateQuestionsById,
    deleteQuestionsById
} = require('../controllers/question_controllers')


router.post('/create', createQuestion)

router.post('/:id/options/create', createOptions)

router.get('/', fetchAllQuestions)

router.get('/:id', getQuestionsByID)

router.patch('/update/:id', updateQuestionsById)

router.delete('/:id/delete', deleteQuestionsById)


module.exports = router;