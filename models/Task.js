const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String}
});

module.exports = mongoose.model('Task', taskSchema);