require('dotenv').config();
require('express-async-errors');
const connectDB = require('./database/connect.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const authRouter = require('./routers/auth.js');
const postRouter = require('./routers/post.js');
const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUND_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const cors = require('cors');
const path = require('node:path');
const { StatusCodes } = require('http-status-codes');

app.use(cors());

app.use(fileUpload());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/post', postRouter);

app.get('*', (req, res) => {
    return res.status(StatusCodes.OK).sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
    catch(error) {
        console.log(error);
    }
}

start();