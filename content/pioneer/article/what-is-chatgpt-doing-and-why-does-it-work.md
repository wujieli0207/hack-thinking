---
title: ChatGPT 是如何工作的
date: 2024-08-02
---
作者：[[stephen-wolfram|Stephen Wolfram]]

[原文链接](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/)

---

![](https://image.cubox.pro/cardImg/2u1tn59m1me2z37uk8ccmfl8udr2uyzlbessetegekr9neeh5l.png?imageMogr2/quality/90/ignore-error/1 "What Is ChatGPT Doing ... and Why Does It Work?")

## It's Just Adding One Word at a Time

That [ChatGPT](https://chat.openai.com/) can automatically generate something that reads even superficially like human-written text is remarkable, and unexpected. But how does it do it? And why does it work? My purpose here is to give a rough outline of what's going on inside ChatGPT---and then to explore why it is that it can do so well in producing what we might consider to be meaningful text. I should say at the outset that I'm going to focus on the big picture of what's going on---and while I'll mention some engineering details, I won't get deeply into them. (And the essence of what I'll say applies just as well to other current "large language models" \[LLMs\] as to ChatGPT.)

ChatGPT 能够自动生成看起来甚至表面上像人类写的文本,这是令人惊讶和意想不到的。但它是如何做到的呢?为什么它能够工作?我的目的是大致概述 ChatGPT 内部发生的事情,然后探讨为什么它能够如此出色地产生我们可能认为是有意义的文本。我应该在一开始就说明,我将专注于正在发生的事情的大局,虽然我会提到一些工程细节,但我不会深入讨论它们。(我所说的要点同样适用于其他当前的"大型语言模型"[LLMs]和 ChatGPT。)

The first thing to explain is that what ChatGPT is always fundamentally trying to do is to produce a "reasonable continuation" of whatever text it's got so far, where by "reasonable" we mean "what one might expect someone to write after seeing what people have written on billions of webpages, etc."

首先要解释的是,ChatGPT 总是从根本上试图做的是产生它目前所拥有的任何文本的"合理延续",这里的"合理"是指"在看到人们在数十亿网页等上写的内容后,人们可能期望某人写的内容"。

So let's say we've got the text "*The best thing about AI is its ability to*". Imagine scanning billions of pages of human-written text (say on the web and in digitized books) and finding all instances of this text---then seeing what word comes next what fraction of the time. ChatGPT effectively does something like this, except that (as I'll explain) it doesn't look at literal text; it looks for things that in a certain sense "match in meaning". But the end result is that it produces a ranked list of words that might follow, together with "probabilities":

所以假设我们有这样的文本:"AI 最好的地方在于它能够"。想象一下扫描数十亿页人类写的文本(比如在网络和数字化书籍中),找到所有这个文本的实例 - 然后看看下一个词出现的频率是多少。ChatGPT 实际上做的就是类似的事情,只不过(正如我将解释的那样)它不看字面文本;它寻找在某种意义上"意义匹配"的东西。但最终的结果是,它产生了一个可能跟随的词的排序列表,以及"概率":

![](https://image.cubox.pro/cardImg/4ddqcoy9spp5sjfk7diixg8zfdphvrgy99pnziio4ifx8d9ps0.png?imageMogr2/quality/90/ignore-error/1)

And the remarkable thing is that when ChatGPT does something like write an essay what it's essentially doing is just asking over and over again "given the text so far, what should the next word be?"---and each time adding a word. (More precisely, as I'll explain, it's adding a "token", which could be just a part of a word, which is why it can sometimes "make up new words".)

令人惊讶的是,当 ChatGPT 做类似写文章这样的事情时,它本质上只是一遍又一遍地问"根据目前的文本,下一个词应该是什么?" - 然后每次添加一个词。(更准确地说,正如我将解释的那样,它添加的是一个"标记",可能只是一个词的一部分,这就是为什么它有时可以"创造新词"。)

But, OK, at each step it gets a list of words with probabilities. But which one should it actually pick to add to the essay (or whatever) that it's writing? One might think it should be the "highest-ranked" word (i.e. the one to which the highest "probability" was assigned). But this is where a bit of voodoo begins to creep in. Because for some reason---that maybe one day we'll have a scientific-style understanding of---if we always pick the highest-ranked word, we'll typically get a very "flat" essay, that never seems to "show any creativity" (and even sometimes repeats word for word). But if sometimes (at random) we pick lower-ranked words, we get a "more interesting" essay.

但是,好吧,在每一步它都会得到一个带有概率的词列表。但它实际上应该选择哪一个来添加到它正在写的文章(或其他内容)中呢?人们可能会认为应该是"排名最高"的词(即被赋予最高"概率"的词)。但这就是一些神秘的东西开始悄悄出现的地方。因为出于某种原因 - 也许有一天我们会有一个科学式的理解 - 如果我们总是选择排名最高的词,我们通常会得到一篇非常"平淡"的文章,似乎从不"表现出任何创造力"(有时甚至逐字重复)。但如果我们有时(随机地)选择排名较低的词,我们就会得到一篇"更有趣"的文章。

The fact that there's randomness here means that if we use the same prompt multiple times, we're likely to get different essays each time. And, in keeping with the idea of voodoo, there's a particular so-called "temperature" parameter that determines how often lower-ranked words will be used, and for essay generation, it turns out that a "temperature" of 0.8 seems best. (It's worth emphasizing that there's no "theory" being used here; it's just a matter of what's been found to work in practice. And for example the concept of "temperature" is there because exponential distributions [familiar from statistical physics](https://writings.stephenwolfram.com/2023/02/computational-foundations-for-the-second-law-of-thermodynamics/#textbook-thermodynamics) happen to be being used, but there's no "physical" connection---at least so far as we know.)

这里存在随机性意味着,如果我们多次使用相同的提示,我们每次都可能得到不同的文章。而且,为了保持神秘的想法,有一个特定的所谓"温度"参数,决定了使用较低排名词的频率,对于文章生成,结果显示 0.8 的"温度"似乎是最好的。(值得强调的是,这里没有使用任何"理论";这只是在实践中发现有效的问题。例如,"温度"的概念之所以存在,是因为恰好使用了指数分布[这在统计物理学中很常见](https://writings.stephenwolfram.com/2023/02/computational-foundations-for-the-second-law-of-thermodynamics/#textbook-thermodynamics),但没有"物理"联系 - 至少据我们所知。)

Before we go on I should explain that for purposes of exposition I'm mostly not going to use the [full system that's in ChatGPT](https://openai.com/blog/chatgpt/); instead I'll usually work with a simpler [GPT-2 system](https://resources.wolframcloud.com/NeuralNetRepository/resources/GPT2-Transformer-Trained-on-WebText-Data/), which has the nice feature that it's small enough to be able to run on a standard desktop computer. And so for essentially everything I show I'll be able to include explicit [Wolfram Language](https://www.wolfram.com/language/) code that you can immediately run on your computer. (Click any picture here to copy the code behind it.)

在我们继续之前,我应该解释一下,出于说明的目的,我大多不会使用 ChatGPT 中的完整系统;相反,我通常会使用一个更简单的 GPT-2 系统,它有一个很好的特点,就是小到可以在标准台式计算机上运行。因此,对于我展示的几乎所有内容,我都能够包含明确的 Wolfram 语言代码,你可以立即在你的计算机上运行。(点击这里的任何图片可以复制其背后的代码。)

For example, here's how to get the table of probabilities above. First, we have to [retrieve the underlying "language model" neural net](https://resources.wolframcloud.com/NeuralNetRepository):

例如,这里是如何获得上面的概率表。首先,我们必须检索底层的"语言模型"神经网络:

![](https://image.cubox.pro/cardImg/4aq9alo25fgdilwuaatfdy1ccj0fuc90boatpknm54qu3igen2.png?imageMogr2/quality/90/ignore-error/1)

Later on, we'll look inside this neural net, and talk about how it works. But for now we can just apply this "net model" as a black box to our text so far, and ask for the top 5 words by probability that the model says should follow:

稍后,我们将查看这个神经网络的内部,并讨论它是如何工作的。但现在我们可以将这个"网络模型"作为一个黑盒子应用于我们目前的文本,并要求模型说出应该跟随的前 5 个最高概率的词:

![](https://image.cubox.pro/cardImg/14p8f162nj89xnkddv0i5mbj6suwwycamcguevibkoqe8q4fi.png?imageMogr2/quality/90/ignore-error/1)

This takes that result and makes it into an explicit formatted "[dataset](https://www.wolfram.com/language/elementary-introduction/2nd-ed/45-datasets.html)":

这将该结果转化为一个明确格式化的"数据集":

![](https://image.cubox.pro/cardImg/1n6eglv1kj9fyqb21cbntqy99gpyoi62lcsjbej59fajhss3ms.png?imageMogr2/quality/90/ignore-error/1)

Here's what happens if one repeatedly "applies the model"---at each step adding the word that has the top probability (specified in this code as the "decision" from the model):

如果反复"应用模型"会发生什么 - 在每一步添加具有最高概率的词(在这段代码中指定为模型的"决定"):

![](https://image.cubox.pro/cardImg/1tvluuu6btabqq5zk9wpr5zvzcsstbho0cqecb6oza0qdcfybs.png?imageMogr2/quality/90/ignore-error/1)

What happens if one goes on longer? In this ("zero temperature") case what comes out soon gets rather confused and repetitive:

如果继续下去会发生什么?在这个("零温度")情况下,很快就会变得相当混乱和重复:

![](https://image.cubox.pro/cardImg/3ixfp3wflb8hebs3rl2kjbs6k1eeerwgq5buwoneh5jg6z2tnn.png?imageMogr2/quality/90/ignore-error/1)

But what if instead of always picking the "top" word one sometimes randomly picks "non-top" words (with the "randomness" corresponding to "temperature" 0.8)? Again one can build up text:

但如果不是总是选择"最高"的词,而是有时随机选择"非最高"的词(其"随机性"对应于"温度"0.8)呢?同样,我们可以构建文本:

![](https://image.cubox.pro/cardImg/1pw8kdsdluu2h3bus7dm52fwy6vv4nlxggxjzax2d30s93rldb.png?imageMogr2/quality/90/ignore-error/1)

And every time one does this, different random choices will be made, and the text will be different---as in these 5 examples:

每次这样做时,都会做出不同的随机选择,文本也会不同 - 就像这 5 个例子:

![](https://image.cubox.pro/cardImg/3erpctg9uugp11zu517i52zmvwvl1az9jn5ers837hphy4b4o4.png?imageMogr2/quality/90/ignore-error/1)

It's worth pointing out that even at the first step there are a lot of possible "next words" to choose from (at temperature 0.8), though their probabilities fall off quite quickly (and, yes, the straight line on this log-log plot corresponds to an n ^-1 ["power-law" decay that's very characteristic of the general statistics of language](https://www.wolframscience.com/nks/notes-8-8--zipfs-law/)):

值得指出的是,即使在第一步,也有很多可能的"下一个词"可供选择(在温度 0.8 时),尽管它们的概率下降得相当快(是的,这个对数-对数图上的直线对应于一个 n^-1 的"幂律"衰减,这是语言一般统计的非常典型特征):

![](https://image.cubox.pro/cardImg/34heo9gwhjzvzs2hbd39bbp5b4wg4hfd3jqb16rw96viiy7xrq.png?imageMogr2/quality/90/ignore-error/1)

So what happens if one goes on longer? Here's a random example. It's better than the top-word (zero temperature) case, but still at best a bit weird:

那么,如果继续下去会发生什么呢?这里有一个随机的例子。它比最高词(零温度)的情况要好,但充其量还是有点奇怪:

![](https://image.cubox.pro/cardImg/oqguyjpuhju4rzzgmenhas0pzebywxbryp9b7h0fle1fp2lka.png?imageMogr2/quality/90/ignore-error/1)

This was done with the [simplest GPT-2 model](https://resources.wolframcloud.com/NeuralNetRepository/resources/GPT2-Transformer-Trained-on-WebText-Data/) (from 2019). With the newer and [bigger GPT-3 models](https://platform.openai.com/docs/model-index-for-researchers) the results are better. Here's the top-word (zero temperature) text produced with the same "prompt", but with the biggest GPT-3 model:

这是用最简单的 GPT-2 模型(2019 年)完成的。使用更新和更大的 GPT-3 模型,结果会更好。这是用相同的"提示"产生的最高词(零温度)文本,但使用的是最大的 GPT-3 模型:

![](https://image.cubox.pro/cardImg/3xy6fhq8uwken4bvgetw3rj72drspfectq9uw1nd3sfs73zyyo.png?imageMogr2/quality/90/ignore-error/1)

And here's a random example at "temperature 0.8":

这是"温度 0.8"下的一个随机例子:

![](https://image.cubox.pro/cardImg/8ng7mdzx6orrefd5u5pwjqyvpm9ri4sfp28j971nd8xthyqu6.png?imageMogr2/quality/90/ignore-error/1)

## Where Do the Probabilities Come From?

OK, so ChatGPT always picks its next word based on probabilities. But where do those probabilities come from? Let's start with a simpler problem. Let's consider generating English text one letter (rather than word) at a time. How can we work out what the probability for each letter should be?

好的,所以 ChatGPT 总是根据概率选择下一个词。但这些概率是从哪里来的呢?让我们从一个更简单的问题开始。让我们考虑一次生成一个字母(而不是一个词)的英语文本。我们如何计算出每个字母的概率应该是多少?

A very minimal thing we could do is just take a sample of English text, and calculate how often different letters occur in it. So, for example, [this counts letters in the Wikipedia article](https://www.wolfram.com/language/elementary-introduction/2nd-ed/34-associations.html#i-8) on "cats":

我们能做的一件非常简单的事情就是取一个英语文本的样本,然后计算不同字母在其中出现的频率。例如,这计算了维基百科上"猫"这篇文章中的字母:

![](https://image.cubox.pro/cardImg/13qilntkj2zh8doedyquyygvhs6mw5699kf7o5fdgiv2v4fn7z.png?imageMogr2/quality/90/ignore-error/1)

And this does the same thing for "dogs":

这对"狗"做了同样的事情:

![](https://image.cubox.pro/cardImg/5ns7jgxb4vdeqsljgkvbdxh2vx448oj0m7n6op2tnfd77sp2ak.png?imageMogr2/quality/90/ignore-error/1)

The results are similar, but not the same ("o" is no doubt more common in the "dogs" article because, after all, it occurs in the word "dog" itself). Still, if we take a large enough sample of English text we can expect to eventually get at least fairly consistent results:

结果是相似的,但不完全相同("o"在"狗"这篇文章中无疑更常见,因为毕竟它出现在"dog"这个词本身中)。不过,如果我们取足够大的英语文本样本,我们可以期望最终得到至少相当一致的结果:

![](https://image.cubox.pro/cardImg/3iejx4e6kkuyw0iloc3knwqpb3vool1ayacmtt7msr8w3vo3q0.png?imageMogr2/quality/90/ignore-error/1)

Here's a sample of what we get if we just generate a sequence of letters with these probabilities:

这是我们用这些概率生成一系列字母得到的样本:

![](https://image.cubox.pro/cardImg/2f91uq53z6sinsyhv89dqv03qvdon8atwr8123lyvjv8a3370p.png?imageMogr2/quality/90/ignore-error/1)

We can break this into "words" by adding in spaces as if they were letters with a certain probability:

我们可以通过添加空格来将其分成"单词",就好像它们是具有一定概率的字母:

![](https://image.cubox.pro/cardImg/ymnwecyri6mdznyvvs407aza6yfy2r2hu1793a8b238m3q0ob.png?imageMogr2/quality/90/ignore-error/1)

We can do a slightly better job of making "words" by forcing the distribution of "word lengths" to agree with what it is in English:

我们可以通过强制"单词长度"的分布与英语中的一致来稍微更好地制作"单词":

![](https://image.cubox.pro/cardImg/28biwac8cm82ow7jiqtp61fn7uk5fcrmt2hnwf75p404kki274.png?imageMogr2/quality/90/ignore-error/1)

We didn't happen to get any "actual words" here, but the results are looking slightly better. To go further, though, we need to do more than just pick each letter separately at random. And, for example, we know that if we have a "q", the next letter basically has to be "u".

我们这里碰巧没有得到任何"实际单词",但结果看起来稍微好一些。不过,要进一步发展,我们需要做的不仅仅是随机选择每个字母。例如,我们知道如果我们有一个"q",下一个字母基本上必须是"u"。

Here's a plot of the probabilities for letters on their own:

这是单个字母概率的图表:

![](https://image.cubox.pro/cardImg/23m27yxu9zb3pdl5396o1cfhthdwmgdfbwt1m16p3x0mveqi6p.png?imageMogr2/quality/90/ignore-error/1)

And here's a plot that shows the probabilities of pairs of letters ("2-grams") in typical English text. The possible first letters are shown across the page, the second letters down the page:

这里是一个显示典型英语文本中字母对("2-gram")概率的图表。可能的第一个字母横向显示,第二个字母纵向显示:

![](https://image.cubox.pro/cardImg/77kbqqloxgitqthfdqiaqvcqnj35a7kaag5s0g6nr0nibmp4s.png?imageMogr2/quality/90/ignore-error/1)

And we see here, for example, that the "q" column is blank (zero probability) except on the "u" row. OK, so now instead of generating our "words" a single letter at a time, let's generate them looking at two letters at a time, using these "2-gram" probabilities. Here's a sample of the result---which happens to include a few "actual words":

我们在这里看到,例如,"q"列是空白的(零概率),除了在"u"行。好的,现在我们不是一次生成一个字母来生成我们的"单词",而是一次看两个字母,使用这些"2-gram"概率。这里是结果的一个样本 - 碰巧包含了一些"实际单词":

![](https://image.cubox.pro/cardImg/60blfrtr6q65yxevv3mmrp23kkbkd7lguasu7gds05grg1l0b9.png?imageMogr2/quality/90/ignore-error/1)

With sufficiently much English text we can get pretty good estimates not just for probabilities of single letters or pairs of letters (2-grams), but also for longer runs of letters. And if we generate "random words" with progressively longer *n*-gram probabilities, we see that they get progressively "more realistic":

有了足够多的英语文本,我们不仅可以得到单个字母或字母对(2-gram)的概率的相当好的估计,还可以得到更长的字母序列的概率。如果我们用逐渐增长的 n-gram 概率生成"随机单词",我们会看到它们变得越来越"真实":

![](https://image.cubox.pro/cardImg/2f4ms1dlnua36tukeq2wr1udh6vklbtwxpvot0jto9tzrm2xjf.png?imageMogr2/quality/90/ignore-error/1)

But let's now assume---more or less as ChatGPT does---that we're dealing with whole words, not letters. There are about 40,000 [reasonably commonly used words in English](https://reference.wolfram.com/language/ref/WordList.html). And by looking at a large corpus of English text (say a few million books, with altogether a few hundred billion words), we can get an [estimate of how common each word is](https://reference.wolfram.com/language/ref/WordFrequencyData.html). And using this we can start generating "sentences", in which each word is independently picked at random, with the same probability that it appears in the corpus. Here's a sample of what we get:

但现在让我们假设 - 或多或少像 ChatGPT 那样 - 我们处理的是整个单词,而不是字母。英语中有大约 40,000 个合理常用的单词。通过查看大量的英语文本语料库(比如说几百万本书,总共有几千亿个单词),我们可以得到每个单词的常见程度的估计。使用这个,我们可以开始生成"句子",其中每个单词都是独立随机选择的,其概率与它在语料库中出现的概率相同。这里是我们得到的一个样本:

![](https://image.cubox.pro/cardImg/47uutt30rgv2zuaagmv22yocaybwnho39wfjxndi4r6dfddo3e.png?imageMogr2/quality/90/ignore-error/1)

Not surprisingly, this is nonsense. So how can we do better? Just like with letters, we can start taking into account not just probabilities for single words but probabilities for pairs or longer *n*-grams of words. Doing this for pairs, here are 5 examples of what we get, in all cases starting from the word "cat":

不出所料,这是胡言乱语。那么我们如何做得更好呢?就像字母一样,我们可以开始考虑不仅仅是单个单词的概率,而是单词对或更长的 n-gram 的概率。对于单词对,这里是我们得到的 5 个例子,所有情况都从"猫"这个词开始:

![](https://image.cubox.pro/cardImg/3rph1tck58t5yaaq4ownq7o1j41vaajh8klmqiico4u4t4abuu.png?imageMogr2/quality/90/ignore-error/1)

It's getting slightly more "sensible looking". And we might imagine that if we were able to use sufficiently long n-grams we'd basically "get a ChatGPT"---in the sense that we'd get something that would generate essay-length sequences of words with the "correct overall essay probabilities". But here's the problem: there just isn't even close to enough English text that's ever been written to be able to deduce those probabilities.

它看起来稍微更"合理"了。我们可能会想象,如果我们能够使用足够长的 n-gram,我们基本上就会"得到一个 ChatGPT" - 在这个意义上,我们会得到一些能生成具有"正确的整体文章概率"的文章长度的单词序列的东西。但这里有一个问题:已经写过的英语文本甚至远远不够推断出这些概率。

In a [crawl of the web](https://commoncrawl.org/) there might be a few hundred billion words; in books that have been digitized there might be another hundred billion words. But with 40,000 common words, even the number of possible 2-grams is already 1.6 billion---and the number of possible 3-grams is 60 trillion. So there's no way we can estimate the probabilities even for all of these from text that's out there. And by the time we get to "essay fragments" of 20 words, the number of possibilities is larger than the number of particles in the universe, so in a sense they could never all be written down.

在网络爬虫中可能有几千亿个单词;在已经数字化的书籍中可能还有另外一千亿个单词。但是有 40,000 个常用词,即使可能的 2-gram 的数量已经达到 16 亿 - 而可能的 3-gram 的数量是 60 万亿。所以我们无法从现有的文本中估计出所有这些的概率。到了 20 个单词的"文章片段"时,可能性的数量比宇宙中的粒子数还要大,所以在某种意义上,它们永远不可能全部被写下来。

So what can we do? The big idea is to make a model that lets us estimate the probabilities with which sequences should occur---even though we've never explicitly seen those sequences in the corpus of text we've looked at. And at the core of ChatGPT is precisely a so-called "large language model" (LLM) that's been built to do a good job of estimating those probabilities.

那么我们能做什么呢?一个重要的想法是建立一个模型,让我们能够估计序列应该出现的概率 - 即使我们在我们看过的文本语料库中从未明确地看到过这些序列。而 ChatGPT 的核心正是一个所谓的"大型语言模型"(LLM),它被构建来很好地估计这些概率。

## What Is a Model?

Say you want to know (as [Galileo did back in the late 1500s](https://archive.org/details/bub_gb_49d42xp-USMC/page/404/mode/2up)) how long it's going to take a cannon ball dropped from each floor of the Tower of Pisa to hit the ground. Well, you could just measure it in each case and make a table of the results. Or you could do what is the essence of theoretical science: make a model that gives some kind of procedure for computing the answer rather than just measuring and remembering each case.

假设你想知道(就像伽利略在 16 世纪末那样)从比萨斜塔的每一层楼扔下的炮弹需要多长时间才能落地。好吧,你可以在每种情况下测量它,并制作一个结果表。或者你可以做理论科学的精髓:制作一个模型,给出某种计算答案的程序,而不是仅仅测量和记住每种情况。

Let's imagine we have (somewhat idealized) data for how long the cannon ball takes to fall from various floors:

让我们想象我们有(有些理想化的)数据,显示炮弹从不同楼层落下所需的时间:

![](https://image.cubox.pro/cardImg/35mnhh8hf8pyluqxrjfvxo5xh9250td995fdm5inkjjkfahs6k.png?imageMogr2/quality/90/ignore-error/1)

How do we figure out how long it's going to take to fall from a floor we don't explicitly have data about? In this particular case, we can use known laws of physics to work it out. But say all we've got is the data, and we don't know what underlying laws govern it. Then we might make a mathematical guess, like that perhaps we should use a straight line as a model:

我们如何计算出从一个我们没有明确数据的楼层落下需要多长时间?在这个特定的情况下,我们可以使用已知的物理定律来计算出来。但是假设我们只有数据,而不知道支配它的底层规律。那么我们可能会做一个数学猜测,比如也许我们应该用一条直线作为模型:

![](https://image.cubox.pro/cardImg/hl2t1ycl9yjpfwo2cn80cdzkkoxymt8efybbg6nc36jrb1gny.png?imageMogr2/quality/90/ignore-error/1)

We could pick different straight lines. But this is the one that's on average closest to the data we're given. And from this straight line we can estimate the time to fall for any floor.

我们可以选择不同的直线。但这是平均上最接近我们给定数据的一条。从这条直线,我们可以估计任何楼层的下落时间。

How did we know to try using a straight line here? At some level we didn't. It's just something that's mathematically simple, and we're used to the fact that lots of data we measure turns out to be well fit by mathematically simple things. We could try something mathematically more complicated---say a + bx + cx^2 ---and then in this case we do better:

我们怎么知道要在这里尝试使用直线?在某种程度上我们并不知道。它只是数学上简单的东西,而且我们习惯于很多我们测量的数据都能很好地用数学上简单的东西来拟合。我们可以尝试数学上更复杂的东西 - 比如 a + bx + cx^2 - 然后在这种情况下我们做得更好:

![](https://image.cubox.pro/cardImg/45bq7vsgn6ejbpqemle57lovl6wuxprv1snuawwyoaqupbees7.png?imageMogr2/quality/90/ignore-error/1)

Things can go quite wrong, though. Like here's [the best we can do](https://reference.wolfram.com/language/ref/FindFit.html) with a + b/x + c sin(x):

不过,事情可能会出错。比如这里是我们用 a + b/x + c sin(x) 能做到的最好结果:

![](https://image.cubox.pro/cardImg/2gj0cikejgfqyqjincilsh89zo7g4jkdu8046e7ld073azpj5f.png?imageMogr2/quality/90/ignore-error/1)

It is worth understanding that there's never a "model-less model". Any model you use has some particular underlying structure---then a certain set of "knobs you can turn" (i.e. parameters you can set) to fit your data. And in the case of ChatGPT, lots of such "knobs" are used---actually, 175 billion of them.

值得理解的是,从来没有"无模型的模型"。你使用的任何模型都有一些特定的底层结构 - 然后是一组"你可以调节的旋钮"(即你可以设置的参数)来拟合你的数据。在 ChatGPT 的情况下,使用了很多这样的"旋钮" - 实际上是 1750 亿个。

But the remarkable thing is that the underlying structure of ChatGPT---with "just" that many parameters---is sufficient to make a model that computes next-word probabilities "well enough" to give us reasonable essay-length pieces of text.

## Models for Human-Like Tasks

The example we gave above involves making a model for numerical data that essentially comes from simple physics---where we've known for several centuries that "simple mathematics applies". But for ChatGPT we have to make a model of human-language text of the kind produced by a human brain. And for something like that we don't (at least yet) have anything like "simple mathematics". So what might a model of it be like?

我们上面给出的例子涉及为本质上来自简单物理的数值数据制作模型 - 我们已经知道几个世纪了"简单数学适用"。但对于 ChatGPT,我们必须制作一个人类大脑产生的那种人类语言文本的模型。对于这样的东西,我们(至少目前)还没有任何类似"简单数学"的东西。那么它的模型可能是什么样的呢?

Before we talk about language, let's talk about another human-like task: recognizing images. And as a simple example of this, let's consider images of digits (and, yes, this is a [classic machine learning example](https://resources.wolframcloud.com/NeuralNetRepository/resources/050b1a0a-f43a-4c28-b7e0-72607a918467/)):

在我们谈论语言之前,让我们谈谈另一个类人任务:识别图像。作为一个简单的例子,让我们考虑数字的图像(是的,这是一个经典的机器学习例子):

![](https://image.cubox.pro/cardImg/4583zsuqmwuh7axn3t2f5trr80xb0bvjkkc12aeuzzepmpgqzu.png?imageMogr2/quality/90/ignore-error/1)

One thing we could do is get a bunch of sample images for each digit:

我们可以做的一件事是为每个数字获取一堆样本图像:

![](https://image.cubox.pro/cardImg/3wpka90bsvv9dcledr7b2as662j4kj4u4ahai5avi0qhyr8v8b.png?imageMogr2/quality/90/ignore-error/1)

Then to find out if an image we're given as input corresponds to a particular digit we could just do an explicit pixel-by-pixel comparison with the samples we have. But as humans we certainly seem to do something better---because we can still recognize digits, even when they're for example handwritten, and have all sorts of modifications and distortions:

然后,为了找出我们作为输入给出的图像是否对应于特定的数字,我们可以只做一个明确的逐像素与我们有的样本进行比较。但作为人类,我们似乎确实做得更好 - 因为我们仍然可以识别数字,即使它们是手写的,并且有各种修改和扭曲:

![](https://image.cubox.pro/cardImg/4owsxjb34ny047n0xr9frd0rai64orgee8xu4sal9iy3912o2y.png?imageMogr2/quality/90/ignore-error/1)

When we made a model for our numerical data above, we were able to take a numerical value x that we were given, and just compute a + bx for particular a and b . So if we treat the gray-level value of each pixel here as some variable x~i is there some function of all those variables that---when evaluated---tells us what digit the image is of? It turns out that it's possible to construct such a function. Not surprisingly, it's not particularly simple, though. And a typical example might involve perhaps half a million mathematical operations.

当我们为上面的数值数据制作模型时,我们能够取一个给定的数值 x,并只计算特定 a 和 b 的 a + bx。那么,如果我们把这里每个像素的灰度值看作某个变量 x~i,是否有一些所有这些变量的函数 - 当被评估时 - 告诉我们图像是什么数字?事实证明,构造这样一个函数是可能的。不出所料,它并不特别简单。一个典型的例子可能涉及大约 50 万个数学运算。

But the end result is that if we feed the collection of pixel values for an image into this function, out will come the number specifying which digit we have an image of. Later, we'll talk about how such a function can be constructed, and the idea of neural nets. But for now let's treat the function as black box, where we feed in images of, say, handwritten digits (as arrays of pixel values) and we get out the numbers these correspond to:

![](https://image.cubox.pro/cardImg/33j79sg7evkfr37djud0h88dfapamjnpheplzmwa47bgznoq93.png?imageMogr2/quality/90/ignore-error/1)

But what's really going on here? Let's say we progressively blur a digit. For a little while our function still "recognizes" it, here as a "2". But soon it "loses it", and starts giving the "wrong" result:

但这里真正发生的是什么?让我们说我们逐渐模糊一个数字。有一段时间我们的函数仍然"识别"它,这里是作为"2"。但很快它就"失去了它",开始给出"错误"的结果:

![](https://image.cubox.pro/cardImg/3p23pokr54jmbhx47y6jfvhba19mse3jzip1nl9of94jqley5z.png?imageMogr2/quality/90/ignore-error/1)

But why do we say it's the "wrong" result? In this case, we know we got all the images by blurring a "2". But if our goal is to produce a model of what humans can do in recognizing images, the real question to ask is what a human would have done if presented with one of those blurred images, without knowing where it came from.

但为什么我们说这是"错误"的结果?在这种情况下,我们知道我们通过模糊"2"得到了所有的图像。但如果我们的目标是产生一个人类在识别图像方面能做什么的模型,真正要问的问题是,如果给一个人看这些模糊的图像,而不知道它来自哪里,人类会怎么做。

And we have a "good model" if the results we get from our function typically agree with what a human would say. And the nontrivial scientific fact is that for an image-recognition task like this we now basically know how to construct functions that do this.

如果我们从函数得到的结果通常与人类会说的一致,那么我们就有了一个"好模型"。而非平凡的科学事实是,对于像这样的图像识别任务,我们现在基本上知道如何构造做这件事的函数。

Can we "mathematically prove" that they work? Well, no. Because to do that we'd have to have a mathematical theory of what we humans are doing. Take the "2" image and change a few pixels. We might imagine that with only a few pixels "out of place" we should still consider the image a "2". But how far should that go? It's a question of [human visual perception](https://www.wolframscience.com/nks/chap-10--processes-of-perception-and-analysis#sect-10-7--visual-perception). And, yes, the answer would no doubt be different for bees or octopuses---and potentially [utterly different for putative aliens](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/#alien-views-of-the-ruliad).

我们能"数学证明"它们有效吗?嗯,不能。因为要做到这一点,我们必须有一个关于我们人类在做什么的数学理论。拿"2"的图像,改变几个像素。我们可能会想象,只有几个像素"不在位置上",我们仍然应该认为这个图像是"2"。但这应该到什么程度?这是一个人类视觉感知的问题。是的,对于蜜蜂或章鱼来说,答案无疑会不同 - 对于假设的外星人来说可能完全不同。

## Neural Nets

OK, so how do our typical models for tasks like [image recognition](https://writings.stephenwolfram.com/2015/05/wolfram-language-artificial-intelligence-the-image-identification-project/) actually work? The most popular---and successful---current approach uses [neural nets](https://reference.wolfram.com/language/guide/NeuralNetworks.html). Invented---in a form remarkably close to their use today---[in the 1940s](https://www.wolframscience.com/nks/notes-10-12--history-of-ideas-about-thinking/), neural nets can be thought of as simple idealizations of how [brains seem to work](https://www.wolframscience.com/nks/notes-10-12--the-brain/).

好的,那么我们用于图像识别等任务的典型模型实际上是如何工作的呢?目前最流行和成功的方法使用神经网络。神经网络在 20 世纪 40 年代被发明 - 其形式与今天的使用方式非常接近,可以被认为是大脑工作方式的简单理想化。

In human brains there are about 100 billion neurons (nerve cells), each capable of producing an electrical pulse up to perhaps a thousand times a second. The neurons are connected in a complicated net, with each neuron having tree-like branches allowing it to pass electrical signals to perhaps thousands of other neurons. And in a rough approximation, whether any given neuron produces an electrical pulse at a given moment depends on what pulses it's received from other neurons---with different connections contributing with different "weights".

在人类大脑中,有大约 1000 亿个神经元(神经细胞),每个神经元能够产生每秒可能高达一千次的电脉冲。神经元以复杂的网络连接,每个神经元都有树状分支,允许它将电信号传递给可能数千个其他神经元。在粗略的近似中,任何给定神经元在给定时刻是否产生电脉冲取决于它从其他神经元接收到的脉冲 - 不同的连接以不同的"权重"贡献。

When we "see an image" what's happening is that when photons of light from the image fall on ("photoreceptor") cells at the back of our eyes they produce electrical signals in nerve cells. These nerve cells are connected to other nerve cells, and eventually the signals go through a whole sequence of layers of neurons. And it's in this process that we "recognize" the image, eventually "forming the thought" that we're "seeing a 2" (and maybe in the end doing something like saying the word "two" out loud).

当我们"看到一个图像"时,发生的是当来自图像的光子落在我们眼睛后面的("光感受器")细胞上时,它们在神经细胞中产生电信号。这些神经细胞与其他神经细胞相连,最终信号通过一整个神经元层序列。正是在这个过程中,我们"识别"了图像,最终"形成了思想",我们"看到了 2"(也许最后做了类似大声说出"二"这个词的事情)。

The "black-box" function from the previous section is a "mathematicized" version of such a neural net. It happens to have 11 layers (though only 4 "core layers"):

上一节的"黑盒"函数是这种神经网络的"数学化"版本。它恰好有 11 层(尽管只有 4 个"核心层"):

![](https://image.cubox.pro/cardImg/2j0fwayujfuxufpw8hz3q9gpt4bwhoyh3j0twbboamxz4bbtdh.png?imageMogr2/quality/90/ignore-error/1)

There's nothing particularly "theoretically derived" about this neural net; it's just something that---[back in 1998---was constructed as a piece of engineering](https://resources.wolframcloud.com/NeuralNetRepository/resources/LeNet-Trained-on-MNIST-Data/), and found to work. (Of course, that's not much different from how we might describe our brains as having been produced through the process of biological evolution.)

这个神经网络没有什么特别"理论推导"的地方;它只是在 1998 年被构建为一个工程作品,并被发现可以工作。(当然,这与我们可能描述我们的大脑是通过生物进化过程产生的没有太大区别。)

OK, but how does a neural net like this "recognize things"? The key is the [notion of attractors](https://www.wolframscience.com/nks/chap-6--starting-from-randomness#sect-6-7--the-notion-of-attractors). Imagine we've got handwritten images of 1's and 2's:

好的,但像这样的神经网络是如何"识别事物"的呢?关键是吸引子的概念。想象我们有手写的 1 和 2 的图像:

![](https://image.cubox.pro/cardImg/u9e8lom7zu67fg0z92o2ab60a18m7brz8pgcpsn1w49jrtn52.png?imageMogr2/quality/90/ignore-error/1)

We somehow want all the 1's to "be attracted to one place", and all the 2's to "be attracted to another place". Or, put a different way, if an image is somehow "[closer to being a 1](https://www.wolframscience.com/nks/notes-10-12--memory-analogs-with-numerical-data/)" than to being a 2, we want it to end up in the "1 place" and vice versa.

我们希望所有的 1 都"被吸引到一个地方",所有的 2 都"被吸引到另一个地方"。或者,换一种说法,如果一个图像在某种程度上"更接近于 1"而不是 2,我们希望它最终到达"1 的地方",反之亦然。

As a straightforward analogy, let's say we have certain positions in the plane, indicated by dots (in a real-life setting they might be positions of coffee shops). Then we might imagine that starting from any point on the plane we'd always want to end up at the closest dot (i.e. we'd always go to the closest coffee shop). We can represent this by dividing the plane into regions ("attractor basins") separated by idealized "watersheds":

作为一个直接的类比,让我们说我们在平面上有某些位置,用点表示(在现实生活中,它们可能是咖啡店的位置)。然后我们可能会想象,从平面上的任何点开始,我们总是想最终到达最近的点(即我们总是去最近的咖啡店)。我们可以通过将平面分成由理想化的"分水岭"分隔的区域("吸引子盆地")来表示这一点:

![](https://image.cubox.pro/cardImg/re647aox4ak54xwh1l6juhe8hbpkd2quy65lm5so8e1e7yucl.png?imageMogr2/quality/90/ignore-error/1)

We can think of this as implementing a kind of "recognition task" in which we're not doing something like identifying what digit a given image "looks most like"---but rather we're just, quite directly, seeing what dot a given point is closest to. (The "Voronoi diagram" setup we're showing here separates points in 2D Euclidean space; the digit recognition task can be thought of as doing something very similar---but in a 784-dimensional space formed from the gray levels of all the pixels in each image.)

我们可以把这看作是实现了一种"识别任务",在这种任务中,我们不是在做类似于识别给定图像"最像"哪个数字这样的事情 - 而是直接看给定点最接近哪个点。(我们在这里展示的"Voronoi 图"设置在 2D 欧几里得空间中分离点;数字识别任务可以被认为是做非常相似的事情 - 但是在一个由每个图像中所有像素的灰度级形成的 784 维空间中。)

So how do we make a neural net "do a recognition task"? Let's consider this very simple case:

那么我们如何让神经网络"执行识别任务"呢?让我们考虑这个非常简单的情况:

![](https://image.cubox.pro/cardImg/3cxwoqgc7nwtyab201r4jaiqvzfo6qfdm0dhtlqh7k9kgj3g8y.png?imageMogr2/quality/90/ignore-error/1)

Our goal is to take an "input" corresponding to a position {x,y}---and then to "recognize" it as whichever of the three points it's closest to. Or, in other words, we want the neural net to compute a function of {x,y} like:

我们的目标是取一个对应于位置 {x,y} 的"输入" - 然后将其"识别"为它最接近的三个点中的哪一个。换句话说,我们希望神经网络计算一个 {x,y} 的函数,如:

![](https://image.cubox.pro/cardImg/2ncu4zkch5m5dallw1tt8vafhl0bvjg5mm82357sveqs2qy23f.png?imageMogr2/quality/90/ignore-error/1)

So how do we do this with a neural net? Ultimately a neural net is a connected collection of idealized "neurons"---usually arranged in layers---with a simple example being:

那么我们如何用神经网络来做这个呢?最终,神经网络是理想化的"神经元"的连接集合 - 通常排列成层 - 一个简单的例子是:

![](https://image.cubox.pro/cardImg/1xm9cgr182zy42l2k3cfb2xucbwpvzflqavtqun58gg1132ytt.png?imageMogr2/quality/90/ignore-error/1)

Each "neuron" is effectively set up to evaluate a simple numerical function. And to "use" the network, we simply feed numbers (like our coordinates x and y) in at the top, then have neurons on each layer "evaluate their functions" and feed the results forward through the network---eventually producing the final result at the bottom:

每个"神经元"实际上被设置为评估一个简单的数值函数。为了"使用"网络,我们只需在顶部输入数字(如我们的坐标 x 和 y),然后让每一层的神经元"评估它们的函数"并将结果向前传递通过网络 - 最终在底部产生最终结果:

![](https://image.cubox.pro/cardImg/3gdijmja12xwi1jyz92t1elbtl844gfdlo417ydwz7era2d9vx.png?imageMogr2/quality/90/ignore-error/1)

In the traditional (biologically inspired) setup each neuron effectively has a certain set of "incoming connections" from the neurons on the previous layer, with each connection being assigned a certain "weight" (which can be a positive or negative number). The value of a given neuron is determined by multiplying the values of "previous neurons" by their corresponding weights, then adding these up and adding a constant---and finally applying a "thresholding" (or "activation") function. In mathematical terms, if a neuron has inputs x = { x ~1, x ~2 ...} then we compute `f[w . x + b]`, where the weights w and constant b are generally chosen differently for each neuron in the network; the function f is usually the same.

在传统的(受生物启发的)设置中,每个神经元实际上都有一组来自前一层神经元的"输入连接",每个连接被分配一个特定的"权重"(可以是正数或负数)。给定神经元的值是通过将"前一个神经元"的值乘以它们相应的权重,然后将这些加起来并加上一个常数来确定的 - 最后应用一个"阈值"(或"激活")函数。用数学术语来说,如果一个神经元有输入 x = {x_1, x_2 ...},那么我们计算 `f[w . x + b]`,其中权重 w 和常数 b 通常对网络中的每个神经元都选择不同;函数 f 通常是相同的。

Computing w . x + b is just a matter of matrix multiplication and addition. The "activation function" f introduces nonlinearity (and ultimately is what leads to nontrivial behavior). Various activation functions commonly get used; here we'll just use [Ramp](http://reference.wolfram.com/language/ref/Ramp.html) (or ReLU):

计算 w . x + b 只是矩阵乘法和加法的问题。"激活函数"f 引入非线性(最终导致非平凡的行为)。通常使用各种激活函数;这里我们只使用 Ramp(或 ReLU):

![](https://image.cubox.pro/cardImg/4p3vzpoubfr4ysexnxsbkt444pmr23aucs840az09c6fou0t51.png?imageMogr2/quality/90/ignore-error/1)

For each task we want the neural net to perform (or, equivalently, for each overall function we want it to evaluate) we'll have different choices of weights. (And---as we'll discuss later---these weights are normally determined by "training" the neural net using machine learning from examples of the outputs we want.)

对于我们希望神经网络执行的每个任务(或者等价地,对于我们希望它评估的每个整体函数),我们将有不同的权重选择。(正如我们稍后将讨论的那样,这些权重通常是通过使用机器学习从我们想要的输出的例子中"训练"神经网络来确定的。)

Ultimately, every neural net just corresponds to some overall mathematical function---though it may be messy to write out. For the example above, it would be:

![](https://image.cubox.pro/cardImg/630wie4b6b0siem5s17sts423cwy8w08bny03d94y0w0khzg3u.png?imageMogr2/quality/90/ignore-error/1)

The neural net of ChatGPT also just corresponds to a mathematical function like this---but effectively with billions of terms.

ChatGPT 的神经网络也只是对应于这样的数学函数 - 但实际上有数十亿个项。

But let's go back to individual neurons. Here are some examples of the functions a neuron with two inputs (representing coordinates *x* and *y* ) can compute with various choices of weights and constants (and [Ramp](https://reference.wolfram.com/language/ref/Ramp.html) as activation function):

但让我们回到单个神经元。这里是一些具有两个输入(表示坐标 x 和 y)的神经元可以用各种权重和常数选择(以及 Ramp 作为激活函数)计算的函数的例子:

![](https://image.cubox.pro/cardImg/62fve61r9kae7tryeg9397wceojm9y1oxlza94cih30hizw8e3.png?imageMogr2/quality/90/ignore-error/1)

But what about the larger network from above? Well, here's what it computes:

但上面的更大网络呢?好吧,这是它计算的内容:

![](https://image.cubox.pro/cardImg/3pj69f7pzrhju0doo204xzx62fs6wjv27jsivixxa5yux62er2.png?imageMogr2/quality/90/ignore-error/1)

It's not quite "right", but it's close to the "nearest point" function we showed above.

它不完全"正确",但接近于我们上面展示的"最近点"函数。

Let's see what happens with some other neural nets. In each case, as we'll explain later, we're using machine learning to find the best choice of weights. Then we're showing here what the neural net with those weights computes:

让我们看看其他一些神经网络会发生什么。在每种情况下，正如我们稍后将解释的那样，我们都使用机器学习来找到最佳权重选择。然后我们在这里展示具有这些权重的神经网络计算的结果：

![](https://image.cubox.pro/cardImg/5opm7csmw8n4wvkf0mn3phr0cizmc7amea4v82uomyhgitassw.png?imageMogr2/quality/90/ignore-error/1)

Bigger networks generally do better at approximating the function we're aiming for. And in the "middle of each attractor basin" we typically get exactly the answer we want. But [at the boundaries](https://www.wolframscience.com/nks/notes-10-12--memory-analogs-with-numerical-data/)---where the neural net "has a hard time making up its mind"---things can be messier.

更大的网络通常在近似我们目标函数方面做得更好。在"每个吸引子盆地的中间",我们通常得到我们想要的确切答案。但在边界处 - 神经网络"难以做出决定"的地方 - 情况可能会更混乱。

With this simple mathematical-style "recognition task" it's clear what the "right answer" is. But in the problem of recognizing handwritten digits, it's not so clear. What if someone wrote a "2" so badly it looked like a "7", etc.? Still, we can ask how a neural net distinguishes digits---and this gives an indication:

对于这种简单的数学风格的"识别任务",很清楚什么是"正确答案"。但在识别手写数字的问题上,就不那么清楚了。如果有人把"2"写得太糟糕以至于看起来像"7"怎么办?尽管如此,我们还是可以问神经网络如何区分数字 - 这给出了一个指示:

![](https://image.cubox.pro/cardImg/151i8chjtu18vjzgwwijo48nezicfz0ivdad4l98iwgkubr46s.png?imageMogr2/quality/90/ignore-error/1)

Can we say "mathematically" how the network makes its distinctions? Not really. It's just "doing what the neural net does". But it turns out that that normally seems to agree fairly well with the distinctions we humans make.

我们能"数学地"说网络如何做出区分吗?不太能。它只是"做神经网络所做的事"。但事实证明,这通常似乎与我们人类做出的区分相当一致。

Let's take a more elaborate example. Let's say we have images of cats and dogs. And we have a [neural net that's been trained to distinguish them](https://writings.stephenwolfram.com/2015/05/wolfram-language-artificial-intelligence-the-image-identification-project/). Here's what it might do on some examples:

让我们举一个更复杂的例子。假设我们有猫和狗的图像。我们有一个经过训练来区分它们的神经网络。以下是它在一些例子上可能做的事:

![](https://image.cubox.pro/cardImg/305xkkjr338jh7eye7fxnrl73lrvovjzu5byihns1xctfws3dl.png?imageMogr2/quality/90/ignore-error/1)

Now it's even less clear what the "right answer" is. What about a dog dressed in a cat suit? Etc. Whatever input it's given the neural net will generate an answer, and in a way reasonably consistent with how humans might. As I've said above, that's not a fact we can "derive from first principles". It's just something that's empirically been found to be true, at least in certain domains. But it's a key reason why neural nets are useful: that they somehow capture a "human-like" way of doing things.

现在"正确答案"是什么就更不清楚了。穿着猫套装的狗怎么办?等等。无论给它什么输入,神经网络都会生成一个答案,而且在某种程度上与人类可能的方式相当一致。正如我上面所说,这不是我们可以"从第一原理推导出来"的事实。这只是经验上被发现是真实的,至少在某些领域是如此。但这是神经网络有用的一个关键原因:它们以某种方式捕捉了一种"类人"的做事方式。

Show yourself a picture of a cat, and ask "Why is that a cat?". Maybe you'd start saying "Well, I see its pointy ears, etc." But it's not very easy to explain how you recognized the image as a cat. It's just that somehow your brain figured that out. But for a brain there's no way (at least yet) to "go inside" and see how it figured it out. What about for an (artificial) neural net? Well, it's straightforward to see what each "neuron" does when you show a picture of a cat. But even to get a basic visualization is usually very difficult.

给自己看一张猫的图片,然后问"为什么那是一只猫?"。也许你会开始说"嗯,我看到它尖尖的耳朵,等等。"但要解释你是如何识别出这个图像是猫并不容易。只是你的大脑以某种方式弄清楚了。但对于大脑来说,还没有办法"进入内部"看它是如何弄清楚的。那么对于(人工)神经网络呢?嗯,看每个"神经元"在你展示猫的图片时做什么是很简单的。但即使获得基本的可视化通常也非常困难。

In the final net that we used for the "nearest point" problem above there are 17 neurons. In the net for recognizing handwritten digits there are 2190. And in the net we're using to recognize cats and dogs there are 60,650. Normally it would be pretty difficult to visualize what amounts to 60,650-dimensional space. But because this is a network set up to deal with images, many of its layers of neurons are organized into arrays, like the arrays of pixels it's looking at.

在我们上面用于"最近点"问题的最终网络中有 17 个神经元。在识别手写数字的网络中有 2190 个。在我们用来识别猫和狗的网络中有 60,650 个。通常,可视化相当于 60,650 维空间的东西会非常困难。但因为这是一个设置来处理图像的网络,它的许多神经元层被组织成数组,就像它所看的像素数组一样。

And if we take a typical cat image

如果我们取一个典型的猫图像

![](https://image.cubox.pro/cardImg/fbfnj3y2kv0mj37bc6entm2r4bws9lups85pd3r5klrp4ijl0.png?imageMogr2/quality/90/ignore-error/1 "Cat")

then we can represent the states of neurons at the first layer by a collection of derived images---many of which we can readily interpret as being things like "the cat without its background", or "the outline of the cat":

然后我们可以通过一系列派生图像来表示第一层神经元的状态 - 其中许多我们可以很容易地解释为类似"没有背景的猫"或"猫的轮廓"这样的东西:

![](https://image.cubox.pro/cardImg/4rg7084dsltzzcyoq0d06d9f84w2i246c3d9lsafyrijaz24xk.png?imageMogr2/quality/90/ignore-error/1)

By the 10th layer it's harder to interpret what's going on:

到第 10 层,解释正在发生的事情变得更加困难:

![](https://image.cubox.pro/cardImg/tbwzbg68dxb7t4gigvptnvfz4urizscc865mo0d1f4144cokh.png?imageMogr2/quality/90/ignore-error/1)

But in general we might say that the neural net is "picking out certain features" (maybe pointy ears are among them), and using these to determine what the image is of. But are those features ones for which we have names---like "pointy ears"? Mostly not.

但总的来说,我们可以说神经网络正在"挑选某些特征"(也许尖耳朵就在其中),并使用这些来确定图像是什么。但这些特征是我们有名字的吗 - 比如"尖耳朵"?大多数不是。

Are our brains using similar features? Mostly we don't know. But it's notable that the first few layers of a neural net like the one we're showing here seem to pick out aspects of images (like edges of objects) that seem to be similar to ones we know are picked out by the first level of visual processing in brains.

我们的大脑是否使用类似的特征?我们大多不知道。但值得注意的是,像我们在这里展示的这种神经网络的前几层似乎挑选出了图像的某些方面(如物体的边缘),这些方面似乎与我们知道在大脑中视觉处理的第一层挑选出的特征相似。

But let's say we want a "theory of cat recognition" in neural nets. We can say: "Look, this particular net does it"---and immediately that gives us some sense of "how hard a problem" it is (and, for example, how many neurons or layers might be needed). But at least as of now we don't have a way to "give a narrative description" of what the network is doing. And maybe that's because it truly is computationally irreducible, and there's no general way to find what it does except by explicitly tracing each step. Or maybe it's just that we haven't "figured out the science", and identified the "natural laws" that allow us to summarize what's going on.

但是,假设我们想要一个神经网络中的"猫识别理论"。我们可以说:"看,这个特定的网络做到了" - 这立即给了我们一些关于"这是一个多么困难的问题"的感觉(例如,可能需要多少神经元或层)。但至少到目前为止,我们还没有办法"给出一个叙述性的描述"来说明网络在做什么。也许这是因为它确实是计算不可约的,除了明确追踪每一步之外,没有一般的方法来找出它做了什么。或者也许只是因为我们还没有"弄清楚科学",没有识别出允许我们总结正在发生的事情的"自然法则"。

We'll encounter the same kinds of issues when we talk about generating language with ChatGPT. And again it's not clear whether there are ways to "summarize what it's doing". But the richness and detail of language (and our experience with it) may allow us to get further than with images.

当我们谈论用 ChatGPT 生成语言时,我们会遇到同样类型的问题。再次,不清楚是否有办法"总结它在做什么"。但语言的丰富性和细节(以及我们对它的经验)可能允许我们比图像更进一步。

## Machine Learning, and the Training of Neural Nets

We've been talking so far about neural nets that "already know" how to do particular tasks. But what makes neural nets so useful (presumably also in brains) is that not only can they in principle do all sorts of tasks, but they can be incrementally "trained from examples" to do those tasks.

到目前为止,我们一直在讨论"已经知道"如何执行特定任务的神经网络。但是使神经网络如此有用的原因(大概在大脑中也是如此)是,它们不仅原则上可以执行各种任务,而且可以通过"从例子中训练"来逐步学习执行这些任务。

When we make a neural net to distinguish cats from dogs we don't effectively have to write a program that (say) explicitly finds whiskers; instead we just show lots of examples of what's a cat and what's a dog, and then have the network "machine learn" from these how to distinguish them.

当我们制作一个神经网络来区分猫和狗时,我们实际上不必编写一个(比如说)明确找出胡须的程序;相反,我们只需展示大量什么是猫和什么是狗的例子,然后让网络从这些例子中"机器学习"如何区分它们。

And the point is that the trained network "generalizes" from the particular examples it's shown. Just as we've seen above, it isn't simply that the network recognizes the particular pixel pattern of an example cat image it was shown; rather it's that the neural net somehow manages to distinguish images on the basis of what we consider to be some kind of "general catness".

重点是,训练好的网络从它被展示的特定例子中"泛化"。正如我们上面看到的,它不仅仅是网络识别它被展示的示例猫图像的特定像素模式;相反,神经网络以某种方式设法根据我们认为是某种"一般的猫性"来区分图像。

So how does neural net training actually work? Essentially what we're always trying to do is to find weights that make the neural net successfully reproduce the examples we've given. And then we're relying on the neural net to "interpolate" (or "generalize") "between" these examples in a "reasonable" way.

那么神经网络训练实际上是如何工作的呢?本质上,我们总是试图找到使神经网络成功复制我们给出的例子的权重。然后我们依靠神经网络以"合理"的方式在这些例子之间"插值"(或"泛化")。

Let's look at a problem even simpler than the nearest-point one above. Let's just try to get a neural net to learn the function:

让我们看一个比上面最近点问题更简单的问题。让我们试着让一个神经网络学习这个函数:

![](https://image.cubox.pro/cardImg/2k4he06ln7nsoq01q5ly58s1q3aqrii9njfpg051l5rwo930bv.png?imageMogr2/quality/90/ignore-error/1)

For this task, we'll need a network that has just one input and one output, like:

对于这个任务,我们需要一个只有一个输入和一个输出的网络,像这样:

![](https://image.cubox.pro/cardImg/3cn4m7yvy161nhtbic20jecy3ljz06nk184s0bc3eok1iynlg5.png?imageMogr2/quality/90/ignore-error/1)

But what weights, etc. should we be using? With every possible set of weights the neural net will compute some function. And, for example, here's what it does with a few randomly chosen sets of weights:

但我们应该使用什么权重等?对于每一组可能的权重,神经网络都会计算某个函数。例如,这里是它用几组随机选择的权重做的事:

![](https://image.cubox.pro/cardImg/uhku89bciv8ln78uhwh1ys4ac2suu1sjhwbu7lm3rksm7726j.png?imageMogr2/quality/90/ignore-error/1)

And, yes, we can plainly see that in none of these cases does it get even close to reproducing the function we want. So how do we find weights that will reproduce the function?

是的,我们可以清楚地看到,在这些情况中,没有一个能接近复制我们想要的函数。那么我们如何找到能复制这个函数的权重呢?

The basic idea is to supply lots of "input → output" examples to "learn from"---and then to try to find weights that will reproduce these examples. Here's the result of doing that with progressively more examples:

基本思想是提供大量的"输入 → 输出"例子来"学习" - 然后尝试找到能复制这些例子的权重。这是用越来越多的例子做这件事的结果:

![](https://image.cubox.pro/cardImg/24e51guzfgw2uizw2ec8nn58wajj6ke6sd2mbytlnsn3yphbk8.png?imageMogr2/quality/90/ignore-error/1)

At each stage in this "training" the weights in the network are progressively adjusted---and we see that eventually we get a network that successfully reproduces the function we want. So how do we adjust the weights? The basic idea is at each stage to see "how far away we are" from getting the function we want---and then to update the weights in such a way as to get closer.

在这个"训练"的每个阶段,网络中的权重都会逐步调整 - 我们看到最终我们得到了一个成功复制我们想要的函数的网络。那么我们如何调整权重呢?基本思想是在每个阶段看看我们"离得有多远"才能得到我们想要的函数 - 然后以一种能让我们更接近的方式更新权重。

To find out "how far away we are" we compute what's usually called a "loss function" (or sometimes "cost function"). Here we're using a simple (L2) loss function that's just the sum of the squares of the differences between the values we get, and the true values. And what we see is that as our training process progresses, the loss function progressively decreases (following a certain "learning curve" that's different for different tasks)---until we reach a point where the network (at least to a good approximation) successfully reproduces the function we want:

为了找出"我们离得有多远",我们计算通常称为"损失函数"(有时称为"成本函数")的东西。这里我们使用一个简单的(L2)损失函数,它只是我们得到的值与真实值之间差异的平方和。我们看到,随着我们的训练过程的进行,损失函数逐渐减少(遵循不同任务的不同"学习曲线") - 直到我们达到一个点,网络(至少在很好的近似下)成功地复制了我们想要的函数:

![](https://image.cubox.pro/cardImg/2i766qwmc7wxzyv3vfjghlusv1rii7lwsfi7b3t6c1lq4cocwd.png?imageMogr2/quality/90/ignore-error/1)

Alright, so the last essential piece to explain is how the weights are adjusted to reduce the loss function. As we've said, the loss function gives us a "distance" between the values we've got, and the true values. But the "values we've got" are determined at each stage by the current version of neural net---and by the weights in it. But now imagine that the weights are variables---say wi. We want to find out how to adjust the values of these variables to minimize the loss that depends on them.

好的,最后一个需要解释的重要部分是如何调整权重以减少损失函数。正如我们所说,损失函数给出了我们得到的值和真实值之间的"距离"。但"我们得到的值"在每个阶段都是由当前版本的神经网络 - 以及其中的权重 - 决定的。但现在想象权重是变量 - 比如说 wi。我们想找出如何调整这些变量的值来最小化依赖于它们的损失。

For example, imagine (in an incredible simplification of typical neural nets used in practice) that we have just two weights w1 and w2. Then we might have a loss that as a function of w1 and w2 looks like this:

例如,想象(这是对实践中使用的典型神经网络的极大简化)我们只有两个权重 w_1 和 w_2。那么我们可能有一个作为 w1 和 w2 函数的损失,看起来像这样:

![](https://image.cubox.pro/cardImg/2grjqe37izmwajwmb17253gc4tedch1sgyqbepabvfqv6qbbob.png?imageMogr2/quality/90/ignore-error/1)

Numerical analysis provides a variety of techniques for finding the minimum in cases like this. But a typical approach is just to progressively follow the path of steepest descent from whatever previous w1, w2 we had:

数值分析提供了各种技术来在这样的情况下找到最小值。但一个典型的方法就是从我们之前的任何 w1, w2 开始,逐步沿着最陡下降的路径:

![](https://image.cubox.pro/cardImg/33jr1ui1dghlq7bcgm4mg736v7lahyelhjvk7jstmdws0ee3h9.png?imageMogr2/quality/90/ignore-error/1)

Like water flowing down a mountain, all that's guaranteed is that this procedure will end up at some local minimum of the surface ("a mountain lake"); it might well not reach the ultimate global minimum.

就像水从山上流下来一样,这个过程唯一保证的是它最终会到达表面的某个局部最小值("山中湖");它很可能不会达到最终的全局最小值。

It's not obvious that it would be feasible to find the path of the steepest descent on the "weight landscape". But calculus comes to the rescue. As we mentioned above, one can always think of a neural net as computing a mathematical function---that depends on its inputs, and its weights. But now consider differentiating with respect to these weights. It turns out that the chain rule of calculus in effect lets us "unravel" the operations done by successive layers in the neural net. And the result is that we can---at least in some local approximation---"invert" the operation of the neural net, and progressively find weights that minimize the loss associated with the output.

在"权重景观"上找到最陡下降的路径并不明显是可行的。但微积分来救场了。正如我们上面提到的,人们总是可以把神经网络看作是在计算一个数学函数 - 这个函数依赖于它的输入和权重。但现在考虑对这些权重进行微分。事实证明,微积分的链式法则实际上让我们可以"解开"神经网络中连续层所做的操作。结果是我们可以 - 至少在某种局部近似中 - "反转"神经网络的操作,并逐步找到使与输出相关的损失最小化的权重。

The picture above shows the kind of minimization we might need to do in the unrealistically simple case of just 2 weights. But it turns out that even with many more weights (ChatGPT uses 175 billion) it's still possible to do the minimization, at least to some level of approximation. And in fact the big breakthrough in "deep learning" that occurred around 2011 was associated with the discovery that in some sense it can be easier to do (at least approximate) minimization when there are lots of weights involved than when there are fairly few.

上面的图片显示了我们可能需要在不切实际的简单情况下(只有 2 个权重)进行的最小化类型。但事实证明,即使有更多的权重(ChatGPT 使用 1750 亿),仍然可以进行最小化,至少在某种程度的近似下。事实上,2011 年左右发生的"深度学习"的重大突破与这样一个发现有关:在某种意义上,当涉及大量权重时,进行(至少是近似的)最小化可能比涉及相当少的权重时更容易。

In other words---somewhat counterintuitively---it can be easier to solve more complicated problems with neural nets than simpler ones. And the rough reason for this seems to be that when one has a lot of "weight variables" one has a high-dimensional space with "lots of different directions" that can lead one to the minimum---whereas with fewer variables it's easier to end up getting stuck in a local minimum ("mountain lake") from which there's no "direction to get out".

换句话说 - 有点违反直觉 - 用神经网络解决更复杂的问题可能比解决更简单的问题更容易。这似乎的粗略原因是,当一个人有很多"权重变量"时,就有一个高维空间,有"许多不同的方向"可以引导一个人到达最小值 - 而当变量较少时,更容易最终陷入局部最小值("山中湖"),从中没有"出去的方向"。

It's worth pointing out that in typical cases there are many different collections of weights that will all give neural nets that have pretty much the same performance. And usually in practical neural net training there are lots of random choices made---that lead to "different-but-equivalent solutions", like these:

值得指出的是,在典型情况下,有许多不同的权重集合都会给出性能几乎相同的神经网络。通常在实际的神经网络训练中,会做出很多随机选择 - 导致"不同但等效的解决方案",像这些:

![](https://image.cubox.pro/cardImg/dq0yty0ozjvv333d19zzd7gffdrm2r940iyqggrucgkhwf9su.png?imageMogr2/quality/90/ignore-error/1)

But each such "different solution" will have at least slightly different behavior. And if we ask, say, for an "extrapolation" outside the region where we gave training examples, we can get dramatically different results:

但每个这样的"不同解决方案"至少会有稍微不同的行为。如果我们要求,比如说,在我们给出训练例子的区域之外进行"外推",我们可能会得到截然不同的结果:

![](https://image.cubox.pro/cardImg/663p4hjon5oslgfp0jx9jb6y4wkl6k7ggek55pnroon1el6d5p.png?imageMogr2/quality/90/ignore-error/1)

But which of these is "right"? There's really no way to say. They're all "consistent with the observed data". But they all correspond to different "innate" ways to "think about" what to do "outside the box". And some may seem "more reasonable" to us humans than others.

但这些哪一个是"正确的"?实际上没有办法说。它们都"与观察到的数据一致"。但它们都对应于不同的"天生的"方式来"思考"如何"跳出框框"。有些可能对我们人类来说看起来"更合理"一些。

## The Practice and Lore of Neural Net Training

Particularly over the past decade, there've been many advances in the art of training neural nets. And, yes, it is basically an art. Sometimes---especially in retrospect---one can see at least a glimmer of a "scientific explanation" for something that's being done. But mostly things have been discovered by trial and error, adding ideas and tricks that have progressively built a significant lore about how to work with neural nets.

特别是在过去的十年里,训练神经网络的艺术有了很多进展。是的,这基本上是一门艺术。有时候 - 尤其是事后看来 - 人们可以看到至少一丝"科学解释"的迹象,解释为什么要这样做。但大多数东西都是通过试错发现的,添加了一些想法和技巧,逐步建立了关于如何使用神经网络的重要知识。

There are several key parts. First, there's the matter of what architecture of neural net one should use for a particular task. Then there's the critical issue of how one's going to get the data on which to train the neural net. And increasingly one isn't dealing with training a net from scratch: instead a new net can either directly incorporate another already-trained net, or at least can use that net to generate more training examples for itself.

有几个关键部分。首先,是应该为特定任务使用什么架构的神经网络的问题。然后是如何获得用于训练神经网络的数据这个关键问题。而且越来越多的情况是,人们不是从头开始训练网络:相反,新网络可以直接合并另一个已经训练好的网络,或者至少可以使用该网络为自己生成更多的训练例子。

One might have thought that for every particular kind of task one would need a different architecture of neural net. But what's been found is that the same architecture often seems to work even for apparently quite different tasks. At some level this reminds one of the [idea of universal computation](https://www.wolframscience.com/nks/chap-11--the-notion-of-computation#sect-11-3--the-phenomenon-of-universality) (and my [Principle of Computational Equivalence](https://www.wolframscience.com/nks/chap-12--the-principle-of-computational-equivalence/)), but, as I'll discuss later, I think it's more a reflection of the fact that the tasks we're typically trying to get neural nets to do are "human-like" ones---and neural nets can capture quite general "human-like processes".

人们可能认为,对于每种特定类型的任务,都需要不同架构的神经网络。但发现的是,同样的架构似乎经常适用于看似完全不同的任务。在某种程度上,这让人想起普遍计算的概念(和我的计算等价原理),但正如我稍后将讨论的,我认为这更多地反映了这样一个事实:我们通常试图让神经网络做的任务是"类人"的 - 而神经网络可以捕捉相当普遍的"类人过程"。

In earlier days of neural nets, there tended to be the idea that one should "make the neural net do as little as possible". For example, in [converting speech to text](https://reference.wolfram.com/language/ref/SpeechRecognize.html) it was thought that one should first analyze the audio of the speech, break it into phonemes, etc. But what was found is that---at least for "human-like tasks"---it's usually better just to try to train the neural net on the "end-to-end problem", letting it "discover" the necessary intermediate features, encodings, etc. for itself.

人们认为应该首先分析语音的音频,将其分解为音素等。但发现的是 - 至少对于"类人任务" - 通常最好只是尝试在"端到端问题"上训练神经网络,让它自己"发现"必要的中间特征、编码等。

There was also the idea that one should introduce complicated individual components into the neural net, to let it in effect "explicitly implement particular algorithmic ideas". But once again, this has mostly turned out not to be worthwhile; instead, it's better just to deal with very simple components and let them "organize themselves" (albeit usually in ways we can't understand) to achieve (presumably) the equivalent of those algorithmic ideas.

这并不是说对神经网络没有相关的"结构化思想"。例如,在处理图像的早期阶段,具有局部连接的 2D 神经元阵列似乎至少非常有用。而且,具有集中于"回顾序列"的连接模式似乎很有用 - 正如我们稍后将看到的 - 在处理人类语言等事物时,例如在 ChatGPT 中。

That's not to say that there are no "structuring ideas" that are relevant for neural nets. Thus, for example, having [2D arrays of neurons with local connections](https://reference.wolfram.com/language/ref/ConvolutionLayer.html) seems at least very useful in the early stages of processing images. And having patterns of connectivity that concentrate on "looking back in sequences" seems useful---as we'll see later---in dealing with things like human language, for example in ChatGPT.

But an important feature of neural nets is that---like computers in general---they're ultimately just dealing with data. And current neural nets---with current approaches to neural net training---[specifically deal with arrays of numbers](https://reference.wolfram.com/language/guide/NetEncoderDecoder.html). But in the course of processing, those arrays can be completely rearranged and reshaped. And as an example, [the network we used for identifying digits above](https://resources.wolframcloud.com/NeuralNetRepository/resources/LeNet-Trained-on-MNIST-Data/) starts with a 2D "image-like" array, quickly "thickening" to many channels, but then ["concentrating down" into a 1D array](https://reference.wolfram.com/language/ref/AggregationLayer.html) that will ultimately contain elements representing the different possible output digits:

但神经网络的一个重要特征是 - 像计算机一般 - 它们最终只是处理数据。而当前的神经网络 - 使用当前的神经网络训练方法 - 专门处理数字数组。但在处理过程中,这些数组可以完全重新排列和重塑。例如,我们用于识别上面数字的网络从 2D "类图像"数组开始,迅速"加厚"到许多通道,但然后"集中"到 1D 数组,最终将包含代表不同可能输出数字的元素:

![](https://image.cubox.pro/cardImg/35o5doyo4eufpl9xex5wqysjvwgkdgfc08wb9kqh7o6qp6nobd.png?imageMogr2/quality/90/ignore-error/1)

But, OK, how can one tell how big a neural net one will need for a particular task? It's something of an art. At some level the key thing is to know "how hard the task is". But for human-like tasks that's typically very hard to estimate. Yes, there may be a systematic way to do the task very "mechanically" by computer. But it's hard to know if there are what one might think of as tricks or shortcuts that allow one to do the task at least at a "human-like level" vastly more easily. It might take [enumerating a giant game tree](https://writings.stephenwolfram.com/2022/06/games-and-puzzles-as-multicomputational-systems/) to "mechanically" play a certain game; but there might be a much easier ("heuristic") way to achieve "human-level play".

但是,好的,如何判断一个特定任务需要多大的神经网络呢?这在某种程度上是一门艺术。在某种程度上,关键是要知道"任务有多难"。但对于类人任务,这通常很难估计。是的,可能有一种系统的方法可以通过计算机非常"机械地"完成任务。但很难知道是否存在一些可以被认为是技巧或捷径的东西,允许人们至少在"类人水平"上更容易地完成任务。可能需要枚举一个巨大的游戏树来"机械地"玩某个游戏;但可能有一种更简单的("启发式")方法来实现"人类水平的游戏"。

When one's dealing with tiny neural nets and simple tasks one can sometimes explicitly see that one "can't get there from here". For example, here's the best one seems to be able to do on the task from the previous section with a few small neural nets:

当处理微小的神经网络和简单任务时,人们有时可以明确地看到"从这里无法到达那里"。例如,这里是在前一节的任务上,用几个小型神经网络似乎能做到的最好结果:

![](https://image.cubox.pro/cardImg/1of1s0ww990styi6rv63e397o70z8l56dslks108iccl2jlw10.png?imageMogr2/quality/90/ignore-error/1)

And what we see is that if the net is too small, it just can't reproduce the function we want. But above some size, it has no problem---at least if one trains it for long enough, with enough examples. And, by the way, these pictures illustrate a piece of neural net lore: that one can often get away with a smaller network if there's a "squeeze" in the middle that forces everything to go through a smaller intermediate number of neurons. (It's also worth mentioning that "no-intermediate-layer"---or so-called "[perceptron](https://en.wikipedia.org/wiki/Perceptron)"---networks can only learn essentially linear functions---but as soon as there's even one intermediate layer it's [always in principle possible](https://en.wikipedia.org/wiki/Universal_approximation_theorem) to approximate any function arbitrarily well, at least if one has enough neurons, though to make it feasibly trainable one typically has some kind of [regularization or normalization](https://reference.wolfram.com/language/ref/BatchNormalizationLayer.html).)

我们看到的是,如果网络太小,它就无法复制我们想要的函数。但在某个规模以上,它就没有问题 - 至少如果训练足够长时间,有足够多的例子。顺便说一下,这些图片说明了一个神经网络的知识:如果中间有一个"挤压",迫使所有东西通过较少的中间神经元数量,人们通常可以用更小的网络来解决问题。(也值得一提的是,"无中间层" - 或所谓的"感知器" - 网络只能学习本质上的线性函数 - 但只要有一个中间层,原则上就总是可能任意好地近似任何函数,至少如果有足够多的神经元,尽管为了使其可行地可训练,通常需要某种正则化或归一化。)

OK, so let's say one's settled on a certain neural net architecture. Now there's the issue of getting data to train the network with. And many of the practical challenges around neural nets---and machine learning in general---center on acquiring or preparing the necessary training data. In many cases ("supervised learning") one wants to get explicit examples of inputs and the outputs one is expecting from them. Thus, for example, one might want images tagged by what's in them, or some other attribute. And maybe one will have to explicitly go through---usually with great effort---and do the tagging. But very often it turns out to be possible to piggyback on something that's already been done, or use it as some kind of proxy. And so, for example, one might use alt tags that have been provided for images on the web. Or, in a different domain, one might use closed captions that have been created for videos. Or---for language translation training---one might use parallel versions of webpages or other documents that exist in different languages.

好的,假设已经确定了某种神经网络架构。现在的问题是获取数据来训练网络。神经网络 - 以及机器学习一般 - 周围的许多实际挑战都集中在获取或准备必要的训练数据上。在许多情况下("监督学习"),人们希望获得输入和期望从中得到的输出的明确例子。因此,例如,人们可能希望通过图像中的内容或其他属性来标记图像。也许人们必须明确地经历 - 通常需要付出巨大努力 - 并进行标记。但很多时候,结果证明可以利用已经完成的东西,或将其用作某种代理。因此,例如,人们可能使用为网络上的图像提供的替代文本标签。或者,在不同的领域,人们可能使用为视频创建的闭合字幕。或者 - 对于语言翻译训练 - 人们可能使用不同语言存在的网页或其他文档的并行版本。

How much data do you need to show a neural net to train it for a particular task? Again, it's hard to estimate from first principles. Certainly the requirements can be dramatically reduced by using "transfer learning" to "transfer in" things like lists of important features that have already been learned in another network. But generally neural nets need to "see a lot of examples" to train well. And at least for some tasks it's an important piece of neural net lore that the examples can be incredibly repetitive. And indeed it's a standard strategy to just show a neural net all the examples one has, over and over again. In each of these "training rounds" (or "epochs") the neural net will be in at least a slightly different state, and somehow "reminding it" of a particular example is useful in getting it to "remember that example". (And, yes, perhaps this is analogous to the usefulness of repetition in human memorization.)

你需要向神经网络展示多少数据来训练它完成特定任务?再次,从第一原理估计很难。当然,通过使用"迁移学习"来"转移"已经在另一个网络中学习到的重要特征列表等,可以大大减少需求。但通常神经网络需要"看到很多例子"才能训练好。至少对于某些任务来说,神经网络知识的一个重要部分是,这些例子可能会非常重复。事实上,标准策略就是一遍又一遍地向神经网络展示所有的例子。在每一个这样的"训练轮次"(或"时期")中,神经网络至少会处于略微不同的状态,并且以某种方式"提醒它"一个特定的例子对于让它"记住那个例子"是有用的。(是的,也许这类似于重复在人类记忆中的用处。)

But often just repeating the same example over and over again isn't enough. It's also necessary to show the neural net variations of the example. And it's a feature of neural net lore that those "data augmentation" variations don't have to be sophisticated to be useful. Just slightly modifying images with basic image processing can make them essentially "as good as new" for neural net training. And, similarly, when one's run out of actual video, etc. for training self-driving cars, one can go on and just get data from running simulations in a model videogame-like environment without all the detail of actual real-world scenes.

但是仅仅重复同一个例子一遍又一遍通常是不够的。还需要向神经网络展示例子的变体。神经网络知识的一个特点是,这些"数据增强"变体不需要很复杂就能有用。只需用基本的图像处理稍微修改图像,就可以使它们对神经网络训练来说基本上"如同全新"。同样,当用于训练自动驾驶汽车的实际视频等用完时,可以继续在类似视频游戏的模型环境中运行模拟来获取数据,而不需要所有实际真实世界场景的细节。

How about something like ChatGPT? Well, it has the nice feature that it can do "unsupervised learning", making it much easier to get it examples to train from. Recall that the basic task for ChatGPT is to figure out how to continue a piece of text that it's been given. So to get it "training examples" all one has to do is get a piece of text, and mask out the end of it, and then use this as the "input to train from"---with the "output" being the complete, unmasked piece of text. We'll discuss this more later, but the main point is that---unlike, say, for learning what's in images---there's no "explicit tagging" needed; ChatGPT can in effect just learn directly from whatever examples of text it's given.

那么像 ChatGPT 这样的东西呢?嗯,它有一个很好的特点,就是可以进行"无监督学习",这使得获得训练例子变得容易得多。回想一下,ChatGPT 的基本任务是弄清楚如何继续一段给定的文本。所以要获得"训练例子",只需要获取一段文本,遮掩其结尾,然后将其用作"训练输入" - "输出"是完整的、未遮掩的文本片段。我们稍后会更多地讨论这一点,但主要的点是 - 与学习图像中的内容不同 - 不需要"明确标记";ChatGPT 实际上可以直接从给定的任何文本例子中学习。

OK, so what about the actual learning process in a neural net? In the end it's all about determining what weights will best capture the training examples that have been given. And there are all sorts of detailed choices and "hyperparameter settings" (so called because the weights can be thought of as "parameters") that can be used to tweak how this is done. There are different [choices of loss function](https://reference.wolfram.com/language/ref/CrossEntropyLossLayer.html) (sum of squares, sum of absolute values, etc.). There are different ways to do loss minimization (how far in weight space to move at each step, etc.). And then there are questions like how big a "batch" of examples to show to get each successive estimate of the loss one's trying to minimize. And, yes, one can apply machine learning (as we do, for example, in Wolfram Language) to automate machine learning---and to automatically set things like hyperparameters.

好的,那么神经网络中的实际学习过程呢?最终,这都是关于确定哪些权重能最好地捕捉给定的训练例子。有各种详细的选择和"超参数设置"(之所以这么叫是因为权重可以被认为是"参数")可以用来调整这是如何完成的。有不同的损失函数选择(平方和,绝对值和等)。有不同的方法来进行损失最小化(在每一步中在权重空间中移动多远等)。然后还有一些问题,比如展示多大的"批次"例子来获得每个连续的损失估计,以试图最小化。是的,人们可以应用机器学习(就像我们在 Wolfram 语言中所做的那样)来自动化机器学习 - 并自动设置超参数等。

But in the end the whole process of training can be characterized by seeing how the loss progressively decreases (as in this [Wolfram Language progress monitor for a small training](https://reference.wolfram.com/language/ref/NetTrain.html)):

但最终,整个训练过程可以通过观察损失如何逐步减少来表征(如这个 Wolfram 语言小型训练的进度监视器所示):

![](https://image.cubox.pro/cardImg/1rnntnq8tnhsf1upn7lxp3h2oq7q3b5379g8n2kjini2upv5wx.png?imageMogr2/quality/90/ignore-error/1)

And what one typically sees is that the loss decreases for a while, but eventually flattens out at some constant value. If that value is sufficiently small, then the training can be considered successful; otherwise it's probably a sign one should try changing the network architecture.

人们通常看到的是,损失会减少一段时间,但最终会在某个常数值处趋于平缓。如果该值足够小,那么训练可以被认为是成功的;否则这可能是一个信号,表明应该尝试改变网络架构。

Can one tell how long it should take for the "learning curve" to flatten out? Like for so many other things, there seem to be approximate [power-law scaling relationships](https://arxiv.org/pdf/2001.08361.pdf) that depend on the size of neural net and amount of data one's using. But the general conclusion is that training a neural net is hard---and takes a lot of computational effort. And as a practical matter, the vast majority of that effort is spent doing operations on arrays of numbers, which is what GPUs are good at---which is why neural net training is typically limited by the availability of GPUs.

人们能知道"学习曲线"需要多长时间才能趋于平缓吗?就像许多其他事情一样,似乎存在近似的幂律缩放关系,这取决于神经网络的大小和使用的数据量。但总的结论是,训练神经网络是困难的 - 需要大量的计算努力。作为一个实际问题,绝大多数努力都花在对数字数组进行操作上,这正是 GPU 擅长的 - 这就是为什么神经网络训练通常受到 GPU 可用性的限制。

In the future, will there be fundamentally better ways to train neural nets---or generally do what neural nets do? Almost certainly, I think. The fundamental idea of neural nets is to create a flexible "computing fabric" out of a large number of simple (essentially identical) components---and to have this "fabric" be one that can be incrementally modified to learn from examples. In current neural nets, one's essentially using the ideas of calculus---applied to real numbers---to do that incremental modification. But it's increasingly clear that having high-precision numbers doesn't matter; 8 bits or less might be enough even with current methods.

在未来,是否会有从根本上更好的方法来训练神经网络 - 或者通常做神经网络所做的事?我认为几乎可以肯定。神经网络的基本思想是用大量简单的(本质上相同的)组件创造一个灵活的"计算织物" - 并让这个"织物"能够被逐步修改以从例子中学习。在当前的神经网络中,人们本质上是使用微积分的思想 - 应用于实数 - 来进行这种增量修改。但越来越清楚的是,拥有高精度的数字并不重要;即使使用当前方法,8 位或更少可能就足够了。

With [computational systems like cellular automata](https://www.wolframscience.com/nks/chap-2--the-crucial-experiment#sect-2-1--how-do-simple-programs-behave) that basically operate in parallel on many individual bits it's never been clear [how to do this kind of incremental modification](https://content.wolfram.com/sw-publications/2020/07/approaches-complexity-engineering.pdf), but there's no reason to think it isn't possible. And in fact, much like with the "[deep-learning breakthrough of 2012](https://en.wikipedia.org/wiki/AlexNet)" it may be that such incremental modification will effectively be easier in more complicated cases than in simple ones.

对于基本上在许多单独的位上并行操作的计算系统(如细胞自动机),从来不清楚如何进行这种增量修改,但没有理由认为这是不可能的。事实上,就像"2012 年深度学习突破"一样,这种增量修改在更复杂的情况下可能比在简单情况下更容易实现。

Neural nets---perhaps a bit like brains---are set up to have an essentially fixed network of neurons, with what's modified being the strength ("weight") of connections between them. (Perhaps in at least young brains significant numbers of wholly new connections can also grow.) But while this might be a convenient setup for biology, it's not at all clear that it's even close to the best way to achieve the functionality we need. And something that involves the equivalent of progressive network rewriting (perhaps reminiscent of our [Physics Project](https://www.wolframphysics.org/)) might well ultimately be better.

神经网络 - 也许有点像大脑 - 被设置为具有本质上固定的神经元网络,修改的是它们之间连接的强度("权重")。(也许至少在年轻的大脑中,大量全新的连接也可以生长。)但虽然这对生物学来说可能是一个方便的设置,但完全不清楚它是否接近于实现我们需要的功能的最佳方式。涉及等同于渐进网络重写的东西(也许让人想起我们的物理项目)最终可能会更好。

But even within the framework of existing neural nets there's currently a crucial limitation: neural net training as it's now done is fundamentally sequential, with the effects of each batch of examples being propagated back to update the weights. And indeed with current computer hardware---even taking into account GPUs---most of a neural net is "idle" most of the time during training, with just one part at a time being updated. And in a sense this is because our current computers tend to have memory that is separate from their CPUs (or GPUs). But in brains it's presumably different---with every "memory element" (i.e. neuron) also being a potentially active computational element. And if we could set up our future computer hardware this way it might become possible to do training much more efficiently.

但即使在现有神经网络的框架内,目前也存在一个关键的限制:现在进行的神经网络训练从根本上说是顺序的,每批例子的效果被传播回来更新权重。事实上,即使考虑到 GPU,在当前的计算机硬件上,神经网络的大部分在训练期间大部分时间都是"空闲"的,每次只有一部分被更新。从某种意义上说,这是因为我们当前的计算机倾向于有与 CPU(或 GPU)分离的内存。但在大脑中,情况可能不同 - 每个"记忆元素"(即神经元)也是一个潜在的活跃计算元素。如果我们能以这种方式设置我们未来的计算机硬件,可能就能更有效地进行训练。

## "Surely a Network That's Big Enough Can Do Anything!"

The capabilities of something like ChatGPT seem so impressive that one might imagine that if one could just "keep going" and train larger and larger neural networks, then they'd eventually be able to "do everything". And if one's concerned with things that are readily accessible to immediate human thinking, it's quite possible that this is the case. But the lesson of the past several hundred years of science is that there are things that can be figured out by formal processes, but aren't readily accessible to immediate human thinking.

像 ChatGPT 这样的东西的能力看起来如此令人印象深刻,以至于人们可能会想象,如果能够"继续下去"并训练越来越大的神经网络,那么它们最终将能够"做任何事情"。如果人们关心的是那些容易被人类直接思考所接触到的事物,这很可能是这样的。但过去几百年科学的教训是,有些事情可以通过形式化过程来解决,但不容易被人类直接思考所接触到。

Nontrivial mathematics is one big example. But the general case is really computation. And ultimately the issue is the phenomenon of [computational irreducibility](https://www.wolframscience.com/nks/chap-12--the-principle-of-computational-equivalence#sect-12-6--computational-irreducibility). There are some computations which one might think would take many steps to do, but which can in fact be "reduced" to something quite immediate. But the discovery of computational irreducibility implies that this doesn't always work. And instead there are processes---probably like the one below---where to work out what happens inevitably requires essentially tracing each computational step:

非平凡的数学是一个重要的例子。但一般情况实际上是计算。最终的问题是计算不可约性的现象。有些计算可能看起来需要很多步骤才能完成,但实际上可以"简化"为相当直接的东西。但计算不可约性的发现意味着这并不总是有效的。相反,有一些过程 - 可能像下面这个 - 要弄清楚发生了什么,不可避免地需要基本上追踪每一个计算步骤:

![](https://image.cubox.pro/cardImg/40yycnjw4zdl84ooe1mk356i0creitgigc346jehyyz56r6tcc.png?imageMogr2/quality/90/ignore-error/1)

The kinds of things that we normally do with our brains are presumably specifically chosen to avoid computational irreducibility. It takes special effort to do math in one's brain. And it's in practice largely impossible to "think through" the steps in the operation of any nontrivial program just in one's brain.

我们通常用大脑做的那些事情可能是专门选择来避免计算不可约性的。在大脑中做数学需要特别的努力。在实践中,仅仅在大脑中"思考"任何非平凡程序操作的步骤基本上是不可能的。

But of course for that we have computers. And with computers we can readily do long, computationally irreducible things. And the key point is that there's in general no shortcut for these.

但当然,为此我们有计算机。有了计算机,我们可以轻松地做长期的、计算不可约的事情。关键点是,对于这些事情,通常没有捷径。

Yes, we could memorize lots of specific examples of what happens in some particular computational system. And maybe we could even see some ("computationally reducible") patterns that would allow us to do a little generalization. But the point is that computational irreducibility means that we can never guarantee that the unexpected won't happen---and it's only by explicitly doing the computation that you can tell what actually happens in any particular case.

是的,我们可以记住某个特定计算系统中发生的许多具体例子。也许我们甚至可以看到一些("计算可约的")模式,这些模式允许我们做一些泛化。但关键是,计算不可约性意味着我们永远不能保证意外不会发生 - 只有通过明确地进行计算,你才能知道在任何特定情况下实际发生了什么。

And in the end there's just a fundamental tension between learnability and computational irreducibility. Learning involves in effect [compressing data by leveraging regularities](https://www.wolframscience.com/nks/chap-10--processes-of-perception-and-analysis/). But computational irreducibility implies that ultimately there's a limit to what regularities there may be.

最终,学习能力和计算不可约性之间存在着根本的矛盾。学习实际上涉及通过利用规律性来压缩数据。但计算不可约性意味着最终可能存在的规律性是有限的。

As a practical matter, one can imagine building little computational devices---like cellular automata or Turing machines---into trainable systems like neural nets. And indeed such devices can serve as good "tools" for the neural net---like [Wolfram\|Alpha can be a good tool for ChatGPT](https://writings.stephenwolfram.com/2023/01/wolframalpha-as-the-way-to-bring-computational-knowledge-superpowers-to-chatgpt/). But computational irreducibility implies that one can't expect to "get inside" those devices and have them learn.

作为一个实际问题,人们可以想象将小型计算设备 - 如细胞自动机或图灵机 - 构建到可训练系统(如神经网络)中。事实上,这些设备可以作为神经网络的良好"工具" - 就像 Wolfram|Alpha 可以成为 ChatGPT 的良好工具一样。但计算不可约性意味着人们不能期望"进入"这些设备内部并让它们学习。

Or put another way, there's an ultimate tradeoff between capability and trainability: the more you want a system to make "true use" of its computational capabilities, the more it's going to show computational irreducibility, and the less it's going to be trainable. And the more it's fundamentally trainable, the less it's going to be able to do sophisticated computation.

或者换句话说,能力和可训练性之间存在最终的权衡:你越希望一个系统"真正利用"其计算能力,它就越会表现出计算不可约性,就越不容易训练。而它越是从根本上可训练的,就越不能进行复杂的计算。

(For ChatGPT as it currently is, the situation is actually much more extreme, because the neural net used to generate each token of output is a pure "feed-forward" network, without loops, and therefore has no ability to do any kind of computation with nontrivial "control flow".)

(对于目前的 ChatGPT 来说,情况实际上要极端得多,因为用于生成每个输出标记的神经网络是一个纯粹的"前馈"网络,没有循环,因此无法进行任何具有非平凡"控制流"的计算。)

Of course, one might wonder whether it's actually important to be able to do irreducible computations. And indeed for much of human history it wasn't particularly important. But our modern technological world has been built on engineering that makes use of at least mathematical computations---and increasingly also more general computations. And if we look at the natural world, it's [full of irreducible computation](https://www.wolframscience.com/nks/chap-8--implications-for-everyday-systems/)---that we're slowly understanding how to emulate and use for our technological purposes.

当然,人们可能会想知道能够进行不可约计算是否真的重要。事实上,在人类历史的大部分时间里,这并不特别重要。但我们现代的技术世界是建立在至少利用数学计算 - 并且越来越多地利用更一般的计算 - 的工程基础之上的。如果我们看看自然界,它充满了不可约的计算 - 我们正在慢慢理解如何模拟和利用它们来实现我们的技术目的。

Yes, a neural net can certainly notice the kinds of regularities in the natural world that we might also readily notice with "unaided human thinking". But if we want to work out things that are in the purview of mathematical or computational science the neural net isn't going to be able to do it---unless it effectively "uses as a tool" an "ordinary" computational system.

是的,神经网络当然可以注意到自然界中我们可能也会用"未经辅助的人类思维"容易注意到的那种规律性。但如果我们想要解决那些属于数学或计算科学范畴的事情,神经网络是无法做到的 - 除非它有效地"使用作为工具"一个"普通的"计算系统。

But there's something potentially confusing about all of this. In the past there were plenty of tasks---including writing essays---that we've assumed were somehow "fundamentally too hard" for computers. And now that we see them done by the likes of ChatGPT we tend to suddenly think that computers must have become vastly more powerful---in particular surpassing things they were already basically able to do (like progressively computing the behavior of computational systems like cellular automata).

但所有这些可能会让人感到困惑。在过去,有很多任务 - 包括写文章 - 我们认为对计算机来说在某种程度上"从根本上太难了"。现在我们看到像 ChatGPT 这样的系统能够完成这些任务,我们倾向于突然认为计算机一定变得更加强大 - 特别是超越了它们基本上已经能够做到的事情(比如逐步计算像细胞自动机这样的计算系统的行为)。

But this isn't the right conclusion to draw. Computationally irreducible processes are still computationally irreducible, and are still fundamentally hard for computers---even if computers can readily compute their individual steps. And instead what we should conclude is that tasks---like writing essays---that we humans could do, but we didn't think computers could do, are actually in some sense computationally easier than we thought.

但这不是正确的结论。计算不可约的过程仍然是计算不可约的,对计算机来说仍然从根本上是困难的 - 即使计算机可以轻松地计算它们的各个步骤。相反,我们应该得出的结论是,那些我们人类可以做,但我们认为计算机不能做的任务 - 比如写文章 - 实际上在某种意义上比我们想象的在计算上更容易。

In other words, the reason a neural net can be successful in writing an essay is because writing an essay turns out to be a "computationally shallower" problem than we thought. And in a sense this takes us closer to "having a theory" of how we humans manage to do things like writing essays, or in general deal with language.

换句话说,神经网络能够成功写文章的原因是,写文章原来是一个比我们想象的"计算上更浅"的问题。从某种意义上说,这让我们更接近于"有一个理论"来解释我们人类如何设法做诸如写文章这样的事情,或者一般来说如何处理语言。

If you had a big enough neural net then, yes, you might be able to do whatever humans can readily do. But you wouldn't capture what the natural world in general can do---or that the tools that we've fashioned from the natural world can do. And it's the use of those tools---both practical and conceptual---that have allowed us in recent centuries to transcend the boundaries of what's accessible to "pure unaided human thought", and capture for human purposes more of what's out there in the physical and computational universe.

如果你有一个足够大的神经网络,那么是的,你可能能够做人类可以轻松做到的任何事情。但你不会捕捉到自然界一般可以做的事情 - 或者我们从自然界中塑造的工具可以做的事情。正是这些工具的使用 - 既有实际的也有概念上的 - 使我们在最近几个世纪能够超越"纯粹未经辅助的人类思维"所能达到的界限,并为人类目的捕捉到物理和计算宇宙中更多的东西。

## The Concept of Embeddings

Neural nets---at least as they're currently set up---are fundamentally based on numbers. So if we're going to to use them to work on something like text we'll need a way to [represent our text with numbers](https://reference.wolfram.com/language/guide/NetEncoderDecoder.html). And certainly we could start (essentially as ChatGPT does) by just assigning a number to every word in the dictionary. But there's an important idea---that's for example central to ChatGPT---that goes beyond that. And it's the idea of "embeddings". One can think of an embedding as a way to try to represent the "essence" of something by an array of numbers---with the property that "nearby things" are represented by nearby numbers.

神经网络 - 至少按照它们目前的设置 - 从根本上是基于数字的。所以如果我们要用它们来处理像文本这样的东西,我们需要一种方法来用数字表示我们的文本。当然,我们可以从(本质上像 ChatGPT 那样)为字典中的每个词分配一个数字开始。但有一个重要的想法 - 例如,这是 ChatGPT 的核心 - 超越了这一点。这就是"嵌入"的概念。可以把嵌入看作是一种尝试用一组数字来表示某物"本质"的方法 - 其特性是"相近的事物"由相近的数字表示。

And so, for example, we can think of a word embedding as trying to [lay out words in a kind of "meaning space"](https://reference.wolfram.com/language/ref/FeatureSpacePlot.html) in which words that are somehow "nearby in meaning" appear nearby in the embedding. The actual embeddings that are used---say in ChatGPT---tend to involve large lists of numbers. But if we project down to 2D, we can show examples of how words are laid out by the embedding:

因此,例如,我们可以把词嵌入看作是试图在一种"意义空间"中布置词,在这个空间中,"意义相近"的词在嵌入中出现在附近。实际使用的嵌入 - 比如在 ChatGPT 中 - 往往涉及大量的数字列表。但如果我们投影到 2D,我们可以展示词是如何通过嵌入布置的例子:

![](https://image.cubox.pro/cardImg/36kj3ugztub0cduf7hag6hq5wam1s4v2hkpd42grang9l2wkv4.png?imageMogr2/quality/90/ignore-error/1)

And, yes, what we see does remarkably well in capturing typical everyday impressions. But how can we construct such an embedding? Roughly the idea is to look at large amounts of text (here 5 billion words from the web) and then see "how similar" the "environments" are in which different words appear. So, for example, "alligator" and "crocodile" will often appear almost interchangeably in otherwise similar sentences, and that means they'll be placed nearby in the embedding. But "turnip" and "eagle" won't tend to appear in otherwise similar sentences, so they'll be placed far apart in the embedding.

是的,我们看到的确实很好地捕捉到了典型的日常印象。但我们如何构建这样的嵌入呢?大致的想法是查看大量的文本(这里是来自网络的 50 亿个词),然后看不同词出现的"环境"有多"相似"。例如,"鳄鱼"和"鳄鱼"经常在其他方面相似的句子中几乎可以互换使用,这意味着它们在嵌入中会被放在附近。但"萝卜"和"鹰"不太可能出现在其他方面相似的句子中,所以它们在嵌入中会被放得很远。

But how does one actually implement something like this using neural nets? Let's start by talking about embeddings not for words, but for images. We want to find some way to characterize images by lists of numbers in such a way that "images we consider similar" are assigned similar lists of numbers.

但是如何使用神经网络实际实现这样的东西呢?让我们从讨论不是词而是图像的嵌入开始。我们想找到某种方法用数字列表来表征图像,使得"我们认为相似的图像"被分配相似的数字列表。

How do we tell if we should "consider images similar"? Well, if our images are, say, of handwritten digits we might "consider two images similar" if they are of the same digit. Earlier we discussed a neural net that was trained to recognize handwritten digits. And we can think of this neural net as being set up so that in its final output it puts images into 10 different bins, one for each digit.

我们如何判断应该"认为图像相似"?好吧,如果我们的图像是,比如说,手写数字,如果它们是同一个数字,我们可能会"认为两个图像相似"。早些时候我们讨论了一个训练用来识别手写数字的神经网络。我们可以认为这个神经网络的设置是这样的:在其最终输出中,它将图像放入 10 个不同的箱子中,每个数字一个。

But what if we "intercept" what's going on inside the neural net before the final "it's a '4'" decision is made? We might expect that inside the neural net there are numbers that characterize images as being "mostly 4-like but a bit 2-like" or some such. And the idea is to pick up such numbers to use as elements in an embedding.

但如果我们在最后的"这是一个'4'"决定做出之前"拦截"神经网络内部发生的事情呢?我们可能期望在神经网络内部有一些数字,将图像表征为"主要像 4 但有点像 2"或类似的东西。这个想法是拾取这样的数字作为嵌入的元素。

So here's the concept. Rather than directly trying to characterize "what image is near what other image", we instead consider a well-defined task (in this case digit recognition) for which we can get explicit training data---then use the fact that in doing this task the neural net implicitly has to make what amount to "nearness decisions". So instead of us ever explicitly having to talk about "nearness of images" we're just talking about the concrete question of what digit an image represents, and then we're "leaving it to the neural net" to implicitly determine what that implies about "nearness of images".

所以这里是概念。我们不是直接尝试表征"哪个图像靠近哪个其他图像",而是考虑一个明确定义的任务(在这种情况下是数字识别),我们可以为其获得明确的训练数据 - 然后利用这样一个事实:在执行这个任务时,神经网络隐含地必须做出相当于"接近度决策"的事情。因此,我们不需要明确地谈论"图像的接近度",我们只是在谈论一个图像代表什么数字这个具体问题,然后我们"让神经网络"隐含地确定这意味着什么关于"图像的接近度"。

So how in more detail does this work for the digit recognition network? We can think of the network as consisting of 11 successive layers, that we might summarize iconically like this (with activation functions shown as separate layers):

那么这对数字识别网络的工作原理更详细地说是怎样的呢?我们可以把网络看作由 11 个连续的层组成,我们可以像这样用图标来总结(激活函数显示为单独的层):

![](https://image.cubox.pro/cardImg/2c1j4nmhc8o6s7oyuffyi8acvooxzl0959bb7dtt38cmyqcva0.png?imageMogr2/quality/90/ignore-error/1)

At the beginning we're feeding into the first layer actual images, represented by 2D arrays of pixel values. And at the end---from the last layer---we're getting out an array of 10 values, which we can think of saying "how certain" the network is that the image corresponds to each of the digits 0 through 9.

在开始时,我们将实际图像输入到第一层,这些图像由 2D 像素值数组表示。在最后 - 从最后一层 - 我们得到一个包含 10 个值的数组,我们可以认为这表示网络对图像对应于 0 到 9 中的每个数字的"确定程度"。

Feed in the image ![](https://image.cubox.pro/cardImg/1sbcqk3blrkcq0jbrv1koaoxfdbnwdqz46aic2lah8kjrt808t.png?imageMogr2/quality/90/ignore-error/1)and the values of the neurons in that last layer are:

输入图像 ,最后一层神经元的值是:

![](https://image.cubox.pro/cardImg/2hpupa5ojl7gp2q3743kyerk28el6xzme4z3b0ylz5knbp5z28.png?imageMogr2/quality/90/ignore-error/1)

In other words, the neural net is by this point "incredibly certain" that this image is a 4---and to actually get the output "4" we just have to pick out the position of the neuron with the largest value.

换句话说,神经网络在这一点上"非常确定"这个图像是 4 - 要实际得到输出"4",我们只需要选出值最大的神经元的位置。

But what if we look one step earlier? The very last operation in the network is a so-called [softmax](https://reference.wolfram.com/language/ref/SoftmaxLayer.html) which tries to "force certainty". But before that's been applied the values of the neurons are:

但如果我们往前看一步呢?网络中的最后一个操作是所谓的 softmax,它试图"强制确定性"。但在应用这个之前,神经元的值是:

![](https://image.cubox.pro/cardImg/2nbz4qbwzqamu1c6doj8fjcmz659r95qm86t3z8g41aab35k9l.png?imageMogr2/quality/90/ignore-error/1)

The neuron representing "4" still has the highest numerical value. But there's also information in the values of the other neurons. And we can expect that this list of numbers can in a sense be used to characterize the "essence" of the image---and thus to provide something we can use as an embedding. And so, for example, each of the 4's here has a slightly different "signature" (or "feature embedding")---all very different from the 8's:

代表"4"的神经元仍然有最高的数值。但其他神经元的值中也包含信息。我们可以期望这个数字列表在某种意义上可以用来表征图像的"本质" - 从而提供我们可以用作嵌入的东西。因此,例如,这里的每个 4 都有一个略微不同的"签名"(或"特征嵌入") - 都与 8 非常不同:

![](https://image.cubox.pro/cardImg/5d2q2cseyk31wnbjhajyvwih1herblr73flf6soydge1jleewv.png?imageMogr2/quality/90/ignore-error/1)

Here we're essentially using 10 numbers to characterize our images. But it's often better to use much more than that. And for example in our digit recognition network we can get an array of 500 numbers by tapping into the preceding layer. And this is probably a reasonable array to use as an "image embedding".

这里我们基本上使用 10 个数字来表征我们的图像。但通常使用比这多得多的数字会更好。例如,在我们的数字识别网络中,我们可以通过接入前一层来获得一个 500 个数字的数组。这可能是一个合理的数组,可以用作"图像嵌入"。

If we want to make an explicit visualization of "image space" for handwritten digits we need to "reduce the dimension", effectively by projecting the 500-dimensional vector we've got into, say, 3D space:

如果我们想为手写数字制作一个明确的"图像空间"可视化,我们需要"降低维度",实际上是通过将我们得到的 500 维向量投影到,比如说,3D 空间:

![](https://image.cubox.pro/cardImg/3qpqweds6gl9nx6z4f5cc1jro0g3gxj0e05mzxcvjns45mbc66.png?imageMogr2/quality/90/ignore-error/1)

We've just talked about creating a characterization (and thus embedding) for images based effectively on identifying the similarity of images by determining whether (according to our training set) they correspond to the same handwritten digit. And we can do the same thing much more generally for images if we have a training set that identifies, say, which of 5000 common types of object (cat, dog, chair, ...) each image is of. And in this way we can make an image embedding that's "anchored" by our identification of common objects, but then "generalizes around that" according to the behavior of the neural net. And the point is that insofar as that behavior aligns with how we humans perceive and interpret images, this will end up being an embedding that "seems right to us", and is useful in practice in doing "human-judgement-like" tasks.

我们刚刚讨论了基于通过确定图像是否对应于相同的手写数字(根据我们的训练集)来识别图像的相似性,从而有效地为图像创建表征(因此是嵌入)。如果我们有一个训练集,识别每个图像是 5000 种常见物体类型(猫、狗、椅子...)中的哪一种,我们可以对图像做更一般的同样的事情。通过这种方式,我们可以制作一个图像嵌入,它由我们对常见物体的识别"锚定",然后根据神经网络的行为"围绕它进行泛化"。关键是,只要该行为与我们人类感知和解释图像的方式一致,这最终将成为一个"对我们来说看起来正确"的嵌入,并在实践中对执行"类人判断"任务有用。

OK, so how do we follow the same kind of approach to find embeddings for words? The key is to start from a task about words for which we can readily do training. And the standard such task is "word prediction". Imagine we're given "the *__cat". Based on a large corpus of text (say, the text content of the web), what are the probabilities for different words that might "fill in the blank"? Or, alternatively, given "__* black ___" what are the probabilities for different "flanking words"?

好的,那么我们如何遵循同样的方法来找到词的嵌入呢?关键是从一个我们可以轻松进行训练的关于词的任务开始。标准的这种任务是"词预测"。想象我们被给予"the *__cat"。基于大量的文本语料库(比如说,网络的文本内容),不同的词可能"填空"的概率是多少?或者,另一种方式,给定"__* black ___",不同的"侧翼词"的概率是多少?

How do we set this problem up for a neural net? Ultimately we have to formulate everything in terms of numbers. And one way to do this is just to assign a unique number to each of the 50,000 or so common words in English. So, for example, "the" might be 914, and " cat" (with a space before it) might be 3542. (And these are the actual numbers used by GPT-2.) So for the "the ___ cat" problem, our input might be {914, 3542}. What should the output be like? Well, it should be a list of 50,000 or so numbers that effectively give the probabilities for each of the possible "fill-in" words. And once again, to find an embedding, we want to "intercept" the "insides" of the neural net just before it "reaches its conclusion"---and then pick up the list of numbers that occur there, and that we can think of as "characterizing each word".

我们如何为神经网络设置这个问题?最终我们必须用数字来表述所有东西。一种方法是为英语中大约 50,000 个常用词中的每一个分配一个唯一的数字。例如,"the"可能是 914,而" cat"(前面有一个空格)可能是 3542。(这些实际上是 GPT-2 使用的数字。)所以对于"the ___ cat"问题,我们的输入可能是 {914, 3542}。输出应该是什么样的?嗯,它应该是一个大约 50,000 个数字的列表,有效地给出了每个可能的"填空"词的概率。再一次,为了找到嵌入,我们想在神经网络"得出结论"之前"拦截"其"内部" - 然后拾取那里出现的数字列表,我们可以认为这些数字"表征了每个词"。

OK, so what do those characterizations look like? Over the past 10 years there've been a sequence of different systems developed ([word2vec](https://resources.wolframcloud.com/NeuralNetRepository/resources/ConceptNet-Numberbatch-Word-Vectors-V17.06/), [GloVe](https://resources.wolframcloud.com/NeuralNetRepository/search/?i=GloVe), [BERT](https://resources.wolframcloud.com/NeuralNetRepository/search/?i=BERT), [GPT](https://resources.wolframcloud.com/NeuralNetRepository/resources/GPT2-Transformer-Trained-on-WebText-Data/), ...), each based on a different neural net approach. But ultimately all of them take words and characterize them by lists of hundreds to thousands of numbers.

好的,那么这些表征看起来是什么样的?在过去的 10 年里,已经开发了一系列不同的系统(word2vec, GloVe, BERT, GPT, ...),每一个都基于不同的神经网络方法。但最终它们都是取词并用数百到数千个数字的列表来表征它们。

In their raw form, these "embedding vectors" are quite uninformative. For example, here's what GPT-2 produces as the raw embedding vectors for three specific words:

在它们的原始形式中,这些"嵌入向量"相当无信息。例如,这是 GPT-2 为三个特定词产生的原始嵌入向量:

![](https://image.cubox.pro/cardImg/2h4g15zbvmku6kf4vlkquep62b3wva7g6rihnjrjhyntxvoy7r.png?imageMogr2/quality/90/ignore-error/1)

If we do things like measure distances between these vectors, then we can find things like "nearnesses" of words. Later we'll discuss in more detail what we might consider the "cognitive" significance of such embeddings. But for now the main point is that we have a way to usefully turn words into "neural-net-friendly" collections of numbers.

如果我们做一些事情,比如测量这些向量之间的距离,那么我们可以找到诸如词的"接近度"之类的东西。稍后我们将更详细地讨论我们可能认为这种嵌入的"认知"意义是什么。但现在主要的点是,我们有一种方法可以有用地将词转化为"神经网络友好"的数字集合。

But actually we can go further than just characterizing words by collections of numbers; we can also do this for sequences of words, or indeed whole blocks of text. And inside ChatGPT that's how it's dealing with things. It takes the text it's got so far, and generates an embedding vector to represent it. Then its goal is to find the probabilities for different words that might occur next. And it represents its answer for this as a list of numbers that essentially give the probabilities for each of the 50,000 or so possible words.

但实际上我们可以超越仅仅用数字集合来表征词;我们也可以为词序列,甚至整块文本做这个。在 ChatGPT 内部,它就是这样处理事情的。它取到目前为止得到的文本,并生成一个嵌入向量来表示它。然后它的目标是找到可能出现的不同词的概率。它将这个答案表示为一个数字列表,这个列表本质上给出了大约 50,000 个可能词中每一个的概率。

(Strictly, ChatGPT does not deal with words, but [rather with "tokens"](https://platform.openai.com/tokenizer)---convenient linguistic units that might be whole words, or might just be pieces like "pre" or "ing" or "ized". Working with tokens makes it easier for ChatGPT to handle rare, compound and non-English words, and, sometimes, for better or worse, to invent new words.)

(严格来说,ChatGPT 不处理词,而是处理"标记" - 方便的语言单位,可能是整个词,也可能只是像"pre"或"ing"或"ized"这样的片段。使用标记使 ChatGPT 更容易处理罕见的、复合的和非英语的词,有时候,不管是好是坏,还可以发明新词。)

## Inside ChatGPT

OK, so we're finally ready to discuss what's inside ChatGPT. And, yes, ultimately, it's a giant neural net---currently a version of the so-called GPT-3 network with 175 billion weights. In many ways this is a neural net very much like the other ones we've discussed. But it's a neural net that's particularly set up for dealing with language. And its most notable feature is a piece of neural net architecture called a "transformer".

好的,所以我们终于准备讨论 ChatGPT 内部是什么了。是的,最终,它是一个巨大的神经网络 - 目前是所谓的 GPT-3 网络的一个版本,有 1750 亿个权重。在很多方面,这是一个非常像我们讨论过的其他神经网络的神经网络。但它是一个特别设置用来处理语言的神经网络。它最显著的特征是一种叫做"transformer"的神经网络架构。

In the first neural nets we discussed above, every neuron at any given layer was basically connected (at least with some weight) to every neuron on the layer before. But this kind of fully connected network is (presumably) overkill if one's working with data that has particular, known structure. And thus, for example, in the early stages of dealing with images, it's typical to use so-called [convolutional neural nets](https://reference.wolfram.com/language/ref/ConvolutionLayer.html) ("convnets") in which neurons are effectively laid out on a grid analogous to the pixels in the image---and connected only to neurons nearby on the grid.

在我们上面讨论的第一个神经网络中,任何给定层的每个神经元基本上都与前一层的每个神经元相连(至少有一些权重)。但如果一个人处理的数据有特定的、已知的结构,这种完全连接的网络(大概)是过度的。因此,例如,在处理图像的早期阶段,通常使用所谓的卷积神经网络("convnets"),其中神经元有效地布置在一个类似于图像中像素的网格上 - 并且只与网格上附近的神经元相连。

The idea of transformers is to do something at least somewhat similar for sequences of tokens that make up a piece of text. But instead of just defining a fixed region in the sequence over which there can be connections, transformers instead introduce the notion of "[attention](https://reference.wolfram.com/language/ref/AttentionLayer.html)"---and the idea of "paying attention" more to some parts of the sequence than others. Maybe one day it'll make sense to just start a generic neural net and do all customization through training. But at least as of now it seems to be critical in practice to "modularize" things---as transformers do, and probably as our brains also do.

Transformer 的理念是针对组成一段文本的标记序列执行至少某种程度上类似的操作。但 Transformer 并非仅仅在序列中定义一个可以建立连接的固定区域，而是引入了“[注意力](https://reference.wolfram.com/language/ref/AttentionLayer.html)”的概念，以及“更多地关注”序列的某些部分而不是其他部分的想法。也许有一天，只需启动一个通用神经网络并通过训练进行所有定制就会变得有意义。但至少到目前为止，在实践中，“模块化”事物似乎至关重要——Transformer 就是这样做的，我们的大脑可能也是如此。

OK, so what does ChatGPT (or, rather, the GPT-3 network on which it's based) actually do? Recall that its overall goal is to continue text in a "reasonable" way, based on what it's seen from the training it's had (which consists in looking at billions of pages of text from the web, etc.) So at any given point, it's got a certain amount of text---and its goal is to come up with an appropriate choice for the next token to add.

好的,那么 ChatGPT(或者更确切地说,它所基于的 GPT-3 网络)实际上做什么呢?回想一下,它的总体目标是以一种"合理"的方式继续文本,基于它从训练中看到的内容(这包括查看来自网络等的数十亿页文本)。所以在任何给定的点,它都有一定量的文本 - 它的目标是为下一个要添加的标记提出一个适当的选择。

It operates in three basic stages. First, it takes the sequence of tokens that corresponds to the text so far, and finds an embedding (i.e. an array of numbers) that represents these. Then it operates on this embedding---in a "standard neural net way", with values "rippling through" successive layers in a network---to produce a new embedding (i.e. a new array of numbers). It then takes the last part of this array and generates from it an array of about 50,000 values that turn into probabilities for different possible next tokens. (And, yes, it so happens that there are about the same number of tokens used as there are common words in English, though only about 3000 of the tokens are whole words, and the rest are fragments.)

它在三个基本阶段操作。首先,它取对应于到目前为止的文本的标记序列,并找到一个表示这些的嵌入(即一个数字数组)。然后它对这个嵌入进行操作 - 以"标准神经网络方式",值在网络的连续层中"波动" - 以产生一个新的嵌入(即一个新的数字数组)。然后它取这个数组的最后部分,并从中生成一个约 50,000 个值的数组,这些值转化为不同可能的下一个标记的概率。(是的,恰好使用的标记数量与英语中常用词的数量大致相同,尽管只有大约 3000 个标记是完整的词,其余的是片段。)

A critical point is that every part of this pipeline is implemented by a neural network, whose weights are determined by end-to-end training of the network. In other words, in effect nothing except the overall architecture is "explicitly engineered"; everything is just "learned" from training data.

一个关键点是,这个管道的每个部分都是由神经网络实现的,其权重由网络的端到端训练决定。换句话说,实际上除了整体架构之外,没有什么是"明确设计"的;一切都只是从训练数据中"学习"的。

There are, however, plenty of details in the way the architecture is set up---reflecting all sorts of experience and neural net lore. And---even though this is definitely going into the weeds---I think it's useful to talk about some of those details, not least to get a sense of just what goes into building something like ChatGPT.

然而,在架构的设置方式中有很多细节 - 反映了各种经验和神经网络知识。即使这肯定是深入细节 - 我认为谈论其中的一些细节是有用的,至少可以了解构建像 ChatGPT 这样的东西需要什么。

First comes the embedding module. Here's a schematic Wolfram Language representation for it for GPT-2:

首先是嵌入模块。这是 GPT-2 的 Wolfram 语言示意图表示:

![](https://image.cubox.pro/cardImg/19rnp6jlg1ayph39s8gdek87xrtrljsb890l7dmhtrwf9dh3cg.png?imageMogr2/quality/90/ignore-error/1)

The input is a [vector of *n* tokens](https://reference.wolfram.com/language/ref/netencoder/SubwordTokens.html) (represented as in the previous section by integers from 1 to about 50,000). Each of these tokens is converted (by a [single-layer neural net](https://reference.wolfram.com/language/ref/EmbeddingLayer.html)) into an embedding vector (of length 768 for GPT-2 and 12,288 for ChatGPT's GPT-3). Meanwhile, there's a "secondary pathway" that takes the [sequence of (integer) positions](https://reference.wolfram.com/language/ref/SequenceIndicesLayer.html) for the tokens, and from these integers creates another embedding vector. And finally the embedding vectors from the token value and the token position are [added together](https://reference.wolfram.com/language/ref/ThreadingLayer.html)---to produce the final sequence of embedding vectors from the embedding module.

输入是 n 个标记的向量(如前一节所述,用从 1 到大约 50,000 的整数表示)。这些标记中的每一个都被转换(通过一个单层神经网络)成一个嵌入向量(GPT-2 的长度为 768,ChatGPT 的 GPT-3 的长度为 12,288)。同时,有一个"次要路径"取标记的(整数)位置序列,并从这些整数创建另一个嵌入向量。最后,来自标记值和标记位置的嵌入向量被加在一起 - 以产生嵌入模块的最终嵌入向量序列。

Why does one just add the token-value and token-position embedding vectors together? I don't think there's any particular science to this. It's just that various different things have been tried, and this is one that seems to work. And it's part of the lore of neural nets that---in some sense---so long as the setup one has is "roughly right" it's usually possible to home in on details just by doing sufficient training, without ever really needing to "understand at an engineering level" quite how the neural net has ended up configuring itself.

为什么要把标记值和标记位置的嵌入向量简单地加在一起?我认为这没有什么特别的科学依据。只是尝试了各种不同的方法,这是一种似乎有效的方法。这是神经网络知识的一部分 - 在某种意义上 - 只要设置"大致正确",通常可以通过足够的训练来确定细节,而不需要真正"在工程层面上理解"神经网络最终是如何配置自己的。

Here's what the embedding module does, operating on the string *hello hello hello hello hello hello hello hello hello hello bye bye bye bye bye bye bye bye bye bye*:

这是嵌入模块对字符串 hello hello hello hello hello hello hello hello hello hello bye bye bye bye bye bye bye bye bye bye 进行操作的结果:

![](https://image.cubox.pro/cardImg/15ckt8i1jrwqiyfbsd4n48dfvcwogr5u41qmdtrvdc97c4kf43.png?imageMogr2/quality/90/ignore-error/1)

The elements of the embedding vector for each token are shown down the page, and across the page we see first a run of "*hello* " embeddings, followed by a run of "*bye*" ones. The second array above is the positional embedding---with its somewhat-random-looking structure being just what "happened to be learned" (in this case in GPT-2).

每个标记的嵌入向量的元素沿页面向下显示,在页面上我们首先看到一系列"hello"嵌入,然后是一系列"bye"嵌入。上面的第二个数组是位置嵌入 - 其看起来有些随机的结构只是"碰巧学到的"(在这种情况下是在 GPT-2 中)。

OK, so after the embedding module comes the "main event" of the transformer: a sequence of so-called "attention blocks" (12 for GPT-2, 96 for ChatGPT's GPT-3). It's all pretty complicated---and reminiscent of typical large hard-to-understand engineering systems, or, for that matter, biological systems. But anyway, here's a schematic representation of a single "attention block" (for GPT-2):

好的,在嵌入模块之后是 transformer 的"主要事件":一系列所谓的"注意力块"(GPT-2 有 12 个,ChatGPT 的 GPT-3 有 96 个)。这一切都相当复杂 - 让人想起典型的大型难以理解的工程系统,或者说,生物系统。但无论如何,这里是单个"注意力块"的示意图表示(对于 GPT-2):

![](https://image.cubox.pro/cardImg/5guyvjxd988xmm66lmio4c7wn9atb6ei1jo202zwmhucr1ngot.png?imageMogr2/quality/90/ignore-error/1)

Within each such attention block there are a collection of "attention heads" (12 for GPT-2, 96 for ChatGPT's GPT-3)---each of which operates independently on different chunks of values in the embedding vector. (And, yes, we don't know any particular reason why it's a good idea to split up the embedding vector, or what the different parts of it "mean"; this is just one of those things that's been "found to work".)

在每个这样的注意力块内,有一组"注意力头"(GPT-2 有 12 个,ChatGPT 的 GPT-3 有 96 个) - 每个头独立地对嵌入向量中的不同值块进行操作。(是的,我们不知道为什么分割嵌入向量是个好主意,或者它的不同部分"意味着"什么;这只是那些"被发现有效"的事情之一。)

OK, so what do the attention heads do? Basically they're a way of "looking back" in the sequence of tokens (i.e. in the text produced so far), and "packaging up the past" in a form that's useful for finding the next token. [In the first section above](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/#its-just-adding-one-word-at-a-time) we talked about using 2-gram probabilities to pick words based on their immediate predecessors. What the "attention" mechanism in transformers does is to allow "attention to" even much earlier words---thus potentially capturing the way, say, verbs can refer to nouns that appear many words before them in a sentence.

好的,那么注意力头做什么呢?基本上,它们是一种在标记序列中(即到目前为止产生的文本中)"回顾"的方式,并以一种对找到下一个标记有用的形式"打包过去"。在上面的第一节中,我们讨论了使用 2-gram 概率根据它们的直接前任来选择词。transformer 中的"注意力"机制所做的是允许"注意"甚至更早的词 - 从而可能捕捉到,比如说,动词可以指代在句子中出现在它们之前很多词的名词的方式。

At a more detailed level, what an attention head does is to recombine chunks in the embedding vectors associated with different tokens, with certain weights. And so, for example, the 12 attention heads in the first attention block (in GPT-2) have the following ("look-back-all-the-way-to-the-beginning-of-the-sequence-of-tokens") patterns of "recombination weights" for the "*hello* , *bye*" string above:

在更详细的层面上,注意力头所做的是重新组合与不同标记相关的嵌入向量中的块,具有某些权重。因此,例如,第一个注意力块中的 12 个注意力头(在 GPT-2 中)对上面的"hello, bye"字符串有以下("一直回顾到标记序列开始"的)"重组权重"模式:

![](https://image.cubox.pro/cardImg/4yo4ds6om6p8jlvghalg8tsg0ml7qup55bbtgnkjqumrzr3xxr.png?imageMogr2/quality/90/ignore-error/1)

After being processed by the attention heads, the resulting "re-weighted embedding vector" (of length 768 for GPT-2 and length 12,288 for ChatGPT's GPT-3) is passed through a standard ["fully connected" neural net layer](https://reference.wolfram.com/language/ref/LinearLayer.html). It's hard to get a handle on what this layer is doing. But here's a plot of the 768×768 matrix of weights it's using (here for GPT-2):

在被注意力头处理后,结果的"重新加权嵌入向量"(GPT-2 的长度为 768,ChatGPT 的 GPT-3 的长度为 12,288)通过一个标准的"全连接"神经网络层。很难掌握这一层在做什么。但这里是它使用的 768×768 权重矩阵的图(这里是 GPT-2 的):

![](https://image.cubox.pro/cardImg/13qs0rqirruwl90cs1bg8msy4pc65wby3zh5alkcgexlyn93z6.png?imageMogr2/quality/90/ignore-error/1)

Taking 64×64 moving averages, some (random-walk-ish) structure begins to emerge:

取 64×64 移动平均,一些(类似随机游走的)结构开始出现:

![](https://image.cubox.pro/cardImg/1kzt1wp7a7e6vcbr465dvzczlam2hkyqdg3b7i5u7lpq75k1lg.png?imageMogr2/quality/90/ignore-error/1)

What determines this structure? Ultimately it's presumably some "neural net encoding" of features of human language. But as of now, what those features might be is quite unknown. In effect, we're "opening up the brain of ChatGPT" (or at least GPT-2) and discovering, yes, it's complicated in there, and we don't understand it---even though in the end it's producing recognizable human language.

是什么决定了这种结构?最终,它可能是人类语言特征的某种"神经网络编码"。但到目前为止,这些特征可能是什么还完全未知。实际上,我们正在"打开 ChatGPT 的大脑"(或至少是 GPT-2 的),并发现,是的,里面很复杂,我们不理解它 - 尽管最终它产生了可识别的人类语言。

OK, so after going through one attention block, we've got a new embedding vector---which is then successively passed through additional attention blocks (a total of 12 for GPT-2; 96 for GPT-3). Each attention block has its own particular pattern of "attention" and "fully connected" weights. Here for GPT-2 are the sequence of attention weights for the "hello, bye" input, for the first attention head:

好的,所以在经过一个注意力块之后,我们得到了一个新的嵌入向量 - 然后它依次通过额外的注意力块(GPT-2 总共 12 个;GPT-3 有 96 个)。每个注意力块都有自己特定的"注意力"和"全连接"权重模式。这里是 GPT-2 对"hello, bye"输入的第一个注意力头的注意力权重序列:

![](https://image.cubox.pro/cardImg/5cy6xfwx3o5kfqyett4j1gp7k5rdpfp8flik1ng5tfp95o5wqe.png?imageMogr2/quality/90/ignore-error/1)

And here are the (moving-averaged) "matrices" for the fully connected layers:

这里是全连接层的(移动平均)"矩阵":

![](https://image.cubox.pro/cardImg/2af2pp0myq3q1hnnxh56crezv0mwx1nxznhgb2rowdasht74c.png?imageMogr2/quality/90/ignore-error/1)

Curiously, even though these "matrices of weights" in different attention blocks look quite similar, the distributions of the sizes of weights can be somewhat different (and are not always Gaussian):

有趣的是,尽管不同注意力块中这些"权重矩阵"看起来非常相似,但权重大小的分布可能有些不同(并不总是高斯分布):

![](https://image.cubox.pro/cardImg/48a97cwkh28l4hp3qbbxdd3mixopqu02ahkssyv9zs4il0m6cx.png?imageMogr2/quality/90/ignore-error/1)

So after going through all these attention blocks what is the net effect of the transformer? Essentially it's to transform the original collection of embeddings for the sequence of tokens to a final collection. And the particular way ChatGPT works is then to pick up the last embedding in this collection, and "decode" it to produce a list of probabilities for what token should come next.

所以在经过所有这些注意力块之后,transformer 的净效果是什么?本质上是将标记序列的原始嵌入集合转换为最终集合。ChatGPT 工作的特定方式是然后拾取这个集合中的最后一个嵌入,并"解码"它以产生下一个标记应该是什么的概率列表。

So that's in outline what's inside ChatGPT. It may seem complicated (not least because of its many inevitably somewhat arbitrary "engineering choices"), but actually the ultimate elements involved are remarkably simple. Because in the end what we're dealing with is just a neural net made of "artificial neurons", each doing the simple operation of taking a collection of numerical inputs, and then combining them with certain weights.

所以这就是 ChatGPT 内部的大致情况。它可能看起来很复杂(不仅因为它的许多不可避免的有些任意的"工程选择"),但实际上涉及的最终元素是非常简单的。因为最终我们处理的只是一个由"人工神经元"组成的神经网络,每个神经元都在做简单的操作:接收一组数值输入,然后用某些权重将它们组合起来。

The original input to ChatGPT is an array of numbers (the embedding vectors for the tokens so far), and what happens when ChatGPT "runs" to produce a new token is just that these numbers "ripple through" the layers of the neural net, with each neuron "doing its thing" and passing the result to neurons on the next layer. There's no looping or "going back". Everything just "feeds forward" through the network.

ChatGPT 的原始输入是一个数字数组(到目前为止的标记的嵌入向量),当 ChatGPT "运行"以产生一个新标记时发生的事情只是这些数字通过神经网络的层"波动",每个神经元"做它的事"并将结果传递给下一层的神经元。没有循环或"回头"。一切只是通过网络"前馈"。

It's a very different setup from a typical computational system---like a [Turing machine](https://www.wolframscience.com/nks/p78--turing-machines/)---in which results are repeatedly "reprocessed" by the same computational elements. Here---at least in generating a given token of output---each computational element (i.e. neuron) is used only once.

这是一个与典型的计算系统 - 如图灵机 - 非常不同的设置,在图灵机中,结果被相同的计算元素反复"重新处理"。这里 - 至少在生成给定的输出标记时 - 每个计算元素(即神经元)只使用一次。

But there is in a sense still an "outer loop" that reuses computational elements even in ChatGPT. Because when ChatGPT is going to generate a new token, it always "reads" (i.e. takes as input) the whole sequence of tokens that come before it, including tokens that ChatGPT itself has "written" previously. And we can think of this setup as meaning that ChatGPT does---at least at its outermost level---involve a "feedback loop", albeit one in which every iteration is explicitly visible as a token that appears in the text that it generates.

但在某种意义上,即使在 ChatGPT 中,仍然存在一个重用计算元素的"外部循环"。因为当 ChatGPT 要生成一个新标记时,它总是"读取"(即作为输入)之前的整个标记序列,包括 ChatGPT 自己先前"写入"的标记。我们可以把这个设置理解为意味着 ChatGPT 确实 - 至少在其最外层 - 涉及一个"反馈循环",尽管这个循环中的每次迭代都明确地表现为它生成的文本中出现的标记。

But let's come back to the core of ChatGPT: the neural net that's being repeatedly used to generate each token. At some level it's very simple: a whole collection of identical artificial neurons. And some parts of the network just consist of ("[fully connected](https://reference.wolfram.com/language/ref/LinearLayer.html)") layers of neurons in which every neuron on a given layer is connected (with some weight) to every neuron on the layer before. But particularly with its transformer architecture, ChatGPT has parts with more structure, in which only specific neurons on different layers are connected. (Of course, one could still say that "all neurons are connected"---but some just have zero weight.)

但让我们回到 ChatGPT 的核心:反复用来生成每个标记的神经网络。在某种程度上,它非常简单:一整个相同人工神经元的集合。网络的某些部分只由"全连接"的神经元层组成,其中给定层上的每个神经元都与前一层上的每个神经元相连(有一定权重)。但特别是有了它的 transformer 架构,ChatGPT 有一些结构更多的部分,其中只有不同层上的特定神经元相连。(当然,人们仍然可以说"所有神经元都是连接的" - 但有些只是权重为零。)

In addition, there are aspects of the neural net in ChatGPT that aren't most naturally thought of as just consisting of "homogeneous" layers. And for example---as the iconic summary above indicates---inside an attention block there are places where "multiple copies are made" of incoming data, each then going through a different "processing path", potentially involving a different number of layers, and only later recombining. But while this may be a convenient representation of what's going on, it's always at least in principle possible to think of "densely filling in" layers, but just having some weights be zero.

此外,ChatGPT 中神经网络的某些方面最自然地不被认为仅仅由"同质"层组成。例如 - 如上面的图标摘要所示 - 在注意力块内部,有些地方对输入数据"制作多个副本",每个副本然后经过不同的"处理路径",可能涉及不同数量的层,只有在后来才重新组合。但虽然这可能是对正在发生的事情的一种方便的表示,但原则上总是可以考虑"密集填充"层,只是让一些权重为零。

If one looks at the longest path through ChatGPT, there are about 400 (core) layers involved---in some ways not a huge number. But there are millions of neurons---with a total of 175 billion connections and therefore 175 billion weights. And one thing to realize is that every time ChatGPT generates a new token, it has to do a calculation involving every single one of these weights. Implementationally these calculations can be somewhat organized "by layer" into highly parallel array operations that can conveniently be done on GPUs. But for each token that's produced, there still have to be 175 billion calculations done (and in the end a bit more)---so that, yes, it's not surprising that it can take a while to generate a long piece of text with ChatGPT.

如果看 ChatGPT 中最长的路径,涉及大约 400 个(核心)层 - 在某些方面这不是一个很大的数字。但有数百万个神经元 - 总共 1750 亿个连接,因此有 1750 亿个权重。需要意识到的一件事是,每次 ChatGPT 生成一个新标记时,它都必须进行涉及这些权重中每一个的计算。在实现上,这些计算可以在某种程度上"按层"组织成高度并行的数组操作,可以方便地在 GPU 上完成。但对于生成的每个标记,仍然需要进行 1750 亿次计算(最后还要多一点) - 所以,是的,用 ChatGPT 生成一长段文本需要一段时间并不奇怪。

But in the end, the remarkable thing is that all these operations---individually as simple as they are---can somehow together manage to do such a good "human-like" job of generating text. It has to be emphasized again that (at least so far as we know) there's no "ultimate theoretical reason" why anything like this should work. And in fact, as we'll discuss, I think we have to view this as a---potentially surprising---scientific discovery: that somehow in a neural net like ChatGPT's it's possible to capture the essence of what human brains manage to do in generating language.

但最终,令人惊讶的是,所有这些操作 - 单独来看都如此简单 - somehow 能够一起完成如此出色的"类人"文本生成工作。必须再次强调的是(至少据我们所知),没有"最终的理论原因"说明为什么像这样的东西应该有效。事实上,正如我们将讨论的,我认为我们必须将此视为一个 - 可能令人惊讶的 - 科学发现:somehow 在像 ChatGPT 这样的神经网络中,可以捕捉到人类大脑在生成语言方面所能做到的本质。

## The Training of ChatGPT

OK, so we've now given an outline of how ChatGPT works once it's set up. But how did it get set up? How were all those 175 billion weights in its neural net determined? Basically they're the result of very large-scale training, based on a huge corpus of text---on the web, in books, etc.---written by humans. As we've said, even given all that training data, it's certainly not obvious that a neural net would be able to successfully produce "human-like" text. And, once again, there seem to be detailed pieces of engineering needed to make that happen. But the big surprise---and discovery---of ChatGPT is that it's possible at all. And that---in effect---a neural net with "just" 175 billion weights can make a "reasonable model" of text humans write.

好的,所以我们现在已经概述了 ChatGPT 一旦设置好后如何工作。但它是如何设置的呢?它的神经网络中所有 1750 亿个权重是如何确定的?基本上,它们是基于一个巨大的文本语料库 - 在网络上、书籍中等 - 由人类编写的大规模训练的结果。正如我们所说,即使给定所有这些训练数据,神经网络能够成功产生"类人"文本也绝非显而易见。而且,再一次,似乎需要详细的工程来实现这一点。但 ChatGPT 的大惊喜 - 和发现 - 是这根本是可能的。而且 - 实际上 - 一个"仅"有 1750 亿权重的神经网络可以制作人类写作文本的"合理模型"。

In modern times, there's lots of text written by humans that's out there in digital form. The public web has at least several billion human-written pages, with altogether perhaps a trillion words of text. And if one includes non-public webpages, the numbers might be at least 100 times larger. So far, more than 5 million digitized books have been made available (out of 100 million or so that have ever been published), giving another 100 billion or so words of text. And that's not even mentioning text derived from speech in videos, etc. (As a personal comparison, [my total lifetime output of published material](https://www.stephenwolfram.com/publications/) has been a bit under 3 million words, and over the [past 30 years I've written](https://writings.stephenwolfram.com/2012/03/the-personal-analytics-of-my-life/) about 15 million words of email, and altogether typed perhaps 50 million words---and in just the past couple of years I've spoken more than 10 million words on [livestreams](https://www.stephenwolfram.com/livestreams). And, yes, I'll train a bot from all of that.)

在现代,有大量人类写的文本以数字形式存在。公共网络至少有几十亿人类写的网页,总共可能有一万亿字的文本。如果包括非公开的网页,这个数字可能至少要大 100 倍。到目前为止,已经有超过 500 万本数字化的书籍可用(在曾经出版的大约 1 亿本书中),提供了另外大约 1000 亿字的文本。这还没有提到从视频等中提取的语音文本。(作为个人比较,我一生发表的材料总量不到 300 万字,在过去 30 年里我写了大约 1500 万字的电子邮件,总共可能打了 5000 万字 - 仅在过去几年里,我在直播中就说了超过 1000 万字。是的,我会用所有这些来训练一个机器人。)

But, OK, given all this data, how does one train a neural net from it? The basic process is very much as we discussed it in the simple examples above. You present a batch of examples, and then you adjust the weights in the network to minimize the error ("loss") that the network makes on those examples. The main thing that's expensive about "back propagating" from the error is that each time you do this, every weight in the network will typically change at least a tiny bit, and there are just a lot of weights to deal with. (The actual "back computation" is typically only a small constant factor harder than the forward one.)

但是,好的,给定所有这些数据,如何从中训练神经网络呢?基本过程与我们在上面简单例子中讨论的非常相似。你呈现一批例子,然后调整网络中的权重,以最小化网络在这些例子上产生的误差("损失")。从误差"反向传播"的主要昂贵之处在于,每次你这样做时,网络中的每个权重通常都会至少改变一点点,而且要处理的权重数量很多。(实际的"反向计算"通常只比前向计算难一个小的常数因子。)

With modern GPU hardware, it's straightforward to compute the results from batches of thousands of examples in parallel. But when it comes to actually updating the weights in the neural net, current methods require one to do this basically batch by batch. (And, yes, this is probably where actual brains---with their combined computation and memory elements---have, for now, at least an architectural advantage.)

使用现代 GPU 硬件,并行计算数千个例子的批次结果是很简单的。但当涉及到实际更新神经网络中的权重时,当前的方法要求基本上逐批进行。(是的,这可能是实际大脑 - 凭借其结合了计算和记忆元素 - 目前至少在架构上具有优势的地方。)

Even in the seemingly simple cases of learning numerical functions that we discussed earlier, we found we often had to use millions of examples to successfully train a network, at least from scratch. So how many examples does this mean we'll need in order to train a "human-like language" model? There doesn't seem to be any fundamental "theoretical" way to know. But in practice ChatGPT was successfully trained on a few hundred billion words of text.

即使在我们之前讨论的学习数值函数的看似简单的情况下,我们发现我们经常需要使用数百万个例子来成功训练一个网络,至少是从头开始。那么这意味着我们需要多少个例子来训练一个"类人语言"模型呢?似乎没有任何基本的"理论"方法可以知道。但在实践中,ChatGPT 成功地在几千亿字的文本上进行了训练。

Some of the text it was fed several times, some of it only once. But somehow it "got what it needed" from the text it saw. But given this volume of text to learn from, how large a network should it require to "learn it well"? Again, we don't yet have a fundamental theoretical way to say. Ultimately---as we'll discuss further below---there's presumably a certain "total algorithmic content" to human language and what humans typically say with it. But the next question is how efficient a neural net will be at implementing a model based on that algorithmic content. And again we don't know---although the success of ChatGPT suggests it's reasonably efficient.

它被输入的一些文本被重复了几次,有些只输入了一次。但不知何故,它从它看到的文本中"得到了它需要的东西"。但是,考虑到这么大量的学习文本,它需要多大的网络才能"学好"呢?再次,我们还没有一个基本的理论方法来说明。最终 - 正如我们将在下面进一步讨论的 - 人类语言和人类通常用它说的话可能有一定的"总算法内容"。但下一个问题是,神经网络在实现基于该算法内容的模型时会有多高效。我们再次不知道 - 尽管 ChatGPT 的成功表明它相当高效。

And in the end we can just note that ChatGPT does what it does using a couple hundred billion weights---comparable in number to the total number of words (or tokens) of training data it's been given. In some ways it's perhaps surprising (though empirically observed also in smaller analogs of ChatGPT) that the "size of the network" that seems to work well is so comparable to the "size of the training data". After all, it's certainly not that somehow "inside ChatGPT" all that text from the web and books and so on is "directly stored". Because what's actually inside ChatGPT are a bunch of numbers---with a bit less than 10 digits of precision---that are some kind of distributed encoding of the aggregate structure of all that text.

最后我们可以注意到,ChatGPT 使用几千亿个权重做它所做的事情 - 这个数量与它被给予的训练数据的总词(或标记)数量相当。在某些方面,也许令人惊讶的是(尽管在 ChatGPT 的较小类似物中也经验性地观察到)"似乎工作良好的网络大小"与"训练数据的大小"如此相当。毕竟,certainly 不是说somehow "在 ChatGPT 内部"所有来自网络和书籍等的文本都被"直接存储"了。因为 ChatGPT 内部实际上是一堆数字 - 精度略低于 10 位 - 它们是所有那些文本的聚合结构的某种分布式编码。

Put another way, we might ask what the "effective information content" is of human language and what's typically said with it. There's the raw corpus of examples of language. And then there's the representation in the neural net of ChatGPT. That representation is very likely far from the "algorithmically minimal" representation (as we'll discuss below). But it's a representation that's readily usable by the neural net. And in this representation it seems there's in the end rather little "compression" of the training data; it seems on average to basically take only a bit less than one neural net weight to carry the "information content" of a word of training data.

换句话说,我们可能会问人类语言及其通常所说的内容的"有效信息内容"是什么。有语言例子的原始语料库。然后是 ChatGPT 神经网络中的表示。这种表示很可能远非"算法最小"表示(正如我们将在下面讨论的)。但它是神经网络可以readily使用的表示。在这种表示中,似乎最终对训练数据的"压缩"相当少;平均而言,似乎基本上只需要不到一个神经网络权重就可以承载一个训练数据词的"信息内容"。

When we run ChatGPT to generate text, we're basically having to use each weight once. So if there are n weights, we've got of order n computational steps to do---though in practice many of them can typically be done in parallel in GPUs. But if we need about *n* words of training data to set up those weights, then from what we've said above we can conclude that we'll need about n^2 computational steps to do the training of the network---which is why, with current methods, one ends up needing to talk about billion-dollar training efforts.

当我们运行 ChatGPT 生成文本时,我们基本上必须使用每个权重一次。所以如果有 n 个权重,我们就有 n 阶的计算步骤要做 - 尽管在实践中,其中许多通常可以在 GPU 中并行完成。但如果我们需要大约 n 个词的训练数据来设置这些权重,那么从我们上面所说的,我们可以得出结论,我们需要大约 n^2 个计算步骤来完成网络的训练 - 这就是为什么,使用当前的方法,最终需要谈论数十亿美元的训练努力。

## Beyond Basic Training

The majority of the effort in training ChatGPT is spent "showing it" large amounts of existing text from the web, books, etc. But it turns out there's another---apparently rather important---part too.

训练 ChatGPT 的大部分努力都花在"向它展示"来自网络、书籍等的大量现有文本上。但事实证明还有另一个 - 显然相当重要的 - 部分。

As soon as it's finished its "raw training" from the original corpus of text it's been shown, the neural net inside ChatGPT is ready to start generating its own text, continuing from prompts, etc. But while the results from this may often seem reasonable, they tend---particularly for longer pieces of text---to "wander off" in often rather non-human-like ways. It's not something one can readily detect, say, by doing traditional statistics on the text. But it's something that actual humans reading the text easily notice.

一旦它完成了从它被展示的原始文本语料库的"原始训练",ChatGPT 内部的神经网络就准备开始生成自己的文本,从提示继续等。但虽然这样产生的结果可能经常看起来合理,它们倾向于 - 特别是对于较长的文本片段 - 以经常相当非人类的方式"偏离"。这不是通过对文本进行传统统计就能轻易检测到的东西。但这是实际阅读文本的人类容易注意到的东西。

And a [key idea in the construction of ChatGPT](https://openai.com/blog/instruction-following/) was to have another step after "passively reading" things like the web: to have actual humans actively interact with ChatGPT, see what it produces, and in effect give it feedback on "how to be a good chatbot". But how can the neural net use that feedback? The first step is just to have humans rate results from the neural net. But then another neural net model is built that attempts to predict those ratings. But now this prediction model can be run---essentially like a loss function---on the original network, in effect allowing that network to be "tuned up" by the human feedback that's been given. And the results in practice seem to have a big effect on the success of the system in producing "human-like" output.

ChatGPT 构建中的一个关键想法是在"被动阅读"网络等内容之后有另一个步骤:让真实的人类积极地与 ChatGPT 互动,看它产生什么,并实际上给它关于"如何成为一个好的聊天机器人"的反馈。但神经网络如何使用这种反馈呢?第一步只是让人类对神经网络的结果进行评分。但然后建立另一个神经网络模型,试图预测这些评分。但现在这个预测模型可以在原始网络上运行 - 本质上像一个损失函数 - 实际上允许该网络通过给予的人类反馈来"调整"。实践中的结果似乎对系统在产生"类人"输出方面的成功有很大影响。

In general, it's interesting how little "poking" the "originally trained" network seems to need to get it to usefully go in particular directions. One might have thought that to have the network behave as if it's "learned something new" one would have to go in and run a training algorithm, adjusting weights, and so on.

总的来说,有趣的是"最初训练的"网络似乎需要多少"戳"才能使其有用地朝特定方向发展。人们可能会认为,要让网络表现得好像它"学到了新东西",就必须进入并运行训练算法,调整权重,等等。

But that's not the case. Instead, it seems to be sufficient to basically tell ChatGPT something one time---as part of the prompt you give---and then it can successfully make use of what you told it when it generates text. And once again, the fact that this works is, I think, an important clue in understanding what ChatGPT is "really doing" and how it relates to the structure of human language and thinking.

但事实并非如此。相反,似乎只需基本上告诉 ChatGPT 一次某事 - 作为你给出的提示的一部分 - 然后它就可以在生成文本时成功地利用你告诉它的内容。再一次,我认为这种方法有效的事实是理解 ChatGPT "真正在做什么"以及它如何与人类语言和思维的结构相关的重要线索。

There's certainly something rather human-like about it: that at least once it's had all that pre-training you can tell it something just once and it can "remember it"---at least "long enough" to generate a piece of text using it. So what's going on in a case like this? It could be that "everything you might tell it is already in there somewhere"---and you're just leading it to the right spot. But that doesn't seem plausible. Instead, what seems more likely is that, yes, the elements are already in there, but the specifics are defined by something like a "trajectory between those elements" and that's what you're introducing when you tell it something.

这确实有些类似人类:至少一旦它完成了所有预训练,你可以只告诉它一次某事,它就能"记住" - 至少"足够长"以生成一段使用它的文本。那么在这样的情况下发生了什么?可能是"你可能告诉它的一切都已经在某处了" - 你只是在引导它到正确的位置。但这似乎不太可能。相反,更可能的是,是的,元素已经在那里了,但具体细节是由类似于"这些元素之间的轨迹"的东西定义的,这就是你在告诉它某事时引入的内容。

And indeed, much like for humans, if you tell it something bizarre and unexpected that completely doesn't fit into the framework it knows, it doesn't seem like it'll successfully be able to "integrate" this. It can "integrate" it only if it's basically riding in a fairly simple way on top of the framework it already has.

事实上,很像人类,如果你告诉它一些完全不符合它所知框架的奇怪和意外的事情,它似乎无法成功地"整合"这些内容。只有当它基本上以一种相当简单的方式建立在它已有的框架之上时,它才能"整合"它。

It's also worth pointing out again that there are inevitably "algorithmic limits" to what the neural net can "pick up". Tell it "shallow" rules of the form "this goes to that", etc., and the neural net will most likely be able to represent and reproduce these just fine---and indeed what it "already knows" from language will give it an immediate pattern to follow. But try to give it rules for an actual "deep" computation that involves many potentially computationally irreducible steps and it just won't work. (Remember that at each step it's always just "feeding data forward" in its network, never looping except by virtue of generating new tokens.)

再次指出,神经网络能"拾取"的内容不可避免地存在"算法限制"也是值得的。告诉它"浅层"规则,如"这个到那个"等,神经网络很可能能够很好地表示和复制这些 - 事实上,它从语言中"已经知道"的内容将给它一个立即可以遵循的模式。但是试图给它一个实际的"深层"计算的规则,涉及许多潜在的计算不可约的步骤,它就不会工作。(记住,在每一步,它总是只在其网络中"向前馈送数据",除了通过生成新标记外,从不循环。)

Of course, the network can learn the answer to specific "irreducible" computations. But as soon as there are combinatorial numbers of possibilities, no such "table-lookup-style" approach will work. And so, yes, just like humans, it's time then for neural nets to "reach out" and use actual computational tools. (And, yes, [Wolfram\|Alpha](https://www.wolframalpha.com/) and [Wolfram Language](https://www.wolfram.com/language/) are [uniquely suitable](https://writings.stephenwolfram.com/2023/01/wolframalpha-as-the-way-to-bring-computational-knowledge-superpowers-to-chatgpt/), because they've been built to "talk about things in the world", just like the language-model neural nets.)

当然,网络可以学习特定"不可约"计算的答案。但一旦有组合数量的可能性,这种"查表式"的方法就不会起作用。所以,是的,就像人类一样,神经网络是时候"伸出手"并使用实际的计算工具了。(是的,Wolfram|Alpha 和 Wolfram 语言是独特适合的,因为它们被构建为"谈论世界上的事物",就像语言模型神经网络一样。)

## What Really Lets ChatGPT Work?

Human language---and the processes of thinking involved in generating it---have always seemed to represent a kind of pinnacle of complexity. And indeed it's seemed somewhat remarkable that human brains---with their network of a "mere" 100 billion or so neurons (and maybe 100 trillion connections) could be responsible for it. Perhaps, one might have imagined, there's something more to brains than their networks of neurons---like some new layer of undiscovered physics. But now with ChatGPT we've got an important new piece of information: we know that a pure, artificial neural network with about as many connections as brains have neurons is capable of doing a surprisingly good job of generating human language.

人类语言 - 以及生成它所涉及的思维过程 - 似乎一直代表着一种复杂性的顶峰。事实上,人类大脑 - 仅有大约 1000 亿个神经元(可能有 100 万亿个连接)的网络 - 能够负责这一点似乎有些令人惊讶。也许,人们可能想象,大脑不仅仅是它们的神经元网络 - 比如一些未被发现的物理学的新层面。但现在有了 ChatGPT,我们得到了一个重要的新信息:我们知道一个纯粹的、人工神经网络,其连接数量与大脑的神经元数量相当,能够令人惊讶地很好地生成人类语言。

And, yes, that's still a big and complicated system---with about as many neural net weights as there are words of text currently available out there in the world. But at some level it still seems difficult to believe that all the richness of language and the things it can talk about can be encapsulated in such a finite system. Part of what's going on is no doubt a reflection of the ubiquitous phenomenon (that first became evident in the [example of rule 30](https://www.wolframscience.com/nks/chap-2--the-crucial-experiment#sect-2-1--how-do-simple-programs-behave)) that computational processes can in effect greatly amplify the apparent complexity of systems even when their underlying rules are simple. But, actually, as we discussed above, neural nets of the kind used in ChatGPT tend to be specifically constructed to restrict the effect of this phenomenon---and the computational irreducibility associated with it---in the interest of making their training more accessible.

是的,这仍然是一个庞大而复杂的系统 - 神经网络权重的数量与世界上目前可用的文本词数相当。但在某种程度上,似乎仍然难以相信语言的所有丰富性以及它可以谈论的事物都可以被封装在这样一个有限的系统中。正在发生的部分无疑反映了无处不在的现象(在规则 30 的例子中首次变得明显),即计算过程实际上可以大大放大系统的表观复杂性,即使它们的基本规则很简单。但实际上,正如我们上面讨论的,ChatGPT 中使用的那种神经网络往往被专门构造来限制这种现象的影响 - 以及与之相关的计算不可约性 - 以使它们的训练更容易接近。

So how is it, then, that something like ChatGPT can get as far as it does with language? The basic answer, I think, is that language is at a fundamental level somehow simpler than it seems. And this means that ChatGPT---even with its ultimately straightforward neural net structure---is successfully able to "capture the essence" of human language and the thinking behind it. And moreover, in its training, ChatGPT has somehow "implicitly discovered" whatever regularities in language (and thinking) make this possible.

那么,像 ChatGPT 这样的东西是如何在语言方面取得如此大的进展的呢?我认为,基本答案是,语言在根本层面上somehow比看起来更简单。这意味着 ChatGPT - 即使最终是简单的神经网络结构 - 成功地能够"捕捉"人类语言及其背后思维的"本质"。而且,在其训练中,ChatGPT somehow"隐含地发现"了语言(和思维)中使这成为可能的任何规律性。

The success of ChatGPT is, I think, giving us evidence of a fundamental and important piece of science: it's suggesting that we can expect there to be major new "laws of language"---and effectively "laws of thought"---out there to discover. In ChatGPT---built as it is as a neural net---those laws are at best implicit. But if we could somehow make the laws explicit, there's the potential to do the kinds of things ChatGPT does in vastly more direct, efficient---and transparent---ways.

我认为,ChatGPT 的成功给我们提供了一个基本而重要的科学证据:它暗示我们可以期望发现重大的新的"语言法则" - 实际上是"思维法则"。在 ChatGPT 中 - 它是作为一个神经网络构建的 - 这些法则充其量是隐含的。但如果我们能somehow使这些法则明确化,就有可能以更直接、更高效 - 和更透明 - 的方式做 ChatGPT 所做的那些事情。

But, OK, so what might these laws be like? Ultimately they must give us some kind of prescription for how language---and the things we say with it---are put together. Later we'll discuss how "looking inside ChatGPT" may be able to give us some hints about this, and how what we know from building computational language suggests a path forward. But first let's discuss two long-known examples of what amount to "laws of language"---and how they relate to the operation of ChatGPT.

但是,好的,那么这些法则可能是什么样的呢?最终,它们必须给我们某种关于语言 - 以及我们用它说的东西 - 是如何组合在一起的规定。稍后我们将讨论"查看 ChatGPT 内部"如何能够给我们一些关于这方面的提示,以及我们从构建计算语言中所知道的如何提供一条前进的道路。但首先让我们讨论两个长期已知的相当于"语言法则"的例子 - 以及它们如何与 ChatGPT 的操作相关。

The first is the syntax of language. Language is not just a random jumble of words. Instead, there are (fairly) definite [grammatical rules](https://www.wolframscience.com/nks/notes-10-12--computer-and-human-languages/) for how words of different kinds can be put together: in English, for example, nouns can be preceded by adjectives and followed by verbs, but typically two nouns can't be right next to each other. Such grammatical structure can (at least approximately) be captured by a set of rules that define how what amount to ["parse trees" can be put together](https://reference.wolfram.com/language/ref/TextStructure.html):

第一个是语言的语法。语言不仅仅是词语的随机堆砌。相反,有(相当)明确的语法规则来规定不同种类的词如何组合在一起:例如在英语中,名词可以前面有形容词,后面跟动词,但通常两个名词不能直接相邻。这种语法结构可以(至少近似地)通过一组规则来捕捉,这些规则定义了相当于"解析树"的东西如何组合在一起:

![](https://image.cubox.pro/cardImg/4wa53p75v3yyabnnb6w1pna07079ppvpufni002djaq6snjvgd.png?imageMogr2/quality/90/ignore-error/1)

ChatGPT doesn't have any explicit "knowledge" of such rules. But somehow in its training it implicitly "discovers" them---and then seems to be good at following them. So how does this work? At a "big picture" level it's not clear. But to get some insight it's perhaps instructive to look at a much simpler example.

ChatGPT 没有任何这些规则的明确"知识"。但somehow在它的训练中,它隐含地"发现"了它们 - 然后似乎善于遵循它们。那么这是如何工作的呢?在"大局"层面上并不清楚。但为了获得一些洞察,也许看一个简单得多的例子是有启发性的。

Consider a "language" formed from sequences of ('s and )'s, with a [grammar that specifies](https://www.wolframscience.com/nks/notes-7-9--nested-lists/) that parentheses should always be balanced, as represented by a parse tree like:

考虑一个由('s 和)'s 序列形成的"语言",其语法规定括号应该始终平衡,如下面的解析树所表示:

![](https://image.cubox.pro/cardImg/1xziq0c6xwnrzgb664ysuv34beunh9keoo4mzmpq1xck99xmny.png?imageMogr2/quality/90/ignore-error/1)

Can we train a neural net to produce "grammatically correct" parenthesis sequences? There are various ways to handle sequences in neural nets, but let's use transformer nets, as ChatGPT does. And given a simple transformer net, we can start feeding it grammatically correct parenthesis sequences as training examples. A subtlety (which actually also appears in ChatGPT's generation of human language) is that in addition to our "content tokens" (here "(" and ")") we have to include an "End" token, that's generated to indicate that the output shouldn't continue any further (i.e. for ChatGPT, that one's reached the "end of the story").

我们能训练一个神经网络来产生"语法正确"的括号序列吗?在神经网络中处理序列有各种方法,但让我们使用 transformer 网络,就像 ChatGPT 那样。给定一个简单的 transformer 网络,我们可以开始向它输入语法正确的括号序列作为训练例子。一个微妙之处(实际上在 ChatGPT 生成人类语言时也出现)是,除了我们的"内容标记"(这里是"("和")")之外,我们还必须包括一个"结束"标记,它被生成以表示输出不应该继续下去(即对于 ChatGPT,表示已经到达了"故事的结尾")。

If we set up a transformer net with just one attention block with 8 heads and feature vectors of length 128 (ChatGPT also uses feature vectors of length 128, but has 96 attention blocks, each with 96 heads) then it doesn't seem possible to get it to learn much about parenthesis language. But with 2 attention blocks, the learning process seems to converge---at least after 10 million or so examples have been given (and, as is common with transformer nets, showing yet more examples just seems to degrade its performance).

如果我们设置一个只有一个注意力块、8 个头和长度为 128 的特征向量的 transformer 网络(ChatGPT 也使用长度为 128 的特征向量,但有 96 个注意力块,每个块有 96 个头),那么似乎不可能让它学到很多关于括号语言的知识。但是有 2 个注意力块,学习过程似乎会收敛 - 至少在给出大约 1000 万个例子之后(而且,正如 transformer 网络常见的那样,展示更多的例子似乎只会降低其性能)。

So with this network, we can do the analog of what ChatGPT does, and ask for probabilities for what the next token should be---in a parenthesis sequence:

所以有了这个网络,我们可以做类似 ChatGPT 所做的事情,询问括号序列中下一个标记应该是什么的概率:

![](https://image.cubox.pro/cardImg/5xbdgfucyub697kdg8ak15bgjqg5qzt9l3phj7a9vtcikbx68x.png?imageMogr2/quality/90/ignore-error/1)

And in the first case, the network is "pretty sure" that the sequence can't end here---which is good, because if it did, the parentheses would be left unbalanced. In the second case, however, it "correctly recognizes" that the sequence can end here, though it also "points out" that it's possible to "start again", putting down a "(", presumably with a ")" to follow. But, oops, even with its 400,000 or so laboriously trained weights, it says there's a 15% probability to have ")" as the next token---which isn't right, because that would necessarily lead to an unbalanced parenthesis.

在第一种情况下,网络"相当确定"序列不能在这里结束 - 这很好,因为如果结束了,括号就会不平衡。然而,在第二种情况下,它"正确地认识到"序列可以在这里结束,尽管它也"指出"可以"重新开始",放下一个"(",大概后面会跟一个")"。但是,哎呀,即使经过大约 400,000 个辛苦训练的权重,它说下一个标记是")"的概率为 15% - 这是不对的,因为那必然会导致不平衡的括号。

Here's what we get if we ask the network for the highest-probability completions for progressively longer sequences of ('s:

如果我们要求网络给出逐渐变长的(序列的最高概率完成,这是我们得到的结果:

![](https://image.cubox.pro/cardImg/47fm2ysly92jtsie8c7v7ouiz1dmo5eb0j7v3wq8ppkvbcpd7g.png?imageMogr2/quality/90/ignore-error/1)

And, yes, up to a certain length the network does just fine. But then it starts failing. It's a pretty typical kind of thing to see in a "precise" situation like this with a neural net (or with machine learning in general). Cases that a human "can solve in a glance" the neural net can solve too. But cases that require doing something "more algorithmic" (e.g. explicitly counting parentheses to see if they're closed) the neural net tends to somehow be "too computationally shallow" to reliably do. (By the way, even the full current ChatGPT has a hard time correctly matching parentheses in long sequences.)

是的,在一定长度内,网络表现得很好。但然后它开始失败。这是在像这样的"精确"情况下使用神经网络(或一般的机器学习)时看到的一种相当典型的现象。人类"一眼就能解决"的情况,神经网络也能解决。但是需要做一些"更具算法性"的事情(例如,明确地计算括号以查看它们是否闭合)的情况,神经网络往往在某种程度上"计算深度不够",无法可靠地完成。(顺便说一下,即使是当前完整的 ChatGPT 在长序列中正确匹配括号也很困难。)

So what does this mean for things like ChatGPT and the syntax of a language like English? The parenthesis language is "austere"---and much more of an "algorithmic story". But in English it's much more realistic to be able to "guess" what's grammatically going to fit on the basis of local choices of words and other hints. And, yes, the neural net is much better at this---even though perhaps it might miss some "formally correct" case that, well, humans might miss as well. But the main point is that the fact that there's an overall syntactic structure to the language---with all the regularity that implies---in a sense limits "how much" the neural net has to learn. And a key "natural-science-like" observation is that the transformer architecture of neural nets like the one in ChatGPT seems to successfully be able to learn the kind of nested-tree-like syntactic structure that seems to exist (at least in some approximation) in all human languages.

那么这对于像 ChatGPT 这样的东西和像英语这样的语言的语法意味着什么呢?括号语言是"朴素的" - 更多的是一个"算法故事"。但在英语中,能够根据局部词语选择和其他提示来"猜测"什么在语法上合适,这要现实得多。是的,神经网络在这方面做得好得多 - 尽管它可能会错过一些"形式上正确"的情况,嗯,人类也可能会错过。但主要的点是,语言有一个整体的句法结构这一事实 - 以及它所暗示的所有规律性 - 在某种意义上限制了神经网络必须学习的"数量"。一个关键的"类似自然科学"的观察是,像 ChatGPT 中的那种 transformer 架构的神经网络似乎能够成功地学习那种嵌套树状的句法结构,这种结构似乎(至少在某种近似中)存在于所有人类语言中。

Syntax provides one kind of constraint on language. But there are clearly more. A sentence like "Inquisitive electrons eat blue theories for fish" is grammatically correct but isn't something one would normally expect to say, and wouldn't be considered a success if ChatGPT generated it---because, well, with the normal meanings for the words in it, it's basically meaningless.

语法为语言提供了一种约束。但显然还有更多。像"好奇的电子吃蓝色理论当鱼"这样的句子在语法上是正确的,但不是人们通常会期望说的话,如果 ChatGPT 生成它也不会被认为是成功的 - 因为,嗯,用这些词的正常含义,它基本上是毫无意义的。

But is there a general way to tell if a sentence is meaningful? There's no traditional overall theory for that. But it's something that one can think of ChatGPT as having implicitly "developed a theory for" after being trained with billions of (presumably meaningful) sentences from the web, etc.

但是有没有一种普遍的方法来判断一个句子是否有意义?对此没有传统的整体理论。但可以认为 ChatGPT 在接受了来自网络等的数十亿(大概是有意义的)句子的训练后,隐含地"为此开发了一个理论"。

What might this theory be like? Well, there's one tiny corner that's basically been known for two millennia, and that's [logic](https://writings.stephenwolfram.com/2018/11/logic-explainability-and-the-future-of-understanding/). And certainly in the syllogistic form in which Aristotle discovered it, logic is basically a way of saying that sentences that follow certain patterns are reasonable, while others are not. Thus, for example, it's reasonable to say "All X are Y. This is not Y, so it's not an X" (as in "All fishes are blue. This is not blue, so it's not a fish."). And just as one can somewhat whimsically imagine that Aristotle discovered syllogistic logic by going ("machine-learning-style") through lots of examples of rhetoric, so too one can imagine that in the training of ChatGPT it will have been able to "discover syllogistic logic" by looking at lots of text on the web, etc. (And, yes, while one can therefore expect ChatGPT to produce text that contains "correct inferences" based on things like syllogistic logic, it's a quite different story when it comes to more sophisticated formal logic---and I think one can expect it to fail here for the same kind of reasons it fails in parenthesis matching.)

这个理论可能是什么样的?嗯,有一个已经被知道了两千年的小角落,那就是逻辑。当然,在亚里士多德发现的三段论形式中,逻辑基本上是一种说法,即遵循某些模式的句子是合理的,而其他的则不是。因此,例如,说"所有 X 都是 Y。这不是 Y,所以它不是 X"是合理的(如"所有鱼都是蓝色的。这不是蓝色的,所以它不是鱼。")。正如人们可以有点异想天开地想象亚里士多德通过("机器学习式地")研究大量修辞学例子发现了三段论逻辑,同样可以想象在 ChatGPT 的训练中,它能够通过查看网络上的大量文本等来"发现三段论逻辑"。(是的,虽然因此可以期望 ChatGPT 产生包含基于三段论逻辑等的"正确推理"的文本,但当涉及更复杂的形式逻辑时,情况就完全不同了 - 我认为可以预期它会在这里失败,原因与它在括号匹配中失败的原因相同。)

But beyond the narrow example of logic, what can be said about how to systematically construct (or recognize) even plausibly meaningful text? Yes, there are things like [Mad Libs](https://en.wikipedia.org/wiki/Mad_Libs) that use very specific "phrasal templates". But somehow ChatGPT implicitly has a much more general way to do it. And perhaps there's nothing to be said about how it can be done beyond "somehow it happens when you have 175 billion neural net weights". But I strongly suspect that there's a much simpler and stronger story.

但是除了逻辑这个狭窄的例子之外,关于如何系统地构造(或识别)甚至是看似有意义的文本,还能说些什么呢?是的,有像疯狂填词游戏这样使用非常特定的"短语模板"的东西。但不知何故,ChatGPT 隐含地有一种更一般的方法来做这件事。也许除了"当你有 1750 亿个神经网络权重时,它就会以某种方式发生"之外,没有什么可说的了。但我强烈怀疑有一个更简单、更有力的故事。

## Meaning Space and Semantic Laws of Motion

We discussed above that inside ChatGPT any piece of text is effectively represented by an array of numbers that we can think of as coordinates of a point in some kind of "linguistic feature space". So when ChatGPT continues a piece of text this corresponds to tracing out a trajectory in linguistic feature space. But now we can ask what makes this trajectory correspond to text we consider meaningful. And might there perhaps be some kind of "semantic laws of motion" that define---or at least constrain---how points in linguistic feature space can move around while preserving "meaningfulness"?

我们在上面讨论过,在 ChatGPT 内部,任何一段文本实际上都是由一组数字表示的,我们可以把这些数字看作是某种"语言特征空间"中一个点的坐标。所以当 ChatGPT 继续一段文本时,这对应于在语言特征空间中描绘出一条轨迹。但现在我们可以问,是什么使这条轨迹对应于我们认为有意义的文本。也许存在某种"语义运动定律",它定义 - 或至少约束 - 语言特征空间中的点如何在保持"有意义性"的同时移动?

So what is this linguistic feature space like? Here's an example of how single words (here, common nouns) might get laid out if we project such a feature space down to 2D:

那么这个语言特征空间是什么样的呢?这里是一个例子,展示了如果我们将这样一个特征空间投影到 2D,单个词(这里是常见名词)可能如何排列:

![](https://image.cubox.pro/cardImg/1q1vu0s931tax55ui7jegzixzukz0b8motgfsnpmcz8c667kkr.png?imageMogr2/quality/90/ignore-error/1)

We saw another example above based on words representing plants and animals. But the point in both cases is that "semantically similar words" are placed nearby.

我们在上面看到了另一个基于代表植物和动物的词的例子。但在这两种情况下,要点是"语义相似的词"被放置在附近。

As another example, here's how words corresponding to different parts of speech get laid out:

作为另一个例子,这里是对应不同词性的词是如何排列的:

![](https://image.cubox.pro/cardImg/53bo9odxl67jfy39bssyibebjh4o14cubem5ep3deqpohla42i.png?imageMogr2/quality/90/ignore-error/1)

Of course, a given word doesn't in general just have "one meaning" (or necessarily correspond to just one part of speech). And by looking at how sentences containing a word lay out in feature space, one can often "tease apart" different meanings---as in the example here for the word "crane" (bird or machine?):

当然,一个给定的词通常不只有"一个意思"(或者不一定只对应一种词性)。通过观察包含一个词的句子在特征空间中的布局,人们经常可以"梳理出"不同的含义 - 就像这里"crane"(鹤还是起重机?)这个词的例子:

![](https://image.cubox.pro/cardImg/3slr1j6szj5wd8fcuxejw34q7bpmrchy8d7p8dp8z1buunhoqk.png?imageMogr2/quality/90/ignore-error/1)

OK, so it's at least plausible that we can think of this feature space as placing "words nearby in meaning" close in this space. But what kind of additional structure can we identify in this space? Is there for example some kind of notion of "parallel transport" that would reflect "flatness" in the space? One way to get a handle on that is to look at analogies:

好的,所以至少可以认为我们可以把这个特征空间看作是将"意义相近的词"放在这个空间中的接近位置。但我们能在这个空间中识别出什么样的额外结构呢?例如,是否存在某种"平行传输"的概念,反映了空间中的"平坦性"?一种理解这一点的方法是看类比:

![](https://image.cubox.pro/cardImg/18z9uzeiix0k8khjjm92vmv2c4jthyz82qeatbrvni0a0wbj9y.png?imageMogr2/quality/90/ignore-error/1)

And, yes, even when we project down to 2D, there's often at least a "hint of flatness", though it's certainly not universally seen.

是的,即使我们投影到 2D,通常至少有一个"平坦的暗示",尽管它肯定不是普遍可见的。

So what about trajectories? We can look at the trajectory that a prompt for ChatGPT follows in feature space---and then we can see how ChatGPT continues that:

那么轨迹呢?我们可以看看 ChatGPT 的提示在特征空间中遵循的轨迹 - 然后我们可以看看 ChatGPT 如何继续:

![](https://image.cubox.pro/cardImg/2wmr5c51hw9txlj7fcwts6ii9sxo8umljebsciy7podt1tr47h.png?imageMogr2/quality/90/ignore-error/1)

There's certainly no "geometrically obvious" law of motion here. And that's not at all surprising; we fully expect this to be a [considerably more complicated story](https://writings.stephenwolfram.com/2021/09/multicomputation-a-fourth-paradigm-for-theoretical-science/#linguistics). And, for example, it's far from obvious that even if there is a "semantic law of motion" to be found, what kind of embedding (or, in effect, what "variables") it'll most naturally be stated in.

这里当然没有"几何上明显"的运动定律。这一点也不令人惊讶;我们完全预期这将是一个相当复杂的故事。例如,即使存在一个"语义运动定律"可以被发现,它最自然地用什么样的嵌入(或者实际上,什么"变量")来表述也远非显而易见。

In the picture above, we're showing several steps in the "trajectory"---where at each step we're picking the word that ChatGPT considers the most probable (the "zero temperature" case). But we can also ask what words can "come next" with what probabilities at a given point:

在上面的图片中,我们展示了"轨迹"中的几个步骤 - 在每一步我们都选择 ChatGPT 认为最可能的词(即"零温度"情况)。但我们也可以问在给定点上,什么词可以"接下来出现",概率是多少:

![](https://image.cubox.pro/cardImg/4d2v2uqua3hd21pe21t6ran3mqawgrilmck5zr39lejbgifesq.png?imageMogr2/quality/90/ignore-error/1)

And what we see in this case is that there's a "fan" of high-probability words that seems to go in a more or less definite direction in feature space. What happens if we go further? Here are the successive "fans" that appear as we "move along" the trajectory:

在这种情况下,我们看到有一个高概率词的"扇形",似乎在特征空间中朝着或多或少确定的方向前进。如果我们继续前进会发生什么?这里是我们"沿着"轨迹移动时出现的连续"扇形":

![](https://image.cubox.pro/cardImg/1dco3kiw38jgym6bwb2w50kqe220c4t2k1lcqkiwqtqfzjs15k.png?imageMogr2/quality/90/ignore-error/1)

Here's a 3D representation, going for a total of 40 steps:

这是一个 3D 表示,总共进行了 40 步:

![](https://image.cubox.pro/cardImg/2eybi6536qql6n4nrxu2rsl3ycwqwu0wa08ilfkded6y8nwvcf.png?imageMogr2/quality/90/ignore-error/1)

And, yes, this seems like a mess---and doesn't do anything to particularly encourage the idea that one can expect to identify "mathematical-physics-like" "semantic laws of motion" by empirically studying "what ChatGPT is doing inside". But perhaps we're just looking at the "wrong variables" (or wrong coordinate system) and if only we looked at the right one, we'd immediately see that ChatGPT is doing something "mathematical-physics-simple" like following geodesics. But as of now, we're not ready to "empirically decode" from its "internal behavior" what ChatGPT has "discovered" about how human language is "put together".

是的,这看起来像一团乱麻 - 并没有特别鼓励人们期望通过实证研究"ChatGPT 内部在做什么"来识别"类似数学物理的""语义运动定律"的想法。但也许我们只是在看"错误的变量"(或错误的坐标系),如果我们看正确的那个,我们会立即看到 ChatGPT 正在做一些"数学物理简单"的事情,比如沿测地线运动。但截至目前,我们还没有准备好从它的"内部行为"中"实证解码"ChatGPT 关于人类语言如何"组合在一起"的"发现"。

## Semantic Grammar and the Power of Computational Language

What does it take to produce "meaningful human language"? In the past, we might have assumed it could be nothing short of a human brain. But now we know it can be done quite respectably by the neural net of ChatGPT. Still, maybe that's as far as we can go, and there'll be nothing simpler---or more human understandable---that will work. But my strong suspicion is that the success of ChatGPT implicitly reveals an important "scientific" fact: that there's actually a lot more structure and simplicity to meaningful human language than we ever knew---and that in the end there may be even fairly simple rules that describe how such language can be put together.

产生"有意义的人类语言"需要什么?在过去,我们可能认为除了人类大脑之外别无他物。但现在我们知道 ChatGPT 的神经网络可以相当不错地完成这项工作。尽管如此,也许这就是我们能走的最远的地方,不会有更简单的 - 或更容易被人类理解的 - 东西能够工作。但我强烈怀疑,ChatGPT 的成功隐含地揭示了一个重要的"科学"事实:有意义的人类语言实际上比我们曾经知道的有更多的结构和简单性 - 最终可能甚至有相当简单的规则来描述这种语言如何组合在一起。

As we mentioned above, syntactic grammar gives rules for how words corresponding to things like different parts of speech can be put together in human language. But to deal with meaning, we need to go further. And one version of how to do this is to think about not just a syntactic grammar for language, but also a semantic one.

正如我们上面提到的,句法语法给出了在人类语言中如何将对应不同词性的词组合在一起的规则。但要处理意义,我们需要更进一步。一种做法是不仅考虑语言的句法语法,还要考虑语义语法。

For purposes of syntax, we identify things like nouns and verbs. But for purposes of semantics, we need "finer gradations". So, for example, we might identify the concept of "moving", and the concept of an "object" that "maintains its identity independent of location". There are endless specific examples of each of these "semantic concepts". But for the purposes of our semantic grammar, we'll just have some general kind of rule that basically says that "objects" can "move". There's a lot to say about how all this might work ([some of which I've said before](https://writings.stephenwolfram.com/2016/10/computational-law-symbolic-discourse-and-the-ai-constitution/)). But I'll content myself here with just a few remarks that indicate some of the potential path forward.

为了句法的目的,我们识别诸如名词和动词之类的东西。但为了语义的目的,我们需要"更细的分级"。例如,我们可能识别"移动"的概念,以及"独立于位置保持其身份"的"对象"的概念。这些"语义概念"中的每一个都有无穷多的具体例子。但对于我们的语义语法来说,我们只需要一些一般性的规则,基本上说"对象"可以"移动"。关于这一切如何运作,有很多可以说的(其中一些我以前说过)。但我在这里只会满足于几个评论,指出一些潜在的前进道路。

It's worth mentioning that even if a sentence is perfectly OK according to the semantic grammar, that doesn't mean it's been realized (or even could be realized) in practice. "The elephant traveled to the Moon" would doubtless "pass" our semantic grammar, but it certainly hasn't been realized (at least yet) in our actual world---though it's absolutely fair game for a fictional world.

值得一提的是,即使一个句子根据语义语法是完全没问题的,这并不意味着它在实践中已经实现(或者甚至可能实现)。"大象旅行到月球"无疑会"通过"我们的语义语法,但它在我们的实际世界中肯定还没有实现(至少目前还没有) - 尽管它对于虚构世界来说绝对是合理的。

When we start talking about "semantic grammar" we're soon led to ask "What's underneath it?" What "model of the world" is it assuming? A syntactic grammar is really just about the construction of language from words. But a semantic grammar necessarily engages with some kind of "model of the world"---something that serves as a "skeleton" on top of which language made from actual words can be layered.

当我们开始谈论"语义语法"时,我们很快就会问"它下面是什么?"它假设的"世界模型"是什么?句法语法实际上只是关于从词构建语言。但语义语法必然涉及某种"世界模型" - 作为一个"骨架",实际词语构成的语言可以在其上分层。

Until recent times, we might have imagined that (human) language would be the only general way to describe our "model of the world". Already a few centuries ago there started to be formalizations of specific kinds of things, based particularly on mathematics. But now there's a much more general approach to formalization: [computational language](https://writings.stephenwolfram.com/2019/05/what-weve-built-is-a-computational-language-and-thats-very-important/).

直到最近,我们可能认为(人类)语言是描述我们"世界模型"的唯一一般方式。几个世纪前就开始有特定种类事物的形式化,特别是基于数学。但现在有一种更一般的形式化方法:计算语言。

And, yes, that's been my big project over the course of more than four decades (as now embodied in the [Wolfram Language](https://www.wolfram.com/language/)): to develop a precise symbolic representation that can talk as broadly as possible about things in the world, as well as abstract things that we care about. And so, for example, we have symbolic representations for [cities](https://reference.wolfram.com/language/ref/entity/City.html) and [molecules](https://reference.wolfram.com/language/guide/MolecularStructureAndComputation.html) and [images](https://reference.wolfram.com/language/guide/ImageRepresentation.html) and [neural networks](https://reference.wolfram.com/language/guide/NeuralNetworkConstruction.html), and we have built-in knowledge about how to compute about those things.

是的,这一直是我四十多年来的大项目(现在体现在 Wolfram 语言中):开发一种精确的符号表示,可以尽可能广泛地谈论世界上的事物,以及我们关心的抽象事物。因此,例如,我们有城市、分子、图像和神经网络的符号表示,我们有关于如何计算这些事物的内置知识。

And, after decades of work, we've covered a lot of areas in this way. But in the past, we haven't particularly dealt with "[everyday discourse](https://writings.stephenwolfram.com/2016/10/computational-law-symbolic-discourse-and-the-ai-constitution/)". In "I bought two pounds of apples" we can [readily represent](https://reference.wolfram.com/language/ref/entity/Food.html) (and do nutrition and other computations on) the "two pounds of apples". But we don't (quite yet) have a symbolic representation for "I bought".

经过几十年的工作,我们已经以这种方式涵盖了很多领域。但在过去,我们并没有特别处理"日常话语"。在"我买了两磅苹果"中,我们可以轻松表示(并对其进行营养和其他计算)"两磅苹果"。但我们(还)没有"我买了"的符号表示。

It's all connected to the idea of semantic grammar---and the goal of having a generic symbolic "construction kit" for concepts, that would give us rules for what could fit together with what, and thus for the "flow" of what we might turn into human language.

这一切都与语义语法的想法相连 - 以及拥有一个通用的符号"构建工具包"用于概念的目标,它将给我们提供什么可以与什么组合的规则,从而为我们可能转化为人类语言的"流"提供规则。

But let's say we had this "symbolic discourse language". What would we do with it? We could start off doing things like generating "locally meaningful text". But ultimately we're likely to want more "globally meaningful" results---which means "computing" more about what can actually exist or happen in the world (or perhaps in some consistent fictional world).

但假设我们有这种"符号话语语言"。我们会用它做什么?我们可以开始做一些事情,比如生成"局部有意义的文本"。但最终我们可能想要更"全局有意义"的结果 - 这意味着要"计算"更多关于世界中实际可能存在或发生的事情(或者可能在某个一致的虚构世界中)。

Right now in Wolfram Language we have a huge amount of built-in computational knowledge about lots of kinds of things. But for a complete symbolic discourse language we'd have to build in additional "calculi" about general things in the world: if an object moves from A to B and from B to C, then it's moved from A to C, etc.

现在在 Wolfram 语言中,我们有大量关于许多种类事物的内置计算知识。但对于一个完整的符号话语语言,我们必须建立关于世界上一般事物的额外"演算":如果一个物体从 A 移动到 B,再从 B 移动到 C,那么它就从 A 移动到了 C,等等。

Given a symbolic discourse language we might use it to make "standalone statements". But we can also use it to ask questions about the world, "Wolfram\|Alpha style". Or we can use it to state things that we "want to make so", presumably with some external actuation mechanism. Or we can use it to make assertions---perhaps about the actual world, or perhaps about some specific world we're considering, fictional or otherwise.

给定一种符号话语语言,我们可能用它来做"独立陈述"。但我们也可以用它来以"Wolfram|Alpha 风格"询问关于世界的问题。或者我们可以用它来陈述我们"想要实现的事情",可能需要某种外部执行机制。或者我们可以用它来做断言 - 可能是关于实际世界的,也可能是关于我们正在考虑的某个特定世界,无论是虚构的还是其他的。

Human language is fundamentally imprecise, not least because it isn't "tethered" to a specific computational implementation, and its meaning is basically defined just by a "social contract" between its users. But computational language, by its nature, has a certain fundamental precision---because in the end what it specifies can always be "unambiguously executed on a computer". Human language can usually get away with a certain vagueness. (When we say "planet" does it include exoplanets or not, etc.?) But in computational language we have to be precise and clear about all the distinctions we're making.

人类语言从根本上说是不精确的,不仅因为它没有"绑定"到特定的计算实现,而且它的含义基本上只是由其使用者之间的"社会契约"定义的。但计算语言本质上具有某种基本的精确性 - 因为最终它指定的内容总是可以"在计算机上无歧义地执行"。人类语言通常可以容忍某种程度的模糊性。(当我们说"行星"时,它包括系外行星吗,等等?)但在计算语言中,我们必须对我们所做的所有区分都精确和清晰。

It's often convenient to leverage ordinary human language in making up names in computational language. But the meanings they have in computational language are necessarily precise---and might or might not cover some particular connotation in typical human language usage.

在计算语言中创造名称时,利用普通人类语言通常是方便的。但它们在计算语言中的含义必然是精确的 - 可能会也可能不会涵盖典型人类语言使用中的某些特定含义。

How should one figure out the fundamental "ontology" suitable for a general symbolic discourse language? Well, it's not easy. Which is perhaps why little has been done since the primitive beginnings Aristotle made more than two millennia ago. But it really helps that today we now know so much about how to think about the world computationally (and it doesn't hurt to have a "fundamental metaphysics" from our [Physics Project](https://www.wolframphysics.org/) and the [idea of the ruliad](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/)).

如何确定适合一般符号话语语言的基本"本体论"?嗯,这并不容易。这也许就是为什么自亚里士多德两千多年前做出原始开端以来,几乎没有什么进展。但今天我们对如何从计算角度思考世界知道了这么多,这真的很有帮助(而且有我们的物理项目和规则概念的"基本形而上学"也无害)。

But what does all this mean in the context of ChatGPT? From its training ChatGPT has effectively "pieced together" a certain (rather impressive) quantity of what amounts to semantic grammar. But its very success gives us a reason to think that it's going to be feasible to construct something more complete in computational language form. And, unlike what we've so far figured out about the innards of ChatGPT, we can expect to design the computational language so that it's readily understandable to humans.

但这一切在 ChatGPT 的背景下意味着什么?从它的训练中,ChatGPT 有效地"拼凑"了相当数量(相当令人印象深刻)的相当于语义语法的东西。但它的成功本身给了我们一个理由,认为构建一个更完整的计算语言形式是可行的。而且,与我们到目前为止对 ChatGPT 内部的了解不同,我们可以期望设计计算语言,使其容易被人类理解。

When we talk about semantic grammar, we can draw an analogy to syllogistic logic. At first, syllogistic logic was essentially a collection of rules about statements expressed in human language. But (yes, two millennia later) [when formal logic was developed](https://writings.stephenwolfram.com/2018/11/logic-explainability-and-the-future-of-understanding/#the-history), the original basic constructs of syllogistic logic could now be used to build huge "formal towers" that include, for example, the operation of modern digital circuitry. And so, we can expect, it will be with more general semantic grammar. At first, it may just be able to deal with simple patterns, expressed, say, as text. But once its whole computational language framework is built, we can expect that it will be able to be used to erect tall towers of "generalized semantic logic", that allow us to work in a precise and formal way with all sorts of things that have never been accessible to us before, except just at a "ground-floor level" through human language, with all its vagueness.

当我们谈论语义语法时,我们可以类比三段论逻辑。起初,三段论逻辑本质上是一组关于用人类语言表达的陈述的规则。但是(是的,两千年后)当形式逻辑被发展出来时,三段论逻辑的原始基本构造现在可以用来构建巨大的"形式塔",例如包括现代数字电路的操作。因此,我们可以期望,更一般的语义语法也会如此。起初,它可能只能处理简单的模式,比如说,以文本形式表达。但一旦它的整个计算语言框架建立起来,我们可以期望它将能够用来建立"广义语义逻辑"的高塔,让我们能够以精确和形式化的方式处理各种以前从未接触过的事物,除了通过人类语言在"地面层面"上接触,带着它所有的模糊性。

We can think of the construction of computational language---and semantic grammar---as representing a kind of ultimate compression in representing things. Because it allows us to talk about the essence of what's possible, without, for example, dealing with all the "turns of phrase" that exist in ordinary human language. And we can view the great strength of ChatGPT as being something a bit similar: because it too has in a sense "drilled through" to the point where it can "put language together in a semantically meaningful way" without concern for different possible turns of phrase.

我们可以把计算语言和语义语法的构建看作是表示事物的一种终极压缩。因为它允许我们谈论可能性的本质,而不需要,例如,处理普通人类语言中存在的所有"措辞转折"。我们可以把 ChatGPT 的巨大优势看作是有点类似的东西:因为它在某种意义上也"钻透"到了可以"以语义上有意义的方式组合语言"的程度,而不需要关心不同可能的措辞转折。

So what would happen if we applied ChatGPT to underlying computational language? The computational language can describe what's possible. But what can still be added is a sense of "what's popular"---based for example on reading all that content on the web. But then---underneath---operating with computational language means that something like ChatGPT has immediate and fundamental access to what amount to ultimate tools for making use of potentially irreducible computations. And that makes it a system that can not only "generate reasonable text", but can expect to work out whatever can be worked out about whether that text actually makes "correct" statements about the world---or whatever it's supposed to be talking about.

那么,如果我们将 ChatGPT 应用于底层计算语言会发生什么?计算语言可以描述什么是可能的。但仍然可以添加的是"什么是流行的"感觉 - 例如基于阅读网络上的所有内容。但然后 - 在底层 - 用计算语言操作意味着像 ChatGPT 这样的东西可以立即和根本地访问相当于利用潜在不可约计算的终极工具。这使它成为一个不仅可以"生成合理文本",而且可以期望弄清楚关于该文本是否真的对世界做出"正确"陈述 - 或者它应该谈论的任何内容 - 的系统。

## So ... What Is ChatGPT Doing, and Why Does It Work?

The basic concept of ChatGPT is at some level rather simple. Start from a huge sample of human-created text from the web, books, etc. Then train a neural net to generate text that's "like this". And in particular, make it able to start from a "prompt" and then continue with text that's "like what it's been trained with".

ChatGPT 的基本概念在某种程度上相当简单。从网络、书籍等大量人类创作的文本样本开始。然后训练一个神经网络生成"像这样"的文本。特别是,使它能够从一个"提示"开始,然后继续生成"像它被训练的"文本。

As we've seen, the actual neural net in ChatGPT is made up of very simple elements---though billions of them. And the basic operation of the neural net is also very simple, consisting essentially of passing input derived from the text it's generated so far "once through its elements" (without any loops, etc.) for every new word (or part of a word) that it generates.

正如我们所看到的,ChatGPT 中的实际神经网络由非常简单的元素组成 - 尽管有数十亿个。神经网络的基本操作也非常简单,本质上是将从它到目前为止生成的文本中派生的输入"通过其元素一次"(没有任何循环等),以生成每个新词(或词的一部分)。

But the remarkable---and unexpected---thing is that this process can produce text that's successfully "like" what's out there on the web, in books, etc. And not only is it coherent human language, it also "says things" that "follow its prompt" making use of content it's "read". It doesn't always say things that "globally make sense" (or correspond to correct computations)--- because (without, for example, [accessing the "computational superpowers" of Wolfram\|Alpha](https://writings.stephenwolfram.com/2023/01/wolframalpha-as-the-way-to-bring-computational-knowledge-superpowers-to-chatgpt/)) it's just saying things that "sound right" based on what things "sounded like" in its training material

但令人惊讶 - 和意外 - 的是,这个过程可以产生成功地"像"网络上、书籍中等内容的文本。而且它不仅是连贯的人类语言,它还"说出"了"遵循其提示"的内容,利用它"读过"的内容。它并不总是说"全局上有意义"的事情(或对应于正确的计算) - 因为(例如,没有访问 Wolfram|Alpha 的"计算超能力")它只是根据其训练材料中事物"听起来像什么"来说"听起来正确"的事情。

The specific engineering of ChatGPT has made it quite compelling. But ultimately (at least until it can use outside tools) ChatGPT is "merely" pulling out some "coherent thread of text" from the "statistics of conventional wisdom" that it's accumulated. But it's amazing how human-like the results are. And as I've discussed, this suggests something that's at least scientifically very important: that human language (and the patterns of thinking behind it) are somehow simpler and more "law like" in their structure than we thought. ChatGPT has implicitly discovered it. But we can potentially explicitly expose it, with semantic grammar, computational language, etc.

ChatGPT 的具体工程使它变得相当引人注目。但最终(至少在它能使用外部工具之前),ChatGPT "仅仅"是从它积累的"常规智慧的统计"中提取一些"连贯的文本线索"。但结果如此类人是令人惊讶的。正如我所讨论的,这表明了至少在科学上非常重要的一点:人类语言(及其背后的思维模式)在其结构上somehow比我们想象的更简单,更"类似法则"。ChatGPT 已经隐含地发现了它。但我们可能可以通过语义语法、计算语言等明确地揭示它。

What ChatGPT does in generating text is very impressive---and the results are usually very much like what we humans would produce. So does this mean ChatGPT is working like a brain? Its underlying artificial-neural-net structure was ultimately modeled on an idealization of the brain. And it seems quite likely that when we humans generate language many aspects of what's going on are quite similar.

ChatGPT 在生成文本方面做得非常令人印象深刻 - 结果通常非常像我们人类会产生的。那么这是否意味着 ChatGPT 的工作方式像大脑?它的底层人工神经网络结构最终是基于对大脑的理想化模型。而且似乎很可能,当我们人类生成语言时,正在发生的许多方面是相当相似的。

When it comes to training (AKA learning) the different "hardware" of the brain and of current computers (as well as, perhaps, some undeveloped algorithmic ideas) forces ChatGPT to use a strategy that's probably rather different (and in some ways much less efficient) than the brain. And there's something else as well: unlike even in typical algorithmic computation, ChatGPT doesn't internally "have loops" or "recompute on data". And that inevitably limits its computational capability---even with respect to current computers, but definitely with respect to the brain.

当涉及到训练(也就是学习)时,大脑和当前计算机的不同"硬件"(以及,也许,一些未开发的算法思想)迫使 ChatGPT 使用一种可能相当不同(在某些方面效率低得多)的策略。还有一点:与典型的算法计算不同,ChatGPT 内部没有"循环"或"对数据重新计算"。这不可避免地限制了它的计算能力 - 即使相对于当前的计算机,但肯定相对于大脑。

It's not clear how to "fix that" and still maintain the ability to train the system with reasonable efficiency. But to do so will presumably allow a future ChatGPT to do even more "brain-like things". Of course, there are plenty of things that brains don't do so well---particularly involving what amount to irreducible computations. And for these both brains and things like ChatGPT have to seek "outside tools"---like [Wolfram Language](https://www.wolfram.com/language/).

目前还不清楚如何"修复这个问题",同时仍然保持以合理效率训练系统的能力。但这样做可能会让未来的 ChatGPT 做更多"类脑的事情"。当然,有很多事情大脑做得不太好 - 特别是涉及相当于不可约计算的事情。对于这些,大脑和像 ChatGPT 这样的东西都必须寻求"外部工具" - 比如 Wolfram 语言。

But for now it's exciting to see what ChatGPT has already been able to do. At some level it's a great example of the fundamental scientific fact that large numbers of simple computational elements can do remarkable and unexpected things. But it also provides perhaps the best impetus we've had in two thousand years to understand better just what the fundamental character and principles might be of that central feature of the human condition that is human language and the processes of thinking behind it.

但现在看到 ChatGPT 已经能够做到的事情是令人兴奋的。在某种程度上,它是大量简单计算元素可以做出令人惊讶和意想不到的事情这一基本科学事实的一个很好的例子。但它也可能为我们提供了两千年来最好的动力,让我们更好地理解人类状况的核心特征 - 人类语言及其背后的思维过程 - 的基本特征和原则可能是什么。

## Thanks

I've been following the development of neural nets now for about 43 years, and during that time I've interacted with many people about them. Among them---some from long ago, some from recently, and some across many years---have been: Giulio Alessandrini, Dario Amodei, Etienne Bernard, Taliesin Beynon, Sebastian Bodenstein, Greg Brockman, Jack Cowan, Pedro Domingos, Jesse Galef, Roger Germundsson, Robert Hecht-Nielsen, Geoff Hinton, John Hopfield, Yann LeCun, Jerry Lettvin, Jerome Louradour, Marvin Minsky, Eric Mjolsness, Cayden Pierce, Tomaso Poggio, Matteo Salvarezza, Terry Sejnowski, Oliver Selfridge, Gordon Shaw, Jonas Sjöberg, Ilya Sutskever, Gerry Tesauro and Timothee Verdier. For help with this piece, I'd particularly like to thank Giulio Alessandrini and Brad Klee.

我现在已经关注神经网络的发展大约 43 年了,在此期间我与许多人就它们进行了交流。其中一些是很久以前的,一些是最近的,还有一些跨越了多年:Giulio Alessandrini, Dario Amodei, Etienne Bernard, Taliesin Beynon, Sebastian Bodenstein, Greg Brockman, Jack Cowan, Pedro Domingos, Jesse Galef, Roger Germundsson, Robert Hecht-Nielsen, Geoff Hinton, John Hopfield, Yann LeCun, Jerry Lettvin, Jerome Louradour, Marvin Minsky, Eric Mjolsness, Cayden Pierce, Tomaso Poggio, Matteo Salvarezza, Terry Sejnowski, Oliver Selfridge, Gordon Shaw, Jonas Sjöberg, Ilya Sutskever, Gerry Tesauro 和 Timothee Verdier。对于这篇文章的帮助,我特别要感谢 Giulio Alessandrini 和 Brad Klee。

## Additional Resources

["Machine Learning for Middle Schoolers" \>\>](https://writings.stephenwolfram.com/2017/05/machine-learning-for-middle-schoolers/)

*[Introduction to Machine Learning \>\>](https://www.wolfram.com/language/introduction-machine-learning/)*

[Wolfram U Machine Learning Courses \>\>](https://www.wolfram.com/wolfram-u/courses/catalog/?topic=machine-learning)
