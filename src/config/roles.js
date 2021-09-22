const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};
 //tạo role
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
//xuất mô-đun role
module.exports = {
  roles,
  roleRights,
};
