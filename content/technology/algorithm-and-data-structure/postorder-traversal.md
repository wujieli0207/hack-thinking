---
title: 后序遍历
---

递归实现后序遍历

```js
// 递归实现二叉树后序遍历
function postOrderTraverse(root) {
  if (!root) return

  postOrderTraverse(root.left)
  postOrderTraverse(root.right)
  console.log(root.val)
}
```

迭代实现后续遍历

```js
// 迭代实现二叉树后序遍历
function postOrderTraverse(root) {
  const result = []
  if (!root) return

  const stack = []
  stack.push(root)

  while (stack.length) {
    const top = stack.pop()
    result.unshift(top.val)

    if (top.left) {
      stack.push(top.left)
    }

    if (top.right) {
      stack.push(top.right)
    }
  }

  return result
}
```
