require('express-async-errors');
const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const { errorhandler } = require('./middlewares/errorhandler');

const connectDB = require('./config/db');
const userRouter = require('./route/userroutes');

const port = process.env.PORT || 3600;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(errorhandler);

app.use('/api/v1/users', userRouter);

connectDB();

app.listen(port, () => console.log(`port running on port ${port}`));
