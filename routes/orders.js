const Joi = require('joi');
const xml2js = requier('xml2js');
const axios = require('axios');
const crypto = require('crypto');
const models = require('../models');
const config = require('../config');
const { jwtHeaderDefine } = require('../utils/router-helper');

const GROUP_NAME = 'orders';
module.exports = [{
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: async(request, reply) => {
            await models.sequelize.transaction((t) => {
                const result = models.orders.create({ user_id: request.auth.credentials.userId }, { transaction: t }, ).then((order) => {
                    const goodsList = [];
                    request.payload.goodsList.forEach((item) => {
                        goodsList.push(models.order_goods.create({
                            order_id: order.dataValues.id,
                            goods_id: item.goods_id,
                            // 此处单价的数值应该从商品表中反查出写入，出于教程的精简性而省略该步骤
                            single_price: 4.9,
                            count: item.count,
                        }));
                    });
                    return Promise.all(goodsList);
                });
                return result;
            }).then(() => {
                // 事务已被提交
                reply('success');
            }).catch(() => {
                // 事务已被回滚
                reply('error');
            });
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '创建订单',
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer(),
                        }),
                    ),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: async(request, reply) => {
            //从用户表中获取 openid
            const user = await models.users.findOne({ where: { id: request.auth.credentials.userId } });
            const { openid } = user;
            // 构造unifiedorder所需入参
            const unifiedorderObj = {
                appid: config.wxAppid, //小程序 id
                body: '小程序支付', // 商品简单描述
                mch_id: config.wxMchid, //商户号
                nonce_str: Math.random().toString(36).substr(2, 15),
                notify_url: 'http://api.5icode.org/orders/pay/notify', // 支付成功的回调地址
                openid, //用户 openid
                out_trade_no: request.params.orderId, //商户订单号
                spbill_create_ip: request.info.remoteAddress, //调用支付接口的用户 ip
                total_fee: 1, //总金额，单位分
                trade_type: 'JSAPI', //交易类型，默认
            };
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '支付某条订单',
            validate: {
                params: {
                    orderId: Joi.string().required(),
                },
            },
        },
    },
];