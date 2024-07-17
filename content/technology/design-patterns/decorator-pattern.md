---
title: 装饰模式
---
定义

- 动态地给一个对象添加一些额外的职责
- 就扩展功能而言，装饰模式比生成子类更为灵活

类比：就像你给圣诞树装饰，可以不断添加装饰品，每个装饰品都增加了圣诞树的美观，但圣诞树本身还是那棵树

应用场景

- 在不改变现有类的情况下扩展其功能
- 动态地给对象添加功能

优缺点

- 优点
    - 比生成子类更灵活，可以在运行时决定是否扩展功能
    - 遵循[[single-responsibility-principle|单一指责原则]]，可以将功能划分到不同的装饰类中
- 缺点
    - 多层装饰可能使得系统复杂化，调试困难

实现代码

```ts
// 基础组件接口
interface Component {
  operation(): string;
}

// 具体组件
class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}

// 装饰器基类
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

// 具体装饰器
class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

// 客户端代码
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
```
