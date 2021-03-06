const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    name: { type: String },
    emoji: { type: String },
    nutrition: [{
        type: Schema.Types.ObjectId,
        ref: 'Stat'
    }]
})



module.exports = mongoose.model('Food', foodSchema)
