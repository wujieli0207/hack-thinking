---
title: 工厂方法模式
date: 2024-07-28
---
定义：定义一个创建对象的接口，但由子类决定实例化哪一个类

类比：一家饮料工厂可以生产不同口味的饮料，橙汁、可乐、柠檬水等，但工厂的生产线是一样的。不同口味由具体的生产方法决定

应用场景

- 在代码中指定实现类时机不明确，或者想要在运行时动态决定具体实现
- 客户端不需要知道所创建对象的具体类

优缺点

- 优点：
    - 提供一种创建对象的更灵活的方式
    - 客户端无需知道所创建对象的具体类，符合开闭原则
- 缺点：
    - 增加代码复杂性，增加了系统中类的数量

实现代码

```ts
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  public operation(): string {
    return 'Result of ConcreteProductA';
  }
}

class ConcreteProductB implements Product {
  public operation(): string {
    return 'Result of ConcreteProductB';
  }
}

abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

function clientCode(creator: Creator) {
  console.log(creator.someOperation());
}

clientCode(new ConcreteCreatorA());
clientCode(new ConcreteCreatorB());
```
