const mongoose = require('mongoose');

const toDoListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    description: String,
});

module.exports = mongoose.model('ToDoList', toDoListSchema);
