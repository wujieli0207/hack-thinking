---
title: 快速排序
date: 2024-07-28
---
核心思想：使用[[divide-and-conquer|分治法]]把一个序列（list）分为较小和较大的两个子序列，然后递归地排序两个子序列

步骤：

1. 从数列中挑出一个元素，称为 "基准"（pivot）
2. 重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

分析：

- 时间复杂度： 平均时间复杂度是 O(nlog⁡n)，但最坏情况下会退化到 O(n2)（例如数组已经有序时）
- 空间复杂度： 快速排序的空间复杂度是 O(log⁡n)，因为递归调用栈的深度为 O(log⁡n)

实现代码

```js
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[Math.floor(arr.length / 2)];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) continue;
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

let array = [5, 3, 8, 4, 2];
console.log(quickSort(array));  // 输出: [2, 3, 4, 5, 8]
```
