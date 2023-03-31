const mongoose = require('mongoose')
const Grid = require('gridfs-stream');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        const gfs = Grid(conn.connection.db, mongoose.mongo);
        gfs.collection('Users')
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;