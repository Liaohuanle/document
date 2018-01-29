/**
 * @desc: api 请求转发到本地mock文件
 * @demo: /api/user/search/ -> /server_root/mock/user_search.json (/test/api/user_search.json)
 */

const { resolve } = require('path');
const fs = require('fs');
const url = require('url');
const mockbase = resolve(__dirname, '.'); // __dirname 为 '~/.mya-tmp/www/mock/'

module.exports = function(req, res, next) {
    const originalPath = url.parse(req.originalUrl).pathname;
    const apiPattern = new RegExp('^/aweme/op/api/(.*)$'); // /aweme/op/api 在脚手架初始化的时候替换
    const match = originalPath.match(apiPattern);
    const filename = match && match[1].replace(/\/$/, '').replace(/\//g, '_') || '';
    const mockfile = resolve(mockbase, filename + '.json');

    let data = {};
    try {
        data = JSON.parse(fs.readFileSync(mockfile).toString());
    } catch (err) {
        data = {
            status_code: 1,
            msg: `mock文件 test/api/${filename}.json 不存在或者json解析出错`
        };
    }

    res.json(data);
};