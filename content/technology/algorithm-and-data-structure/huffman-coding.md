---
title: 霍夫曼编码问题
---
问题描述：给定一个字符集合及其出现频率，为这些字符构建一个最优的二进制编码，使得总编码长度最短

贪心策略

- 每次**选择出现频率最低**的两个字符构建新的子树，并更新频率表
- 直到所有字符构建成一棵哈夫曼树

实现代码

```js
class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function huffmanCoding(chars, freqs) {
    let nodes = chars.map((char, i) => new HuffmanNode(char, freqs[i]));
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        let left = nodes.shift();
        let right = nodes.shift();
        let newNode = new HuffmanNode(null, left.freq + right.freq, left, right);
        nodes.push(newNode);
    }
    return nodes[0];
}

function generateHuffmanCodes(node, prefix = "", codes = {}) {
    if (!node) return;
    if (node.char !== null) {
        codes[node.char] = prefix;
    }
    generateHuffmanCodes(node.left, prefix + "0", codes);
    generateHuffmanCodes(node.right, prefix + "1", codes);
    return codes;
}

// 测试代码
const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
const freqs = [5, 9, 12, 13, 16, 45];
const huffmanTree = huffmanCoding(chars, freqs);
const huffmanCodes = generateHuffmanCodes(huffmanTree);

console.log(huffmanCodes);  // 输出哈夫曼编码
```
