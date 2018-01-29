# mya vue 多页面项目脚手架

## 准备

```shell
npm install -g mya
cd project
npm install --production
```

可以通过脚手架创建一个新项目
```shell
mkdir project
cd project
mya init vue_spa
```

## 开发

1、 启动本地开发server

```shell
mya server start
```

更多命令可以输入查看

```shell
mya server -h
```

2、 进入项目目录，根据场景执行不同命令

```shell
npm run mock  # ajax 走本地mock
npm run dev   # ajax 走线上代理
```

3、访问页面

访问 `http://localhost:8080/` ，看到项目目录，此时可以进入template目录访问页面，或者按照 `server.page.conf` 中配置的路径访问页面。

在 `server.page.conf` 中配置页面的映射路径，比如：

```shell
rewrite ^\/home\/$ /page/home/index.html # 模板路径相对于项目根目录
```

然后访问 http://127.0.0.1:8080/home/ ， 最终渲染的是 `/page/home/index.html` 模板。  

或者直接通过html文件地址访问，比如 http://127.0.0.1:8080/template/page/home/index.html 。

**注意：** 当接口代理到开发机或者线上时，需要配置浏览器代理，然后通过域名访问本地页面，才能在发送请求时带上cookie。

## Build

### 本地 build
```shell
npm run build
```

### 开发机／测试机部署

```shell
mya release username
```

具体可以参考 `部署配置`

## 配置

### 代理配置

`server.page.conf` : 本地页面url映射关系配置

`server.mock.conf` : 接口本地mock配置，对应 `npm run mock`

`server.proxy.conf`: 接口线上代理配置，对应 `npm run dev`

> 具体配置规则可以参考 [https://fex-team.github.io/fis3/docs/node-mock.html](https://fex-team.github.io/fis3/docs/node-mock.html)

#### 本地mock

其中，本地mock的api_host（接口路径）在 `test/api/mock.js` 中配置：

```javascript
const apiPattern = new RegExp('^api_host/(.*)$');
```
比如：

```javascript
const apiPattern = new RegExp('^/aweme/op/api/(.*)$'); // api_host = '/aweme/op'
```

结合 `server.mock.conf` 的配置：

```nginx
rewrite ^/aweme/op/api/(.*)$ /api/mock.js # 转发请求到 mock.js ，mock.js 来具体处理代理逻辑
```

这样符合 `^/aweme/op/api/(.*)$` 的请求会被代理到本地的 `test/api/mock.js` 文件（脚手架已内置），具体代理逻辑在这个文件里面实现了。  

然后在 `test/api` 下新建一个文件，文件名字参考以下规则：

`/aweme/op/api/user/search/` -> `/test/api/user_search.json`

这样请求 `/aweme/op/api/user/search/` 就会返回本地 `user_search.json` 文件中的内容。

当然，你可以直接转发请求到本地 json 文件：

```nginx
rewrite ^/aweme/v1/spring/list/$ /api/spring_list.json # 转发请求到 json 文件
```


#### 线上代理

直接在 `server.proxy.conf` 中配置:

```nginx
proxy ^/aweme/op/api/(.*)$ http://10.3.23.41:14102$0
```

tips: 以上所有代理配置默认已经加入到项目中，可自行按需修改


### 部署配置

1、在 `deploy.js` 中配置，用于将代码 release 到远端机器，具体可以参考 `deploy.js` 中的默认配置。

2、在开发机或者测试机器上启动接受服务

```
screen -S fisrcv
fisrcv  your_port
```

启动端口 `your_port` 就是你之前在 `deploy.js` 中配置的端口

完成以上两步配置后，执行 `mya release username` 即可完成发布。


### 输出路径／域名／页面资源路径配置

统一在 `fis-conf.js` 中配置

```javascript
// fis-conf.js
fis.set('build.templatePublishPath', 'template');
fis.set('build.staticPublishPath', 'resource');
fis.set('build.staticPath', '/aweme/op/static/operation/resource');

fis.get('setDomain')([
    '//s3.bytecdn.cn',
    '//s3a.bytecdn.cn'
]);
```

**templatePublishPath**: 模版文件输出路径  

**staticPublishPath**: 静态资源输出路径

**staticPath**: 静态资源在页面中的前缀  

**setDomain**: CDN的域名，支持多个

比如按照上述配置，将得到如下结果

build之前：
```html
<script src="index.js"></script>
```
build之后:
```html
<script src="//s3.bytecdn.cn/aweme/op/static/operation/resource/pkg/index_md5.js"></script>
```

具体是什么，可以自己执行 `npm run build` 看一看


## 目录规范

[https://wiki.bytedance.net/pages/viewpage.action?pageId=86885299](https://wiki.bytedance.net/pages/viewpage.action?pageId=86885299)