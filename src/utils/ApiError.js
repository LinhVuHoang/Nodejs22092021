class ApiError extends Error { //khai báo class Apierror kế thừa class error
  constructor(statusCode, message, isOperational = true, stack = '') {
    //hảm khởi tạo với các biến bên trong
    super(message);
    //Từ khóa super trong Java là một biến tham chiếu, được sử dụng để tham chiếu
    // trực tiếp đến đối tượng của lớp cha gần nhất. Bất cứ khi nào bạn tạo ra một 
    //thể hiện (hay còn gọi là một instance) 
    //của lớp con, một instance của lớp cha được tạo ra ngầm định,
    //nghĩa là được tham chiếu bởi biến super
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
//Các lớp hỗ trợ trong quá trình sử dụng như StorageUtil.java, ImageUtil.java, TextUtil.java..