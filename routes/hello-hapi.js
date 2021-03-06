const { jwtHeaderDefine } = require('../utils/router-helper');


module.exports = [{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('hello hapi');
    },
    config: {
        tags: ['api', 'tests'],
        description: '测试 hello-hapi',
        validate: {
            ...jwtHeaderDefine,
        }
    }
}];