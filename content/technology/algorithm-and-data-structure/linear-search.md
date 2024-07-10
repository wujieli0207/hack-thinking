---
title: 线性搜索
---
核心思想：从数组的第一个元素开始，逐个检查每个元素，找到就返回该元素，找不到就返回 -1

分析：

- 时间复杂度： 最坏时间复杂度是 O(n)，因为在最坏情况下需要检查每个元素
- 空间复杂度： 空间复杂度是 O(1)，因为只使用了常数空间

实现代码

```js
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1; // 未找到目标元素
}

let array = [5, 3, 8, 4, 2];
console.log(linearSearch(array, 4));  // 输出: 3
console.log(linearSearch(array, 7));  // 输出: -1
```
