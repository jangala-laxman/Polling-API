const express = require('express')
const router = express.Router();
const {deleteOption, addVotesToOptions, getOptionsById} = require('../controllers/options_controllers')


router.delete('/:id/delete', deleteOption)

router.patch('/:id/add_vote', addVotesToOptions)

router.get('/:id', getOptionsById)

module.exports = router;