/*!
* CookieConsent 3.0.1
* https://github.com/orestbida/cookieconsent
* Author Orest Bida
* Released under the MIT License
*/
var e,t;e=this,t=function(e){'use strict';const t='opt-in',o='opt-out',n='show--consent',a='show--preferences',s='show--additionalInfo',c='disable--interaction',r='data-category',i='div',l='button',d='aria-hidden',f='btn-group',_='click',u='data-role',p='consentModal',g='preferencesModal',m='additionalInfoModal';class b{constructor(){this.t={mode:t,revision:0,autoShow:!0,lazyHtmlGeneration:!0,autoClearCookies:!0,manageScriptTags:!0,hideFromBots:!0,cookie:{name:'cc_cookie',expiresAfterDays:182,domain:'',path:'/',sameSite:'Lax'}},this.o={i:{},l:'',_:{},u:{},p:{},m:[],v:!1,h:null,C:null,S:null,M:'',T:!0,A:!1,D:!1,k:!1,I:!1,N:[],H:!1,V:!0,j:[],L:!1,F:'',P:!1,O:[],R:[],B:[],G:[],J:!1,U:!1,$:!1,q:[],K:[],W:[],X:{},Y:{},Z:{},ee:{},te:{},oe:[]},this.ne={ae:{},se:{}},this.ce={},this.re={ie:'cc:onFirstConsent',le:'cc:onConsent',de:'cc:onChange',fe:'cc:onModalShow',_e:'cc:onModalHide',ue:'cc:onModalReady'}}}const v=new b,h=(e,t)=>e.indexOf(t),y=(e,t)=>-1!==h(e,t),w=e=>Array.isArray(e),C=e=>'string'==typeof e,S=e=>!!e&&'object'==typeof e&&!w(e),x=e=>'function'==typeof e,M=e=>Object.keys(e),T=e=>Array.from(new Set(e)),A=()=>document.activeElement,D=e=>e.preventDefault(),k=(e,t)=>e.querySelectorAll(t),I=e=>e.dispatchEvent(new Event('change')),E=e=>{const t=document.createElement(e);return e===l&&(t.type=e),t},N=(e,t,o)=>e.setAttribute(t,o),H=(e,t,o)=>{e.removeAttribute(o?'data-'+t:t)},V=(e,t,o)=>e.getAttribute(o?'data-'+t:t),j=(e,t)=>e.appendChild(t),L=(e,t)=>e.classList.add(t),F=(e,t)=>L(e,'cm__'+t),P=(e,t)=>L(e,'pm__'+t),O=(e,t)=>e.classList.remove(t),R=(e,t)=>e.classList.contains(t),B=e=>{if('object'!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());let t=Array.isArray(e)?[]:{};for(let o in e){let n=e[o];t[o]=B(n)}return t},G=()=>{const e={},{O:t,X:o,Y:n}=v.o;for(const a of t)e[a]=z(n[a],M(o[a]));return e},J=(e,t)=>dispatchEvent(new CustomEvent(e,{detail:t})),U=(e,t,o,n)=>{e.addEventListener(t,o),n&&v.o.m.push({pe:e,ge:t,me:o})},$=()=>{const e=v.t.cookie.expiresAfterDays;return x(e)?e(v.o.F):e},z=(e,t)=>{const o=e||[],n=t||[];return o.filter((e=>!y(n,e))).concat(n.filter((e=>!y(o,e))))},q=e=>{v.o.R=T(e),v.o.F=(()=>{let e='custom';const{R:t,O:o,B:n}=v.o,a=t.length;return a===o.length?e='all':a===n.length&&(e='necessary'),e})()},K=(e,t,o,n,a)=>{const s='accept-',{show:c,showPreferences:r,showAdditionalInfo:i,hide:l,hidePreferences:d,hideAdditionalInfo:f,acceptCategory:u}=t,p=e||document,g=e=>k(p,`[data-cc="${e}"]`),m=(e,t)=>{D(e),u(t),d(),f(),l()},b=g('show-preferencesModal'),h=g('show-consentModal'),y=g('show-additionalInfoModal'),w=g(s+'all'),C=g(s+'necessary'),S=g(s+'custom'),x=v.t.lazyHtmlGeneration,M=v.t.lazyHtmlGeneration;for(const e of b)N(e,'aria-haspopup','dialog'),U(e,_,(e=>{D(e),r()})),x&&(U(e,'mouseenter',(e=>{D(e),v.o.I||o(t,a)}),!0),U(e,'focus',(()=>{v.o.I||o(t,a)})));for(const e of y)N(e,'aria-haspopup','dialog'),U(e,_,(e=>{D(e),i()})),M&&(U(e,'mouseenter',(e=>{D(e),v.o.be||n(t,a)}),!0),U(e,'focus',(()=>{v.o.be||n(t,a)})));for(let e of h)N(e,'aria-haspopup','dialog'),U(e,_,(e=>{D(e),c(!0)}),!0);for(let e of w)U(e,_,(e=>{m(e,'all')}),!0);for(let e of S)U(e,_,(e=>{m(e)}),!0);for(let e of C)U(e,_,(e=>{m(e,[])}),!0)},Q=(e,t)=>{e&&(t&&(e.tabIndex=-1),e.focus(),t&&e.removeAttribute('tabindex'))},W=(e,t)=>{const o=n=>{n.target.removeEventListener('transitionend',o),'opacity'===n.propertyName&&'1'===getComputedStyle(e).opacity&&Q((e=>1===e?v.ne.ve:2===e?v.ne.he:v.ne.ye)(t))};U(e,'transitionend',o)};let X;const Y=e=>{clearTimeout(X),e?L(v.ne.we,c):X=setTimeout((()=>{O(v.ne.we,c)}),500)},Z=['M 19.5 4.5 L 4.5 19.5 M 4.5 4.501 L 19.5 19.5','M 3.572 13.406 L 8.281 18.115 L 20.428 5.885','M 21.999 6.94 L 11.639 17.18 L 2.001 6.82 '],ee=(e=0,t=1.5)=>`<svg viewBox="0 0 24 24" stroke-width="${t}"><path d="${Z[e]}"/></svg>`,te=e=>{const t=v.ne,o=v.o;(e=>{const n=e===t.Ce,a=e===t.Se,s=o.i.disablePageInteraction?t.we:n?t.xe:t.we;U(s,'keydown',(t=>{if('Tab'!==t.key||!(n?o.D&&!o.k:a?o.k:o.Me))return;const s=A(),c=n?o.q:a?o.K:o.Te;0!==c.length&&(t.shiftKey?s!==c[0]&&e.contains(s)||(D(t),Q(c[1])):s!==c[1]&&e.contains(s)||(D(t),Q(c[0])))}),!0)})(e)},oe=['[href]',l,'input','details','[tabindex]'].map((e=>e+':not([tabindex="-1"])')).join(','),ne=e=>{const{o:t,ne:o}=v,n=(e,t)=>{const o=k(e,oe);t[0]=o[0],t[1]=o[o.length-2],t[2]=o[o.length-1]};1===e&&t.A&&n(o.Ce,t.q),2===e&&t.I&&n(o.Se,t.K),3===e&&t.be&&n(o.Ae,t.Te)},ae=(e,t,o)=>{const{de:n,le:a,ie:s,_e:c,ue:r,fe:i}=v.ce,l=v.re;if(t){const n={modalName:t};return e===l.fe?x(i)&&i(n):e===l._e?x(c)&&c(n):(n.modal=o,x(r)&&r(n)),J(e,n)}const d={cookie:v.o.p};e===l.ie?x(s)&&s(B(d)):e===l.le?x(a)&&a(B(d)):(d.changedCategories=v.o.j,d.changedServices=v.o.ee,x(n)&&n(B(d))),J(e,B(d))},se=(e,t)=>{try{return e()}catch(e){return!t&&console.warn('CookieConsent:',e),!1}},ce=e=>{const{Y:t,ee:o,O:n,X:a,oe:s,p:c,j:i}=v.o;for(const e of n){const n=o[e]||t[e]||[];for(const o of n){const n=a[e][o];if(!n)continue;const{onAccept:s,onReject:c}=n;!n.De&&y(t[e],o)?(n.De=!0,x(s)&&s()):n.De&&!y(t[e],o)&&(n.De=!1,x(c)&&c())}}if(!v.t.manageScriptTags)return;const l=s,d=e||c.categories||[],f=(e,n)=>{if(n>=e.length)return;const a=s[n];if(a.ke)return f(e,n+1);const c=a.Ie,l=a.Ee,_=a.Ne,u=y(d,l),p=!!_&&y(t[l],_);if(!_&&!a.He&&u||!_&&a.He&&!u&&y(i,l)||_&&!a.He&&p||_&&a.He&&!p&&y(o[l]||[],_)){a.ke=!0;const t=V(c,'type',!0);H(c,'type',!!t),H(c,r);let o=V(c,'src',!0);o&&H(c,'src',!0);const s=E('script');s.textContent=c.innerHTML;for(const{nodeName:e}of c.attributes)N(s,e,c[e]||V(c,e));t&&(s.type=t),o?s.src=o:o=c.src;const i=!!o&&(!t||['text/javascript','module'].includes(t));if(i&&(s.onload=s.onerror=()=>{f(e,++n)}),c.replaceWith(s),i)return}f(e,++n)};f(l,0)},re='bottom',ie='left',le='center',de='right',fe='inline',_e='wide',ue='pm--',pe=['middle','top',re],ge=[ie,le,de],me={box:{Ve:[_e,fe],je:pe,Le:ge,Fe:re,Pe:de},cloud:{Ve:[fe],je:pe,Le:ge,Fe:re,Pe:le},bar:{Ve:[fe],je:pe.slice(1),Le:[],Fe:re,Pe:''}},be={box:{Ve:[],je:[],Le:[],Fe:'',Pe:''},bar:{Ve:[_e],je:[],Le:[ie,de],Fe:'',Pe:ie}},ve=e=>{const t=v.o.i.guiOptions,o=t&&t.consentModal,n=t&&t.preferencesModal;0===e&&he(v.ne.Ce,me,o,'cm--','box','cm'),1===e&&he(v.ne.Se,be,n,ue,'box','pm')},he=(e,t,o,n,a,s)=>{e.className=s;const c=o&&o.layout,r=o&&o.position,i=o&&o.flipButtons,l=!o||!1!==o.equalWeightButtons,d=c&&c.split(' ')||[],f=d[0],_=d[1],u=f in t?f:a,p=t[u],g=y(p.Ve,_)&&_,m=r&&r.split(' ')||[],b=m[0],h=n===ue?m[0]:m[1],w=y(p.je,b)?b:p.Fe,C=y(p.Le,h)?h:p.Pe,S=t=>{t&&L(e,n+t)};S(u),S(g),S(w),S(C),i&&S('flip');const x=s+'__btn--secondary';if('cm'===s){const{Oe:e,Re:t}=v.ne;e&&(l?O(e,x):L(e,x)),t&&(l?O(t,x):L(t,x))}else{const{Be:e}=v.ne;e&&(l?O(e,x):L(e,x))}},ye=(e,t)=>{const o=v.o,n=v.ne,{hide:a,hidePreferences:s,acceptCategory:c}=e,r=e=>{c(e),s(),a()},p=o.u&&o.u.preferencesModal;if(!p)return;const m=p.title,b=p.closeIconLabel,h=p.acceptAllBtn,y=p.acceptNecessaryBtn,w=p.savePreferencesBtn,x=p.sections||[],T=h||y||w;if(n.Ge)n.Je=E(i),P(n.Je,'body');else{n.Ge=E(i),L(n.Ge,'pm-wrapper');const e=E('div');L(e,'pm-overlay'),j(n.Ge,e),U(e,_,s),n.Se=E(i),L(n.Se,'pm'),N(n.Se,'role','dialog'),N(n.Se,d,!0),N(n.Se,'aria-modal',!0),N(n.Se,'aria-labelledby','pm__title'),U(n.we,'keydown',(e=>{27===e.keyCode&&s()}),!0),n.Ue=E(i),P(n.Ue,'header'),n.$e=E('h2'),P(n.$e,'title'),n.$e.id='pm__title',n.ze=E(l),P(n.ze,'close-btn'),N(n.ze,'aria-label',p.closeIconLabel||''),U(n.ze,_,s),n.qe=E('span'),n.qe.innerHTML=ee(),j(n.ze,n.qe),n.Ke=E(i),P(n.Ke,'body'),n.Qe=E(i),P(n.Qe,'footer');var A=E(i);L(A,'btns');var D=E(i),k=E(i);P(D,f),P(k,f),j(n.Qe,D),j(n.Qe,k),j(n.Ue,n.$e),j(n.Ue,n.ze),n.he=E(i),N(n.he,'tabIndex',-1),j(n.Se,n.he),j(n.Se,n.Ue),j(n.Se,n.Ke),T&&j(n.Se,n.Qe),j(n.Ge,n.Se)}let I;m&&(n.$e.innerHTML=m,b&&N(n.ze,'aria-label',b)),x.forEach(((e,t)=>{const a=e.title,s=e.description,c=e.linkedCategory,r=c&&o.P[c],f=e.cookieTable,u=f&&f.body,g=f&&f.caption,m=u&&u.length>0,b=!!r,v=b&&o.X[c],h=S(v)&&M(v)||[],y=b&&(!!s||!!m||M(v).length>0);var w=E(i);if(P(w,'section'),y||s){var x=E(i);P(x,'section-desc-wrapper')}let T=h.length;if(y&&T>0){const e=E(i);P(e,'section-services');for(const t of h){const o=v[t],n=o&&o.label||t,a=E(i),s=E(i),l=E(i),d=E(i);P(a,'service'),P(d,'service-title'),P(s,'service-header'),P(l,'service-icon');const f=we(n,t,r,!0,c);d.innerHTML=n,j(s,l),j(s,d),j(a,s),j(a,f),j(e,a)}j(x,e)}if(a){var A=E(i),D=E(b?l:i);if(P(A,'section-title-wrapper'),P(D,'section-title'),D.innerHTML=a,j(A,D),b){const e=E('span');e.innerHTML=ee(2,3.5),P(e,'section-arrow'),j(A,e),w.className+='--toggle';const t=we(a,c,r);let o=p.serviceCounterLabel;if(T>0&&C(o)){let e=E('span');P(e,'badge'),P(e,'service-counter'),N(e,d,!0),N(e,'data-servicecounter',T),o&&(o=o.split('|'),o=o.length>1&&T>1?o[1]:o[0],N(e,'data-counterlabel',o)),e.innerHTML=T+(o?' '+o:''),j(D,e)}if(y){P(w,'section--expandable');var k=c+'-desc';N(D,'aria-expanded',!1),N(D,'aria-controls',k)}j(A,t)}else N(D,'role','heading'),N(D,'aria-level','3');j(w,A)}if(s){var H=E('p');P(H,'section-desc'),H.innerHTML=s,j(x,H)}if(y&&(N(x,d,'true'),x.id=k,((e,t,o)=>{U(D,_,(()=>{R(t,'is-expanded')?(O(t,'is-expanded'),N(o,'aria-expanded','false'),N(e,d,'true')):(L(t,'is-expanded'),N(o,'aria-expanded','true'),N(e,d,'false'))}))})(x,w,D),m)){const e=E('table'),o=E('thead'),a=E('tbody');if(g){const t=E('caption');P(t,'table-caption'),t.innerHTML=g,e.appendChild(t)}P(e,'section-table'),P(o,'table-head'),P(a,'table-body');const s=f.headers,c=M(s),r=n.We.createDocumentFragment(),l=E('tr');for(const e of c){const o=s[e],n=E('th');n.id='cc__row-'+o+t,N(n,'scope','col'),P(n,'table-th'),n.innerHTML=o,j(r,n)}j(l,r),j(o,l);const d=n.We.createDocumentFragment();for(const e of u){const o=E('tr');P(o,'table-tr');for(const n of c){const a=s[n],c=e[n],r=E('td'),l=E(i);P(r,'table-td'),N(r,'data-column',a),N(r,'headers','cc__row-'+a+t),l.insertAdjacentHTML('beforeend',c),j(r,l),j(o,r)}j(d,o)}j(a,d),j(e,o),j(e,a),j(x,e)}(y||s)&&j(w,x);const V=n.Je||n.Ke;b?(I||(I=E(i),P(I,'section-toggles')),I.appendChild(w)):I=null,j(V,I||w)})),h&&(n.Xe||(n.Xe=E(l),P(n.Xe,'btn'),N(n.Xe,u,'all'),j(D,n.Xe),U(n.Xe,_,(()=>r('all')))),n.Xe.innerHTML=h),y&&(n.Be||(n.Be=E(l),P(n.Be,'btn'),N(n.Be,u,'necessary'),j(D,n.Be),U(n.Be,_,(()=>r([])))),n.Be.innerHTML=y),w&&(n.Ye||(n.Ye=E(l),P(n.Ye,'btn'),P(n.Ye,'btn--secondary'),N(n.Ye,u,'save'),j(k,n.Ye),U(n.Ye,_,(()=>r()))),n.Ye.innerHTML=w),n.Je&&(n.Se.replaceChild(n.Je,n.Ke),n.Ke=n.Je),ve(1),o.I||(o.I=!0,ae(v.re.ue,g,n.Se),t(e),j(n.xe,n.Ge),te(n.Se),setTimeout((()=>L(n.Ge,'cc--anim')),100)),ne(2)};function we(e,t,o,n,a){const s=v.o,c=v.ne,i=E('label'),l=E('input'),f=E('span'),u=E('span'),p=E('span'),g=E('span'),m=E('span');if(g.innerHTML=ee(1,3),m.innerHTML=ee(0,3),l.type='checkbox',L(i,'section__toggle-wrapper'),L(l,'section__toggle'),L(g,'toggle__icon-on'),L(m,'toggle__icon-off'),L(f,'toggle__icon'),L(u,'toggle__icon-circle'),L(p,'toggle__label'),N(f,d,'true'),n?(L(i,'toggle-service'),N(l,r,a),c.se[a][t]=l):c.ae[t]=l,n?(e=>{U(l,'change',(()=>{const t=c.se[e],o=c.ae[e];s.Z[e]=[];for(let o in t){const n=t[o];n.checked&&s.Z[e].push(n.value)}o.checked=s.Z[e].length>0}))})(a):(e=>{U(l,_,(()=>{const t=c.se[e],o=l.checked;s.Z[e]=[];for(let n in t)t[n].checked=o,o&&s.Z[e].push(n)}))})(t),l.value=t,p.textContent=e.replace(/<.*>.*<\/.*>/gm,''),j(u,m),j(u,g),j(f,u),s.T)(o.readOnly||o.enabled)&&(l.checked=!0);else if(n){const e=s.Y[a];l.checked=o.readOnly||y(e,t)}else y(s.R,t)&&(l.checked=!0);return o.readOnly&&(l.disabled=!0),j(i,l),j(i,f),j(i,p),i}const Ce=(e,t)=>{const o=v.o,n=v.ne,{hide:a,hideAdditionalInfo:s,acceptCategory:c}=e,r=e=>{c(e),s(),a()},p=o.u&&o.u.additionalInfoModal;if(!p)return;const g=p.title,b=p.closeIconLabel,h=p.acceptAllBtn,y=p.acceptNecessaryBtn,w=p.savePreferencesBtn,x=p.sections||[],T=h||y||w;if(n.Ze)n.et=E(i),P(n.et,'body');else{n.Ze=E(i),L(n.Ze,'pm-wrapper');const e=E('div');L(e,'pm-overlay'),j(n.Ze,e),U(e,_,s),n.Ae=E(i),L(n.Ae,'pm'),N(n.Ae,'role','dialog'),N(n.Ae,d,!0),N(n.Ae,'aria-modal',!0),N(n.Ae,'aria-labelledby','pm__title'),U(n.we,'keydown',(e=>{27===e.keyCode&&s()}),!0),n.tt=E(i),P(n.tt,'header'),n.ot=E('h2'),P(n.ot,'title'),n.ot.id='pm__title',n.nt=E(l),P(n.nt,'close-btn'),N(n.nt,'aria-label',p.closeIconLabel||''),U(n.nt,_,s),n.st=E('span'),n.st.innerHTML=ee(),j(n.nt,n.st),n.ct=E(i),P(n.ct,'body'),n.rt=E(i),P(n.rt,'footer');var A=E(i);L(A,'btns');var D=E(i),k=E(i);P(D,f),P(k,f),j(n.rt,D),j(n.rt,k),j(n.tt,n.ot),j(n.tt,n.nt),n.ye=E(i),N(n.ye,'tabIndex',-1),j(n.Ae,n.ye),j(n.Ae,n.tt),j(n.Ae,n.ct),T&&j(n.Ae,n.rt),j(n.Ze,n.Ae)}let I;g&&(n.ot.innerHTML=g,b&&N(n.nt,'aria-label',b)),x.forEach(((e,t)=>{const a=e.title,s=e.description,c=e.linkedCategory,r=c&&o.P[c],f=e.cookieTable,u=f&&f.body,g=f&&f.caption,m=u&&u.length>0,b=!!r,v=b&&o.X[c],h=S(v)&&M(v)||[],y=b&&(!!s||!!m||M(v).length>0);var w=E(i);if(P(w,'section'),y||s){var x=E(i);P(x,'section-desc-wrapper')}let T=h.length;if(y&&T>0){const e=E(i);P(e,'section-services');for(const t of h){const o=v[t],n=o&&o.label||t,a=E(i),s=E(i),l=E(i),d=E(i);P(a,'service'),P(d,'service-title'),P(s,'service-header'),P(l,'service-icon');const f=Se(n,t,r,!0,c);d.innerHTML=n,j(s,l),j(s,d),j(a,s),j(a,f),j(e,a)}j(x,e)}if(a){var A=E(i),D=E(b?l:i);if(P(A,'section-title-wrapper'),P(D,'section-title'),D.innerHTML=a,j(A,D),b){const e=E('span');e.innerHTML=ee(2,3.5),P(e,'section-arrow'),j(A,e),w.className+='--toggle';const t=Se(a,c,r);let o=p.serviceCounterLabel;if(T>0&&C(o)){let e=E('span');P(e,'badge'),P(e,'service-counter'),N(e,d,!0),N(e,'data-servicecounter',T),o&&(o=o.split('|'),o=o.length>1&&T>1?o[1]:o[0],N(e,'data-counterlabel',o)),e.innerHTML=T+(o?' '+o:''),j(D,e)}if(y){P(w,'section--expandable');var k=c+'-desc';N(D,'aria-expanded',!1),N(D,'aria-controls',k)}j(A,t)}else N(D,'role','heading'),N(D,'aria-level','3');j(w,A)}if(s){var H=E('p');P(H,'section-desc'),H.innerHTML=s,j(x,H)}if(y&&(N(x,d,'true'),x.id=k,((e,t,o)=>{U(D,_,(()=>{R(t,'is-expanded')?(O(t,'is-expanded'),N(o,'aria-expanded','false'),N(e,d,'true')):(L(t,'is-expanded'),N(o,'aria-expanded','true'),N(e,d,'false'))}))})(x,w,D),m)){const e=E('table'),o=E('thead'),a=E('tbody');if(g){const t=E('caption');P(t,'table-caption'),t.innerHTML=g,e.appendChild(t)}P(e,'section-table'),P(o,'table-head'),P(a,'table-body');const s=f.headers,c=M(s),r=n.We.createDocumentFragment(),l=E('tr');for(const e of c){const o=s[e],n=E('th');n.id='cc__row-'+o+t,N(n,'scope','col'),P(n,'table-th'),n.innerHTML=o,j(r,n)}j(l,r),j(o,l);const d=n.We.createDocumentFragment();for(const e of u){const o=E('tr');P(o,'table-tr');for(const n of c){const a=s[n],c=e[n],r=E('td'),l=E(i);P(r,'table-td'),N(r,'data-column',a),N(r,'headers','cc__row-'+a+t),l.insertAdjacentHTML('beforeend',c),j(r,l),j(o,r)}j(d,o)}j(a,d),j(e,o),j(e,a),j(x,e)}(y||s)&&j(w,x);const V=n.et||n.ct;b?(I||(I=E(i),P(I,'section-toggles')),I.appendChild(w)):I=null,j(V,I||w)})),h&&''!==h&&(n.it||(n.it=E(l),P(n.it,'btn'),N(n.it,u,'all'),j(D,n.it),U(n.it,_,(()=>r('all')))),n.it.innerHTML=h),y&&''!==y&&(n.lt||(n.lt=E(l),P(n.lt,'btn'),N(n.lt,u,'necessary'),j(D,n.lt),U(n.lt,_,(()=>r([])))),n.lt.innerHTML=y),w&&''!==w&&(n.dt||(n.dt=E(l),P(n.dt,'btn'),P(n.dt,'btn--secondary'),N(n.dt,u,'save'),j(k,n.dt),U(n.dt,_,(()=>r()))),n.dt.innerHTML=w),n.et&&(n.Ae.replaceChild(n.et,n.ct),n.ct=n.et),ve(1),o.be||(o.be=!0,ae(v.re.ue,m,n.Ae),t(e),j(n.xe,n.Ze),te(n.Ae),setTimeout((()=>L(n.Ze,'cc--anim')),100)),ne(2)};function Se(e,t,o,n,a){const s=v.o,c=v.ne,i=E('label'),l=E('input'),f=E('span'),u=E('span'),p=E('span'),g=E('span'),m=E('span');if(g.innerHTML=ee(1,3),m.innerHTML=ee(0,3),l.type='checkbox',L(i,'section__toggle-wrapper'),L(l,'section__toggle'),L(g,'toggle__icon-on'),L(m,'toggle__icon-off'),L(f,'toggle__icon'),L(u,'toggle__icon-circle'),L(p,'toggle__label'),N(f,d,'true'),n?(L(i,'toggle-service'),N(l,r,a),c.se[a][t]=l):c.ae[t]=l,n?(e=>{U(l,'change',(()=>{const t=c.se[e],o=c.ae[e];s.Z[e]=[];for(let o in t){const n=t[o];n.checked&&s.Z[e].push(n.value)}o.checked=s.Z[e].length>0}))})(a):(e=>{U(l,_,(()=>{const t=c.se[e],o=l.checked;s.Z[e]=[];for(let n in t)t[n].checked=o,o&&s.Z[e].push(n)}))})(t),l.value=t,p.textContent=e.replace(/<.*>.*<\/.*>/gm,''),j(u,m),j(u,g),j(f,u),s.T)(o.readOnly||o.enabled)&&(l.checked=!0);else if(n){const e=s.Y[a];l.checked=o.readOnly||y(e,t)}else y(s.R,t)&&(l.checked=!0);return o.readOnly&&(l.disabled=!0),j(i,l),j(i,f),j(i,p),i}const xe=()=>{const e=E('span');return v.ne.ft||(v.ne.ft=e),e},Me=(e,t)=>{const o=v.o,n=v.ne,{hide:a,showPreferences:s,showAdditionalInfo:c,acceptCategory:r}=e,g=o.u&&o.u.consentModal;if(!g)return;const m=g.acceptAllBtn,b=g.acceptNecessaryBtn,h=g.showPreferencesBtn,y=g.additionalInfoBtn,w=g.closeIconLabel,C=g.footer,S=g.label,x=g.title,M=e=>{a(),r(e)};if(!n._t){n._t=E(i),n.Ce=E(i),n.ut=E(i),n.gt=E(i),n.bt=E(i),L(n._t,'cm-wrapper'),L(n.Ce,'cm'),F(n.ut,'body'),F(n.gt,'texts'),F(n.bt,'btns'),N(n.Ce,'role','dialog'),N(n.Ce,'aria-modal','true'),N(n.Ce,d,'false'),N(n.Ce,'aria-describedby','cm__desc'),S?N(n.Ce,'aria-label',S):x&&N(n.Ce,'aria-labelledby','cm__title');const e='box',t=o.i.guiOptions,a=t&&t.consentModal,s=(a&&a.layout||e).split(' ')[0]===e;x&&w&&s&&(n.Re||(n.Re=E(l),n.Re.innerHTML=ee(),F(n.Re,'btn'),F(n.Re,'btn--close'),U(n.Re,_,(()=>{M([])})),j(n.ut,n.Re)),N(n.Re,'aria-label',w)),j(n.ut,n.gt),(m||b||h)&&j(n.ut,n.bt),n.ve=E(i),N(n.ve,'tabIndex',-1),j(n.Ce,n.ve),j(n.Ce,n.ut),j(n._t,n.Ce)}x&&(n.vt||(n.vt=E('h2'),n.vt.className=n.vt.id='cm__title',j(n.gt,n.vt)),n.vt.innerHTML=x);let T=g.description;if(T&&(o.H&&(T=T.replace('{{revisionMessage}}',o.V?'':g.revisionMessage||'')),n.ht||(n.ht=E('p'),n.ht.className=n.ht.id='cm__desc',j(n.gt,n.ht)),n.ht.innerHTML=T),m&&(n.yt||(n.yt=E(l),j(n.yt,xe()),F(n.yt,'btn'),N(n.yt,u,'all'),U(n.yt,_,(()=>{M('all')}))),n.yt.firstElementChild.innerHTML=m),b&&(n.Oe||(n.Oe=E(l),j(n.Oe,xe()),F(n.Oe,'btn'),N(n.Oe,u,'necessary'),U(n.Oe,_,(()=>{M([])}))),n.Oe.firstElementChild.innerHTML=b),h&&(n.wt||(n.wt=E(l),j(n.wt,xe()),F(n.wt,'btn'),F(n.wt,'btn--secondary'),N(n.wt,u,'show'),U(n.wt,'mouseenter',(()=>{o.I||ye(e,t)})),U(n.wt,_,s)),n.wt.firstElementChild.innerHTML=h),y&&(n.Ct||(n.Ct=E(l),j(n.Ct,xe()),F(n.Ct,'btn'),F(n.Ct,'btn--secondary'),F(n.Ct,'btn--additional-info'),N(n.Ct,u,'show'),N(n.Ct,'data-cc','show-additionalInfoModal'),U(n.Ct,'mouseenter',(()=>{o.be||Ce(e,t)})),U(n.Ct,_,c)),n.Ct.firstElementChild.innerHTML=y),n.St||(n.St=E(i),F(n.St,f),m&&j(n.St,n.yt),b&&j(n.St,n.Oe),(m||b)&&j(n.ut,n.St),j(n.bt,n.St)),n.wt&&!n.xt&&(n.xt=E(i),n.Oe&&n.yt?(F(n.xt,f),j(n.xt,n.wt),j(n.bt,n.xt)):(j(n.St,n.wt),F(n.St,f+'--uneven'))),n.Ct&&!n.Mt&&(n.Mt=E(i),n.Oe&&n.yt?(F(n.Mt,f),j(n.Mt,n.Ct),j(n.bt,n.Mt)):(j(n.St,n.Ct),F(n.St,f+'--uneven'))),C){if(!n.Tt){let e=E(i),t=E(i);n.Tt=E(i),F(e,'footer'),F(t,'links'),F(n.Tt,'link-group'),j(t,n.Tt),j(e,t),j(n.Ce,e)}n.Tt.innerHTML=C}ve(0),o.A||(o.A=!0,ae(v.re.ue,p,n.Ce),t(e),j(n.xe,n._t),te(n.Ce),setTimeout((()=>L(n._t,'cc--anim')),100)),ne(1),K(n.ut,e,ye,t)},Te=e=>{if(!C(e))return null;if(e in v.o._)return e;let t=e.slice(0,2);return t in v.o._?t:null},Ae=()=>v.o.l||v.o.i.language.default,De=e=>{e&&(v.o.l=e)},ke=async e=>{const t=v.o;let o=Te(e)?e:Ae(),n=t._[o];return C(n)?n=await(async e=>{try{const t=await fetch(e);return await t.json()}catch(e){return console.error(e),!1}})(n):x(n)&&(n=await n()),!!n&&(t.u=n,De(o),!0)},Ie=()=>{let e=v.o.i.language.rtl,t=v.ne.xe;e&&t&&(w(e)||(e=[e]),y(e,v.o.l)?L(t,'cc--rtl'):O(t,'cc--rtl'))},Ee=()=>{const e=v.ne;if(e.xe)return;e.xe=E(i),e.xe.id='cc-main',e.xe.setAttribute('data-nosnippet',''),Ie();let t=v.o.i.root;t&&C(t)&&(t=document.querySelector(t)),(t||e.We.body).appendChild(e.xe)},Ne=e=>se((()=>localStorage.removeItem(e))),He=(e,t)=>{if(t instanceof RegExp)return e.filter((e=>t.test(e)));{const o=h(e,t);return o>-1?[e[o]]:[]}},Ve=e=>{const{hostname:t,protocol:o}=location,{name:n,path:a,domain:s,sameSite:c,useLocalStorage:r}=v.t.cookie,i=e?(()=>{const e=v.o.S,t=e?new Date-e:0;return 864e5*$()-t})():864e5*$(),l=new Date;l.setTime(l.getTime()+i),v.o.p.expirationTime=l.getTime();const d=JSON.stringify(v.o.p);let f=n+'='+encodeURIComponent(d)+(0!==i?'; expires='+l.toUTCString():'')+'; Path='+a+'; SameSite='+c;y(t,'.')&&(f+='; Domain='+s),'https:'===o&&(f+='; Secure'),r?((e,t)=>{se((()=>localStorage.setItem(e,t)))})(n,d):document.cookie=f,v.o.p},je=(e,t,o)=>{if(0===e.length)return;const n=o||v.t.cookie.domain,a=t||v.t.cookie.path,s='www.'===n.slice(0,4),c=s&&n.substring(4),r=(e,t)=>{document.cookie=e+'=; path='+a+(t?'; domain=.'+t:'')+'; expires=Thu, 01 Jan 1970 00:00:01 GMT;'};for(const t of e)r(t),r(t,n),s&&r(t,c)},Le=e=>{const t=e||v.t.cookie.name,o=v.t.cookie.useLocalStorage;return((e,t)=>{let o;return o=se((()=>JSON.parse(t?e:decodeURIComponent(e))),!0)||{},o})(o?(n=t,se((()=>localStorage.getItem(n)))||''):Fe(t,!0),o);var n},Fe=(e,t)=>{const o=document.cookie.match('(^|;)\\s*'+e+'\\s*=\\s*([^;]+)');return o?t?o.pop():e:''},Pe=e=>{const t=document.cookie.split(/;\s*/),o=[];for(const n of t){let t=n.split('=')[0];e?se((()=>{e.test(t)&&o.push(t)})):o.push(t)}return o},Oe=(e,n=[])=>{((e,t)=>{const{O:o,R:n,B:a,I:s,Z:c,G:r,X:i}=v.o;let l=[];if(e){w(e)?l.push(...e):C(e)&&(l='all'===e?o:[e]);for(const e of o)c[e]=y(l,e)?M(i[e]):[]}else l=[...n,...r],s&&(l=(()=>{const e=v.ne.ae;if(!e)return[];let t=[];for(let o in e)e[o].checked&&t.push(o);return t})());l=l.filter((e=>!y(o,e)||!y(t,e))),l.push(...a),q(l)})(e,n),(e=>{const t=v.o,{Z:o,B:n,Y:a,X:s,O:c}=t,r=c;t.te=B(a);for(const e of r){const c=s[e],r=M(c),i=o[e]&&o[e].length>0,l=y(n,e);if(0!==r.length){if(a[e]=[],l)a[e].push(...r);else if(i){const t=o[e];a[e].push(...t)}else a[e]=t.Z[e];a[e]=T(a[e])}}})(),(()=>{const e=v.o;e.j=v.t.mode===o&&e.T?z(e.G,e.R):z(e.R,e.p.categories);let n=e.j.length>0,a=!1;for(const t of e.O)e.ee[t]=z(e.Y[t],e.te[t]),e.ee[t].length>0&&(a=!0);const s=v.ne.ae;for(const t in s)s[t].checked=y(e.R,t);for(const t of e.O){const o=v.ne.se[t],n=e.Y[t];for(const e in o)o[e].checked=y(n,e)}e.C||(e.C=new Date),e.M||(e.M=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))),e.p={categories:B(e.R),revision:v.t.revision,data:e.h,consentTimestamp:e.C.toISOString(),consentId:e.M,services:B(e.Y)};let c=!1;const r=n||a;(e.T||r)&&(e.T&&(e.T=!1,c=!0),e.S=e.S?new Date:e.C,e.p.lastConsentTimestamp=e.S.toISOString(),Ve(),v.t.autoClearCookies&&(c||r)&&(e=>{const t=v.o,o=Pe(),n=(e=>{const t=v.o;return(e?t.O:t.j).filter((e=>{const o=t.P[e];return!!o&&!o.readOnly&&!!o.autoClear}))})(e);for(const e in t.ee)for(const n of t.ee[e]){const a=t.X[e][n].cookies;if(!y(t.Y[e],n)&&a)for(const e of a){const t=He(o,e.name);je(t,e.path,e.domain)}}for(const a of n){const n=t.P[a].autoClear,s=n&&n.cookies||[],c=y(t.j,a),r=!y(t.R,a),i=c&&r;if(e?r:i){n.reloadPage&&i&&(t.L=!0);for(const e of s){const t=He(o,e.name);je(t,e.path,e.domain)}}}})(c),ce()),c&&(ae(v.re.ie),ae(v.re.le),v.t.mode===t)||(r&&ae(v.re.de),e.L&&(e.L=!1,location.reload()))})()},Re=e=>{const t=v.o.T?[]:v.o.R;return y(t,e)},Be=(e,t)=>{const o=v.o.T?[]:v.o.Y[t]||[];return y(o,e)},Ge=(e,t,o)=>{let n=[];const a=e=>{if(C(e)){let t=Fe(e);''!==t&&n.push(t)}else n.push(...Pe(e))};if(w(e))for(let t of e)a(t);else a(e);je(n,t,o)},Je=e=>{const{ne:t,o:o}=v;if(!o.D){if(!o.A){if(!e)return;Me(Qe,Ee)}o.D=!0,o.U=A(),o.v&&Y(!0),W(t.Ce,1),L(t.we,n),N(t.Ce,d,'false'),setTimeout((()=>{Q(v.ne.ve)}),100),ae(v.re.fe,p)}},Ue=()=>{const{ne:e,o:t,re:o}=v;t.D&&(t.D=!1,t.v&&Y(),Q(e.ft,!0),O(e.we,n),N(e.Ce,d,'true'),Q(t.U),t.U=null,ae(o._e,p))},$e=()=>{const e=v.o;e.k||(e.I||ye(Qe,Ee),e.k=!0,e.D?e.$=A():e.U=A(),W(v.ne.Se,2),L(v.ne.we,a),N(v.ne.Se,d,'false'),setTimeout((()=>{Q(v.ne.he)}),100),ae(v.re.fe,g))},ze=()=>{const e=v.o;e.Me||(e.be||Ce(Qe,Ee),e.Me=!0,e.D?e.$=A():e.U=A(),W(v.ne.Se,2),L(v.ne.we,s),N(v.ne.Se,d,'false'),setTimeout((()=>{Q(v.ne.he)}),100),ae(v.re.fe,m))},qe=()=>{const e=v.o;e.k&&(e.k=!1,(()=>{const e=Xe(),t=v.o.P,o=v.ne.ae,n=v.ne.se,a=e=>y(v.o.G,e);for(const s in o){const c=!!t[s].readOnly;o[s].checked=c||(e?Re(s):a(s));for(const t in n[s])n[s][t].checked=c||(e?Be(t,s):a(s))}})(),Q(v.ne.qe,!0),O(v.ne.we,a),N(v.ne.Se,d,'true'),e.D?(Q(e.$),e.$=null):(Q(e.U),e.U=null),ae(v.re._e,g))},Ke=()=>{const e=v.o;e.Me&&(e.Me=!1,(()=>{const e=Xe(),t=v.o.P,o=v.ne.ae,n=v.ne.se,a=e=>y(v.o.G,e);for(const s in o){const c=!!t[s].readOnly;o[s].checked=c||(e?Re(s):a(s));for(const t in n[s])n[s][t].checked=c||(e?Be(t,s):a(s))}})(),Q(v.ne.qe,!0),O(v.ne.we,s),N(v.ne.Se,d,'true'),e.D?(Q(e.$),e.$=null):(Q(e.U),e.U=null),ae(v.re._e,m))};var Qe={show:Je,hide:Ue,showPreferences:$e,showAdditionalInfo:ze,hidePreferences:qe,hideAdditionalInfo:Ke,acceptCategory:Oe};const We=(e,t)=>{const o=Le(t);return e?o[e]:o},Xe=()=>!v.o.T;e.acceptCategory=Oe,e.acceptService=(e,t)=>{const{O:o,X:n}=v.o;if(!(e&&t&&C(t)&&y(o,t)&&0!==M(n[t]).length))return!1;((e,t)=>{const o=v.o,{X:n,Z:a,I:s}=o,c=v.ne.se[t]||{},r=v.ne.ae[t]||{},i=M(n[t]);if(a[t]=[],C(e)){if('all'===e){if(a[t].push(...i),s)for(let e in c)c[e].checked=!0,I(c[e])}else if(y(i,e)&&a[t].push(e),s)for(let t in c)c[t].checked=e===t,I(c[t])}else if(w(e))for(let o of i){const n=y(e,o);n&&a[t].push(o),s&&(c[o].checked=n,I(c[o]))}const l=0===a[t].length;o.R=l?o.R.filter((e=>e!==t)):T([...o.R,t]),s&&(r.checked=!l,I(r))})(e,t),Oe()},e.acceptedCategory=Re,e.acceptedService=Be,e.eraseCookies=Ge,e.getConfig=e=>{const t=v.t,o=v.o.i;return e?t[e]||o[e]:{...t,...o,cookie:{...t.cookie}}},e.getCookie=We,e.getUserPreferences=()=>{const{F:e,Y:t}=v.o,{accepted:o,rejected:n}=(()=>{const{T:e,R:t,O:o}=v.o;return{accepted:t,rejected:e?[]:o.filter((e=>!y(t,e)))}})();return B({acceptType:e,acceptedCategories:o,rejectedCategories:n,acceptedServices:t,rejectedServices:G()})},e.hide=Ue,e.hideAdditionalInfo=Ke,e.hidePreferences=qe,e.loadScript=(e,t)=>{let o=document.querySelector('script[src="'+e+'"]');return new Promise((n=>{if(o)return n(!0);if(o=E('script'),S(t))for(const e in t)N(o,e,t[e]);o.onload=()=>n(!0),o.onerror=()=>{o.remove(),n(!1)},o.src=e,j(document.head,o)}))},e.reset=e=>{const{xe:t,we:o}=v.ne,{name:r,path:i,domain:l,useLocalStorage:d}=v.t.cookie;e&&(d?Ne(r):Ge(r,i,l));for(const{pe:e,ge:t,me:o}of v.o.m)e.removeEventListener(t,o);t&&t.remove(),o&&o.classList.remove(c,a,s,n);const f=new b;for(const e in v)v[e]=f[e];window._ccRun=!1},e.run=async e=>{const{o:t,t:n,re:a}=v,s=window;if(!s._ccRun){if(s._ccRun=!0,(e=>{const{ne:t,t:n,o:a}=v,s=n,c=a,{cookie:i}=s,l=v.ce,d=e.cookie,f=e.categories,_=M(f)||[],u=navigator,p=document;t.We=p,t.we=p.documentElement,i.domain=location.hostname,c.i=e,c.P=f,c.O=_,c._=e.language.translations,c.v=!!e.disablePageInteraction,l.ie=e.onFirstConsent,l.le=e.onConsent,l.de=e.onChange,l._e=e.onModalHide,l.fe=e.onModalShow,l.ue=e.onModalReady;const{mode:g,autoShow:m,lazyHtmlGeneration:b,autoClearCookies:h,revision:w,manageScriptTags:C,hideFromBots:x}=e;g===o&&(s.mode=g),'boolean'==typeof h&&(s.autoClearCookies=h),'boolean'==typeof C&&(s.manageScriptTags=C),'number'==typeof w&&w>=0&&(s.revision=w,c.H=!0),'boolean'==typeof m&&(s.autoShow=m),'boolean'==typeof b&&(s.lazyHtmlGeneration=b),!1===x&&(s.hideFromBots=!1),!0===s.hideFromBots&&u&&(c.J=u.userAgent&&/bot|crawl|spider|slurp|teoma/i.test(u.userAgent)||u.webdriver),S(d)&&(s.cookie={...i,...d}),s.autoClearCookies,c.H,s.manageScriptTags,(e=>{const{P:t,X:o,Y:n,Z:a,B:s}=v.o;for(let c of e){const e=t[c],r=e.services||{},i=S(r)&&M(r)||[];o[c]={},n[c]=[],a[c]=[],e.readOnly&&(s.push(c),n[c]=i),v.ne.se[c]={};for(let e of i){const t=r[e];t.De=!1,o[c][e]=t}}})(_),(()=>{if(!v.t.manageScriptTags)return;const e=v.o,t=k(document,'script['+r+']');for(const o of t){let t=V(o,r),n=o.dataset.service||'',a=!1;if(t&&'!'===t.charAt(0)&&(t=t.slice(1),a=!0),'!'===n.charAt(0)&&(n=n.slice(1),a=!0),y(e.O,t)&&(e.oe.push({Ie:o,ke:!1,He:a,Ee:t,Ne:n}),n)){const o=e.X[t];o[n]||(o[n]={De:!1})}}})(),De((()=>{const e=v.o.i.language.autoDetect;if(e){const t={browser:navigator.language,document:document.documentElement.lang},o=Te(t[e]);if(o)return o}return Ae()})())})(e),t.J)return;(()=>{const e=v.o,t=v.t,n=Le(),{categories:a,services:s,consentId:c,consentTimestamp:r,lastConsentTimestamp:i,data:l,revision:d}=n,f=w(a);e.p=n,e.M=c;const _=!!c&&C(c);e.C=r,e.C&&(e.C=new Date(r)),e.S=i,e.S&&(e.S=new Date(i)),e.h=void 0!==l?l:null,e.H&&_&&d!==t.revision&&(e.V=!1),e.T=!(_&&e.V&&e.C&&e.S&&f),t.cookie.useLocalStorage&&!e.T&&(e.T=(new Date).getTime()>(n.expirationTime||0),e.T&&Ne(t.cookie.name)),e.T,(()=>{const e=v.o;for(const t of e.O){const n=e.P[t];if(n.readOnly||n.enabled){e.G.push(t);const n=e.X[t]||{};for(let a in n)e.Z[t].push(a),e.i.mode===o&&e.Y[t].push(a)}}})(),e.T?t.mode===o&&(e.R=[...e.G]):(e.Z={...e.Y},e.Y={...e.Y,...s},q([...e.B,...a]))})();const i=Xe();if(!await ke())return!1;if(K(null,c=Qe,ye,Ce,Ee),v.o.T&&Me(c,Ee),v.t.lazyHtmlGeneration||(ye(c,Ee),Ce(c,Ee)),n.autoShow&&!i&&Je(!0),i)return ce(),ae(a.le);n.mode===o&&ce(t.G)}var c},e.setCookieData=e=>{let t,o=e.value,n=e.mode,a=!1;const s=v.o;if('update'===n){s.h=t=We('data');const e=typeof t==typeof o;if(e&&'object'==typeof t){!t&&(t={});for(let e in o)t[e]!==o[e]&&(t[e]=o[e],a=!0)}else!e&&t||t===o||(t=o,a=!0)}else t=o,a=!0;return a&&(s.h=t,s.p.data=t,Ve(!0)),a},e.setLanguage=async(e,t)=>{if(!Te(e))return!1;const o=v.o;return!(e===Ae()&&!0!==t||!await ke(e)||(De(e),o.A&&Me(Qe,Ee),o.I&&ye(Qe,Ee),o.be&&Ce(Qe,Ee),Ie(),0))},e.show=Je,e.showAdditionalInfo=ze,e.showPreferences=$e,e.validConsent=Xe,e.validCookie=e=>''!==Fe(e,!0)},'object'==typeof exports&&'undefined'!=typeof module?t(exports):'function'==typeof define&&define.amd?define(['exports'],t):t((e='undefined'!=typeof globalThis?globalThis:e||self).CookieConsent={});
