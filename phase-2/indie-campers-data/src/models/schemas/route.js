const { Schema } = require('mongoose')

const Route = new Schema({

    start: {
        type: String,
        required: true
    },

    end: {
        type: String,
        required: true
    },

    highlights: {
        type: [Object],
        required: true,
    }

})

module.exports = Route