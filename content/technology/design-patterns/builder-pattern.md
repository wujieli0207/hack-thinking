---
title: 生成器模式
---
定义：分离一个复杂对象的构建过程与表示，使得同样的构建过程可以创建不同的表示

类比：一个厨师在做一个三明治，可以按照你的需求放不同的配料，但是制作三明治的过程是相同的

应用场景

- 创建复杂对象的算法独立于该对象的组成部分以及它们的装配方式
- 需要生成的产品有不同的表示，不同的具体化

优缺点

- 优点：
    - 允许构造复杂的对象步骤化创建
    - 分离对象的构建与表示
- 缺点
    - 增加代码的复杂性，特别是需要多个具体生成器的时候
    - 需要更多的内存来存储生成器实例

实现代码

```ts
class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}`);
  }
}

interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  private product: Product1;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log('Custom product:');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
```
