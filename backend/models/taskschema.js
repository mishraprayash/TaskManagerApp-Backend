const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name cannot be empty"],
        trim: true,
        maxlength: [50, "Task name cannot be more than 30 characters"],

    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    completed: {
        type: Boolean,
        default: false
        // we can use validator if we have to validate anything.
    }
})

// pre hooks and post hooks

// this is a middleware that can be used to process over doc before saving it to the database.
// also know as pre hooks

// TaskSchema.pre('create', function () {
//     this.completed = false
//     // this reference to the doc before saving it and can be used to access other fields as well like above.
// })

// this is a middleware that can be used after saving data to the database.
// also know as post hook
// by default a doc which is just saved is passed  to this call back function.


// TaskSchema.post('save', function (doc) {
//     console.log(doc)
// })

module.exports = mongoose.model('Tasks', TaskSchema);

