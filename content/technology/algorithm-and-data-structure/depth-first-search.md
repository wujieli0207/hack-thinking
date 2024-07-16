---
title: 深度优先搜索
---
## 基础概念

核心思想：沿着图的每条分支尽可能深入地进行搜索，直到不能再继续，然后回溯到最近的分支点再继续搜索

步骤：

1. 从起始节点开始
2. 标记当前节点为已访问
3. 对于当前节点的每一个未访问过的邻居节点，递归地进行深度优先搜索
4. 如果所有邻居节点都已访问，回溯到上一个节点，继续搜索

分析：

- 时间复杂度： O(V+E)，其中 V 是节点数，E 是边数，因为每个节点和边都会被访问一次
- 空间复杂度： O(V)，因为递归栈的深度可能会达到节点数

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

    DFS(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);

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

console.log(g.DFS("A"));  // 输出: ["A", "B", "D", "E", "C", "F"]
```
