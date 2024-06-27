/*!
* CookieConsent 3.0.1
* https://github.com/orestbida/cookieconsent
* Author Orest Bida
* Released under the MIT License
*/
const e='opt-in',t='opt-out',o='show--consent',n='show--preferences',a='disable--interaction',s='data-category',c='div',r='button',i='aria-hidden',l='btn-group',d='click',f='data-role',_='consentModal',p='preferencesModal',u='additionalInfoModal';class g{constructor(){this.t={mode:e,revision:0,autoShow:!0,lazyHtmlGeneration:!0,autoClearCookies:!0,manageScriptTags:!0,hideFromBots:!0,cookie:{name:'cc_cookie',expiresAfterDays:182,domain:'',path:'/',sameSite:'Lax'}},this.o={i:{},l:'',_:{},p:{},u:{},m:[],v:!1,h:null,C:null,S:null,M:'',T:!0,D:!1,k:!1,A:!1,N:!1,H:[],I:!1,V:!0,L:[],P:!1,j:'',F:!1,O:[],R:[],B:[],G:[],J:!1,U:!1,$:!1,q:[],K:[],W:[],X:{},Y:{},Z:{},ee:{},te:{},oe:[]},this.ne={ae:{},se:{}},this.ce={},this.re={ie:'cc:onFirstConsent',le:'cc:onConsent',de:'cc:onChange',fe:'cc:onModalShow',_e:'cc:onModalHide',pe:'cc:onModalReady'}}}const m=new g,b=(e,t)=>e.indexOf(t),v=(e,t)=>-1!==b(e,t),y=e=>Array.isArray(e),h=e=>'string'==typeof e,w=e=>!!e&&'object'==typeof e&&!y(e),C=e=>'function'==typeof e,S=e=>Object.keys(e),x=e=>Array.from(new Set(e)),M=()=>document.activeElement,T=e=>e.preventDefault(),D=(e,t)=>e.querySelectorAll(t),k=e=>e.dispatchEvent(new Event('change')),E=e=>{const t=document.createElement(e);return e===r&&(t.type=e),t},A=(e,t,o)=>e.setAttribute(t,o),N=(e,t,o)=>{e.removeAttribute(o?'data-'+t:t)},H=(e,t,o)=>e.getAttribute(o?'data-'+t:t),I=(e,t)=>e.appendChild(t),V=(e,t)=>e.classList.add(t),L=(e,t)=>V(e,'cm__'+t),P=(e,t)=>V(e,'pm__'+t),j=(e,t)=>e.classList.remove(t),F=(e,t)=>e.classList.contains(t),O=e=>{if('object'!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());let t=Array.isArray(e)?[]:{};for(let o in e){let n=e[o];t[o]=O(n)}return t},R=()=>{const e={},{O:t,X:o,Y:n}=m.o;for(const a of t)e[a]=U(n[a],S(o[a]));return e},B=(e,t)=>dispatchEvent(new CustomEvent(e,{detail:t})),G=(e,t,o,n)=>{e.addEventListener(t,o),n&&m.o.m.push({ue:e,ge:t,me:o})},J=()=>{const e=m.t.cookie.expiresAfterDays;return C(e)?e(m.o.j):e},U=(e,t)=>{const o=e||[],n=t||[];return o.filter((e=>!v(n,e))).concat(n.filter((e=>!v(o,e))))},$=e=>{m.o.R=x(e),m.o.j=(()=>{let e='custom';const{R:t,O:o,B:n}=m.o,a=t.length;return a===o.length?e='all':a===n.length&&(e='necessary'),e})()},z=(e,t,o,n)=>{const a='accept-',{show:s,showPreferences:c,hide:r,hidePreferences:i,acceptCategory:l}=t,f=e||document,_=e=>D(f,`[data-cc="${e}"]`),p=(e,t)=>{T(e),l(t),i(),r()},u=_('show-preferencesModal'),g=_('show-consentModal'),b=_(a+'all'),v=_(a+'necessary'),y=_(a+'custom'),h=m.t.lazyHtmlGeneration;for(const e of u)A(e,'aria-haspopup','dialog'),G(e,d,(e=>{T(e),c()})),h&&(G(e,'mouseenter',(e=>{T(e),m.o.N||o(t,n)}),!0),G(e,'focus',(()=>{m.o.N||o(t,n)})));for(let e of g)A(e,'aria-haspopup','dialog'),G(e,d,(e=>{T(e),s(!0)}),!0);for(let e of b)G(e,d,(e=>{p(e,'all')}),!0);for(let e of y)G(e,d,(e=>{p(e)}),!0);for(let e of v)G(e,d,(e=>{p(e,[])}),!0)},q=(e,t)=>{e&&(t&&(e.tabIndex=-1),e.focus(),t&&e.removeAttribute('tabindex'))},K=(e,t)=>{const o=n=>{n.target.removeEventListener('transitionend',o),'opacity'===n.propertyName&&'1'===getComputedStyle(e).opacity&&q((e=>1===e?m.ne.be:m.ne.ve)(t))};G(e,'transitionend',o)};let Q;const W=e=>{clearTimeout(Q),e?V(m.ne.ye,a):Q=setTimeout((()=>{j(m.ne.ye,a)}),500)},X=['M 19.5 4.5 L 4.5 19.5 M 4.5 4.501 L 19.5 19.5','M 3.572 13.406 L 8.281 18.115 L 20.428 5.885','M 21.999 6.94 L 11.639 17.18 L 2.001 6.82 '],Y=(e=0,t=1.5)=>`<svg viewBox="0 0 24 24" stroke-width="${t}"><path d="${X[e]}"/></svg>`,Z=e=>{const t=m.ne,o=m.o;(e=>{const n=e===t.he,a=o.i.disablePageInteraction?t.ye:n?t.we:t.ye;G(a,'keydown',(t=>{if('Tab'!==t.key||!(n?o.k&&!o.A:o.A))return;const a=M(),s=n?o.q:o.K;0!==s.length&&(t.shiftKey?a!==s[0]&&e.contains(a)||(T(t),q(s[1])):a!==s[1]&&e.contains(a)||(T(t),q(s[0])))}),!0)})(e)},ee=['[href]',r,'input','details','[tabindex]'].map((e=>e+':not([tabindex="-1"])')).join(','),te=e=>{const{o:t,ne:o}=m,n=(e,t)=>{const o=D(e,ee);t[0]=o[0],t[1]=o[o.length-1]};1===e&&t.D&&n(o.he,t.q),2===e&&t.N&&n(o.Ce,t.K)},oe=(e,t,o)=>{const{de:n,le:a,ie:s,_e:c,pe:r,fe:i}=m.ce,l=m.re;if(t){const n={modalName:t};return e===l.fe?C(i)&&i(n):e===l._e?C(c)&&c(n):(n.modal=o,C(r)&&r(n)),B(e,n)}const d={cookie:m.o.u};e===l.ie?C(s)&&s(O(d)):e===l.le?C(a)&&a(O(d)):(d.changedCategories=m.o.L,d.changedServices=m.o.ee,C(n)&&n(O(d))),B(e,O(d))},ne=(e,t)=>{try{return e()}catch(e){return!t&&console.warn('CookieConsent:',e),!1}},ae=e=>{const{Y:t,ee:o,O:n,X:a,oe:c,u:r,L:i}=m.o;for(const e of n){const n=o[e]||t[e]||[];for(const o of n){const n=a[e][o];if(!n)continue;const{onAccept:s,onReject:c}=n;!n.Se&&v(t[e],o)?(n.Se=!0,C(s)&&s()):n.Se&&!v(t[e],o)&&(n.Se=!1,C(c)&&c())}}if(!m.t.manageScriptTags)return;const l=c,d=e||r.categories||[],f=(e,n)=>{if(n>=e.length)return;const a=c[n];if(a.xe)return f(e,n+1);const r=a.Me,l=a.Te,_=a.De,p=v(d,l),u=!!_&&v(t[l],_);if(!_&&!a.ke&&p||!_&&a.ke&&!p&&v(i,l)||_&&!a.ke&&u||_&&a.ke&&!u&&v(o[l]||[],_)){a.xe=!0;const t=H(r,'type',!0);N(r,'type',!!t),N(r,s);let o=H(r,'src',!0);o&&N(r,'src',!0);const c=E('script');c.textContent=r.innerHTML;for(const{nodeName:e}of r.attributes)A(c,e,r[e]||H(r,e));t&&(c.type=t),o?c.src=o:o=r.src;const i=!!o&&(!t||['text/javascript','module'].includes(t));if(i&&(c.onload=c.onerror=()=>{f(e,++n)}),r.replaceWith(c),i)return}f(e,++n)};f(l,0)},se='bottom',ce='left',re='center',ie='right',le='inline',de='wide',fe='pm--',_e=['middle','top',se],pe=[ce,re,ie],ue={box:{Ee:[de,le],Ae:_e,Ne:pe,He:se,Ie:ie},cloud:{Ee:[le],Ae:_e,Ne:pe,He:se,Ie:re},bar:{Ee:[le],Ae:_e.slice(1),Ne:[],He:se,Ie:''}},ge={box:{Ee:[],Ae:[],Ne:[],He:'',Ie:''},bar:{Ee:[de],Ae:[],Ne:[ce,ie],He:'',Ie:ce}},me=e=>{const t=m.o.i.guiOptions,o=t&&t.consentModal,n=t&&t.preferencesModal;0===e&&be(m.ne.he,ue,o,'cm--','box','cm'),1===e&&be(m.ne.Ce,ge,n,fe,'box','pm')},be=(e,t,o,n,a,s)=>{e.className=s;const c=o&&o.layout,r=o&&o.position,i=o&&o.flipButtons,l=!o||!1!==o.equalWeightButtons,d=c&&c.split(' ')||[],f=d[0],_=d[1],p=f in t?f:a,u=t[p],g=v(u.Ee,_)&&_,b=r&&r.split(' ')||[],y=b[0],h=n===fe?b[0]:b[1],w=v(u.Ae,y)?y:u.He,C=v(u.Ne,h)?h:u.Ie,S=t=>{t&&V(e,n+t)};S(p),S(g),S(w),S(C),i&&S('flip');const x=s+'__btn--secondary';if('cm'===s){const{Ve:e,Le:t}=m.ne;e&&(l?j(e,x):V(e,x)),t&&(l?j(t,x):V(t,x))}else{const{Pe:e}=m.ne;e&&(l?j(e,x):V(e,x))}},ve=(e,t)=>{const o=m.o,n=m.ne,{hide:a,hidePreferences:s,acceptCategory:_}=e,u=e=>{_(e),s(),a()},g=o.p&&o.p.preferencesModal;if(!g)return;const b=g.title,v=g.closeIconLabel,y=g.acceptAllBtn,C=g.acceptNecessaryBtn,x=g.savePreferencesBtn,M=g.sections||[],T=y||C||x;if(n.je)n.Fe=E(c),P(n.Fe,'body');else{n.je=E(c),V(n.je,'pm-wrapper');const e=E('div');V(e,'pm-overlay'),I(n.je,e),G(e,d,s),n.Ce=E(c),V(n.Ce,'pm'),A(n.Ce,'role','dialog'),A(n.Ce,i,!0),A(n.Ce,'aria-modal',!0),A(n.Ce,'aria-labelledby','pm__title'),G(n.ye,'keydown',(e=>{27===e.keyCode&&s()}),!0),n.Oe=E(c),P(n.Oe,'header'),n.Re=E('h2'),P(n.Re,'title'),n.Re.id='pm__title',n.Be=E(r),P(n.Be,'close-btn'),A(n.Be,'aria-label',g.closeIconLabel||''),G(n.Be,d,s),n.Ge=E('span'),n.Ge.innerHTML=Y(),I(n.Be,n.Ge),n.Je=E(c),P(n.Je,'body'),n.Ue=E(c),P(n.Ue,'footer');var D=E(c);V(D,'btns');var k=E(c),N=E(c);P(k,l),P(N,l),I(n.Ue,k),I(n.Ue,N),I(n.Oe,n.Re),I(n.Oe,n.Be),n.ve=E(c),A(n.ve,'tabIndex',-1),I(n.Ce,n.ve),I(n.Ce,n.Oe),I(n.Ce,n.Je),T&&I(n.Ce,n.Ue),I(n.je,n.Ce)}let H;b&&(n.Re.innerHTML=b,v&&A(n.Be,'aria-label',v)),M.forEach(((e,t)=>{const a=e.title,s=e.description,l=e.linkedCategory,f=l&&o.F[l],_=e.cookieTable,p=_&&_.body,u=_&&_.caption,m=p&&p.length>0,b=!!f,v=b&&o.X[l],y=w(v)&&S(v)||[],C=b&&(!!s||!!m||S(v).length>0);var x=E(c);if(P(x,'section'),C||s){var M=E(c);P(M,'section-desc-wrapper')}let T=y.length;if(C&&T>0){const e=E(c);P(e,'section-services');for(const t of y){const o=v[t],n=o&&o.label||t,a=E(c),s=E(c),r=E(c),i=E(c);P(a,'service'),P(i,'service-title'),P(s,'service-header'),P(r,'service-icon');const d=ye(n,t,f,!0,l);i.innerHTML=n,I(s,r),I(s,i),I(a,s),I(a,d),I(e,a)}I(M,e)}if(a){var D=E(c),k=E(b?r:c);if(P(D,'section-title-wrapper'),P(k,'section-title'),k.innerHTML=a,I(D,k),b){const e=E('span');e.innerHTML=Y(2,3.5),P(e,'section-arrow'),I(D,e),x.className+='--toggle';const t=ye(a,l,f);let o=g.serviceCounterLabel;if(T>0&&h(o)){let e=E('span');P(e,'badge'),P(e,'service-counter'),A(e,i,!0),A(e,'data-servicecounter',T),o&&(o=o.split('|'),o=o.length>1&&T>1?o[1]:o[0],A(e,'data-counterlabel',o)),e.innerHTML=T+(o?' '+o:''),I(k,e)}if(C){P(x,'section--expandable');var N=l+'-desc';A(k,'aria-expanded',!1),A(k,'aria-controls',N)}I(D,t)}else A(k,'role','heading'),A(k,'aria-level','3');I(x,D)}if(s){var L=E('p');P(L,'section-desc'),L.innerHTML=s,I(M,L)}if(C&&(A(M,i,'true'),M.id=N,((e,t,o)=>{G(k,d,(()=>{F(t,'is-expanded')?(j(t,'is-expanded'),A(o,'aria-expanded','false'),A(e,i,'true')):(V(t,'is-expanded'),A(o,'aria-expanded','true'),A(e,i,'false'))}))})(M,x,k),m)){const e=E('table'),o=E('thead'),a=E('tbody');if(u){const t=E('caption');P(t,'table-caption'),t.innerHTML=u,e.appendChild(t)}P(e,'section-table'),P(o,'table-head'),P(a,'table-body');const s=_.headers,r=S(s),i=n.$e.createDocumentFragment(),l=E('tr');for(const e of r){const o=s[e],n=E('th');n.id='cc__row-'+o+t,A(n,'scope','col'),P(n,'table-th'),n.innerHTML=o,I(i,n)}I(l,i),I(o,l);const d=n.$e.createDocumentFragment();for(const e of p){const o=E('tr');P(o,'table-tr');for(const n of r){const a=s[n],r=e[n],i=E('td'),l=E(c);P(i,'table-td'),A(i,'data-column',a),A(i,'headers','cc__row-'+a+t),l.insertAdjacentHTML('beforeend',r),I(i,l),I(o,i)}I(d,o)}I(a,d),I(e,o),I(e,a),I(M,e)}(C||s)&&I(x,M);const O=n.Fe||n.Je;b?(H||(H=E(c),P(H,'section-toggles')),H.appendChild(x)):H=null,I(O,H||x)})),y&&(n.ze||(n.ze=E(r),P(n.ze,'btn'),A(n.ze,f,'all'),I(k,n.ze),G(n.ze,d,(()=>u('all')))),n.ze.innerHTML=y),C&&(n.Pe||(n.Pe=E(r),P(n.Pe,'btn'),A(n.Pe,f,'necessary'),I(k,n.Pe),G(n.Pe,d,(()=>u([])))),n.Pe.innerHTML=C),x&&(n.qe||(n.qe=E(r),P(n.qe,'btn'),P(n.qe,'btn--secondary'),A(n.qe,f,'save'),I(N,n.qe),G(n.qe,d,(()=>u()))),n.qe.innerHTML=x),n.Fe&&(n.Ce.replaceChild(n.Fe,n.Je),n.Je=n.Fe),me(1),o.N||(o.N=!0,oe(m.re.pe,p,n.Ce),t(e),I(n.we,n.je),Z(n.Ce),setTimeout((()=>V(n.je,'cc--anim')),100)),te(2)};function ye(e,t,o,n,a){const c=m.o,r=m.ne,l=E('label'),f=E('input'),_=E('span'),p=E('span'),u=E('span'),g=E('span'),b=E('span');if(g.innerHTML=Y(1,3),b.innerHTML=Y(0,3),f.type='checkbox',V(l,'section__toggle-wrapper'),V(f,'section__toggle'),V(g,'toggle__icon-on'),V(b,'toggle__icon-off'),V(_,'toggle__icon'),V(p,'toggle__icon-circle'),V(u,'toggle__label'),A(_,i,'true'),n?(V(l,'toggle-service'),A(f,s,a),r.se[a][t]=f):r.ae[t]=f,n?(e=>{G(f,'change',(()=>{const t=r.se[e],o=r.ae[e];c.Z[e]=[];for(let o in t){const n=t[o];n.checked&&c.Z[e].push(n.value)}o.checked=c.Z[e].length>0}))})(a):(e=>{G(f,d,(()=>{const t=r.se[e],o=f.checked;c.Z[e]=[];for(let n in t)t[n].checked=o,o&&c.Z[e].push(n)}))})(t),f.value=t,u.textContent=e.replace(/<.*>.*<\/.*>/gm,''),I(p,b),I(p,g),I(_,p),c.T)(o.readOnly||o.enabled)&&(f.checked=!0);else if(n){const e=c.Y[a];f.checked=o.readOnly||v(e,t)}else v(c.R,t)&&(f.checked=!0);return o.readOnly&&(f.disabled=!0),I(l,f),I(l,_),I(l,u),l}const he=(e,t)=>{const o=m.o,n=m.ne,{hide:a,hidePreferences:s,acceptCategory:_}=e,p=e=>{_(e),s(),a()},g=o.p&&o.p.preferencesModal;if(!g)return;const b=g.title+' new modal',v=g.closeIconLabel,y=g.acceptAllBtn,C=g.acceptNecessaryBtn,x=g.savePreferencesBtn,M=g.sections||[],T=y||C||x;if(n.je)n.Fe=E(c),P(n.Fe,'body');else{n.je=E(c),V(n.je,'pm-wrapper');const e=E('div');V(e,'pm-overlay'),I(n.je,e),G(e,d,s),n.Ce=E(c),V(n.Ce,'pm'),A(n.Ce,'role','dialog'),A(n.Ce,i,!0),A(n.Ce,'aria-modal',!0),A(n.Ce,'aria-labelledby','pm__title'),G(n.ye,'keydown',(e=>{27===e.keyCode&&s()}),!0),n.Oe=E(c),P(n.Oe,'header'),n.Re=E('h2'),P(n.Re,'title'),n.Re.id='pm__title',n.Be=E(r),P(n.Be,'close-btn'),A(n.Be,'aria-label',g.closeIconLabel||''),G(n.Be,d,s),n.Ge=E('span'),n.Ge.innerHTML=Y(),I(n.Be,n.Ge),n.Je=E(c),P(n.Je,'body'),n.Ue=E(c),P(n.Ue,'footer');var D=E(c);V(D,'btns');var k=E(c),N=E(c);P(k,l),P(N,l),I(n.Ue,k),I(n.Ue,N),I(n.Oe,n.Re),I(n.Oe,n.Be),n.ve=E(c),A(n.ve,'tabIndex',-1),I(n.Ce,n.ve),I(n.Ce,n.Oe),I(n.Ce,n.Je),T&&I(n.Ce,n.Ue),I(n.je,n.Ce)}let H;b&&(n.Re.innerHTML=b,v&&A(n.Be,'aria-label',v)),M.forEach(((e,t)=>{const a=e.title,s=e.description,l=e.linkedCategory,f=l&&o.F[l],_=e.cookieTable,p=_&&_.body,u=_&&_.caption,m=p&&p.length>0,b=!!f,v=b&&o.X[l],y=w(v)&&S(v)||[],C=b&&(!!s||!!m||S(v).length>0);var x=E(c);if(P(x,'section'),C||s){var M=E(c);P(M,'section-desc-wrapper')}let T=y.length;if(C&&T>0){const e=E(c);P(e,'section-services');for(const t of y){const o=v[t],n=o&&o.label||t,a=E(c),s=E(c),r=E(c),i=E(c);P(a,'service'),P(i,'service-title'),P(s,'service-header'),P(r,'service-icon');const d=we(n,t,f,!0,l);i.innerHTML=n,I(s,r),I(s,i),I(a,s),I(a,d),I(e,a)}I(M,e)}if(a){var D=E(c),k=E(b?r:c);if(P(D,'section-title-wrapper'),P(k,'section-title'),k.innerHTML=a,I(D,k),b){const e=E('span');e.innerHTML=Y(2,3.5),P(e,'section-arrow'),I(D,e),x.className+='--toggle';const t=we(a,l,f);let o=g.serviceCounterLabel;if(T>0&&h(o)){let e=E('span');P(e,'badge'),P(e,'service-counter'),A(e,i,!0),A(e,'data-servicecounter',T),o&&(o=o.split('|'),o=o.length>1&&T>1?o[1]:o[0],A(e,'data-counterlabel',o)),e.innerHTML=T+(o?' '+o:''),I(k,e)}if(C){P(x,'section--expandable');var N=l+'-desc';A(k,'aria-expanded',!1),A(k,'aria-controls',N)}I(D,t)}else A(k,'role','heading'),A(k,'aria-level','3');I(x,D)}if(s){var L=E('p');P(L,'section-desc'),L.innerHTML=s,I(M,L)}if(C&&(A(M,i,'true'),M.id=N,((e,t,o)=>{G(k,d,(()=>{F(t,'is-expanded')?(j(t,'is-expanded'),A(o,'aria-expanded','false'),A(e,i,'true')):(V(t,'is-expanded'),A(o,'aria-expanded','true'),A(e,i,'false'))}))})(M,x,k),m)){const e=E('table'),o=E('thead'),a=E('tbody');if(u){const t=E('caption');P(t,'table-caption'),t.innerHTML=u,e.appendChild(t)}P(e,'section-table'),P(o,'table-head'),P(a,'table-body');const s=_.headers,r=S(s),i=n.$e.createDocumentFragment(),l=E('tr');for(const e of r){const o=s[e],n=E('th');n.id='cc__row-'+o+t,A(n,'scope','col'),P(n,'table-th'),n.innerHTML=o,I(i,n)}I(l,i),I(o,l);const d=n.$e.createDocumentFragment();for(const e of p){const o=E('tr');P(o,'table-tr');for(const n of r){const a=s[n],r=e[n],i=E('td'),l=E(c);P(i,'table-td'),A(i,'data-column',a),A(i,'headers','cc__row-'+a+t),l.insertAdjacentHTML('beforeend',r),I(i,l),I(o,i)}I(d,o)}I(a,d),I(e,o),I(e,a),I(M,e)}(C||s)&&I(x,M);const O=n.Fe||n.Je;b?(H||(H=E(c),P(H,'section-toggles')),H.appendChild(x)):H=null,I(O,H||x)})),y&&(n.ze||(n.ze=E(r),P(n.ze,'btn'),A(n.ze,f,'all'),I(k,n.ze),G(n.ze,d,(()=>p('all')))),n.ze.innerHTML=y),C&&(n.Pe||(n.Pe=E(r),P(n.Pe,'btn'),A(n.Pe,f,'necessary'),I(k,n.Pe),G(n.Pe,d,(()=>p([])))),n.Pe.innerHTML=C),x&&(n.qe||(n.qe=E(r),P(n.qe,'btn'),P(n.qe,'btn--secondary'),A(n.qe,f,'save'),I(N,n.qe),G(n.qe,d,(()=>p()))),n.qe.innerHTML=x),n.Fe&&(n.Ce.replaceChild(n.Fe,n.Je),n.Je=n.Fe),me(1),o.N||(o.N=!0,oe(m.re.pe,u,n.Ce),t(e),I(n.we,n.je),Z(n.Ce),setTimeout((()=>V(n.je,'cc--anim')),100)),te(2)};function we(e,t,o,n,a){const c=m.o,r=m.ne,l=E('label'),f=E('input'),_=E('span'),p=E('span'),u=E('span'),g=E('span'),b=E('span');if(g.innerHTML=Y(1,3),b.innerHTML=Y(0,3),f.type='checkbox',V(l,'section__toggle-wrapper'),V(f,'section__toggle'),V(g,'toggle__icon-on'),V(b,'toggle__icon-off'),V(_,'toggle__icon'),V(p,'toggle__icon-circle'),V(u,'toggle__label'),A(_,i,'true'),n?(V(l,'toggle-service'),A(f,s,a),r.se[a][t]=f):r.ae[t]=f,n?(e=>{G(f,'change',(()=>{const t=r.se[e],o=r.ae[e];c.Z[e]=[];for(let o in t){const n=t[o];n.checked&&c.Z[e].push(n.value)}o.checked=c.Z[e].length>0}))})(a):(e=>{G(f,d,(()=>{const t=r.se[e],o=f.checked;c.Z[e]=[];for(let n in t)t[n].checked=o,o&&c.Z[e].push(n)}))})(t),f.value=t,u.textContent=e.replace(/<.*>.*<\/.*>/gm,''),I(p,b),I(p,g),I(_,p),c.T)(o.readOnly||o.enabled)&&(f.checked=!0);else if(n){const e=c.Y[a];f.checked=o.readOnly||v(e,t)}else v(c.R,t)&&(f.checked=!0);return o.readOnly&&(f.disabled=!0),I(l,f),I(l,_),I(l,u),l}const Ce=()=>{const e=E('span');return m.ne.Ke||(m.ne.Ke=e),e},Se=(e,t)=>{const o=m.o,n=m.ne,{hide:a,showPreferences:s,acceptCategory:p}=e,u=o.p&&o.p.consentModal;if(!u)return;const g=u.acceptAllBtn,b=u.acceptNecessaryBtn,v=u.showPreferencesBtn,y=u.additionalInfoBtn,h=u.closeIconLabel,w=u.footer,C=u.label,S=u.title,x=e=>{a(),p(e)};if(!n.Qe){n.Qe=E(c),n.he=E(c),n.We=E(c),n.Xe=E(c),n.Ye=E(c),V(n.Qe,'cm-wrapper'),V(n.he,'cm'),L(n.We,'body'),L(n.Xe,'texts'),L(n.Ye,'btns'),A(n.he,'role','dialog'),A(n.he,'aria-modal','true'),A(n.he,i,'false'),A(n.he,'aria-describedby','cm__desc'),C?A(n.he,'aria-label',C):S&&A(n.he,'aria-labelledby','cm__title');const e='box',t=o.i.guiOptions,a=t&&t.consentModal,s=(a&&a.layout||e).split(' ')[0]===e;S&&h&&s&&(n.Le||(n.Le=E(r),n.Le.innerHTML=Y(),L(n.Le,'btn'),L(n.Le,'btn--close'),G(n.Le,d,(()=>{x([])})),I(n.We,n.Le)),A(n.Le,'aria-label',h)),I(n.We,n.Xe),(g||b||v)&&I(n.We,n.Ye),n.be=E(c),A(n.be,'tabIndex',-1),I(n.he,n.be),I(n.he,n.We),I(n.Qe,n.he)}S&&(n.Ze||(n.Ze=E('h2'),n.Ze.className=n.Ze.id='cm__title',I(n.Xe,n.Ze)),n.Ze.innerHTML=S);let M=u.description;if(M&&(o.I&&(M=M.replace('{{revisionMessage}}',o.V?'':u.revisionMessage||'')),n.et||(n.et=E('p'),n.et.className=n.et.id='cm__desc',I(n.Xe,n.et)),n.et.innerHTML=M),g&&(n.tt||(n.tt=E(r),I(n.tt,Ce()),L(n.tt,'btn'),A(n.tt,f,'all'),G(n.tt,d,(()=>{x('all')}))),n.tt.firstElementChild.innerHTML=g),b&&(n.Ve||(n.Ve=E(r),I(n.Ve,Ce()),L(n.Ve,'btn'),A(n.Ve,f,'necessary'),G(n.Ve,d,(()=>{x([])}))),n.Ve.firstElementChild.innerHTML=b),v&&(n.ot||(n.ot=E(r),I(n.ot,Ce()),L(n.ot,'btn'),L(n.ot,'btn--secondary'),A(n.ot,f,'show'),G(n.ot,'mouseenter',(()=>{o.N||ve(e,t)})),G(n.ot,d,s)),n.ot.firstElementChild.innerHTML=v),y&&(n.nt||(n.nt=E(r),I(n.nt,Ce()),L(n.nt,'btn'),L(n.nt,'btn--secondary'),A(n.nt,f,'show'),G(n.nt,'mouseenter',(()=>{o.st||he(e,t)})),G(n.nt,d,s)),n.nt.firstElementChild.innerHTML=y),n.ct||(n.ct=E(c),L(n.ct,l),g&&I(n.ct,n.tt),b&&I(n.ct,n.Ve),(g||b)&&I(n.We,n.ct),I(n.Ye,n.ct)),n.ot&&!n.rt&&(n.rt=E(c),n.Ve&&n.tt?(L(n.rt,l),I(n.rt,n.ot),I(n.Ye,n.rt)):(I(n.ct,n.ot),L(n.ct,l+'--uneven'))),n.nt&&!n.it&&(n.it=E(c),n.Ve&&n.tt?(L(n.it,l),I(n.it,n.nt),I(n.Ye,n.it)):(I(n.ct,n.nt),L(n.ct,l+'--uneven'))),w){if(!n.lt){let e=E(c),t=E(c);n.lt=E(c),L(e,'footer'),L(t,'links'),L(n.lt,'link-group'),I(t,n.lt),I(e,t),I(n.he,e)}n.lt.innerHTML=w}me(0),o.D||(o.D=!0,oe(m.re.pe,_,n.he),t(e),I(n.we,n.Qe),Z(n.he),setTimeout((()=>V(n.Qe,'cc--anim')),100)),te(1),z(n.We,e,ve,t)},xe=e=>{if(!h(e))return null;if(e in m.o._)return e;let t=e.slice(0,2);return t in m.o._?t:null},Me=()=>m.o.l||m.o.i.language.default,Te=e=>{e&&(m.o.l=e)},De=async e=>{const t=m.o;let o=xe(e)?e:Me(),n=t._[o];return h(n)?n=await(async e=>{try{const t=await fetch(e);return await t.json()}catch(e){return console.error(e),!1}})(n):C(n)&&(n=await n()),!!n&&(t.p=n,Te(o),!0)},ke=()=>{let e=m.o.i.language.rtl,t=m.ne.we;e&&t&&(y(e)||(e=[e]),v(e,m.o.l)?V(t,'cc--rtl'):j(t,'cc--rtl'))},Ee=()=>{const e=m.ne;if(e.we)return;e.we=E(c),e.we.id='cc-main',e.we.setAttribute('data-nosnippet',''),ke();let t=m.o.i.root;t&&h(t)&&(t=document.querySelector(t)),(t||e.$e.body).appendChild(e.we)},Ae=e=>ne((()=>localStorage.removeItem(e))),Ne=(e,t)=>{if(t instanceof RegExp)return e.filter((e=>t.test(e)));{const o=b(e,t);return o>-1?[e[o]]:[]}},He=e=>{const{hostname:t,protocol:o}=location,{name:n,path:a,domain:s,sameSite:c,useLocalStorage:r}=m.t.cookie,i=e?(()=>{const e=m.o.S,t=e?new Date-e:0;return 864e5*J()-t})():864e5*J(),l=new Date;l.setTime(l.getTime()+i),m.o.u.expirationTime=l.getTime();const d=JSON.stringify(m.o.u);let f=n+'='+encodeURIComponent(d)+(0!==i?'; expires='+l.toUTCString():'')+'; Path='+a+'; SameSite='+c;v(t,'.')&&(f+='; Domain='+s),'https:'===o&&(f+='; Secure'),r?((e,t)=>{ne((()=>localStorage.setItem(e,t)))})(n,d):document.cookie=f,m.o.u},Ie=(e,t,o)=>{if(0===e.length)return;const n=o||m.t.cookie.domain,a=t||m.t.cookie.path,s='www.'===n.slice(0,4),c=s&&n.substring(4),r=(e,t)=>{document.cookie=e+'=; path='+a+(t?'; domain=.'+t:'')+'; expires=Thu, 01 Jan 1970 00:00:01 GMT;'};for(const t of e)r(t),r(t,n),s&&r(t,c)},Ve=e=>{const t=e||m.t.cookie.name,o=m.t.cookie.useLocalStorage;return((e,t)=>{let o;return o=ne((()=>JSON.parse(t?e:decodeURIComponent(e))),!0)||{},o})(o?(n=t,ne((()=>localStorage.getItem(n)))||''):Le(t,!0),o);var n},Le=(e,t)=>{const o=document.cookie.match('(^|;)\\s*'+e+'\\s*=\\s*([^;]+)');return o?t?o.pop():e:''},Pe=e=>{const t=document.cookie.split(/;\s*/),o=[];for(const n of t){let t=n.split('=')[0];e?ne((()=>{e.test(t)&&o.push(t)})):o.push(t)}return o},je=(o,n=[])=>{((e,t)=>{const{O:o,R:n,B:a,N:s,Z:c,G:r,X:i}=m.o;let l=[];if(e){y(e)?l.push(...e):h(e)&&(l='all'===e?o:[e]);for(const e of o)c[e]=v(l,e)?S(i[e]):[]}else l=[...n,...r],s&&(l=(()=>{const e=m.ne.ae;if(!e)return[];let t=[];for(let o in e)e[o].checked&&t.push(o);return t})());l=l.filter((e=>!v(o,e)||!v(t,e))),l.push(...a),$(l)})(o,n),(e=>{const t=m.o,{Z:o,B:n,Y:a,X:s,O:c}=t,r=c;t.te=O(a);for(const e of r){const c=s[e],r=S(c),i=o[e]&&o[e].length>0,l=v(n,e);if(0!==r.length){if(a[e]=[],l)a[e].push(...r);else if(i){const t=o[e];a[e].push(...t)}else a[e]=t.Z[e];a[e]=x(a[e])}}})(),(()=>{const o=m.o;o.L=m.t.mode===t&&o.T?U(o.G,o.R):U(o.R,o.u.categories);let n=o.L.length>0,a=!1;for(const e of o.O)o.ee[e]=U(o.Y[e],o.te[e]),o.ee[e].length>0&&(a=!0);const s=m.ne.ae;for(const e in s)s[e].checked=v(o.R,e);for(const e of o.O){const t=m.ne.se[e],n=o.Y[e];for(const e in t)t[e].checked=v(n,e)}o.C||(o.C=new Date),o.M||(o.M=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))),o.u={categories:O(o.R),revision:m.t.revision,data:o.h,consentTimestamp:o.C.toISOString(),consentId:o.M,services:O(o.Y)};let c=!1;const r=n||a;(o.T||r)&&(o.T&&(o.T=!1,c=!0),o.S=o.S?new Date:o.C,o.u.lastConsentTimestamp=o.S.toISOString(),He(),m.t.autoClearCookies&&(c||r)&&(e=>{const t=m.o,o=Pe(),n=(e=>{const t=m.o;return(e?t.O:t.L).filter((e=>{const o=t.F[e];return!!o&&!o.readOnly&&!!o.autoClear}))})(e);for(const e in t.ee)for(const n of t.ee[e]){const a=t.X[e][n].cookies;if(!v(t.Y[e],n)&&a)for(const e of a){const t=Ne(o,e.name);Ie(t,e.path,e.domain)}}for(const a of n){const n=t.F[a].autoClear,s=n&&n.cookies||[],c=v(t.L,a),r=!v(t.R,a),i=c&&r;if(e?r:i){n.reloadPage&&i&&(t.P=!0);for(const e of s){const t=Ne(o,e.name);Ie(t,e.path,e.domain)}}}})(c),ae()),c&&(oe(m.re.ie),oe(m.re.le),m.t.mode===e)||(r&&oe(m.re.de),o.P&&(o.P=!1,location.reload()))})()},Fe=e=>{const t=m.o.T?[]:m.o.R;return v(t,e)},Oe=(e,t)=>{const{O:o,X:n}=m.o;if(!(e&&t&&h(t)&&v(o,t)&&0!==S(n[t]).length))return!1;((e,t)=>{const o=m.o,{X:n,Z:a,N:s}=o,c=m.ne.se[t]||{},r=m.ne.ae[t]||{},i=S(n[t]);if(a[t]=[],h(e)){if('all'===e){if(a[t].push(...i),s)for(let e in c)c[e].checked=!0,k(c[e])}else if(v(i,e)&&a[t].push(e),s)for(let t in c)c[t].checked=e===t,k(c[t])}else if(y(e))for(let o of i){const n=v(e,o);n&&a[t].push(o),s&&(c[o].checked=n,k(c[o]))}const l=0===a[t].length;o.R=l?o.R.filter((e=>e!==t)):x([...o.R,t]),s&&(r.checked=!l,k(r))})(e,t),je()},Re=(e,t)=>{const o=m.o.T?[]:m.o.Y[t]||[];return v(o,e)},Be=e=>''!==Le(e,!0),Ge=(e,t,o)=>{let n=[];const a=e=>{if(h(e)){let t=Le(e);''!==t&&n.push(t)}else n.push(...Pe(e))};if(y(e))for(let t of e)a(t);else a(e);Ie(n,t,o)},Je=e=>{const{ne:t,o:n}=m;if(!n.k){if(!n.D){if(!e)return;Se(Ke,Ee)}n.k=!0,n.U=M(),n.v&&W(!0),K(t.he,1),V(t.ye,o),A(t.he,i,'false'),setTimeout((()=>{q(m.ne.be)}),100),oe(m.re.fe,_)}},Ue=()=>{const{ne:e,o:t,re:n}=m;t.k&&(t.k=!1,t.v&&W(),q(e.Ke,!0),j(e.ye,o),A(e.he,i,'true'),q(t.U),t.U=null,oe(n._e,_))},$e=()=>{const e=m.o;e.A||(e.N||ve(Ke,Ee),e.A=!0,e.k?e.$=M():e.U=M(),K(m.ne.Ce,2),V(m.ne.ye,n),A(m.ne.Ce,i,'false'),setTimeout((()=>{q(m.ne.ve)}),100),oe(m.re.fe,p))},ze=()=>{const e=m.o;e.dt||(e.st||he(Ke,Ee),e.dt=!0,e.k?e.$=M():e.U=M(),K(m.ne.Ce,2),V(m.ne.ye,n),A(m.ne.Ce,i,'false'),setTimeout((()=>{q(m.ne.ve)}),100),oe(m.re.fe,u))},qe=()=>{const e=m.o;e.A&&(e.A=!1,(()=>{const e=tt(),t=m.o.F,o=m.ne.ae,n=m.ne.se,a=e=>v(m.o.G,e);for(const s in o){const c=!!t[s].readOnly;o[s].checked=c||(e?Fe(s):a(s));for(const t in n[s])n[s][t].checked=c||(e?Re(t,s):a(s))}})(),q(m.ne.Ge,!0),j(m.ne.ye,n),A(m.ne.Ce,i,'true'),e.k?(q(e.$),e.$=null):(q(e.U),e.U=null),oe(m.re._e,p))};var Ke={show:Je,hide:Ue,showPreferences:$e,hidePreferences:qe,acceptCategory:je};const Qe=async(e,t)=>{if(!xe(e))return!1;const o=m.o;return!(e===Me()&&!0!==t||!await De(e)||(Te(e),o.D&&Se(Ke,Ee),o.N&&ve(Ke,Ee),o.st&&he(Ke,Ee),ke(),0))},We=()=>{const{j:e,Y:t}=m.o,{accepted:o,rejected:n}=(()=>{const{T:e,R:t,O:o}=m.o;return{accepted:t,rejected:e?[]:o.filter((e=>!v(t,e)))}})();return O({acceptType:e,acceptedCategories:o,rejectedCategories:n,acceptedServices:t,rejectedServices:R()})},Xe=(e,t)=>{let o=document.querySelector('script[src="'+e+'"]');return new Promise((n=>{if(o)return n(!0);if(o=E('script'),w(t))for(const e in t)A(o,e,t[e]);o.onload=()=>n(!0),o.onerror=()=>{o.remove(),n(!1)},o.src=e,I(document.head,o)}))},Ye=e=>{let t,o=e.value,n=e.mode,a=!1;const s=m.o;if('update'===n){s.h=t=Ze('data');const e=typeof t==typeof o;if(e&&'object'==typeof t){!t&&(t={});for(let e in o)t[e]!==o[e]&&(t[e]=o[e],a=!0)}else!e&&t||t===o||(t=o,a=!0)}else t=o,a=!0;return a&&(s.h=t,s.u.data=t,He(!0)),a},Ze=(e,t)=>{const o=Ve(t);return e?o[e]:o},et=e=>{const t=m.t,o=m.o.i;return e?t[e]||o[e]:{...t,...o,cookie:{...t.cookie}}},tt=()=>!m.o.T,ot=async e=>{const{o:o,t:n,re:a}=m,c=window;if(!c._ccRun){if(c._ccRun=!0,(e=>{const{ne:o,t:n,o:a}=m,c=n,r=a,{cookie:i}=c,l=m.ce,d=e.cookie,f=e.categories,_=S(f)||[],p=navigator,u=document;o.$e=u,o.ye=u.documentElement,i.domain=location.hostname,r.i=e,r.F=f,r.O=_,r._=e.language.translations,r.v=!!e.disablePageInteraction,l.ie=e.onFirstConsent,l.le=e.onConsent,l.de=e.onChange,l._e=e.onModalHide,l.fe=e.onModalShow,l.pe=e.onModalReady;const{mode:g,autoShow:b,lazyHtmlGeneration:y,autoClearCookies:h,revision:C,manageScriptTags:x,hideFromBots:M}=e;g===t&&(c.mode=g),'boolean'==typeof h&&(c.autoClearCookies=h),'boolean'==typeof x&&(c.manageScriptTags=x),'number'==typeof C&&C>=0&&(c.revision=C,r.I=!0),'boolean'==typeof b&&(c.autoShow=b),'boolean'==typeof y&&(c.lazyHtmlGeneration=y),!1===M&&(c.hideFromBots=!1),!0===c.hideFromBots&&p&&(r.J=p.userAgent&&/bot|crawl|spider|slurp|teoma/i.test(p.userAgent)||p.webdriver),w(d)&&(c.cookie={...i,...d}),c.autoClearCookies,r.I,c.manageScriptTags,(e=>{const{F:t,X:o,Y:n,Z:a,B:s}=m.o;for(let c of e){const e=t[c],r=e.services||{},i=w(r)&&S(r)||[];o[c]={},n[c]=[],a[c]=[],e.readOnly&&(s.push(c),n[c]=i),m.ne.se[c]={};for(let e of i){const t=r[e];t.Se=!1,o[c][e]=t}}})(_),(()=>{if(!m.t.manageScriptTags)return;const e=m.o,t=D(document,'script['+s+']');for(const o of t){let t=H(o,s),n=o.dataset.service||'',a=!1;if(t&&'!'===t.charAt(0)&&(t=t.slice(1),a=!0),'!'===n.charAt(0)&&(n=n.slice(1),a=!0),v(e.O,t)&&(e.oe.push({Me:o,xe:!1,ke:a,Te:t,De:n}),n)){const o=e.X[t];o[n]||(o[n]={Se:!1})}}})(),Te((()=>{const e=m.o.i.language.autoDetect;if(e){const t={browser:navigator.language,document:document.documentElement.lang},o=xe(t[e]);if(o)return o}return Me()})())})(e),o.J)return;(()=>{const e=m.o,o=m.t,n=Ve(),{categories:a,services:s,consentId:c,consentTimestamp:r,lastConsentTimestamp:i,data:l,revision:d}=n,f=y(a);e.u=n,e.M=c;const _=!!c&&h(c);e.C=r,e.C&&(e.C=new Date(r)),e.S=i,e.S&&(e.S=new Date(i)),e.h=void 0!==l?l:null,e.I&&_&&d!==o.revision&&(e.V=!1),e.T=!(_&&e.V&&e.C&&e.S&&f),o.cookie.useLocalStorage&&!e.T&&(e.T=(new Date).getTime()>(n.expirationTime||0),e.T&&Ae(o.cookie.name)),e.T,(()=>{const e=m.o;for(const o of e.O){const n=e.F[o];if(n.readOnly||n.enabled){e.G.push(o);const n=e.X[o]||{};for(let a in n)e.Z[o].push(a),e.i.mode===t&&e.Y[o].push(a)}}})(),e.T?o.mode===t&&(e.R=[...e.G]):(e.Z={...e.Y},e.Y={...e.Y,...s},$([...e.B,...a]))})();const i=tt();if(!await De())return!1;if(z(null,r=Ke,ve,Ee),m.o.T&&Se(r,Ee),m.t.lazyHtmlGeneration||(ve(r,Ee),he(r,Ee)),n.autoShow&&!i&&Je(!0),i)return ae(),oe(a.le);n.mode===t&&ae(o.G)}var r},nt=e=>{const{we:t,ye:s}=m.ne,{name:c,path:r,domain:i,useLocalStorage:l}=m.t.cookie;e&&(l?Ae(c):Ge(c,r,i));for(const{ue:e,ge:t,me:o}of m.o.m)e.removeEventListener(t,o);t&&t.remove(),s&&s.classList.remove(a,n,o);const d=new g;for(const e in m)m[e]=d[e];window._ccRun=!1};export{je as acceptCategory,Oe as acceptService,Fe as acceptedCategory,Re as acceptedService,Ge as eraseCookies,et as getConfig,Ze as getCookie,We as getUserPreferences,Ue as hide,qe as hidePreferences,Xe as loadScript,nt as reset,ot as run,Ye as setCookieData,Qe as setLanguage,Je as show,ze as showAdditionalInformation,$e as showPreferences,tt as validConsent,Be as validCookie};
