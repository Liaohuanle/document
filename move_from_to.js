

var path = require('path');

var fs = require('fs');


// 获得的js来源包 自己替换路径
const fromDir = '/Users/admin/Desktop/musically-tiktok-en(4)'

// 项目中的本地语言包
const destDir = './static/locale/'

function fetchAllFIleList(root) {
  var allFiles = fs.readdirSync(root);
  var res = [];
  allFiles && allFiles.length && allFiles.forEach(function (item) {
    const dir = path.join(root, '/', item)
    var stat = fs.lstatSync(dir);
    if (!stat.isDirectory()) {
      /lang.json/.test(item) && res.push({
        key: dir.split('musically-tiktok-en(4)/')[1].split('/Server')[0],
        path: dir
      });
    } else {
      res = res.concat(fetchAllFIleList(dir));
    }
  });
  return res;
}

function readWrite(fileList){
  fileList.forEach(item => {
    fs.readFile(item.path, function(err, source) {
      fs.writeFile(`${destDir}${item.key}.json`, source, err => {
        if(err){
          console.info(`${destDir}${item.key}.json write with`, err)
          return
        }
        console.info(`${destDir}${item.key}.json write success`)
      })
    })
  })
}

// 获取来源语言包下的所有目标文件列表
/**
 * 格式如下：
 * {
 *  key: '',目标文件的名字
 *  path:''目标文件路径
 * }
 */
const res = fetchAllFIleList(fromDir)
readWrite(res)
