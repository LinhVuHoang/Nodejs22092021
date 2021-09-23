 const express = require('express');
 
const auth = require('../../middlewares/auth');
const validate= require('../../middlewares/validate')
const newsValidations = require('../../validations/news.validation');
const newsController = require('../../controllers/news.controller');
const router = express.Router();
//khai báo routers và các middlewares
router.get('/getNews',validate(newsValidations.getNews),newsController.getNews);

router.get('/:newsId',validate(newsValidations.getNewsById), newsController.getNewsById);
router.post('/createNews',validate(newsValidations.createNews), newsController.createNews);

router.put('/:newsId', validate(newsValidations.updateNews), newsController.updateNews);

router.delete('/:newsId',validate(newsValidations.deleteNews), newsController.deleteNews);


module.exports = router;