---
title: 队列
---

## 基础概念

定义：一种特殊的线性数据结构，遵循 **先进先出 (FIFO)** 原则

例子：排队买票就像一个队列。第一个排队的顾客先买到票，最后一个排队的顾客最后买到票

特点：

- 先进先出 (FIFO):  队列中的元素按照入队顺序依次出队。第一个入队的元素第一个出队
- 线性结构:  队列中的元素按照顺序排列，每个元素都有一个前一个元素和一个后一个元素

基本操作

- 入队 (Enqueue): 将元素添加到队列的尾部
- 出队 (Dequeue): 从队列的头部移除元素

应用场景

- 任务调度:  按照先来先服务原则执行任务
- 浏览器历史记录:  浏览器使用队列来存储浏览历史，按访问顺序显示
- 生产者消费者问题:  在多线程编程中，队列协调生产者和消费者之间的数据传递