const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    feed: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Feed'
    },
    comment_text: {
        type: String,
        required: [true, 'Please enter your comment']
    },
    comment_image: {
        data: Buffer,
        contentType: String
    },
    comment_status: {
        type: Boolean,
        default: true
    }
},
{   collection: 'Comment',
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
