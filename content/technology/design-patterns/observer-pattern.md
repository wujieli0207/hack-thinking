---
title: 观察者模式
---
定义：

- 定义对象间的一种**一对多**的依赖关系
- 当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新

类比：就像你订阅了某个博客，当有新的文章发布时，你会收到通知

应用场景

- 一个对象的改变需要触发其他对象的改变时
- 需要动态地增加或减少观察者时

优缺点

- 优点
    - 建立对象之间的动态联动
    - 支持广播通信
- 缺点
    - 可能引起循环依赖或触发频繁的更新
    - 不容易确定哪些对象依赖于哪些其他对象

观察者模式和发布-订阅模式的区别

|      | 观察者模式                      | [[publish-subscribe-pattern\|发布-订阅模式]] |
| ---- | -------------------------- | -------------------------------------- |
| 角色关系 | 观察者和主题之间直接交互               | 发布者和订阅者之间通过调度中心（或事件总线）进行通信             |
| 解耦程度 | 解耦程度较低。观察者需要知道主题，主题需要记录观察者 | 解耦程度较高。发布者和订阅者之间没有直接的依赖关系              |
| 异步处理 | 更适合同步处理，实现较为简单             | 更适合异步处理，可以跨线程、跨进程甚至跨系统进行通信。            |

实现代码

```ts
// 观察者接口
interface Observer {
  update(subject: Subject): void;
}

// 被观察者类
class Subject {
  private observers: Observer[] = [];
  private state: number;

  public getState(): number {
    return this.state;
  }

  public setState(state: number): void {
    this.state = state;
    this.notifyAllObservers();
  }

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public notifyAllObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

// 具体观察者类
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject.getState() < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject.getState() >= 3) {
      console.log('ConcreteObserverB: Reacted to the event.');
    }
  }
}

// 客户端代码
const subject = new Subject();

const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.setState(2);
subject.setState(3);
```
