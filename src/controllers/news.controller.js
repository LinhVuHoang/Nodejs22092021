const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsService } = require('../services');
//các controllers

const createNews = catchAsync(async (req, res) => {
    const news = await newsService.createNews(req.body);
    res.status(httpStatus.CREATED).send(news);
  });
const getNews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await newsService.queryNews(filter, options);
  res.send(result);
  });

const getNewsById = catchAsync(async (req, res) => {
    const news = await newsService.getNewsById(req.params.newsId);
    if (!news) {
      throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
    }
    res.send(news);
  }); 

  const updateNews = catchAsync(async (req, res) => {
    const news = await newsService.updateNews(req.params.newsId, req.body);
    res.send(news);
  });
  
  const deleteNews = catchAsync(async (req, res) => {
    await newsService.deleteNews(req.params.newsId, req.body);
    res.status(httpStatus.NO_CONTENT).send();
  });

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
};