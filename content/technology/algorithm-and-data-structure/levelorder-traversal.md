---
title: 层序遍历
date: 2024-07-28
---

通过 level 记录每一层的节点个数

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []

  const result: number[][] = []
  const queue: TreeNode[] = []
  queue.push(root)

  while (queue.length > 0) {
    // 用于记录当前层级的节点值
    const level: number[] = []
    // 注意：存当前层长度，因为后续遍历 queue 的过程 queue 的长度会变化
    const length = queue.length

    for (let i = 0; i < length; i++) {
      const top = queue.shift()
      level.push(top.val)

      if (top.left) {
        queue.push(top.left)
      }
      if (top.right) {
        queue.push(top.right)
      }
    }

    result.push(level)
  }

  return result
}
```
