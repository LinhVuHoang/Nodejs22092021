const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: { //obj name property
      type: String,
      required: true,
      trim: true,
    },
    email: { //obj email
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) { //xác nhận giá trị
        if (!validator.isEmail(value)) { //nếu giá trị email bằng NULL
          throw new Error('Invalid email'); //bắt lỗi email không hợp lệ (invalid)
        }
      },
    },
    password: { //obj password
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) { //xác nhận giá trị
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {  //nếu (value:giá trị) không (phù hợp:match) 
          throw new Error('Password must contain at least one letter and one number');//bắt lỗi password phải lưu ít nhất 1 chữ và một chữ số
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: { //obj role
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: { //obj isemailverified-email xác minh
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema); //database user

module.exports = User; //xuất module user
