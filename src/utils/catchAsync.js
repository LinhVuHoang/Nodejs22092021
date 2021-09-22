const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
//hàm bắt async để bắt lỗi
module.exports = catchAsync;
