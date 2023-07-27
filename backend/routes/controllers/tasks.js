
// call back function with logics behind every request and response.

// importing Db schema model for working with Database.
const { default: mongoose } = require('mongoose')
const Task = require('../../models/taskschema')
const asyncWrapper = require('../../middleware/async')
const { createCustomError } = require('../../Errors/customerror')

// GET ALL TASKS

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(201).json({ tasks })
})

// CREATE A TASK 

const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body)
    res.status(201).json({ task })
    console.log(`Created a new Task:- ${new Date()} with id ${task._id}`);
})

// GET SINGLE TASK 

const getTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        // manually doing 
        // const error = new Error('Task not Found')
        // error.status = 404
        // return next(error)

        // this invokes the errorHandler 
        return next(createCustomError(`Task not Found`, 404))

        // return res.status(404).json({
        //     message: "Task not Found"
        // })
    }
    res.status(200).json({ task })
})

// UPDATE A TASK 

const updateTask = asyncWrapper(async (req, res,next) => {
    const { name, completed } = req.body
    // const {id:taskId} = req.params
    const taskId = req.params.id;
    // Model.findByIdAndUpdate(query,update,options)
    const taskUpdate = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })
    // const taskUpdate = await Task.findById({ _id: taskId })
    if (!taskUpdate) {
        // return res.status(404).json({
        //     message: "Task not found"
        // })
        return next(createCustomError(`Task not Found`, 404))

    }
    // taskUpdate.name = name;
    // taskUpdate.completed = completed
    //  // saving after updating
    // await taskUpdate.save()
    console.log(`Updated a Task:- ${new Date()} with id ${taskId}`)
    res.status(200).json({
        message: "Task updated successfully",
        taskUpdate
    })
})

// DELETE SINGLE TASK

const deleteTask = asyncWrapper(async (req, res,next) => {
    // this is known as object destructuring 
    // const {id:taskId} = req.params
    // taskId = req.params.id
    const taskId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({
            message: "Invalid Object Id"
        })
    }
    const deletedTask = await Task.findByIdAndDelete({ _id: taskId })
    if (!deletedTask) {
        // return res.status(404).json({
        //     message: "Task doesnot exist"
        // })
        return next(createCustomError(`Task not Found`, 404))
    }
    console.log(`Deleted a task with id: ${taskId}`)
    res.status(200).json({
        message: "Task removed Succesfully"
    })
})


// DELETE ALL TASKS

const deleteAllTask = asyncWrapper(async (req, res,next) => {

    const deletedAll = await Task.deleteMany({ name: { $exists: true } })
    if (!deletedAll) {
        // return res.status(404).json({
        //     message: `Error deleted tasks`
        // })
        return next(createCustomError(`No any tasks`, 404))

    }
    console.log(`Deleted All Tasks---- ${new Date()}`)
    res.status(200).json({
        message: "Deleted All Tasks"
    })
})



// GET COMPLETED TASK

const getCompletedTask = asyncWrapper(async (req, res,next) => {
    const task = await Task.find({ completed: true })
    if (task.length === 0) {
        // return res.status(404).json({
        //     message: "Not any completed task found"
        // })
        return next(createCustomError(`No any completed task found`, 404))

    }
    res.status(200).json({
        task: task
    })

})

// GET UNCOMPLETED TASK

const getPendingTask = asyncWrapper(async (req, res,next) => {

    const task = await Task.find({ completed: false })
    if (task.length === 0) {
        // return res.status(404).json({
        //     message: "All task completed"
        // })
        return next(createCustomError(`All task completed`, 404))

    }
    res.status(200).json({
        task: task
    })
})


// exporting all the objects 

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    deleteAllTask,
    getCompletedTask,
    getPendingTask
}