/* eslint-disable no-underscore-dangle */
const Admin = require('../models/adminmodel');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

const Register = async (req, res) => {
  try {
    const {
      name, password, email, role,
    } = req.body;
    if (!name || !password || !email || !role) return res.status(400).json({ Status: 'Fail', message: 'please fill in the required field' });
    const isadmin = await Admin.findOne({ email });
    if (isadmin) return res.status(400).json({ Status: 'Fail', message: 'admin already exist' });
    const hash = await hashPassword(password);
    const admin = await Admin.create({
      name,
      email,
      password: hash,
      role,
    });
    if (admin) {
      const token = await generateToken({ id: admin._id, role: admin.role });
      res.status(200).json({
        Status: 'Success', message: 'admin created succesfuly', token, admin,
      });
    }
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not create admin' });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: 'Fail', message: 'please fill in the required field' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ Status: 'Fail', message: 'admin does not exist' });
    const isPassword = await comparePassword(password, admin.password);
    if (!password) return res.status(400).json({ Status: 'Fail', message: 'incorrect password' });
    const token = await generateToken({ id: admin._id, email: admin.email, role: admin.role });
    res.status(200).json({ msg: 'user logged in', token });
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not login' });
  }
};

module.exports = {
  Register,
  Login,
};
