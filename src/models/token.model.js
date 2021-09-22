const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');
//import thư viện và tạo các đối tượng dẫn đến các file code
const tokenSchema = mongoose.Schema(
  {
    token: { //object token
      type: String,
      required: true,
      index: true,
    },
    user: { //object user
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: { //object type
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    }, //object expires
    expires: {
      type: Date,
      required: true,
    }, //object blacklisted
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema); //Token là bảng database

module.exports = Token; //xuất modules
