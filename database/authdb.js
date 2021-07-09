const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Mongo db connected')
}).catch((err) => console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose disconnected')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})