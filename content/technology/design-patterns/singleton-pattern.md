---
title: 单例模式
---
定义：**保证一个类仅有一个实例**，并提供全局访问

类比：家里的 WiFi 路由器，你不希望有两个路由器给你发相同的 WiFi 名字，这样你不知道连接哪个。单例模式确保整个系统中只有一个路由器存在

应用场景

- 需要控制资源的共享访问，如数据库连接池
- 需要全局唯一的对象，如配置对象、日志记录器

优缺点

- 优点
    - 控制实例数目，节省资源
    - 提供全局访问点
- 缺点
    - 单例类可能引起类加载的性能问题
    - 单例类对单元测试不友好，难以模拟（mock）其状态

实现代码

```ts
class Singleton {
  private static instance: Singleton;
  
  // 将构造函数设为 private，防止外部新建实例
  private constructor() { }
  
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
   return Singleton.instance;
 }
}
```
