const inert = require('inert');
const vision = require('vision');
const package = require('package');
const hapiSwagger = require('hapi-swagger');

module.exports = [
    inert,
    vision,
    {
        register: hapiSwagger,
        options: {
            info: {
                title: 'OP接口文档',
                version: package.version,
            },
            grouping: 'tags',
            tags: [{
                    name: 'tests',
                    description: '测试接口'
                },
                {
                    name: 'shops',
                    description: '商铺前端联调接口'
                }
            ]
        }
    },
];