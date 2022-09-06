const express = require('express');

const vendorRouter = express.Router();

const { vendorLogin, getVendorProfile, editVendorProfile } = require('../controller/vendorcontroller');

vendorRouter.route('/login').get(vendorLogin);
vendorRouter.route('/profile').get(getVendorProfile);
vendorRouter.route('/editprofile').patch(editVendorProfile);

module.exports = vendorRouter;
