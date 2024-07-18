---
title: 模板方法模式
---
定义

- 定义一个操作中的算法的骨架，而将一些步骤延迟到子类中
- 使得子类可以不改变算法结构即可重定义该算法的某些特定步骤

类比：就像你制作一杯咖啡的过程：1. 烧水，2. 冲泡咖啡，3. 倒入杯子，4. 加糖或牛奶。每个步骤都是固定的，但具体实现可以变化

应用场景

- 多个类有相同的方法，且逻辑相同，但某些细节需要在子类中实现
- 需要控制子类的扩展行为时

优缺点

- 优点
    - 避免代码重复
    - 让子类实现算法的特定部分
- 缺点
    - 每个不同实现都需要一个子类，会导致类的数量增加

实现代码

```ts
// 抽象类
abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperations2();
    this.baseOperation3();
    this.hook2();
  }

  protected baseOperation1(): void {
    console.log('AbstractClass says: I am doing the bulk of the work');
  }

  protected baseOperation2(): void {
    console.log('AbstractClass says: But I let subclasses override some operations');
  }

  protected baseOperation3(): void {
    console.log('AbstractClass says: But I am doing the bulk of the work anyway');
  }

  protected abstract requiredOperations1(): void;
  protected abstract requiredOperations2(): void;

  protected hook1(): void { }
  protected hook2(): void { }
}

// 具体类
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperations2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperations2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected hook1(): void {
    console.log('ConcreteClass2 says: Overridden Hook1');
  }
}

// 客户端代码
function clientCode(abstractClass: AbstractClass) {
  abstractClass.templateMethod();
}

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());

console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
```
