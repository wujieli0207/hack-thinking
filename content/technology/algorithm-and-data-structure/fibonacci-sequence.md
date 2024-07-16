---
title: 斐波那契数列
---
问题描述：计算斐波那契数列的第 n 项，定义为 F(n)=F(n−1)+F(n−2)，其中 F(0)=0 和 F(1)=1

实现步骤分析

1. **定义子问题：** F(n) 表示斐波那契数列的第 n 项
2. **状态转移方程：** F(n)=F(n−1)+F(n−2)
3. **初始条件：** F(0)=0 和 F(1)=1
4. **计算结果：** 使用迭代或递归方法计算 F(n)

实现代码

```js
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

console.log(fibonacci(10));  // 输出: 55

```
