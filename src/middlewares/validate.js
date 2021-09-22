const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
//import thư viện và các class
const validate = (schema) => (req, res, next) => {
  //hàm validate yêu cầu từ url
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);
//Schema hay schema markup có tên đầy đủ là schema.org là một loại ngôn ngữ dùng để định dạng dữ liệu có cấu trúc, đây là một sản phẩm do sự hợp tác 4 search engine lớn nhất trên thế giới là Google, Bing, Yandex, Yahoo hợp tác cùng nhau phát triển và liên tục cải tiến.
  if (error) { //nếu có lỗi
    const errorMessage = error.details.map((details) => details.message).join(', '); //trả về tin nhắn chi tiết lỗi
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    //trả về tin nhắn báo lỗi
  }
  Object.assign(req, value);//hàm chỉ định string
  return next(); //trả về 
};
// next() và phương thức này sẽ return về phần tử kế tiếp, đồng thời ghi
// nhận luôn phần tử đã lặp là phần tử next(). 
//Phương thức next() sẽ return về một Object gồm hai thuộc tính
// là value và done. done có giá
// trị true nếu Iteration đã hoàn thành, ngược lại nó có giá trị false.
module.exports = validate;
//xuất mô-đun validate
