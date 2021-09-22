const Joi = require('joi');
const { password } = require('./custom.validation');
//import thư viện và class
const register = { //tạo obj register gồm cấu trúc dữ liệu schema
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};
//obj ligin
const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
//obj logout
const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
//obj refreshtokens
const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
//obj forgotpassowrd
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
//obj resetpassword
const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};
//obj xác minh email
const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
//xuất các mô-đun là các obj trên
