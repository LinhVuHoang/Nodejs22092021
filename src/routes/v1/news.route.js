 const express = require('express');
 
const auth = require('../../middlewares/auth');
const validate= require('../../middlewares/validate')
const newsValidations = require('../../validations/news.validation');
const newsController = require('../../controllers/news.controller');
const router = express.Router();

router.get('/getNews',validate(newsValidations.getNews),newsController.getNews);

router.get('/news/:newsId',validate(newsValidations.getNewsById), newsController.getNewsById);

router.post('/createNews',validate(newsValidations.createNews), newsController.createNews);

router.put('/updateNews',auth('manageUsers'),validate(newsValidations.updateNews), newsController.updateNews);

router.delete('/deleteNews',auth('manageUsers'),validate(newsValidations.deleteNews), newsController.deleteNews);


module.exports = router;