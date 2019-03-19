/**
 * APP入口文件
 * 
 * @author Chris
 * 
 */
const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
const hapiAuthJWT2 = require('hapi-auth-jwt2');

//导入 swagger 插件
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');

const server = new Hapi.Server();

server.connection({
    host: config.host,
    port: config.port,
});

const init = async() => {
    // 挂载插件
    await server.register([
        ...pluginHapiSwagger,
        pluginHapiPagination,
        hapiAuthJWT2,
    ]);

    pluginHapiAuthJWT2(server);

    server.route([
        ...routesHelloHapi,
        ...routesShops,
        ...routesOrders,
        ...routesUsers,
    ]);

    //启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();