/**
 * 使用循环实现一个splice方法
 * @param {Array} arr 
 * @param {number} index
 * @param {number} rm
 * @param  {...any} params 
 */
function splice(arr, index, rm, ...params) {
  // 从index位置需要向右移动的位数
  let float = params.length - rm;
  function insert(arr, index, ...params) {
    for (let i = index, u = params.length, f = 0; i <= u; i++, f++) {
      arr[i] = params[f];
    }
    return arr;
  }
  if (float === 0) {
    return insert(arr, index, ...params);
  }
  if (float > 0) {
    for (let i = arr.length - 1; i >= index + rm; i--) {
      arr[i + float] = arr[i];
    }
    return insert(arr, index, ...params);
  }
  if (float < 0) {
    arr = insert(arr, index, ...params);
    //TODO 逻辑基本实现了，但是这里还有逻辑没有处理好（没有删除多余的元素）
    for (let i = index + rm, u = arr.length - 1; i <= u; i++) {
      arr[i + float] = arr[i];
    }
    return arr;
  }
}

// 从index开始计算要被删除的节点
// 从被删除节点开始，从之后的所有节点开始的位置计算左移动或者右移动，
// 根据删除的数量和插入的元素数量计算左移动还是右移动，
// 右移动：float为正，需要先倒叙遍历移动数组元素，再替换并插入新的元素。
// 左移动：float为负，需要先插入替换新的元素，再正序遍历移动数组。

console.time();
console.log(splice([1, 2, 3, 4, 5], 1, 2, 6));
console.timeEnd()