const express = require('express')

const router = express.Router()

const { getArchive } = require('../controllers/archiveControllers')


router.route('/').get(getArchive)

module.exports = router;