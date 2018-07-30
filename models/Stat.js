const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statSchema = new Schema({
    name: { type: String },
    unit: { type: String },
    amount: { type: Number },
    referenceMongoID: {
        type: Schema.Types.ObjectId,
        ref: 'Food' 
    }
})

module.exports = mongoose.model('Stat', statSchema)
