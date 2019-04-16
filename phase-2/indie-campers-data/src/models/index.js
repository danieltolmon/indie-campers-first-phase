const mongoose = require('mongoose')
const { Route, Highlight } = require('./schemas')

module.exports = {
    Route: mongoose.model('Route', Route),
    Highlight: mongoose.model('Highlight', Highlight)
}