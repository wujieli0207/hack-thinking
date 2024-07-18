---
title: 迭代器模式
---
定义：提供一种方法顺序访问一个聚合对象中的各个元素，而不暴露该对象的内部表示

类比：就像你使用遥控器换频道，你不需要知道电视内部如何存储频道信息，只需要通过遥控器按下按钮即可

应用场景

- 访问一个聚合对象的内容而不暴露其内部结构
- 为不同的聚合结构提供统一的遍历接口

优缺点

- 优点
    - 支持以不同方式遍历一个聚合对象
    - 遵循单一职责原则，聚合类不需要实现遍历逻辑
- 缺点
    - 增加了类的数量
    - 遍历的实现可能不如直接访问高效

实现代码

```ts
interface Iterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

interface Aggregator {
  getIterator(): Iterator<string>;
}

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection;
  private position: number = 0;
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getCount();
  }
}

class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

// 客户端代码
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');
while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
```
