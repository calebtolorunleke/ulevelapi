require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();
const router = require('./routes/authrouter'); // adjust path
const auth = require('../middleware/authentication');
const blogRouter = require('../routes/blogRouter');
const universalRouter = require('../routes/universalRouter');
const notfound = require('../utils/notfound');

app.use(express.json());

// Routes
app.use('/api/v1/', router);
app.use('/api/v1/blog', auth, blogRouter);
app.use('/api/v1/blogs', universalRouter);
app.use(notfound);

// MongoDB connection caching
let conn = null;
const connectDB = async () => {
    if (!conn) {
        conn = await mongoose.connect(process.env.conString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return conn;
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = serverless(app);
