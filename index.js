require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();

// Routers & middleware
const router = require('./routes/authrouter');
const auth = require('./middleware/authentication');
const blogRouter = require('./routes/blogRouter');
const universalRouter = require('./routes/universalRouter');
const notfound = require('./utils/notfound');

app.use(express.json());

// Routes
app.use('/api/v1/', router);
app.use('/api/v1/blog', auth, blogRouter);
app.use('/api/v1/blogs', universalRouter);

// 404 handler
app.use(notfound);

// MongoDB connection caching for serverless
let conn = null;
const connectDB = async () => {
    if (conn == null) {
        conn = await mongoose.connect(process.env.conString);
    }
    return conn;
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

module.exports.handler = serverless(app);
