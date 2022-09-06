require('express-async-errors');
const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const { errorhandler } = require('./middlewares/errorhandler');

const connectDB = require('./config/db');
const userRouter = require('./route/userroutes');
const vendorRouter = require('./route/vendorroute');
const adminRouter = require('./route/adminroute');
const registerRouter = require('./route/registerroute');

const port = process.env.PORT || 3600;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(errorhandler);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/register', registerRouter);

connectDB();

app.listen(port, () => console.log(`port running on port ${port}`));
