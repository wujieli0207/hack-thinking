---
title: 解数独
date: 2024-07-28
---
问题描述：解一个 9×9 的数独问题，其中部分格子已经填入数字，需要填满所有空格，且每行、每列和每个 3×3 子宫格中数字 1 到 9 不能重复

实现步骤

1. 从左上角开始，尝试填入数字 1 到 9
2. 检查当前填入数字是否符合数独规则
3. 如果符合规则，则继续填下一个空格
4. 如果不符合或所有数字都尝试过，则回退到上一步，尝试其他数字

分析

- 时间复杂度： O(9^{n^2})，因为需要尝试所有可能的填入方式，其中 n 是数独的大小（n=9）
- 空间复杂度： 需要存储棋盘，空间复杂度是 O(n^2)

实现代码

```js
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] == num || board[i][col] == num || board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] == num) {
                return false;
            }
        }
        return true;
    }

    function backtrack(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num.toString();
                            if (backtrack(board)) {
                                return true;
                            } else {
                                board[row][col] = '.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    backtrack(board);
    return board;
}

let board = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

console.log(solveSudoku(board));  // 输出: 数独的解

```
