// titleblog, detailed description, tag,  createdBy
const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a blog title']
    },
    description: {
        type: String,
        required: [true, 'Provide blog description']
    },
    tag: {
        type: String,
        enum: ['Nature', 'Lifestyle', 'Technology', 'Sport']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide a writer']
    }
}
    , { timestamps: true })

module.exports = mongoose.model('Blogs', blogSchema)

