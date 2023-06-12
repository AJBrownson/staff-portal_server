[
    {
      '$search': {
        'index': 'archive', 
        'compound': {
          'should': [
            {
              'autocomplete': {
                'query': 'foo', 
                'path': 'data'
              }
            }, {
              'autocomplete': {
                'query': '9:58', 
                'path': 'time'
              }
            }, {
              'autocomplete': {
                'query': 'jan', 
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