# <meta charset="UTF-8”>
### 普通数据 - name + content 模式

用于告诉搜索引擎，你网页的关键字
```html
    <meta name="keywords" content=“musical.ly, one million activity">
```
用于告诉搜索引擎，你网站的主要内容。
```html
   <meta name="description" content=“musical.ly">
```
robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。
```html
   <meta name="robots" content="none">
    1.none : 搜索引擎将忽略此网页，等价于noindex，nofollow。
    
    2.noindex : 搜索引擎不索引此网页。
    
    3.nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
    
    4.all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
    
    5.index : 搜索引擎索引此网页。
   
    6.follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页
```
如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。
```html
    <meta name="revisit-after" content="7 days">
```
renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。//默认webkit内核 | 默认IE兼容模式 | 默认IE标准模式
```html
    <meta name="renderer" content=“webkit | ie-comp | ie-stand"> 
```
width: viewport 的宽度 （范围从200 到10,000，默认为980 像素）, height: viewport 的高度 （范围从223 到10,000）,initial-scale初始的缩放比例 （范围从>0 到10）,minimum-scale 允许用户缩放到的最小比例, maximum-scale - 允许用户缩放到的最大比例
```html
    <meta name="viewport" content="width=device-width, initial-scale=1”>
```
```js
    //safari 中无效使用 额外有处理代码
    function SafariScable(){
      document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
          event.preventDefault();
          }
        })
        var lastTouchEnd=0;
        document.addEventListener('touchend',function (event) {
          var now=(new Date()).getTime();
          if(now-lastTouchEnd<=300){
            event.preventDefault();
          }
          lastTouchEnd=now;
        },false)
      }
      
```

### http-equiv - http-equiv + content
```html
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8”>
        旧版本的html = <meta charset="utf-8”>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见。）

    <meta http-equiv="cache-control" content="no-cache"/>
        no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
        no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
        public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
        private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应maxage :    
        表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。

    <meta http-equiv="Cache-Control" content="no-siteapp" />

    <meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
        用于设定网页的到期时间，过期后网页必须到服务器上重新传输。
        
     <meta http-equiv="refresh" content="2；URL=www.musical.ly”;>;
        意思是2秒后跳转www.musical.ly
        
    <meta http-equiv="Set-Cookie" content="name, date">
        //格式
     <meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> 
       如果网页过期。那么这个网页存在本地的cookies也会被自动删除。
```
### safari

```html
    <meta name=”apple-mobile-web-app-capable” content=”yes” />

    <meta name="apple-mobile-web-app-status-bar-style" content=“default | black | black-translucent" />
        上述两个都设置则网站开启对web app程序的支持，外界通称该应用为“离线APP”;
        
    <meta name="apple-touch-fullscreen" content="yes" />
        如果把一个web app添加到了主屏幕中，那么从主屏幕中打开这个web app则全屏显示添加主屏幕
        
     <link rel="apple-touch-icon" href="/static/images/identity/HTML5_Badge_64.png" />
     
     <link rel="apple-touch-icon-precomposed" href="/static/images/identity/HTML5_Badge_64.png” />
     
    <meta content="telephone=no" name="format-detection" />告诉设备忽略将页面中的数字识别为电话号码
```

### dns处理

```html
    <link rel="dns-prefetch" href="//s3.bytecdn.cn/">
    一次DNS解析耗费20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching是具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验。(chorme与firefox已经内置了这个用法无需自己额外添加， dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数)
    https下无法使用需要通过添加
    <meta http-equiv="x-dns-prefetch-control" content="on">
    启动连结但无法启动手动设定资源
```
   
