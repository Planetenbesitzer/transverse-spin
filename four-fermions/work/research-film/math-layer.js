/* Mathematical typography: LaTeX input, KaTeX typesetting, embedded fonts. */
const LATEX=String.raw;
const mathCache=new Map(),metricCache=new Map();
function tx(s){if(!mathCache.has(s))mathCache.set(s,katex.renderToString(s,{throwOnError:true,strict:'error',output:'html',displayMode:false}));return mathCache.get(s)}
const mathLabels={
'e⁻':LATEX`e^-`,'π⁺':LATEX`\pi^+`,'π⁻':LATEX`\pi^-`,'Pₕ':LATEX`P_h`,'Xfrag':LATEX`X_{\mathrm{frag}}`,'ℋ':LATEX`\mathcal H`,
'eL':LATEX`e_L`,'eR':LATEX`e_R`,'qR/L':LATEX`q_{R/L}`,'qL/R':LATEX`q_{L/R}`,'γ / Z':LATEX`\gamma/Z`,'Oᵢ':LATEX`\mathcal O_i`,
'k′ₜ':LATEX`k'_T`,'SeT':LATEX`S_{eT}`,'SpT':LATEX`S_{pT}`,'sqT':LATEX`s_{qT}`,'SeT ∥ SpT':LATEX`S_{eT}\parallel S_{pT}`,
'+SeT':LATEX`+S_{eT}`,'−SeT':LATEX`-S_{eT}`,'φ':LATEX`\phi`,'φR':LATEX`\phi_R`,'h₁':LATEX`h_1`,'H₁∠':LATEX`H_1^{\sphericalangle}`,'f₁':LATEX`f_1`,
'p₁ / π⁺':LATEX`p_1\;(\pi^+)`,'p₂ / π⁻':LATEX`p_2\;(\pi^-)`,'Rₜ':LATEX`R_T`,'x̂':LATEX`\hat x`,'ŷ':LATEX`\hat y`,'ẑ ∥ Pₕ':LATEX`\hat z\parallel P_h`,
'ŷ ∥ k × k′ · x̂ = ŷ × ẑ  (LO)':LATEX`\hat y\parallel\mathbf k\times\mathbf k',\quad\hat x=\hat y\times\hat z\;(\mathrm{LO})`,
'W':LATEX`W`,'M':LATEX`\mathcal M`,'M*':LATEX`\mathcal M^*`,'W₊₊':LATEX`W_{++}`,'W₊₋':LATEX`W_{+-}`,'W₋₊':LATEX`W_{-+}`,'W₋₋':LATEX`W_{--}`,
'π':LATEX`\pi`,'2π':LATEX`2\pi`,'0':'0','1':'1','+':'+','−':'-'
};
const inlineMap={Xfrag:LATEX`X_{\mathrm{frag}}`,
'H₁∠':LATEX`H_1^{\sphericalangle}`,'H₁∠ 接手':LATEX`H_1^{\sphericalangle}`,'Wλλ′':LATEX`W_{\lambda\lambda'}`,'W₊₋':LATEX`W_{+-}`,'φR':LATEX`\phi_R`,'φe':LATEX`\phi_e`,'k′ₜ':LATEX`k'_T`,'Rₜ':LATEX`R_T`,'Pₕ':LATEX`P_h`,'h₁':LATEX`h_1`,'f₁':LATEX`f_1`,'π⁺π⁻':LATEX`\pi^+\pi^-`,'π⁺':LATEX`\pi^+`,'π⁻':LATEX`\pi^-`,'±SeT':LATEX`\pm S_{eT}`,'ρe':LATEX`\rho^e`,'Q ≫ Mₕ':LATEX`Q\gg M_h`,'2φ':LATEX`2\phi`,
};
delete inlineMap['H₁∠ 接手'];
const escapeHTML=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function inlineMathText(s){const keys=Object.keys(inlineMap).sort((a,b)=>b.length-a.length);let out='',p=0;while(p<s.length){const key=keys.find(k=>s.startsWith(k,p));if(key){out+=tx(inlineMap[key]);p+=key.length}else{out+=escapeHTML(s[p]);p++}}return out}
function metrics(tex,size){const key=tex+'|'+size;if(metricCache.has(key))return metricCache.get(key);const m=document.createElement('div');m.style.cssText=`position:absolute;left:-9999px;top:-9999px;width:max-content;display:inline-block;font-size:${size}px;line-height:1.2;white-space:nowrap`;m.innerHTML=tx(tex)+'<span data-probe style="display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline"></span>';document.body.append(m);const r=m.getBoundingClientRect(),b=m.querySelector('[data-probe]').getBoundingClientRect();const result={width:r.width,height:r.height,baseline:b.top-r.top};m.remove();metricCache.set(key,result);return result}
function mathLabelLayout(g){const w=+g.dataset.mw,h=+g.dataset.mh,b=+g.dataset.mb,a=g.dataset.ma;g.setAttribute('transform',`translate(${g.dataset.mx},${g.dataset.my})`);const f=g.querySelector('foreignObject');f.setAttribute('x',a==='middle'?-w/2:a==='end'?-w:0);f.setAttribute('y',-b);f.setAttribute('width',w+4);f.setAttribute('height',h+4)}
function updateMathLabel(id,tex){const g=document.getElementById(id);if(!g||!g.dataset.mathLabel||g.dataset.tex===tex)return;const m=metrics(tex,+g.dataset.ms);g.dataset.tex=tex;g.dataset.mw=m.width;g.dataset.mh=m.height;g.dataset.mb=m.baseline;g.querySelector('foreignObject>div').innerHTML=tx(tex);mathLabelLayout(g)}
function convertSVGMath(){const ns='http://www.w3.org/2000/svg';document.querySelectorAll('#scene svg text').forEach(t=>{const raw=t.textContent.trim(),tex=mathLabels[raw];if(!tex)return;const st=getComputedStyle(t),size=parseFloat(st.fontSize)||24,m=metrics(tex,size),g=document.createElementNS(ns,'g');g.id=t.id;g.dataset.mathLabel='1';g.dataset.tex=tex;g.dataset.mx=t.getAttribute('x')||0;g.dataset.my=t.getAttribute('y')||0;g.dataset.ma=t.getAttribute('text-anchor')||'start';g.dataset.ms=size;g.dataset.mw=m.width;g.dataset.mh=m.height;g.dataset.mb=m.baseline;g.setAttribute('aria-label',raw);const f=document.createElementNS(ns,'foreignObject');const d=document.createElement('div');d.setAttribute('xmlns','http://www.w3.org/1999/xhtml');d.className='svg-math';d.style.cssText=`font-size:${size}px;color:${st.fill};font-style:normal;line-height:1.2;white-space:nowrap;display:inline-block`;d.innerHTML=tx(tex);f.appendChild(d);g.appendChild(f);t.replaceWith(g);mathLabelLayout(g)})}
function setFormula(selector,tex){const e=document.querySelector('#scene '+selector);if(e)e.innerHTML=tx(tex)}
function allFormula(selector,texes){document.querySelectorAll('#scene '+selector).forEach((e,i)=>{if(texes[i])e.innerHTML=tx(texes[i])})}
function typesetScene(){
if(sceneIndex===0){setFormula('.hero-eq',LATEX`e_T^-p\to e^-\,[\pi^+\pi^-]+X`)}
if(sceneIndex===1){allFormula('.op-title',[LATEX`\mathcal O_{ledq}`,LATEX`\mathcal O_{lequ}^{(1)}`,LATEX`\mathcal O_{lequ}^{(3)}`]);allFormula('.op-row .equation',[LATEX`(\bar e_L e_R)(\bar d_R d_L)`,LATEX`-(\bar e_L e_R)(\bar u_L u_R)`,LATEX`-(\bar e_L\sigma_{\mu\nu}e_R)(\bar u_L\sigma^{\mu\nu}u_R)`]);setFormula('.op-list>.equation',LATEX`2\,\operatorname{Re}[\mathcal M_{\mathrm{SM}}\mathcal M_{\mathrm{EFT}}^*]`);document.querySelector('#scene .subhead').innerHTML=tx(LATEX`e_T^-p_T\to e^-X`)+ ' · inclusive DIS'}
if(sceneIndex===2){allFormula('.phase-item .equation',[LATEX`\Phi_+=\phi_1+\phi_2=2\phi`,LATEX`\Phi_-=\phi_1-\phi_2=0`]);allFormula('.phase-name',[LATEX`ledq\;/\;\text{和角}`,LATEX`lequ^{(1,3)}\;/\;\text{差角}`]);setFormula('.phase-item:first-child .eq-note',LATEX`\cos2\phi\;\cdot\;\sin2\phi\quad\text{投影}`);document.querySelector('#scene .subhead').innerHTML='inclusive DIS：'+tx(LATEX`e_T^-(k)+p_T(P)\to e^-(k')+X`)}
if(sceneIndex===4){allFormula('.equation',[LATEX`P_h=p_1+p_2,\qquad R=\tfrac12(p_1-p_2)`,LATEX`\frac{|R_T|}{M_h}\,H_1^{\sphericalangle}(s_{qy}\cos\phi_R-s_{qx}\sin\phi_R)`])}
if(sceneIndex===5){allFormula('.factor-formula>span',[LATEX`\mathrm d\sigma\propto\sum_q`,LATEX`\otimes`,LATEX`\otimes`]);allFormula('.factor-term>span:first-child',[LATEX`f_1^q`,LATEX`W^q(\rho^e,C_i)`,LATEX`\Delta_q(D_1,H_1^{\sphericalangle})`])}
if(sceneIndex===6){setFormula('.matrix-formula',LATEX`\rho^e=\frac12\begin{pmatrix}1&P_{eT}\\P_{eT}&1\end{pmatrix}`);setFormula('.helicity-formula .equation',LATEX`W^q_{\lambda\lambda'}=\frac12\sum_{a,a',b,c}\rho^e_{aa'}\mathcal M_{c\lambda;ab}\mathcal M^*_{c\lambda';a'b}`);document.querySelector('#scene .helicity-formula .eq-note').innerHTML=tx(LATEX`a,a':e_{\mathrm{in}}\quad b:q_{\mathrm{in}}\quad c:e_{\mathrm{out}}\quad \lambda,\lambda':q_{\mathrm{out}}`)}
if(sceneIndex===7){allFormula('.equation',[LATEX`\frac{\mathrm d\sigma^\pm}{\mathrm d\phi_R}\propto1\pm P_{eT}[a\sin\phi_R+b\cos\phi_R]`,LATEX`A^w=\frac{\int w(\phi_R)(\mathrm d\sigma^+-\mathrm d\sigma^-)}{P_{eT}\int(\mathrm d\sigma^++\mathrm d\sigma^-)}`,LATEX`A^{\sin\phi_R}=\frac a2`,LATEX`A^{\cos\phi_R}=\frac b2`])}
for(const e of document.querySelectorAll('#scene .subhead,#scene .hero-deck,#scene .plan-item p,#scene .learning>div,#scene .eq-note')){if(!e.querySelector('.katex')){for(const node of [...e.childNodes])if(node.nodeType===3){const holder=document.createElement('span');holder.innerHTML=inlineMathText(node.textContent);node.replaceWith(holder)}}}
convertSVGMath();
}
