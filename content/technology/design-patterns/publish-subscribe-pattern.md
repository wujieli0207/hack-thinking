---
title: 发布-订阅模式
---
定义：发布者发布消息到**调度中心**（消息队列或事件总线），然后调度中心通知所有订阅了这个消息的订阅者

优点

- 发布者和订阅者**解耦程度很高**，只需要和调度中心进行交互
- 发布者可以**随时发布消息**，不管有没有订阅者，例如在实现某些类型的事件系统时。

缺点

- 需要维护一个调度中心，增加系统的复杂性
- 如果订阅者处理消息的速度跟不上发布者发布消息的速度，可能会出现**消息积压**的问题

应用场景

- **事件系统**：例如 Vue 的事件总线、Node.js 的 EventEmitter 等
- **消息队列**：在微服务架构中，为了解决服务之间的通信问题，会用到消息队列，消息队列就是发布-订阅模式的一种实现
- **日志系统**：在分布式系统中，为了集中处理日志，通常会采用发布-订阅模式。各个服务（发布者）将日志发送到日志系统（调度中心），然后日志系统将日志转发给日志处理服务（订阅者）进行处理

实现代码

  ```js
  class EventEmitter {
 constractor() {
   this.listeners = {}
 }
  
 // 订阅事件
 emit(eventName, listener) {
   if(eventName in this.listeners) {
  this.listeners[eventName].push(listener)
   } else {
  this.listeners[eventName] = [listener]
   }
 }
  
 // 触发事件执行
 on(enventName, ...args) {
   if(eventName in this.listeners) {
  this.listeners[eventName].forEach(listener => listener(...args))
   }
 }
  
 // 删除事件
 off(eventName, listener) {
   if(eventName in this.listeners) {
  this.listeners[eventName] = this.listeners[eventName].filter(e => e !== listener)
   }
 }
  
 // 只执行一次事件
 once(eventName, listener) {
   const fn = (...args) => {
  listener(...args)
  this.off(eventName, listener)
   }
  
   this.on(eventName, fn)
 }
  }
  ```
