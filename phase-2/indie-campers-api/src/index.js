const express = require('express')
const { mongoose } = require('indie-campers-data')

const {getList, getClosest} = require('./routes')

mongoose.connect('mongodb://localhost/indie-campers', { useNewUrlParser: true })
    .then(()=>{
        const app = express()
        const router = express.Router()

        app.use('/api', router)

        router.get('/list/', getList)
        router.get('/closest/', getClosest)

        app.listen(8000, () => console.log(`server running on port 8000`))
    })
    .catch(error => console.error(error))

process.on('SIGINT', () => {
mongoose.disconnect()
    .then(() => {
        console.log('\nsail-away stopped running')

        process.exit(0)
    })
})