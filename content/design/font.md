---
title: 字体
date: 2025-02-12
---

## 字体的核心作用

1. **品牌识别** - 字体是视觉识别系统的重要组成部分（如衬线体传递传统感，无衬线体体现现代感）
2. **可读性保障** - 合适的字体大小/行高/字间距直接影响阅读体验
3. **情感传递** - 圆润字体亲和，棱角字体硬朗，手写体个性
4. **信息层次** - 通过字重（100-900）、字号、颜色建立视觉层级
5. **用户体验** - 符合设备特性（如iOS优先使用 San Francisco，Android 使用 Roboto）

## 字体选择六原则

### 1. 品牌调性匹配

- 科技品牌：Inter / IBM Plex Sans
- 奢侈品牌：Didot / Playfair Display
- 儿童品牌：Comic Sans / 圆体

### 2. 可读性优先

- 正文推荐：16px+ 的清晰无衬线体（≥1.5倍行高）
- 避免正文使用装饰性字体
- 中文优先考虑：思源黑体、苹方、鸿蒙字体

### 3. 字体搭配法则

- 主副字体对比原则（如无衬线+衬线，或不同字重组合）
- 最多使用3种字体（1个主字体+1个辅助字体+1个装饰字体）
- 推荐组合：
    - Roboto + Lora
    - Poppins + Merriweather
    - 思源黑体 + 宋体

### 4. 技术实现考量

- 网页字体格式：优先WOFF2 > TTF
- 使用font-display: swap避免FOIT（不可见文本闪烁）
- 中文字体子集化（通过unicode-range分割）

### 6. 移动端适配

- 最小字号 ≥ 12px（触控操作需求）
- 增加字间距（移动端建议多0.1em）
- 深色模式需降低字重（Medium改为Regular）

## 字体测试清单

✅ 跨浏览器渲染测试（特别是字重表现）
✅ 深色/浅色模式对比度检查（WCAG AA标准）
✅ 加载性能测试（中文字体包需控制<500KB）
✅ 禁用 JavaScript 时的 fallback 表现

## 字体工具

中文字体

- [✨中文网字计划](https://chinese-font.netlify.app/zh-cn/): 便捷实用的全字符集中文渲染方案

英文字体

- [Google Fonts](https://fonts.google.com/): google 官方提供的字体工具
- [Free Faces](https://www.freefaces.gallery/)：免费的英文字体
