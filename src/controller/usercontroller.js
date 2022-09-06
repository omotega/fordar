/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const User = require('../models/usermodel');
const { hashPassword, comaprePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

const userSignUp = async (req, res) => {
  try {
    const {
      name, username, email, password,
    } = req.body;
    if (!name || !username || !email || !password) return res.status(400).json({ Status: 'Fail', message: 'please fill all the required fields' });
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ Status: 'Fail', message: 'user already exists' });
    const hash = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      username,
      password: hash,
      address: '',
      lat: 0,
      lng: 0,
      orders: [],
    });
    if (user) {
      const token = generateToken({ id: user._id, email: user.email });
      res.status(201).json({
        Status: 'Success', message: 'user created succesfully', data: user, token,
      });
    }
  } catch (error) {
    res.status(400).json({ Status: 'Fail', message: 'Registration unsuccesful' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: 'Fail', message: 'please fill in the required field' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ Status: 'Fail', message: 'user does not exist' });
    const isPassword = await comaprePassword(password, user.password);
    if (!password) return res.status(400).json({ Status: 'Fail', message: 'incorrect password' });
    const token = await generateToken({ id: user._id, email: user.email });
    res.status(200).json({ msg: 'user logged in', token });
  } catch (error) {
    res.status(500).json({ Status: 'Fail', message: 'could not login' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      const profile = await User.findOne(user._id);
      console.log(profile);
      if (profile) {
        res.status(200).json(profile);
      }
    }
  } catch (error) {
    res.status(400).json('could not get profile');
  }
};

const editUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, address } = req.body;
    if (user) {
      const profile = await User.findOne(user._id);
      if (profile) {
        profile.name = name;
        profile.address = address;
        const result = await profile.save();

        res.status(200).json(result);
      }
    }
  } catch (error) {
    res.status(400).json('could not update profile');
  }
};

module.exports = {
  userSignUp,
  userLogin,
  getUserProfile,
  editUserProfile,
};
