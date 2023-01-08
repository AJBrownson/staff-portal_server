const express = require('express')

const router = express.Router()

const { getStaff, 
        addStaff, 
        updateStaff, 
        deleteStaff 
} = require('../controllers/staffControllers')



//CHAINING THE ROUTES
router.route('/').get(getStaff).post(addStaff)
router.route('/:id').put(updateStaff).delete(deleteStaff)


module.exports = router