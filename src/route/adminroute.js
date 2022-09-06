const express = require('express');

const adminRouter = express.Router();

const { findVendor, createVendor } = require('../controller/admincontroller');
const { adminauth } = require('../middlewares/adminmiddlewre');

adminRouter.route('/findvendor').get(adminauth, findVendor);
adminRouter.route('/vendor').post(adminauth, createVendor);

module.exports = adminRouter;
