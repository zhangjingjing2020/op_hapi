const Joi = require('joi');

const paginationDefine = {
    limit: Joi.number().integer().min(1).default(10).description('每页数据条目数'),
    page: Joi.number().integer().min(1).default(1).description('页码数'),
    pagination: Joi.boolean().default(true).description('是否开启分页，默认为 true'),
};

module.exports = { paginationDefine };