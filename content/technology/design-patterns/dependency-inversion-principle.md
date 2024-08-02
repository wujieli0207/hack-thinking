---
title: 依赖倒置原则
date: 2024-07-28
---
定义：高层模块不应该依赖于低层模块的具体实现，而应该依赖于抽象

核心思想：**要面向接口编程，不要面向实现编程

类比：使用一个通用的插座（抽象）来连接不同的电器（具体实现），而不是为每个电器设计特定的插座

应用场景

- 需要减少模块之间的耦合
- 想提高系统的可扩展性和灵活性

优点

- 提高系统的灵活性和可扩展性
- 降低模块之间的耦合度

示例：用户管理器（UserManager）依赖于抽象接口 ILogger，而不依赖于具体的日志记录器实现类

```ts
  interface ILogger {
    log(message: string): void;
  }
  
  class ConsoleLogger implements ILogger {
    public log(message: string): void {
    console.log(`[ConsoleLogger] ${message}`);
 }
  }
  
  class FileManagerLogger implements ILogger {
    public log(message: string): void {
      // Log message to file
      console.log(`[FileManagerLogger] ${message}`);
    }
  }
  
  class UserManager {
    private logger: ILogger;
  
    constructor(logger: ILogger) {
      this.logger = logger;
    }
  
    public addUser(name: string): void {
      // Add user logic
      this.logger.log(`User added: ${name}`);
    }
  }
  
  // Usage
  const consoleLogger = new ConsoleLogger();
  const fileManagerLogger = new FileManagerLogger();
  
  const userManager1 = new UserManager(consoleLogger);
  userManager1.addUser('John');
  
  const userManager2 = new UserManager(fileManagerLogger);
  userManager2.addUser('Jane');
```
