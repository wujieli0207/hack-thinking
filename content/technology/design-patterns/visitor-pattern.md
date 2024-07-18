---
title: 访问者模式
---
**定义**：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作

类比：你有一个公司，各部门的员工（元素）接受不同的专家（访问者）来评估工作。每个专家都可以做不同的评估，但不会改变员工本身

应用场景

- 需要对一个对象结构中的对象进行很多不同的、不相关的操作时
- 需要避免让这些操作“污染”对象类时

优缺点

- 优点
    - 符合[[single-responsibility-principle|单一职责原则]]。可以将不相关的行为分离
    - 增加新的操作变得简单
- 缺点
    - 增加了系统复杂性
    - 违反了[[dependency-inversion-principle|依赖倒置原则]]，访问者依赖于具体类

实现代码

```ts
// 元素接口
interface Component {
  accept(visitor: Visitor): void;
}

// 具体元素
class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

// 访问者接口
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

// 具体访问者
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
  }
}

// 客户端代码
function clientCode(components: Component[], visitor: Visitor) {
  for (const component of components) {
    component.accept(visitor);
  }
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);

console.log('');

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
```
