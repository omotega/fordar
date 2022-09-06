const express = require('express');

const adminRouter = express.Router();

const { findVendor, createVendor,getAllVendors,getVendorById } = require('../controller/admincontroller');
const { adminauth } = require('../middlewares/adminmiddlewre');

adminRouter.route('/findvendor').get(adminauth, findVendor);
adminRouter.route('/vendor').post(adminauth, createVendor)
adminRouter.route('/vendors').get(getAllVendors);
adminRouter.route('/vendor/:id').get(getVendorById);

module.exports = adminRouter;
