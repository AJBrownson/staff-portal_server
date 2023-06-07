const asyncHandler = require('express-async-handler')
const Staff = require('../models/staffModel')


// @desc    Get all staff records
// @route   GET /api/staff
// @access  Public

const getStaff = asyncHandler(async (req, res) => {
    const staffMembers = await Staff.find()

    res.status(200).json(staffMembers)
})


// @desc    Add new staff
// @route   POST /api/staff
// @access  Public

const addStaff = asyncHandler(async (req, res) => {
    if (!req.body.data && !req.body.comment) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const newStaff = new Staff({
        data: req.body.data,
        comment: req.body.comment,
        time: req.body.time,
        date: req.body.date
    })

    await newStaff.save()
    res.status(201).json(newStaff)
})


// @desc    Update staff
// @route   PUT /api/staff/:id
// @access  Private

const updateStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id)

    if(!staff) {
        res.status(400)
        throw new Error('Staff record not found')
    }

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedStaff)
})


// @desc    Remove staff
// @route   DELETE /api/staff/:id
// @access  Private

const deleteStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id)

    if(!staff) {
        res.status(400)
        throw new Error('Staff record not found')
    }

    await Staff.deleteOne()

    res.status(200).json('Record deleted')
})


module.exports = {
    getStaff,
    addStaff,
    updateStaff,
    deleteStaff,
}