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
    Food.find()
        .then(foods => res.json(foods))
        .catch(e => console.log("something went wrong with GET /food", e))
})

app.post('/new-food', (req, res) => {
    const f = new Food({
        name: req.body.name,
        imgUrl: req.body.imgUrl
    })

    f.save()
     .then(newFood => {
         console.log('New food added', newFood)
         res.json(newFood)
     })
     .catch(e => console.log("something went wrong with POST /new-food", e))
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(3000, () => console.log("listening on port 3000"))
