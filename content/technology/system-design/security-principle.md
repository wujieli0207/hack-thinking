---
title: 安全性原则
date: 2024-07-28
---
## 基础内容

定义：确保系统和数据的保密性、完整性和可用性

关键概念

- 身份认证（Authentication）：验证用户身份（should this person be allowed in? If yes, who are they?）
    - 认证方式
        - **单因素认证（Single-Factor Authentication）**：仅使用一个因素（如密码）进行认证
        - **多因素认证（Multi-Factor Authentication, MFA）**：结合两种或多种独立的认证方式，如密码和短信验证码、指纹识别等
    - 实现技术
        - 用户名和密码
            - 最常见的认证方式，通过数据库存储用户的哈希密码进行验证。
            - 技术：Bcrypt, Argon2
        - **OAuth**
            - 一种开放标准，用于访问资源的授权
            - 工具：[[OAuth2|OAuth 2.0]] , OpenID Connect
        - **生物识别**
            - 使用指纹、面部识别、虹膜扫描等生物特征进行认证。
            - 技术：Touch ID, Face ID
- 授权（Authorization）：控制用户访问权限（once they are in, what are they allowed to do?）
    - 实现方式
        - **角色和权限**：授权通常通过角色（Role）和权限（Permission）进行管理，每个角色可以具有不同的权限
        - **授权方式**：
            - [[role-based-access-control|基于角色的访问控制（Role-Based Access Control, RBAC）]]：通过分配角色来管理用户权限
            - [[attribute-based-access-control|基于属性的访问控制（Attribute-Based Access Control, ABAC）]]：通过用户属性和环境属性来决定访问权限
    - 实现技术
        - **访问控制列表（Access Control List, ACL）**
            - 定义资源和用户之间的访问关系
            - 技术：文件系统权限、数据库权限
        - [[json-web-token|JWT（JSON Web Token）]]
            - 用于安全地传输用户的身份和权限信息
            - 工具：jsonwebtoken 库
- 数据加密（Data Encryption）：保护数据的机密性
    - 加密类型
        - **对称加密**：使用相同的密钥进行加密和解密
        - **非对称加密**：使用一对公钥和私钥进行加密和解密
    - 加密应用
        - **传输加密**：在数据传输过程中进行加密，保护数据免受窃听和篡改
        - **存储加密**：在数据存储时进行加密，保护数据免受未经授权的访问
    - 实现技术
        - **对称加密算法**
            - 技术：AES（高级加密标准）
        - **非对称加密算法**
            - 技术：RSA（Rivest-Shamir-Adleman）、ECC（椭圆曲线密码学）
        - **传输层安全协议**
            - 使用 SSL/TLS 协议对数据传输进行加密
            - 工具：OpenSSL, Let's Encrypt
        - **数据库加密**
            - 对存储在数据库中的敏感数据进行加密
            - 技术：TDE（Transparent Data Encryption），应用级加密
