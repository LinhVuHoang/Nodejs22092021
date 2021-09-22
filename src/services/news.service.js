const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');

// const createNews = async () => {
//     const news = {
//         title: title,
//         author: author,
//         category: category,
//         content: content,
//         image: image,
//         comments: comments,
//     }
//     if (await news) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'News already exited');
//     } else {
//         return News.create(news);
//     }
// };
/**
 * @param {Object} newsBody
 * @returns {Promise<News>}
 * 
 */
 const createNews = async (newsBody) => {
    //function createUser-tạo mới người dùng với tham số userBody
      return News.create(newsBody);
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
    const getNews = async (filter, options) => {
      const news = await News.paginate(filter, options);
      //phân trang và lựa chọn
      return news;
      //trả về users
    };
    
    /**
     * Get user by id
     * @param {ObjectId} id
     * @returns {Promise<News>}
     */
    const getNewsById = async (id) => {
      return News.findById(id);
      //hàm find id
    };
    
    /**
    //  * Get user by email
    //  * @param {string} email
    //  * @returns {Promise<>}
    //  */
   // };
    
    /**
     * Update user by id
     * @param {ObjectId} newsId
     * @param {Object} updateBody
     * @returns {Promise<News>}
     */
    //update user với id
    const updateNews = async (newsId, updateBody) => {
      const news = await getUserById(newsId);
      if (!news) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }
    //   if (updateBody.title ) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
      Object.assign(news, updateBody);
      await news.save();
      return news;
    };
    
    /**
     * Delete user by id
     * @param {ObjectId} newsId
     * @returns {Promise<News>}
     */
    //xóa user bằng id
    const deleteNews = async (newsId) => {
      const news = await getUserById(newsId);
      if (!news) {
        throw new ApiError(httpStatus.NOT_FOUND, 'news not found');
      }
      await news.remove();
      return news;
    };
    
    module.exports = {
        getNews,
         getNewsById,
         
            createNews,
            updateNews,
            deleteNews
    };

