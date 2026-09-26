# DiFF 四费米 proposal：QCD、学习路径与边界核查

核查日期：2026-09-26。只用 ARC 做 paper metadata / section / citation-neighborhood 读取；以下 scientific inference 为本任务分析，不是原作者已计算的结果。

## 1. 核心结论

可以复用 2408.07255 的 **末态 quark spin-density matrix → DiFF 方位分析**，但不能复制其 dipole hard part。四费米 scalar/tensor interaction 同时改变电子和 quark 的 chirality，因此本项目仍保留初态 electron transverse polarization，把原 2401.08419 的 proton transversity 分析端移到末态 DiFF。新 partonic density matrix、电子自旋角与 pair 方位角的组合、各 operator 的 y dependence 必须重算。

2408.07255 的 dipole-specific uniqueness 结论是其初态 unpolarized/longitudinal-electron 设置下的结果；不能把它拿来排除新增 transverse-electron 设置中的四费米线性贡献。该文使用的 electron longitudinal polarization 与本项目所需 electron transverse polarization 是不同的自由度。

## 2. Leading-twist collinear factorization：必须说清楚的量

来源：[Wen et al. 2408.07255 §II, Eqs. (1)–(4)](https://arxiv.org/abs/2408.07255)；[JAM 2308.14857 Introduction, §II.2](https://arxiv.org/abs/2308.14857)；[Pitonyak et al. 2305.11995 Eqs. (15)–(18),(21)](https://arxiv.org/abs/2305.11995)。

- 取 current-fragmentation region，Q 为 hard scale，moderate z，M_h ≪ Q。两粒 pion 来自同一 collinear fragmentation sector。P_h=p_1+p_2，R=(p_1−p_2)/2，M_h²=P_h²，z=P·P_h/(P·q)。固定 pion 排序 p_1=p_{π+}、p_2=p_{π−}。
- 对 pair 总体相对于 hard direction 的 transverse momentum 积分，得到 collinear observable；保留 pair 内部 R_T 的 azimuth φ_R 和 M_h。**积分 P_{hT} 不等于抹去 R_T**。若按小 P_{hT} 分箱，或加 jet-radius / recoil measurement，则不能直接称为同一套纯 collinear 公式，需重新处理 measurement matching。
- 2408.07255 Eq. (2) 是 LO：dσ/(dx dy dz dM_h dφ_R)=N/(2π) Σ_q f_q [D_q − (s_x sinφ_R−s_y cosφ_R)H_q] C_q，N=y/(16πQ²)，只含 quark 与 antiquark，μ=Q。新项目替换的是 C_q s_{x,y} 的 hard calculation，而 D/H fragmentation analyzer 可复用。
- **选一套 convention 到底**。若用 JAM 投影后的 H(z,M_h)，其定义已经包含 |R_T|/M_h 权重与 ζ integration；不能再乘一次 |R_T|/M_h。2305.11995 Eq. (18): H(z,M_h)=(π/2)M_h ∫dζ [|R_T|/M_h](1−ζ²) H(z,ζ,R_T²)。D(z,M_h) 为相同投影但不含 |R_T|/M_h。二者是 dM_h density，不是 dM_h² density。
- 2305.11995 导出所示 extDiFF 在 O(α_s) 的 evolution；fixed M_h / R_T 的 extDiFF 与积分相对动量后的 collinear DiFF 不能混为一谈。该文明确指出 extDiFF inhomogeneous diagrams 在 O(α_s²) 及以上可出现，不能声称齐次 evolution 已证明到 all orders。

## 3. 已有输入与误差

JAM 2308.14857 同时拟合 D_1、H_1^∠ 和 transversity；§III.2、§III.4、§V 已核实。两套 no-LQCD / with-LQCD 结果各有 900 以上 replicas；不应只取 central member 后把它称为已传播 DiFF uncertainty。

该 π+π− 输入采用 H_u=−H_d=−H_ubar=H_dbar，H_s,c,b及对应 antiquark=0；D 仍有其他 flavors。新方案 numerator 主要探 u,d，denominator 应保留所有可产生所选 pair 的 flavors；超过 LO 还需 gluon contribution。零 heavy-flavor IFF 是该输入的 flavor assumptions/symmetry setup，不能因此删掉 unpolarized dilution。

建议每个 replica 同时计算 numerator 与 denominator，以保留 D/H correlation；比较有/无 LQCD fit selection，叠加 unpolarized PDF、μ variation、flavor/acceptance assumptions。2408.07255 §III 估计其特定 dipole observable 的 DiFF 相对误差小于 20%，这一数值**不可直接转移**到 four-fermion y weights 和 cuts。该文对 ratio 系统学 cancellation 的简化也不能成为新 proposal 忽略 acceptance、beam polarimetry、false asymmetry 的理由。

## 4. 可直接放进学习页的任务

文件夹已有 `transverse_spin.md` 的章节指向确实匹配。把阅读目标写成可交付的 calculations：

| 学习路径 | 读后需要独立完成 |
|---|---|
| [Yu thesis 2308.13080 §8.1](https://arxiv.org/abs/2308.13080)，配合 Barone–Drago–Ratcliffe §2 | 写出 ρ_e=(1+S_e·σ)/2；把 electron transverse spin 变为 off-diagonal helicity elements；从 M_{a b→c d} M*_{a′b→c d′} 得到 outgoing-quark ρ_{dd′}，说明何时线性干涉被 trace 抹掉。 |
| Yu §2.4、§2.6.3、§2.7.1；再补 §2.7 的 Ward-identity/Wilson-line 部分 | 给出 hard / collinear / soft region 与 power counting；做 leading-twist Dirac projections，区分 f_1、g_1、h_1；画出 gauge link 如何吸收 collinear gluons。§2.7.1 本身只到 lowest-order projection，不等于完整 all-orders proof。 |
| [Barone–Drago–Ratcliffe hep-ph/0104283 §6.7.1、§6.8](https://arxiv.org/abs/hep-ph/0104283)；接 JAM §II.2 | §6.7.1 是 collinear SIDIS factorization；§6.8 直接给 two-hadron observable 与 helicity-matrix contraction（Eq. 6.8.25）。重现标准 transversity×IFF SIDIS asymmetry，检查 φ_R 与 pion 排序改变时的符号。旧记号和 JAM 新 density convention 需显式转换。 |
| 2401.08419 + 2408.07255 §II + 2305.11995 Eqs. (17)–(21) | 先重现两个母方案，再算 e_T q→e q 的 γ/Z–scalar/tensor 干涉；把 hard off-diagonal matrix 接到 DiFF；完成 Re/Im Wilson coefficient 的角权重、全归一化与 μ evolution。 |

最小 self-check：ρ hermitian；cross section real；spin flip 反号；P_eT→0、H→0、无权积分 φ_R 时目标线性项消失；helicity-sum 与 Dirac-trace calculation 在同一 convention 下相符。严格 positivity 应对完整 physical density matrix 检查，不能把只保留 interference 的 EFT truncation 当成全参数空间正定矩阵。

## 5. Benchmark 与 beam feasibility

2408.07255 §III 的参考取值：√s=105 GeV，L=1000 fb⁻¹，x∈[0.03,0.9]，y∈[0.3,0.95]，z∈[0.19,0.99]，M_h∈[0.28,2.05] GeV。该组合基本保证 Q>10 GeV（最低角点约 9.96 GeV，实施时显式加 Q>10 GeV cut）。本项目若沿用，必须标为 phenomenological benchmark，加入 Q²≪Λ² 与相同 detector cuts 的新旧方案比较。

电子横极化不是可自动继承的基线。EIC accelerator primary paper [IPAC2023 MOPA037，Fig. 3 / Spin rotators](https://proceedings.jacow.org/ipac2023/pdf/MOPA037.pdf) 明确描述 arc vertical spin → IP longitudinal spin → arc vertical spin。因此 P_eT=0.7 与对应 integrated luminosity 应称为专用横极化运行的假设，需 accelerator/polarimetry feasibility study；本次证据不说明横极化不可能，也不说明它已获保证。不要把 ring 内/Compton 位置的 transverse component 当作 collision-point polarization。

## 6. Bounded novelty check（不是穷尽证明）

2026-09-26 ARC/INSPIRE 当前结果：2408.07255 共 32 direct citers，全部 metadata scan，关键词 four-fermion / semileptonic 命中 CLFV global analysis 与 transverse-spin review；没有命中恰好 e_T p_unpol→e(π+π−)X 的 scalar/tensor four-fermion proposal。2401.08419 共 23 direct citers，全部 metadata scan，以 dihadron / fragmentation 命中 2408.07255、2411.13845、2512.16492、2508.08516、2603.18951 与 review，均不是目标组合的已完成计算。补充网页精确词组 dihadron+four-fermion / dihadron+semileptonic 也未见对应论文。

可写：『在两篇母方案的 direct-citation neighborhood 中，尚未发现这一具体结合；本项目将检验其 linear sensitivity 与 phenomenological reach。』不要写『首次』『无任何现有工作』或预先写『优于 transversity 方案』。元数据 blind spots、未引用母文的论文与未公开工作仍存在。

## Memory provenance

本 agent 为快速定位已有 Spinor proposal context 和 ARC runtime workaround 读了 MEMORY.md:1289–1337；相关 rollout id 01a07605-03d3-7fd3-afb7-a5aeeae28542。所有上述科学章节、数值与 citation-neighborhood 在本轮重新读取验证，未把历史笔记当成当前文献证据。若 root 的最终回复引用本 agent 的 memory-backed 路由，可用 MEMORY.md:1322–1335 的简短 citation；文献主张不需要用 memory 替代正式引用。
