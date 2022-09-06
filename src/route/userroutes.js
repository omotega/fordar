const express = require('express');

const userRouter = express.Router();

const {
  userSignUp, userLogin, getUserProfile, editUserProfile,
} = require('../controller/usercontroller');
const { authprotect } = require('../middlewares/authmiddleware');

userRouter.route('/signup').post(userSignUp);
userRouter.route('/login').get(userLogin);
userRouter.route('/profile').get(authprotect, getUserProfile);
userRouter.route('/editprofile').post(authprotect, editUserProfile);

module.exports = userRouter;
