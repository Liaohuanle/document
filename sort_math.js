/*
* 快速排序
*/
function sortQ(list){
  if( !Array.isArray(list) || !list || list.length <= 0 ){
    return []
  }
  if(list.length <= 1){
    return list
  }
  const right = [], left = [], baseN = list[0], sortList = list.slice(1)
  sortList.forEach((i) => {
    if(baseN >=i){
      right.push(i)
    }else{
      left.push(i)
    }
  })
  return [].concat(sortQ(right),[baseN],sortQ(left))
}
