---
title: 适配器模式
date: 2024-07-28
---
定义：将一个类的接口转换成客户希望的另一个接口，使原本由于接口不兼容而不能一起工作的类可以一起工作

类比：就像电源适配器，可以让不同国家的电器插头兼容你的插座

应用场景

- 需要使用一个现有的类，但它的接口与我们需要的不匹配
- 希望创建一个可复用的类，该类可以与其他不相关或不可预见的类（即接口不兼容的类）协同工作

优缺点

- 优点
    - [[single-responsibility-principle|单一职责原则]]: 可以将接口或数据转换代码从程序主要业务逻辑中分离
    - [[open-closed-principle|开闭原则]]: 只要客户端代码通过接口工作，就能在不修改现有客户端代码的情况下在程序中添加新类型的适配器
- 缺点
    - 代码复杂性增加，需要引入额外的适配器类

实现代码

```ts
// 目标接口，客户希望使用的接口
interface Target {
  request(): string;
}

// 被适配者，一个有着不兼容接口的现有类
class Adaptee {
  public specificRequest(): string {
    return '.tseuqer cificepS';
  }
}

// 适配器，将 Adaptee 的接口转换成 Target 的接口
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// 客户端代码
function clientCode(target: Target) {
  console.log(target.request());
}

const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter);
```
