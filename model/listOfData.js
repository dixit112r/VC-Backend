const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const task = new Schema({
    title: String,
    createDate: String,
    startDate: String,
    endDate: String,
    progress: String,
    priority: String
})

const attendee = new Schema({
    id: String,
    name: String,
    tasks:[task]
})

const host = new Schema({
    id: String,
    name: String,
    tasks:[task]
})

const listOfData = new Schema({
    _id: mongoose.Types.ObjectId,
    hosts:[host],
    attendees:[attendee]
})


const Collab = mongoose.model('COLLAB',listOfData);

module.exports = Collab;


/*
const mongoose = require('mongoose');

const addTaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    startDate:{
        type: String,
        required:true
    },
    endDate:{
        type: String,
        required:true
    },
    progress:{
        type: Number,
        required:true
    },
    priority:{
        type: String,
        required:true
    }
})

const Task = mongoose.model('TASK',addTaskSchema);

module.exports = Task;
*/