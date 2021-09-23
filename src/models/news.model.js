const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
//import thư viện và class

const newsSchema = mongoose.Schema({
   //tạo obj mới trong database
    title: {
        //obj title và các property của nó
        type: 'String', //kiểu biến
        required: true //
    },
    // created: {
    //     type: 'Date',
    //     required: true,
    // },
    author: {
        type: 'String',
        required: true,
    },
    category: {
        type: 'String',
        required: true,
    },
    content: {
        type: 'String',
        required: true,

    },
    image: {
        type: 'String',
    },
    comments: {
        type: 'String',


    },
 },
    
    {
        timestamps: true,
    }
);

newsSchema.plugin(toJSON);
newsSchema.plugin(paginate);

/**
 * @typedef News
 */

const News = mongoose.model('News', newsSchema);

module.exports = News;