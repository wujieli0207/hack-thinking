---
title: 中序遍历
---

递归实现中序遍历

```js
// 递归实现二叉树中序遍历
function midOrderTraverse(root) {
  if (!root) return

  preOrderTraverse(root.left)
  console.log(root.val)
  preOrderTraverse(root.right)
}
```

迭代实现中序遍历

```js
// 迭代实现二叉树前序遍历
function midOrderTraverse(root) {
  const result = []
  if (!root) return

  const stack = []
  // 用一个指针指向根节点
  let current = root

  while (current || stack.length) {
    // 不断遍历，找到最左边节点过程中的节点都放到 stack 中
    while (current) {
      stack.push(current)
      current = current.left
    }

    // current 指向最左边节点并放入结果
    current = stack.pop()
    result.push(current.val)

    // current 指向最左子节点的右节点，右子节点为 null 时即 current 为 null，进入下一次循环
    // 下一次循环中，current 为 null，此时处理的就是最左子节点的父节点
    // 再指向右节点时，相当于下一次循环中处理的就是右子节点
    // 满足：左 -> 中 -> 右的顺序

    // 第一次去值时取 `stack.pop()` 为最左子节点，此时 `cur.right` 为 null，
    // 下一次循环时，取最左子节点的父节点，逻辑：**左 -> 中**
    // 处理 父节点 后，`cur.right` 如果不是 null，
    // 则开始处理右侧节点，逻辑：**中 -> 右**
    current = current.right
  }

  return result
}
```
