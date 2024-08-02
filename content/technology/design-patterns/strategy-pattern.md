---
title: 策略模式
date: 2024-07-28
---
定义：定义了一系列的算法，并将每个算法封装起来，使它们可以互相替换

三种角色

- **策略（Strategy）**：实现不同算法的接口
- **具体策略（Concrete Strategy）**：实现策略定义的接口，提供具体的算法实现
- **上下文（Context）**：持有一个策略对象的引用，用一个ConcreteStrategy 对象来配置，维护一个对 Strategy 对象的引用

类比：就像你去商店买东西，你可以选择用现金支付、刷信用卡或使用移动支付。这些支付方式就是不同的策略

应用场景

- 在运行时选择算法的不同变体
- 有许多相关类，仅行为有差异

优缺点

- 优点
    - 避免使用多重条件判断语句
    - 符合[[open-closed-principle|开闭原则]]，可以在不修改客户端代码的情况下引入新的策略
- 缺点
    - 客户端必须知道所有策略类，并自行决定使用哪一个
    - 可能会造成很多策略类

实现代码（表单验证功能）

```ts
 interface Strategy {
   [key: string]: (value: string, ...args: any[]) => string | void;
 }
 
 interface Rule {
   strategy: string;
   errorMsg: string;
 }
 
 let strategies: Strategy = {
   isNonEmpty: (value: string, errorMsg: string) => {
  if (value === '') {
    return errorMsg;
  }
   },
   minLength: (value: string, length: number, errorMsg: string) => {
  if (value.length < length) {
    return errorMsg;
  }
   },
   // 可以添加其他验证策略...
 };
 
 class Validator {
   cache: Array<() => string | void> = [];  // 保存校验规则
 
   add(value: string, rules: Rule[]) {
  for (let rule of rules) {
    let strategyAry = rule.strategy.split(':');
    let errorMsg = rule.errorMsg;
 
    this.cache.push(() => {
   let strategy = strategyAry.shift() as string; // 用户挑选的strategy
   strategyAry.unshift(value);  // 把input的value添加进参数列表
   strategyAry.push(errorMsg);  // 把errorMsg添加进参数列表
   return strategies[strategy].apply(null, strategyAry);
    });
  }
   }
 
   start() {
  for (let validatorFunc of this.cache) {
    let errorMsg = validatorFunc();
    if (errorMsg) { // 如果有确切的返回值，说明校验没有通过
   return errorMsg;
    }
  }
   }
 }
```
