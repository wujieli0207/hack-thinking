---
title: 选择排序
---
核心思想：每次从待排序的数据元素中**选择最小（或最大）的一个元素，存放到序列的起始位置**，直到全部待排序的数据元素排完

步骤：

1. 从未排序部分找到最小的元素
2. 将其与未排序部分的第一个元素交换位置
3. 重复以上步骤，直到所有元素排序完成

分析：

- 时间复杂度： 最坏时间复杂度是 O(n^2)，因为有两层嵌套循环，每层循环最多进行 n−1 次比较
- 空间复杂度： 原地排序算法，空间复杂度是 O(1)

实现代码

```js
function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        // 寻找最小元素的索引
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换最小元素与当前元素
        if (minIndex != i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

let array = [5, 3, 8, 4, 2];
console.log(selectionSort(array));  // 输出: [2, 3, 4, 5, 8]
```
