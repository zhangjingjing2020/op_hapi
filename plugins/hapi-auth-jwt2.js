const config = require('../config');

const validate = (decoded, request, callback) => {
    let error;

    // decode为 JWT payload 解码后的数据
    const { userId } = decoded;

    if (!userId) {
        return callback(error, false, userId);
    }
    const credentials = {
        userId,
    };
    // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
    return callback(error, true, credentials);
};

module.exports = (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: config.jwtSecret,
        validateFunc: validate,
    });
    server.auth.default('jwt');
};