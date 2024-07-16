---
title: 背包问题
---
问题描述

- 给定一组物品，每个物品有一个重量和一个价值，选择一定数量的物品装入背包，使总价值最大化
- 每个物品只能选一次，且背包的总重量不能超过给定的容量

实现步骤分析

1. **定义子问题：** `dp[i][w]` 表示前 i 件物品在总重量不超过 w 的情况下的最大价值
2. **状态转移方程：**
    - 如果不选第 i 件物品，`dp[i][w]=dp[i−1][w]`
    - 如果选第 i 件物品， `dp[i][w]=dp[i−1][w−weight[i]]+value[i]`
3. **初始条件：** `dp[0][w]=0` 表示没有物品时的最大价值
4. **计算结果：** 从所有物品中选择，使得背包的总重量不超过容量

实现代码

```js
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][capacity];
}

// 验证代码
const weights = [1, 2, 3, 4];
const values = [10, 20, 30, 40];
const capacity = 5;
console.log(knapsack(weights, values, capacity));  // 输出: 50
```
