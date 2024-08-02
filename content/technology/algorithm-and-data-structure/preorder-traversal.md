---
title: 前序遍历
date: 2024-07-28
---

递归实现先序遍历

```js
// 递归实现二叉树前序遍历
export function preorderTraversal(root) {
  const result = []

  function preorder(root) {
    if (!root) return

    result.push(root.val)
    preorder(root.left)
    preorder(root.right)
  }

  preorder(root)

  return result
}
```

迭代实现先序遍历

```js
// 迭代实现二叉树前序遍历
function preOrderTraverse(root) {
  const result = []
  if (!root) return

  const stack = []
  stack.push(root)

  while (stack.length) {
    const top = stack.pop()
    result.push(top.val)

    if (top.right) {
      stack.push(top.right)
    }

    if (top.left) {
      stack.push(top.left)
    }
  }

  return result
}
```
