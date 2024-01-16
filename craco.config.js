//添加自定义webpack配置

const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://35.189.37.47:8080',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            },
            '/dataSource': {
                target: 'http://35.189.37.47:3001',
                changeOrigin: true,
                pathRewrite: {
                    "^/dataSource": ''
                }
            },
            '/source': {
                target: 'http://35.189.37.47:3002',
                changeOrigin: true,
                pathRewrite: {
                    "^/source": ''
                }
            }
        },
    }
}