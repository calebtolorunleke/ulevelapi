const express = require('express')
const router = express.Router()
const { universalGetAllBlogs } = require('../controller/blog')

router.use('/', universalGetAllBlogs)


module.exports = router