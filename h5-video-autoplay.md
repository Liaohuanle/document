# H5 视频自动播放tips

## 分享一下页面做视频自动播放功能的小tip：

## 背景：

### safria以及iOS机型下一个普通视频要在页面上，做到无交互下自动播放效果在会碰壁。

## 采用如下方式：

1.safria浏览器使用无音轨视频/或者在标签中加入muted属性可以支持播放，无需插件。

2.对于iOS的移动端机型引入iphone-inline-video插件，并在标签加入playsinline属性 支持移动端iOSsafari机型 并且可以拓展ios8/9。ios系统禁止了video的play()方法自动执行无论是trigger或者是settimeout都不可以，因此手写canvas也必须依赖交互触犯渲染，但是在富交互页面不推荐canvas，耗能过高引起卡顿。
(该插件通过重新代理原生标签属性方法提升了一些视频组件体验，原理是拆分视频的当前播放时间进行循环播放）

3.安卓机尽量转换成gif图使用脚本设置backgrpund-image并且去除video表情播放。

### 附送三个提升视频体验的东西

x5-video-player-type="h5" 可以开启同层播放器，来避免播放后显示推荐视频的问题。（安卓货）

x5-video-player-fullscreen="false" //视频禁止全屏播放

x5-video-orientation="portrait"//视频竖屏模式播放
