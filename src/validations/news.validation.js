const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getNews = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        //created: Joi.date().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        content: Joi.string().required(),
        image:Joi.string(),
        comments: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getNewsById = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
};

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        // created: Joi.date().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        content: Joi.string().required(),
        image:Joi.string(),
        comments: Joi.string(),
       
      }),
};

const updateNews = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
    body: Joi.object()
        .keys({
        
            title: Joi.string().required(),
            // created: Joi.date().required(),
            author: Joi.string().required(),
            category: Joi.string().required(),
            content: Joi.string().required(),
            image:  Joi.string(),
            comments: Joi.string(),
       
    })
};

const deleteNews = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
};

module.exports = {
        getNews,
        getNewsById,
        createNews,
        updateNews,
        deleteNews
}