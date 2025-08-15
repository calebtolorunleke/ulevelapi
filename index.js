require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const PORT = 3000
const conString = process.env.conString
const router = require('./routes/authrouter')
const auth = require('./middleware/authentication')
const blogRouter = require('./routes/blogRouter')
const notfound = require('./utils/notfound')

app.use(express.json())

app.use('/api/v1/', router)

// app.get('/test', auth, (req, res) => {
//     res.send('passed authentication')
// })

app.use('/api/v1/blog', auth, blogRouter)

app.use(notfound)


const startServer = async (req, res) => {
    try {
        await mongoose.connect(conString)
        console.log('db connected successfully')
        app.listen(PORT, () => {
            console.log(`the application is now running fine on port ${PORT}...`);

        })
    } catch (error) {
        console.log({ error: error.message })
    }
}


startServer()




