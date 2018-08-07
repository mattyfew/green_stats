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
    .catch(e => console.log("Something went wrong with connection", e))

app.get('/food', (req, res) => {
    Food.find()
    .populate('nutrition')
    .then(foods => {
        res.json(foods)
    })
    .catch(e => console.log("something went wrong with GET /food", e))
})

app.post('/new-food', (req, res) => {
    const f = new Food({
        name: req.body.name,
        emoji: req.body.emoji
    })

    f.save()
     .then(newFood => {
         res.json(newFood)
     })
     .catch(e => console.log("something went wrong with POST /new-food", e))
})

app.post('/delete-food', (req, res) => {
    Food.remove({ _id: req.body.id })
        .then(() => {
            res.json({ success: true })
        })
})

app.get('/food/:id', (req, res) => {
    Food.findById(req.params.id)
    .populate('nutrition')
    .then(myFood => {
        res.json(myFood)
    })
    .catch(e => console.log('There was an error with GET /food/:id', e))
})

app.post('/add-stat/:id', (req, res) => {
    Food.findById(req.params.id)
    .then(myFood => {
        console.log("my S", req.body);
        const s = new Stat({
            name: req.body.newStatName,
            amount: req.body.newStatAmount,
            unit: req.body.newStatUnit,
            referenceMongoID: req.params.id
        })

        s.save()
        .then(newStat => {
            myFood.nutrition.push(newStat._id)
            myFood.save()
            .then(() => res.json(newStat))
        })
    })
    .catch(e => console.log('There was an error with POST /add-stat', e))
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(3000, () => console.log("listening on port 3000"))
