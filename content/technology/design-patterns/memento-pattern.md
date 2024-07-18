---
title: 备忘录模式
---
定义：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后恢复对象到保存的状态

类比：就像你在玩游戏时保存进度，你可以在以后任何时候加载这个进度，恢复到保存时的状态。

应用场景

- 保存对象的快照，以便以后恢复
- 需要实现撤销操作

优缺点

- 优点
    - 提供了恢复状态的机制而不需要破坏封装性
    - 简化了系统的状态恢复功能
- 缺点
    - 可能占用大量资源（内存或磁盘空间）
    - 复杂状态恢复时，备忘录的实现可能比较复杂

实现代码

```ts
// 备忘录接口
interface Memento {
  getName(): string;
  getDate(): string;
}

// 具体备忘录
class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state})`;
  }

  public getDate(): string {
    return this.date;
  }
}

// 发起人
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  public doSomething(): void {
    console.log('Originator: I\'m doing something important.');
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array
      .from({ length }, () => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = (memento as ConcreteMemento).getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

// 管理者
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log('\nCaretaker: Saving Originator\'s state...');
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log('Caretaker: Here\'s the list of mementos:');
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

// 客户端代码
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\nClient: Now, let\'s rollback!\n');
caretaker.undo();

console.log('\nClient: Once more!\n');
caretaker.undo();
```
