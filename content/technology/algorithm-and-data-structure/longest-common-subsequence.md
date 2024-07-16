---
title: 最长公共子序列
---
问题描述：给定两个字符串，求它们的最长公共子序列的长度

实现步骤分析

1. **定义子问题：** `dp[i][j]` 表示字符串 text1 的前 i 个字符和字符串 text2 的前 j 个字符的最长公共子序列长度
2. **状态转移方程：**
   1. 如果 `text1[i−1]===text2[j−1]`, 则 `dp[i][j]=dp[i−1][j−1]+1`
   2. 否则，`dp[i][j]=Math.max(dp[i−1][j],dp[i][j−1])`
3. **初始条件：** `dp[0][j]=0` 和 `dp[i][0]=0` 表示空字符串的最长公共子序列长度为0
4. **计算结果：** 从两个字符串中找到最长的公共子序列

实现代码

```js
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const k = text2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= k; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][k];
}

const text1 = "abcde";
const text2 = "ace";
console.log(longestCommonSubsequence(text1, text2));  // 输出: 3
```
