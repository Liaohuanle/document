// 远程发布设置

module.exports = {
    'xiongjunjie.frontend': {
        receiver: 'http://10.3.23.41:1024/receiver',
        deploy: {
            // 静态资源
            '*': '/data00/users/xiongjunjie.frontend/repos/static/aweme',
            // 模板
            '*.html': '/data00/users/xiongjunjie.frontend/repos/aweme_site/aweme/app/web/templates'
        }
    }
};
