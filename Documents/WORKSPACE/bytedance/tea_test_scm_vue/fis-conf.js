fis.set('build.templatePublishPath', 'template');
fis.set('build.staticPublishPath', 'resource/aweme');
fis.set('build.staticPath', '/ies/aweme');

fis.get('setPaths')({
    vue: '/node_modules/vue/dist/vue.js'
});

fis.get('setDomain')([
    '//s3.bytecdn.cn',
    '//s3a.bytecdn.cn'
]);

// 加载 mya-hook-module，替换全局 define/require 方法 为 __M.define/__M.require，防止命名冲突
fis.hook('module');