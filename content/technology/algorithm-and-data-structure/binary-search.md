---
title: 二分搜索
---
核心思想：

- 通过反复将**搜索范围减半**来查找目标元素，但要求数组必须是有序的
- **如果对时间复杂度的要求有 log**，通常都需要用到二分查找

步骤：

1. 将数组的中间元素与目标元素比较
2. 如果目标元素等于中间元素，则返回该元素的索引
3. 如果目标元素小于中间元素，则在左半部分继续搜索
4. 如果目标元素大于中间元素，则在右半部分继续搜索
5. 重复以上步骤，直到找到目标元素或搜索范围为空

分析：

- 时间复杂度： 最坏时间复杂度是 O(log n)，因为每次搜索范围减半
- 空间复杂度： 空间复杂度是 O(1)，因为只使用了常数空间

实现代码

```js
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // 未找到目标元素
}

let sortedArray = [2, 3, 4, 5, 8];
console.log(binarySearch(sortedArray, 4));  // 输出: 2
console.log(binarySearch(sortedArray, 7));  // 输出: -1
```
