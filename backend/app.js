
require('dotenv').config()
const express = require('express')

const tasks = require('./routes/tasks')
const connectDB = require('./models/connectDB')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorHandler')

// creating an app instance of express
const app = express()
const PORT = 3000

//middlewares 

// static file serving middleware
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes 

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const startServer = () => {
    // connection to db is trigered first.
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server started at port ${PORT}`)
            })
        })
        .catch((error) => {
            console.log(`Error occured: ${error}`)
        })

}

// start the server
startServer()



