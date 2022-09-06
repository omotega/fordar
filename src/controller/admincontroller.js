/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const Vendor = require('../models/vendormodel');
const { hashPassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

const findVendor = async (req, res) => {
  try {
    const { email } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ Status: 'Fail', message: 'vendor does not exist' });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not get vendor' });
  }
};

const createVendor = async (req, res) => {
  try {
    const {
      name, ownerName, pincode, email, foodType, address, password,
    } = req.body;
    if (!name || !ownerName || !pincode || !email || !foodType || !address || !password) return res.status(400).json({ Status: 'Fail', message: 'please fill in the required fields' });
    const vendorExist = await Vendor.findOne({ email });
    if (vendorExist) return res.status(400).json({ Status: 'Fail', message: 'vendor already exists' });
    const hash = await hashPassword(password);
    const vendor = await Vendor.create({
      name,
      ownerName,
      pincode,
      email,
      foodType,
      address,
      password: hash,
      serviceAvailable: false,
      coverImages: [],
      lat: 0,
      lng: 0,
    });
    if (vendor) {
      const token = await generateToken({ id: vendor._id, email: vendor.email, role: vendor.role });
      res.status(200).json({
        Status: 'Success', message: 'vendor created succesfully', vendor, token,
      });
    }
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not create vendor' });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not get all the vendors' });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId);
    if (vendor) {
      res.status(200).json(vendor);
    }
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not get the vendors' });
  }
};

module.exports = {
  findVendor,
  createVendor,
  getAllVendors,
  getVendorById,
};
