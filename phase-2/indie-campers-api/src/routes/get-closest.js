const logic = require('../logic')

module.exports = (req, res) => {
    const { query: { lat, lng } } = req

    try {
        console.log(lat, lng)
        return logic.retrieveClosestHighlight(Number(lat), Number(lng))
            .then(highlight => res.json({ highlight }))
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