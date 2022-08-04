const mongoose = require('mongoose');
const Bschema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    stage: {
        type: Number,
        enum: [1,2,3],
        required: true,
    },
})

const counterSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    seq: {
        type: Number,
    }
})
const Counter = new mongoose.model('Counter', counterSchema);
const Board = new mongoose.model('Board', Bschema);


module.exports = {Board,Counter};