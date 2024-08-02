---
title: 归并排序
date: 2024-07-28
---

核心思想：[[divide-and-conquer|分治法]]

步骤：

1. 把长度为 n 的输入序列分成两个长度为 n/2 的子序列
2. 对这两个子序列分别采用归并排序
3. 将两个排序好的子序列合并成一个最终的排序序列

分析：

- 时间复杂度： 最坏时间复杂度是 O(nlog⁡n)，因为每次划分数组时需要 O(log⁡n)，而合并过程需要 O(n)
- 空间复杂度： 不是原地排序算法，空间复杂度是 O(n)，因为需要辅助数组来合并

实现代码

```js
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

let array = [5, 3, 8, 4, 2];
console.log(mergeSort(array));  // 输出: [2, 3, 4, 5, 8]
```
