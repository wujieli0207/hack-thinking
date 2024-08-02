---
title: 组合模式
date: 2024-07-28
---
定义：将对象组合成树形结构以表示“部分-整体”的层次结构

类比：文件系统中的文件和文件夹。文件夹里可以有文件也可以有其他文件夹，但无论是文件还是文件夹都可以进行相同的操作，比如打开、删除等

应用场景

- 需要表示对象的部分-整体层次结构
- 希望用户忽略组合对象与单个对象的不同，统一地使用组合结构中的所有对象时

优缺点

- 优点
    - 清楚地定义分层的复杂对象
    - 客户端可以一致地使用组合结构和单个对象
- 缺点
    - 使得设计变得更加复杂，客户端需要处理更多的类

实现代码

```ts
// 组件接口
interface Component {
  operation(): string;
}

// 叶子组件
class Leaf implements Component {
  public operation(): string {
    return 'Leaf';
  }
}

// 复合组件
class Composite implements Component {
  protected children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
  }

  public operation(): string {
    const results = [];
    for (const child of this.children) {
      results.push(child.operation());
    }
    return `Branch(${results.join('+')})`;
  }
}

// 客户端代码
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new Leaf();
clientCode(simple);

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());

const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
clientCode(tree);
```
