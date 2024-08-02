---
title: OAuth 2.0
date: 2024-07-28
---
## 基础概念

OAuth 2.0 是一种开放标准用于访问授权（[OAuth 2.0 Bearer Token Usage](https://oauth.net/2/bearer-tokens/)）

Bearer Token：一种令牌类型

access_token 和 refresh_token 的区别是什么？

- OAuth 2.0 授权协议, 有两个令牌 token , 分别是 access_token 和 refresh_token
- access_token：访问令牌, 访问受保护资源的凭证
    - 时效短
    - 授权服务器一定颁发
    - 过期后, 可以使用 refresh_token 重新获取
    - 资源服务器和授权服务器交互
    - 颁发后可以直接使用
- refresh_token：刷新令牌, 获取 access_token 的凭证
    - 时效长
    - 可选
    - refresh_token 过期后就只能重新授权
    - 只和授权服务器交互
    - 需要客户端秘钥 client_secret
- 同时使用两种 token 的好处：防止泄漏
    - access_token 泄露了怎么办? 很快就会过期
    - refresh_token 泄露了怎么办? 使用 refresh_token 是需要客户端秘钥 client_secret

在 OAuth 2.0 安全最佳实践中, **推荐 refresh_token 是一次性的**

- 使用 refresh_token 获取 access_token 时, 同时会返回一个 新的 refresh_token, 之前的 refresh_token 就会失效
- 但是两个 refresh_token 的**绝对过期时间一样**, 所以不会存在 refresh_token 快过期就获取一个新的, 然后重复，永不过期的情况

参考文档：[access_token VS refresh_token](https://blog.csdn.net/weixin_44388689/article/details/121602585)
