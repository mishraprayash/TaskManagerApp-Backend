// this is main route file which handles all the tasks routes
// we have just defined the http request type and endpoints here, but we have written our logic inside a controller so that 
// it wont be a mess in a same file.

const express = require('express')
const { get } = require('mongoose')
const router = express.Router()

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    deleteAllTask,
    getCompletedTask,
    getPendingTask
} = require('./controllers/tasks')


router.route('/').get(getAllTasks).post(createTask).delete(deleteAllTask)
router.route('/completedtask').get(getCompletedTask)
router.route('/incompletetask').get(getPendingTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router