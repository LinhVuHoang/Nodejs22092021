const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
//import thư viện và các class
/**
 * Create a user
 * @param {Object} userBody
 * tham số obj userbody
 * @returns {Promise<User>}
 * trả về hàm hứa user
 */
const createUser = async (userBody) => {
//function createUser-tạo mới người dùng với tham số userBody
  if (await User.isEmailTaken(userBody.email)) {
    //hàm chờ await nếu có nếu lấy đc email
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //bắt ApiError mới gồm trạng thái của web rồi gửi ra messenger
  }
  return User.create(userBody);
  //tạo một obj mới tỏng user với userbody
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  //phân trang và lựa chọn
  return users;
  //trả về users
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
  //hàm find id
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
  //hàm tìm theo email
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
//update user với id
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
//xóa user bằng id
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
//xuất các mô-đun 
