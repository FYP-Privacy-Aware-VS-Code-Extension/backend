import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import timeRouter from './routes/time.route.js'
import assignmentRouter from './routes/assignment.route.js'
import debugRouter from './routes/debugging.route.js'
const port = 3000

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch((error) => {
        console.log(error);
    })

const app = express();
app.use(express.json());

// Configure CORS with the correct origin and allow necessary headers
app.use(cors({
    origin: 'http://localhost:5173', // Note: Use 'http' instead of 'https' unless SSL is enabled
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
  res.send('The API for Privacy Aware VSCode extension for Learning Analytics is active')
})

app.use('/api/time', timeRouter);
app.use('/api/assignment', assignmentRouter);
app.use('/api/debug', debugRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// defining middleware for responding to errors
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    return response.status(statusCode).json({
        'success': false,
        statusCode, 
        message 
    });
});