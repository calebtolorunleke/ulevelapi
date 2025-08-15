const express = require('express')
const router = express.Router()
const { universalGetAllBlogs, universalGetSingleBlog } = require('../controller/blog')

router.get('/', universalGetAllBlogs)
router.use('/:blogId', universalGetSingleBlog)

module.exports = router