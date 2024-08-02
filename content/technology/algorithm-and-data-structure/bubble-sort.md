---
title: 冒泡排序
date: 2024-07-28
---
核心思想：重复地遍历要排序的数组，一次比较两个元素，只要顺序不对就交换

步骤：

1. 从数组的第一个元素开始，依次比较相邻的两个元素
2. 如果前面的元素比后面的元素大，交换它们的位置
3. 重复这个过程，直到最后一个元素
4. 对所有元素重复以上步骤，直到没有任何一个元素需要再交换

分析：

- 时间复杂度： 最坏时间复杂度是 O(n^2)，因为有两层嵌套循环，每层循环最多进行 n−1 次比较
- 空间复杂度： 原地排序算法，空间复杂度 O(1)

实现代码

```js
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换两个元素
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

let array = [5, 3, 8, 4, 2];
console.log(bubbleSort(array));  // 输出: [2, 3, 4, 5, 8]
```
