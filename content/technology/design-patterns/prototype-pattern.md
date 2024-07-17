---
title: 原型模式
---
定义：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象

类比：你在图像处理软件中使用“复制粘贴”功能，创建一个新的图像副本，所有属性都一样，但你可以独立修改副本

应用场景

- 创建新对象成本较高（比如需要初始化大量数据）
- 想避免使用重复的初始化代码

优缺点

- 优点：
    - 克隆对象比创建新对象更高效，尤其是复杂对象
    - 避免重复的初始化代码
- 缺点：
    - 深克隆和浅克隆的问题
    - 实现复杂的对象克隆时需要较多的工作

实现代码

```ts
interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype1 implements Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: ConcretePrototype1) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const p1 = new ConcretePrototype1();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  console.log(p1.primitive === p2.primitive); // true
  console.log(p1.component === p2.component); // false
  console.log(p1.circularReference === p2.circularReference); // false
  console.log(p1.circularReference.prototype === p2.circularReference.prototype); // false
}

clientCode();
```
