const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Food = require('./models/Food')
const Stat = require('./models/Stat')

app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/green_stats')
    .then(() => console.log("Connected to Mongo"))
    .catch(e => console.log("something went wrong with connection", e))

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

    const f = new Food({
        name: req.body.name,
        imgUrl: req.body.imgUrl
    })

    f.save()
     .then(newFood => {
         console.log('is this our new food?', newFood)
         res.json(newFood)
     })
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(3000, () => console.log("listening on port 3000"))
