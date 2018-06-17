/*
* 快速排序
*/

function sortQ(list){
  if(!list || list.length <= 0 ){
    return []
  }
  if(list.length <= 1){
    return list
  }
  const right = []
  const left = []
  const baseN = list[0]
  const sortList = list.slice(1)
  sortList.forEach((i, index) => {
    if(baseN >= sortList[index]){
      right.push(sortList[index])
    }else{
      left.push(sortList[index])
    }
  })
  return [].concat(sortQ(right),[baseN],sortQ(left))
}
