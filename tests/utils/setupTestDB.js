const mongoose = require('mongoose');//import moongose db
const config = require('../../src/config/config');
//import class config
const setupTestDB = () => { //arrow function
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  }); //chờ kết nối với mongoosedb , 

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });
//Mẫu mà bạn đưa ra là một ví dụ điển hình về việc sử dụng kết hợp cả hai - cuộc gọi mạng chậm được đưa vào beforeAll, vì vậy nó chỉ phải xảy ra một lần; và đối tượng dữ liệu (có lẽ đã được sửa đổi bởi các bài kiểm tra) được đặt lại mỗi lần trong beforeEach.
  afterAll(async () => {
    await mongoose.disconnect();
  });
  //sau tất cả disconnect
};

module.exports = setupTestDB;
//xuất mô-Đun