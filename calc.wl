(* Independent Weyl-basis calculation for calc_with_spinv1.tex.
   Run: wolframscript -file calc.wl   or   Get["/absolute/path/calc.wl"]
   No external packages. h = +/-1 labels physical helicity +/-1/2.
   General spinors: en >= kk >= 0, m^2 = en^2-kk^2.
   The amplitude table uses the manuscript's massless QED kinematics.
   We report M, NOT i M; vertices -i e gamma^mu, propagator -i g_mu_nu/s.
*)
ClearAll[xi, eta, spinorU, spinorV, diracBar, gamma, gamma5, metric,
  slash, momentum, current, contract, simp, electron, positron, muon,
  antimuon, electronCurrent, muonCurrent, amplitude, helicities,
  helicityTuples, helicityPairs, helicityRows, amplitudeMatrix, helicityTable,
  checks, zeroQ, assert, spinSum, traceSpinSum, outputDirectory, tableText,
  en, kk, polar, azimuth, s, theta, e, p1, p2, k1, k2, q];

(* Two-component phases exactly as specified in the manuscript. *)
xi[1, th_, ph_] := {Cos[th/2], Exp[I ph] Sin[th/2]};
xi[-1, th_, ph_] := {-Exp[-I ph] Sin[th/2], Cos[th/2]};
eta[h : (1 | -1), th_, ph_] := h xi[-h, th, ph];

(* Scalar square roots of the helicity eigenvalues; no sigma matrices. *)
spinorU[en_, kk_, h : (1 | -1), th_, ph_] :=
  Join[Sqrt[en-h kk] xi[h, th, ph], Sqrt[en+h kk] xi[h, th, ph]];
spinorV[en_, kk_, h : (1 | -1), th_, ph_] :=
  Join[Sqrt[en+h kk] eta[h, th, ph], -Sqrt[en-h kk] eta[h, th, ph]];

(* Explicit upper-index gamma^mu, Weyl basis, metric (+---). *)
metric = DiagonalMatrix[{1, -1, -1, -1}];
gamma[0] = {{0,0,1,0},{0,0,0,1},{1,0,0,0},{0,1,0,0}};
gamma[1] = {{0,0,0,1},{0,0,1,0},{0,-1,0,0},{-1,0,0,0}};
gamma[2] = {{0,0,0,-I},{0,0,I,0},{0,I,0,0},{-I,0,0,0}};
gamma[3] = {{0,0,1,0},{0,0,0,-1},{-1,0,0,0},{0,1,0,0}};
gamma5 = I gamma[0].gamma[1].gamma[2].gamma[3];
(* A flat list represents a ket; its conjugate times gamma^0 is a bra. *)
diracBar[psi_List] := Conjugate[psi].gamma[0];
slash[p_List] := Sum[(metric.p)[[mu+1]] gamma[mu], {mu,0,3}];
momentum[en_, kk_, th_, ph_] :=
  {en, kk Sin[th] Cos[ph], kk Sin[th] Sin[ph], kk Cos[th]};
current[bra_List, ket_List] := Table[bra.gamma[mu].ket, {mu,0,3}];
contract[a_List, b_List] := a.metric.b;
simp[expr_] := FullSimplify[expr,
  Assumptions -> s > 0 && 0 <= theta <= Pi && Element[e, Reals]];

(* Fix the azimuth at the south pole as Pi, matching eeAmp.nb.
   Angles (polar, azimuth): p1=(0,0), p2=(Pi,Pi),
   k1=(theta,0), k2=(Pi-theta,Pi). Do not silently rephase these legs. *)
p1 = momentum[Sqrt[s]/2, Sqrt[s]/2, 0, 0];
p2 = momentum[Sqrt[s]/2, Sqrt[s]/2, Pi, Pi];
k1 = momentum[Sqrt[s]/2, Sqrt[s]/2, theta, 0];
k2 = momentum[Sqrt[s]/2, Sqrt[s]/2, Pi-theta, Pi];
q = p1+p2;
electron[h_] := spinorU[Sqrt[s]/2, Sqrt[s]/2, h, 0, 0];
positron[h_] := spinorV[Sqrt[s]/2, Sqrt[s]/2, h, Pi, Pi];
muon[h_] := spinorU[Sqrt[s]/2, Sqrt[s]/2, h, theta, 0];
antimuon[h_] := spinorV[Sqrt[s]/2, Sqrt[s]/2, h, Pi-theta, Pi];
electronCurrent[h1_,h2_] := simp[current[diracBar[positron[h2]],electron[h1]]];
muonCurrent[h3_,h4_] := simp[current[diracBar[muon[h3]],antimuon[h4]]];
amplitude[h1_,h2_,h3_,h4_] := simp[e^2/s contract[
  electronCurrent[h1,h2], muonCurrent[h3,h4]]];

helicities = {1,-1};
helicityTuples = Tuples[helicities,4];
helicityPairs = Tuples[helicities,2];
helicityRows = (Append[#, amplitude @@ #] &) /@ helicityTuples;
amplitudeMatrix = Table[amplitude @@ Join[hin,hout],
  {hin,helicityPairs}, {hout,helicityPairs}];
helicityTable = Grid[Prepend[helicityRows,
  {"h1 (e-)","h2 (e+)","h3 (mu-)","h4 (mu+)","M_gamma"}],
  Frame -> All, Alignment -> Center];

(* Algebraic checks, independent trace benchmark, and massive spinor checks. *)
zeroQ[expr_, assumptions_:True] :=
  And @@ (TrueQ[FullSimplify[# == 0, Assumptions -> assumptions]] & /@ Flatten[{expr}]);
checks = <||>;
assert[name_, result_] := (AssociateTo[checks, name -> TrueQ[result]];
  If[!TrueQ[result], Print["FAILED: ",name]; Abort[]]);
assert["Clifford algebra", zeroQ[Table[
  gamma[mu].gamma[nu]+gamma[nu].gamma[mu]-
  2 metric[[mu+1,nu+1]] IdentityMatrix[4],{mu,0,3},{nu,0,3}]]];
assert["gamma5", gamma5 === DiagonalMatrix[{-1,-1,1,1}]];
assert["Massless momentum conservation and mass shells", zeroQ[simp[
  Join[p1+p2-k1-k2, (contract[#,#]& /@ {p1,p2,k1,k2})]]]];
Do[
  assert["Massive Dirac equation and normalization h="<>ToString[h],
    With[{uu=spinorU[en,kk,h,polar,azimuth],
          vv=spinorV[en,kk,h,polar,azimuth],
          pp=momentum[en,kk,polar,azimuth], mass=Sqrt[en^2-kk^2]},
      zeroQ[Join[(slash[pp]-mass IdentityMatrix[4]).uu,
        (slash[pp]+mass IdentityMatrix[4]).vv,
        {diracBar[uu].uu-2 mass, diracBar[vv].vv+2 mass,
         Conjugate[uu].uu-2 en, Conjugate[vv].vv-2 en}],
        en > kk > 0 && Element[{polar,azimuth},Reals]]]];
  assert["Massless chirality h="<>ToString[h], zeroQ[simp[Join[
    gamma5.electron[h]-h electron[h], gamma5.positron[h]+h positron[h]]]]],
  {h,helicities}];
assert["Massive completeness", zeroQ[{
  Total[Table[Outer[Times,spinorU[5,3,h,polar,azimuth],
    diracBar[spinorU[5,3,h,polar,azimuth]]],{h,helicities}]]-
    (slash[momentum[5,3,polar,azimuth]]+4 IdentityMatrix[4]),
  Total[Table[Outer[Times,spinorV[5,3,h,polar,azimuth],
    diracBar[spinorV[5,3,h,polar,azimuth]]],{h,helicities}]]-
    (slash[momentum[5,3,polar,azimuth]]-4 IdentityMatrix[4])},
  Element[{polar,azimuth},Reals]]];
assert["Ward identities", zeroQ[simp[Flatten[Table[
  {contract[q,electronCurrent @@ pair],contract[q,muonCurrent @@ pair]},
  {pair,helicityPairs}]]]]];
spinSum = simp[Total[(Conjugate[#] # & /@ helicityRows[[All,-1]])]/4];
traceSpinSum = simp[e^4/(4 s^2) Sum[
  metric[[mu+1,mu+1]] metric[[nu+1,nu+1]]
  Tr[slash[p2].gamma[mu].slash[p1].gamma[nu]]
  Tr[slash[k1].gamma[mu].slash[k2].gamma[nu]],{mu,0,3},{nu,0,3}]];
assert["Spin sum equals independent trace", zeroQ[simp[spinSum-traceSpinSum]]];
assert["Unpolarized QED angular distribution", zeroQ[simp[
  spinSum-e^4 (1+Cos[theta]^2)]]];

(* Print all 16 entries and export an inspectable table next to this script. *)
Print["QED M_(h1,h2,h3,h4), leg order (e-,e+,mu-,mu+); h=+/-1."];
Print[StringRiffle[(StringRiffle[
  MapIndexed[If[First[#2]<=4,
    StringPadRight[ToString[#1,InputForm],6], ToString[#1,InputForm]] &, #], " "] &) /@
  Prepend[helicityRows,{"h1","h2","h3","h4","M_gamma"}], "\n"]];
Print["Spin-averaged |M|^2 = ",spinSum];
Print["Checks: ",checks];
outputDirectory = If[StringQ[$InputFileName] && StringLength[$InputFileName]>0,
  DirectoryName[ExpandFileName[$InputFileName]], Directory[]];
tableText = StringRiffle[Join[{
  "# Massless QED helicity amplitudes",
  "", "Leg order: (e-, e+, mu-, mu+). h = +/-1 labels helicity +/-1/2.",
  "Entries are M, not i M. The Z channel is not included in this calculation.",
  "Angles: p1=(0,0), p2=(Pi,Pi), k1=(theta,0), k2=(Pi-theta,Pi).",
  "", "| h1 | h2 | h3 | h4 | M_gamma |", "|---|---|---|---|---|"},
  ("| "<>StringRiffle[(ToString[#,InputForm]& /@ #)," | "]<>" |" & /@ helicityRows),
  {"", "Spin-averaged squared amplitude: "<>ToString[spinSum,InputForm],
   "", "Checks: "<>ToString[checks,InputForm]}],"\n"];
Export[FileNameJoin[{outputDirectory,"helicity_amplitudes.md"}],tableText,"Text"];
