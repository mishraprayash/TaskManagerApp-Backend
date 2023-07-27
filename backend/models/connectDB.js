const mongoose = require('mongoose')
const { connect } = require('../routes/tasks')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI_REMOTE,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 7000
            })
        console.log(`Connected to remote Database, Host: ${mongoose.connection.host}`)
    } catch (remoteError) {
        console.error(remoteError);
        console.log(`Error connecting to the remote Database. Attempting to connect to Local Database`)
        try {
            await mongoose.connect(process.env.DB_URI_LOCAL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log(`Connected to Local Database, Host: ${mongoose.connection.host}`)
        } catch (localError) {
            console.log(`Error connecting to the Local Database.`)
            console.log(`Connection to both Database failed.`)
        }
    }
}

module.exports = connectDB