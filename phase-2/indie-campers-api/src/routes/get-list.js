const logic = require('../logic')

module.exports = (req, res) => {
    const { query: { start, end } } = req

    try {
        console.log(start, end)
        return logic.listHighlights(start, end)
            .then(routes => res.json({routes}))
            .catch(({ message }) =>
            res.status(409).json({
                error: message
            }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}