const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    photos: { type: Array },
    active: { type: Boolean },
    category: { type: mongoose.Schema.Types.ObjectId, ref:"Category"}
})

module.exports = mongoose.model("Service", serviceSchema);