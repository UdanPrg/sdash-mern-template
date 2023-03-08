const mongoose = require('mongoose');

const Schemma = mongoose.Schema;

const exerciseSchema = new Schemma({
    username: {type: String, required: true},
    description: {type: String, required: true },
    duration: {type: Number, required: true },
    date: {type: Date, required: true },
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;