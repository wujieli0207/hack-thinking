---
title: 子集和问题
date: 2024-07-28
---
问题描述：给定一个整数集合和一个目标和，判断是否存在一个子集，使得该子集的和等于目标和

实现步骤

1. 从集合中选择一个元素，尝试加入当前子集
2. 检查当前子集的和是否等于目标和
3. 如果等于目标和，则找到解
4. 如果不等于，继续尝试剩下的元素
5. 如果当前子集和超过目标和或所有元素都尝试过，则回退到上一步，尝试其他元素

分析：

- 时间复杂度： O(2^n)，因为需要尝试所有可能的子集，其中 n 是集合的大小
- 空间复杂度： O(n)，因为递归调用栈的深度可能需要遍历全部数据

实现代码

```js
function subsetSum(nums, target) {
    function backtrack(start, currentSum) {
        if (currentSum === target) return true;
        if (currentSum > target) return false;

        for (let i = start; i < nums.length; i++) {
            if (backtrack(i + 1, currentSum + nums[i])) {
                return true;
            }
        }

        return false;
    }

    return backtrack(0, 0);
}

let nums = [3, 34, 4, 12, 5, 2];
let target = 9;
console.log(subsetSum(nums, target));  // 输出: true
```
