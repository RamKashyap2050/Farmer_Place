const { Int32 } = require('bson')
const mongoose = require('mongoose')

const marketplaceSchema = mongoose.Schema({
    
    user:{
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Users',
        },
    product_name: {
        type: String,
        required: [true, 'Please enter a Title']
    },
    product_price: {
        type: String,
        required: [true, 'Please enter Price']
    },
    product_description: {
        type: String,
        required: [true, 'Please enter Content']
    },
    product_image: {
        data:Buffer,
        ContentType: String
    },
},
{   collection: 'MarketPlace',
    timestamp: true
}) 

module.exports = mongoose.model('MarketPlace', marketplaceSchema)