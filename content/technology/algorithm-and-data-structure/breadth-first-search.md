---
title: 广度优先搜索
---
基本思想：从起始节点开始，首先访问所有相邻节点，然后再访问这些相邻节点的相邻节点，依次类推，直到访问完所有节点

步骤：

1. 从起始节点开始，将其标记为已访问并加入队列
2. 从队列中取出一个节点，访问其所有未访问的邻居节点，并将这些邻居节点标记为已访问后加入队列
3. 重复步骤2，直到队列为空

分析：

- 时间复杂度： O(V+E)，其中 VVV 是节点数，EEE 是边数，因为每个节点和边都会被访问一次
- 空间复杂度： O(V)，因为队列中可能会存储所有的节点

**通过队列实现**

- “先进先出” 的原则，依次访问队列里已经有的坐标，将其出队
- 记录从当前坐标出发可直接抵达的所有坐标，将其入队

实现代码

```js
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    BFS(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        visited[start] = true;

        while (queue.length) {
            let currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

// 验证
let g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

console.log(g.BFS("A"));  // 输出: ["A", "B", "C", "D", "E", "F"]
```
