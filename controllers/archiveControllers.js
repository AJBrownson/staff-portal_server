const asyncHandler = require('express-async-handler')
const ArchivedStaff = require('../models/archiveModel')


// @desc    Get archived records
// @route   GET /api/archive
// @access  Private

const getArchive = asyncHandler(async (req, res) => {
    const archivedStaff = await ArchivedStaff.find()

    res.status(200).json(archivedStaff)
})


module.exports = {
    getArchive,
}