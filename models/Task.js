const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true}
});

module.exports = mongoose.model('Task', taskSchema);