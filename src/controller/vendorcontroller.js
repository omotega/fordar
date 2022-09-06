/* eslint-disable no-underscore-dangle */
const Vendor = require('../models/vendormodel');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.satatus(400).json({ Status: 'Fail', message: 'please input the required fields' });
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ Status: 'Fail', message: 'Vendor does not exist' });
    const isPassword = await comparePassword(password, vendor.password);
    if (!password) return res.status(400).json({ Status: 'Fail', message: 'incorrect password' });
    const token = await generateToken({ id: vendor._id, email: vendor.email });
    res.status(200).json({ Status: 'Success', message: 'login succesful', token });
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not login' });
  }
};

const getVendorProfile = async (req, res) => {
  try {
    const vendor = req.user;
    if (vendor) {
      const profile = await Vendor.findOne(vendor._id);
      if (profile) {
        res.status(200).json(profile);
      }
    }
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not get vendor profile' });
  }
};

const editVendorProfile = async (req, res) => {
  try {
    const vendor = req.user;
    const { foodType, name, address } = req.body;
    if (vendor) {
      const profile = await Vendor.findOne(vendor._id);
      if (profile) {
        profile.foodType = foodType;
        profile.name = name;
        profile.address = address;
        const result = await profile.save();

        res.status(200).json({ Status: 'Success', result });
      }
    }
  } catch (errors) {
    res.status(500).json({ Stataus: 'Fail', message: 'couls not update vendor profile' });
  }
};

module.exports = {
  vendorLogin,
  getVendorProfile,
  editVendorProfile,
};
