const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statSchema = new Schema({
    name: { type: String },
    amount: { type: Number },
    unit: { type: String },
    referenceMongoID: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }
})

module.exports = mongoose.model('Stat', statSchema)
