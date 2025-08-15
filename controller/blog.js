const Blog = require('../model/blog')

//create a blog
const createBlog = async (req, res) => {
    console.log(req.user)
    const { userId } = req.user
    req.body.createdBy = userId
    console.log(userId)

    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({ success: true, blog })
    } catch (error) {
        res.json({ error })
    }
}

//get all blogs for that user
const getBlogs = async (req, res) => {
    const { userId } = req.user
    try {
        const blogs = await Blog.find({ createdBy: userId })
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        res.json({ error })

    }
}

//get a single blog
const getBlog = async (req, res) => {
    const { userId } = req.user
    const { blogId } = req.params
    try {
        const blog = await Blog.findOne({ createdBy: userId, _id: blogId })
        res.status(200).json({ success: true, blog })
    } catch (error) {
        res.json({ error })
    }
}

//update
const updateBlog = async (req, res) => {
    const { userId } = req.user
    const { blogId } = req.params
    try {
        const blog = await Blog.findOneAndUpdate({ createdBy: userId, _id: blogId }, req.body, { new: true, runValidators: true })
        res.status(200).json({ success: true, blog })
    } catch (error) {
        res.json({ error })
    }
}

//delete a blog
const deleteBlog = async (req, res) => {
    const { userId } = req.user
    const { blogId } = req.params
    try {
        const blog = await Blog.findOneAndDelete({ createdBy: userId, _id: blogId })
        res.status(200).json({ success: true, message: 'Blog deleted successfully' })
    } catch (error) {
        res.json({ error })

    }
}

//return full blog irrespective of the user
const universalGetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createBlog, getBlog, getBlogs, updateBlog, deleteBlog, universalGetAllBlogs }