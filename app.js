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

//导入 swagger 插件
const pluginHapiSwagger = require('./plugins/hapi-swagger');

const server = new Hapi.Server();

server.connection({
    host: config.host,
    port: config.port,
});

const init = async() => {
    // 挂载插件
    await server.register([
        ...pluginHapiSwagger,
    ]);

    server.route([
        ...routesHelloHapi,
        ...routesShops,
        ...routesOrders,
    ]);

    //启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();