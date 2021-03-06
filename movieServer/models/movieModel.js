const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true,
        max: 10,
        min: 0
    },
    tag: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie