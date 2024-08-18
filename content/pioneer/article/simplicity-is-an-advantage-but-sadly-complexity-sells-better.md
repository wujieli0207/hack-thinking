---
title: Simplicity is An Advantage but Sadly Complexity Sells Better
date: 2024-08-18
---
原文链接：[eugeneyan.com](https://eugeneyan.com/writing/simplicity/)Eugene Yan

---

We sometimes hear of a paper submission being rejected because the method was too simple, or a promotion being denied because the work artifacts lacked complexity. I think this can be partly explained by Dijkstra's quote:

> "Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better." --- [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)

我们有时会听说论文投稿因方法过于简单而被拒绝，或者晋升因工作成果缺乏复杂性而被否决。我认为这可以部分用 Dijkstra 的一句话来解释：

> "简洁是一种伟大的美德，但要实现它需要付出艰辛的努力，要欣赏它则需要受到教育。更糟糕的是：复杂性更容易出售。"——— Edsger Dijkstra
>
## Why does complexity sell better?

为什么复杂性更容易出售？

**Complexity signals effort.** Papers with difficult ideas and technical details suggest blood, sweat, and tears. Systems with more components and features hint at more effort than systems with less. Because complex artifacts are viewed as requiring more effort, they're also deemed as more challenging to create and thus more worthy. And because of the perceived effort involved, they're often judged to be higher quality.

**复杂性传递努力的信号**。包含艰深思想和技术细节的论文暗示着作者付出了血汗。相比简单系统，拥有更多组件和功能的系统暗示投入了更多努力。由于复杂成果被视为需要更多努力，它们也被认为更具挑战性，因此更有价值。而且，由于人们感知到其中包含的努力，这些成果往往被判断为更高质量。

**Complexity signals mastery.** A complex system with many moving parts suggests that the designer has proficiency over each part and the ability to integrate them. Inaccessible papers peppered with jargon and proofs demonstrate expertise on the subject. (This is also why we quiz interview candidates on algorithms and data structures that are rarely used at work.) If laymen have a hard time understanding the complex idea or system, its creator must be an expert, right?

**复杂性传递精通的信号**。一个包含许多活动部件的复杂系统表明设计者精通每个部分并能够整合它们。充斥着专业术语和证明的晦涩论文展示了作者在该主题上的专业知识。（这也是为什么我们在面试中考察候选人很少在工作中使用的算法和数据结构的原因。）如果外行人难以理解复杂的想法或系统，那么它的创造者一定是专家，对吧？

**Complexity signals innovation.** Papers that invent entirely new model architectures are recognized as more novel relative to papers that adapt existing networks. Systems with components built from scratch are considered more inventive than systems that reuse existing parts. Work that *just* builds on or reuses existing work isn't *that* innovative.
> "The idea is too simple, almost like a trick. It only changes one thing and everything else is the same as prior work." --- Reviewer 2

**复杂性传递创新的信号**。相比于改编现有网络的论文，发明全新模型架构的论文被认为更具新意。从头构建组件的系统比重用现有部件的系统被认为更具创造性。仅仅在现有工作基础上构建或重用的工作并不那么创新。

**Complexity signals more features.** Systems with components that can be mixed and matched suggest flexibility to cover all the bases. For example, supporting both SQL and NoSQL data stores, or enabling both batch and streaming pipelines. Because complex systems have more lego blocks relative to simple systems, they're considered more adaptable and better able to respond to change.

**复杂性传递更多功能的信号**。具有可以混合搭配组件的系统表明其灵活性可以涵盖所有基础。例如，同时支持 SQL 和 NoSQL 数据存储，或者同时支持批处理和流式处理管道。由于复杂系统相对于简单系统有更多的积木块，它们被认为更具适应性，更能应对变化。

All in all, the above leads to [complexity bias](https://fs.blog/complexity-bias/) where we give undue credit to and favour complex ideas and systems over simpler ones.

总的来说，上述因素导致了复杂性偏见，我们过分赞赏和偏爱复杂的想法和系统，而不是更简单的。

## Why is simplicity an advantage?

为什么简洁是一种优势？

**Simple ideas and features are easier to understand and use.** This makes them more likely to gain adoption and create impact. They're also easier to communicate and get feedback on. In contrast, complex systems are harder to explain and manage, making it difficult for users to figure out what to do and how to do it. Because there are too many knobs, mistakes are more frequent. Because there are too many steps, inefficiency occurs.

**简单的想法和功能更容易理解和使用**。这使它们更有可能被采纳并产生影响。它们也更容易交流和获得反馈。相比之下，复杂系统更难解释和管理，使用户难以弄清楚该做什么以及如何做。因为有太多的调节旋钮，错误更容易发生。因为有太多的步骤，效率低下就会出现。

**Simple systems are easier to build and scale.** Systems that require less rather than more components are easier to implement. Using standard, off-the-shelf technology also makes it easier to find qualified people who can implement and maintain it. And because simpler systems have less complexity, code, and intra-system interactions, they're easier to understand and test. In contrast, needlessly complex systems require more time and resources to build, leading to inefficiency and waste.

**简单系统更容易构建和扩展**。需要较少组件而不是更多组件的系统更容易实现。使用标准的、现成的技术也使得更容易找到能够实施和维护它的合格人员。而且因为更简单的系统复杂度更低，代码更少，系统内部交互更少，它们更容易理解和测试。相比之下，不必要的复杂系统需要更多的时间和资源来构建，导致效率低下和浪费。

> When Instagram was acquired in 2012, it had a 13-person team serving tens of millions of users. It [scaled](https://www.scribd.com/document/89025069/Mike-Krieger-Instagram-at-the-Airbnb-tech-talk-on-Scaling-Instagram) and kept operational burden per engineer low by [sticking to proven technologies](https://instagram-engineering.com/what-powers-instagram-hundreds-of-instances-dozens-of-technologies-adf2e22da2ad) instead of new, shiny ones. When other startups adopted trendy NoSQL data stores and struggled, Instagram kept it lean with battle-proven and easy-to-understand PostgreSQL and Redis.

> 当 Instagram 在 2012 年被收购时，它只有 13 人的团队服务于数千万用户。它通过坚持使用经过验证的技术而不是新的、闪亮的技术来实现扩展，并保持每个工程师的运营负担较低。当其他初创公司采用流行的 NoSQL 数据存储并陷入困境时，Instagram 保持精简，使用经过实战检验且易于理解的 PostgreSQL 和 Redis。

**Simple systems have lower operational costs.** Deploying a system is not the finish line; it's the starting line. The bulk of the effort comes *after* the system is in production, likely by *someone other than the original team* that built it. By keeping systems simple, we lower their maintenance cost and increase their longevity.

**简单系统的运营成本更低**。部署系统并不是终点，而是起点。大部分工作是在系统投入生产之后进行的，很可能是由构建它的原始团队以外的人完成的。通过保持系统简单，我们降低了它们的维护成本，并延长了它们的寿命。

Simple systems have fewer moving parts that can break, making them more reliable and easier to fix. It's also easier to upgrade or swap out individual components because there are fewer interactions within the system. In contrast, complex systems are more fragile and costly to maintain because there are so many components that need to be grokked by a limited team. Having more interdependent parts also makes troubleshooting harder.

简单系统的可能出故障的活动部件更少，使它们更可靠，更容易修复。升级或替换单个组件也更容易，因为系统内部的交互更少。相比之下，复杂系统更脆弱，维护成本更高，因为有太多组件需要有限的团队来理解。拥有更多相互依赖的部件也使故障排除更加困难。

> "The more simple any thing is, the less liable it is to be disordered, and the easier repaired when disordered." --- Thomas Paine, [Common Sense, 1776](https://en.wikipedia.org/wiki/Common_Sense)

**Specific to machine learning, simple techniques don't necessarily perform worse than more sophisticated ones.** A non-exhaustive list of examples include:

> "任何事物越简单，就越不容易出现混乱，即使出现混乱也更容易修复。"——— Thomas Paine，《常识》，1776 年

* [Tree-based models \> deep neural networks](https://arxiv.org/abs/2207.08815) on 45 mid-sized tabular datasets
* [Greedy algorithms \> graph neural networks](https://arxiv.org/abs/2206.13211) on combinatorial graph problems
* [Simple averaging ≥ complex optimizers](https://arxiv.org/abs/2201.04122) on multi-task learning problems
* [Simple methods \> complex methods](https://www.sciencedirect.com/science/article/abs/pii/S014829631500140X) in forecasting accuracy across 32 papers
* [Dot product \> neural collaborative filtering](https://dl.acm.org/doi/10.1145/3383313.3412488) in item recommendation and retrieval

**特别是在机器学习领域，简单技术的表现不一定比更复杂的技术差**。以下是一些非详尽的例子：

* 在 45 个中等规模的表格数据集上，基于树的模型优于深度神经网络
* 在组合图问题上，贪心算法优于图神经网络
* 在多任务学习问题上，简单平均法大于等于复杂优化器
* 在 32 篇论文的预测准确性比较中，简单方法优于复杂方法
* 在物品推荐和检索中，点积优于神经协同过滤

![](https://image.cubox.pro/cardImg/1wvfotqdi3ehf69v5q5n5b52yc9z80et2w6gbdkvhor3lur69s.jpg?imageMogr2/quality/90/ignore-error/1 "The simple dot product outperforms deep learning methods for recommendations.")

The humble dot product outperforms deep learning methods for recommendations ([source](https://dl.acm.org/doi/10.1145/3383313.3412488))

简单的点积在推荐任务中表现优于深度学习方法（来源）

## What's wrong with rewarding complexity?

奖励复杂性有什么问题？

**It incentivizes people to make things unnecessarily complicated.** Using simple methods or building simple systems may appear easier and is thus valued less. As a result, people game the system to get more rewards and the simplest solution is no longer the most obvious one. Complexity begets more complexity, eventually making it impossible to work.

**它激励人们使事情变得不必要的复杂**。使用简单方法或构建简单系统可能看起来更容易，因此被认为价值较低。结果，人们为了获得更多奖励而玩弄系统，最简单的解决方案不再是最明显的选择。复杂性滋生更多复杂性，最终使工作变得不可能完成。

**It also encourages the "not invented here" mindset** where people prefer to build from scratch and shun reusing existing components even though it saves time and effort. This wastes time and resources and often leads to poorer outcomes.

**它还鼓励了"非此地发明"的心态**，人们更倾向于从头开始构建，而不愿重用现有组件，尽管这样做可以节省时间和精力。这浪费了时间和资源，而且常常导致更糟糕的结果。

Unfortunately, most promotion processes overemphasize complexity in work artifacts.

不幸的是，大多数晋升流程过分强调工作成果的复杂性。

Ditto for machine learning paper submissions.

机器学习论文投稿也是如此。

(If your idea didn't get the credit it deserves, take comfort in the fact that [breakthroughs](https://twitter.com/rasbt/status/1548321060201803776) such as Kalman Filters, PageRank, SVM, LSTM, Word2Vec, Dropout, etc got rejected too. We're generally bad at assessing how useful or impactful an innovation will be. 🤷)

（如果你的想法没有得到应有的认可，请以这个事实聊以自慰：像卡尔曼滤波器、PageRank、SVM、LSTM、Word2Vec、Dropout 等突破性成果也曾被拒绝过。我们通常不善于评估一项创新会有多大用处或影响力。🤷）

## How should we think about complexity instead?

我们应该如何看待复杂性？

**The objective should be to solve *complex* problems with as *simple* a solution as possible.** Instead of focusing on the complexity of the *solution* , we should focus on the complexity of the *problem*. A simple solution demonstrates deep insight into the problem and the ability to avoid more convoluted and costly solutions. Often, the best solution is the simple one.

**我们的目标应该是用尽可能简单的解决方案来解决复杂问题**。我们应该关注问题的复杂性，而不是解决方案的复杂性。一个简单的解决方案展示了对问题的深刻洞察，以及避免更复杂和昂贵解决方案的能力。通常，最好的解决方案就是简单的那个。

> "Everything should be made as simple as possible, but not simpler" --- Albert Einstein

> "一切应该尽可能简单，但不能过于简单。"——— 阿尔伯特·爱因斯坦

**Instead of having a complex, catch-all solution, consider multiple focused solutions.** A one-size-fits-all solution is usually less flexible and reusable than expected. And because it serves multiple use cases and stakeholders, it tends to be "tightly coupled" and require more coordination during planning and migrations. In contrast, it's easier to operate---and unavoidably, deprecate---single-purpose systems.

**与其采用复杂的、包罗万象的解决方案，不如考虑多个针对性的解决方案**。一刀切的解决方案通常不如预期的灵活和可重用。而且因为它服务于多个用例和利益相关者，它往往"紧密耦合"，在规划和迁移过程中需要更多的协调。相比之下，单一用途的系统更容易操作——也不可避免地更容易废弃。

## Is the juice worth the squeeze?

是否值得付出这么多努力？

One way to overcome the complexity bias is [Occam's razor](https://en.wikipedia.org/wiki/Occam's_razor). It states that the simplest solution or explanation is usually the right one. Thus, let's not be too quick to dismiss simple ideas or add unnecessary complexity to justify their worth.

克服复杂性偏见的一种方法是**奥卡姆剃刀原则**。它指出，最简单的解决方案或解释通常是正确的。因此，让我们不要过于急于否定简单的想法，或者为了证明它们的价值而增加不必要的复杂性。

Alternatively, ask yourself: Given the cost of complexity, is the juice worth the squeeze?

或者，问问自己：考虑到复杂性的代价，这么做是否值得？
