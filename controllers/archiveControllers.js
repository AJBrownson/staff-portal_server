const asyncHandler = require('express-async-handler')
const ArchivedStaff = require('../models/archiveModel')


// @desc    Get archived records
// @route   GET /api/archive
// @access  Private

const getArchive = asyncHandler(async (req, res) => {
    const { search } = req.query;
    let archive;
    if (search) {
        archive = await ArchivedStaff.aggregate(
            [
                {
                  '$search': {
                    'index': 'archive', 
                    'compound': {
                      'should': [
                        {
                          'autocomplete': {
                            'query': search, 
                            'path': 'data'
                          }
                        }, {
                          'autocomplete': {
                            'query': search, 
                            'path': 'time'
                          }
                        }, {
                          'autocomplete': {
                            'query': search, 
                            'path': 'date'
                          }
                        }
                      ]
                    }
                  }
                }, {
                  '$project': {
                    'data': 1, 
                    'comment': 1, 
                    'time': 1, 
                    'date': 1
                  }
                }
              ]
        )
    } else {
        archive = await ArchivedStaff.find().sort({ createdAt: 'desc' });
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'Retrieved records from archive',
        data: { archive },
    });
});


module.exports = {
    getArchive,
}