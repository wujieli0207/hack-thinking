---
title: 最小生成树问题
---
问题描述：给定一个带权无向图，找到一棵包含所有节点的树，使得树的边权重和最小

贪心策略

- 从任一节点开始，选择**连接到树中的权重最小的边**
- 直到所有节点都包含在树中

实现代码

```js
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function prim(graph) {
    const nodes = Object.keys(graph);
    const pq = new PriorityQueue();
    const startNode = nodes[0];
    const mst = [];
    const visited = new Set();

    pq.enqueue(startNode, 0);

    while (pq.values.length) {
        let { val: currentNode } = pq.dequeue();
        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        for (let neighbor in graph[currentNode]) {
            if (!visited.has(neighbor)) {
                pq.enqueue(neighbor, graph[currentNode][neighbor]);
            }
        }

        if (currentNode !== startNode) mst.push(currentNode);
    }

    return mst;
}

// 测试代码
const graph = {
    A: { B: 2, C: 3 },
    B: { A: 2, C: 1, D: 1 },
    C: { A: 3, B: 1, D: 4, E: 5 },
    D: { B: 1, C: 4, E: 2 },
    E: { C: 5, D: 2 }
};

console.log(prim(graph));  // 输出: 最小生成树的节点
```
