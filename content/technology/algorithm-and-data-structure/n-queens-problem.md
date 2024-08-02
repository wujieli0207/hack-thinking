---
title: N 皇后问题
date: 2024-07-28
---
问题描述：在 n×n 的棋盘上放置 n 个皇后，使得它们不能互相攻击。即任意两个皇后不能在同一行、同一列或同一对角线上

实现步骤：

1. 从第一行开始，尝试在每一列放置皇后
2. 对于每个位置，检查当前放置是否会导致冲突
3. 如果不冲突，则继续在下一行放置皇后
4. 如果冲突或所有列都尝试过，则回退到上一步，尝试其他位置

分析：

- 时间复杂度： O(n!)，因为需要尝试所有可能的放置方式
- 空间复杂度： O(n2)，因为需要存储棋盘和解决方案

实现代码

```js
function solveNQueens(n) {
    const solutions = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    function backtrack(row) {
        if (row === n) {
            solutions.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }

    backtrack(0);
    return solutions;
}

console.log(solveNQueens(4));  // 输出: 所有4皇后的解法
```
