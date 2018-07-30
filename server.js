const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/green_stats', {
    useMongoClient: true
}, (err, res) => {
    if (err) {
        console.log("DB Connection fail", err)
    } else {
        console.log("DB Connection Success")
    }
})

app.get('/food', (req, res) => {
    // const food = [
    //     { id: 1, name: 'cucumber' },
    //     { id: 2, name: 'tomato' },
    //     { id: 3, name: 'celery' }
    // ]
    const food = [
        '11090', '11205', '09307'
    ]

    res.json(food)
})

app.post('/new-food', (req, res) => {
    console.log("inside /new-food", req.body);
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(3000, () => console.log("listening on port 3000"))
