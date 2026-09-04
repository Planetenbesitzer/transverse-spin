# 横极化计算

这个 note 包括关于 spinor helicity amplitude 的一些笔记,现在版本主要是做梳理参考内容,之后可能会补上数学细节.
note 的主线是这样的:

1. spinor convention,这部分讨论 spinor 本征函数解里面的 helicity basis,以及其他自旋基的分解.
2. 因子化的证明, naive 非极化因子化之外,还有带有极化的因子化证明,这里有一些非常好的参考资料,后面我们可以自己补全细节
3. ...

## 1. Spinor convention

对于一个自由旋量场,首先我们应该知道它的运动方程. 然后我们写下来旋量场的协变的洛伦兹生成元并从中提取出角动量算符.
角动量算符可以定义出来 helicity basis 以及其他方向的自旋 basis,并帮助我们理解 state 的密度矩阵如何得到.

1. 运动方程和洛伦兹生成元的推导见 Peskin 的 section3.2-3.2
2. 自旋的投影算符可以投影出来
   - helicity basis
   - transverse spin basis
   - longitudinal spin basis
   方便我们在不具体写出 $u_s$的表达式的情况下,进行 Dirac 矩阵的运算技巧.见 Peskin 的 section 5.2
   这个语言本身很有用,不过数值计算往往使用 explicit 的 $u_s$ 表达式,所以我们也需要知道 $u_s$ 的 explicit 表达式,见 Peskin 的 Appendix A.2
3. 投影算符有一个更加详细的讨论,我看了之后学到了很多,请看 review [Barone–Drago–Ratcliffe, hep-ph/0104283](https://arxiv.org/abs/hep-ph/0104283) section 2.
4. 最后一个关于 spinor 的参考文献是一个非常厉害的学长的博士论文.见 [Zhite Yu PhD thesis, 2308.13080](http://arxiv.org/abs/2308.13080) 的 section 8,最重要的是 section 8.1.

尽管我按照顺序列下来了很多参考文献,他们的重要性并不是一致的.我认为重要性排序如下:
Zhite thesis section 8.1 > review section 2 > Peskin Appendix A.2 > 其他
前三个看完之后,对于 spinor 的自旋应该有一个初步的认识,但是你想完全理解还需要结合 ChatGPT,Weinberg 关于 particle 表示的构建也很推荐阅读,相关的场论知识更不是几个章节可以讲完的,可以慢慢一点点弥补,递归学习.加油

## 2. 因子化的证明

时间关系我先写一个简单的证明 refrence.之后有空我详细看这里,因为马上校门要关了

1.  [Zhite Yu PhD thesis, 2308.13080](http://arxiv.org/abs/2308.13080) 的 section 2.4
2.  [Zhite Yu PhD thesis, 2308.13080](http://arxiv.org/abs/2308.13080) 的 section 2.6, 重点是 2.6.3
3.  [Zhite Yu PhD thesis, 2308.13080](http://arxiv.org/abs/2308.13080) 的 section 2.7, 重点是 2.7.1
4.  [Zhite Yu PhD thesis, 2308.13080](http://arxiv.org/abs/2308.13080) 的 section 3, 这是补充材料,你可以选择看看,比较长
5.  [Barone–Drago–Ratcliffe, hep-ph/0104283](https://arxiv.org/abs/hep-ph/0104283) 的 section 6. 以及递归复习前面的 section 3. 4. 6.
6.  这个应该在最前面,ChatGPT 可以直接给出带有横极化的 SIDIS,pp 的因子化,让他来解释其中的逻辑.
  
这部分写的比较粗糙,没有具体到哪个位置细节.实在是时间不够了.但你可以先看第一个 part.加油!祝我们好运🍀.

