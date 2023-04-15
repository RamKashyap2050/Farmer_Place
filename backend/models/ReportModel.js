const { Int32 } = require('bson')
const mongoose = require('mongoose')

const reportmodelSchema = mongoose.Schema({
    title:{
      type: String,
      required: [true]
      },
      user_name:{
        type: String,
        required: [true]
      },
      reported_by:{
        type: String,
        required: [true]
      }
      
})

module.exports = mongoose.model('Report', reportmodelSchema)