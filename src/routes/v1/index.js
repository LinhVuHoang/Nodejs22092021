const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const newsRoute = require('./news.route');
const config = require('../../config/config');
//import thư viện và các class
const router = express.Router();
//route mặc định
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },//các route cấp quyền như thêm sửa xóa đăng nhập đăng xuất đổi mật khẩu của mình
  {
    path: '/users',
    route: userRoute,
  },//các route user như update thông tin xóa thông tin của mình
  {
    path: '/news',
    route: newsRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  //route tài liệu
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
