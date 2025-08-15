require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());

// Routes
// Make sure filenames match exactly (case-sensitive)
const authRouter = require('./routes/authRouter');        // <- check exact file name
const blogRouter = require('./routes/blogRouter');
const universalRouter = require('./routes/universalRouter');
const authMiddleware = require('./middleware/authentication');
const notFound = require('./utils/notfound');

app.use('/api/v1/', authRouter);
app.use('/api/v1/blog', authMiddleware, blogRouter);
app.use('/api/v1/blogs', universalRouter);

// 404 handler
app.use(notFound);

// MongoDB connection caching for serverless
let cachedConn = null;
const connectDB = async () => {
    if (cachedConn) return cachedConn;

    cachedConn = await mongoose.connect(process.env.conString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return cachedConn;
};

// Middleware to ensure DB is connected before any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB connection error', err);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// Export handler for Vercel
module.exports = serverless(app);
