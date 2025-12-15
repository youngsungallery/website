(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function oo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ue={},Nn=[],_t=()=>{},Xa=()=>!1,Ai=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),lo=t=>t.startsWith("onUpdate:"),Pe=Object.assign,ao=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},tf=Object.prototype.hasOwnProperty,se=(t,e)=>tf.call(t,e),W=Array.isArray,xn=t=>Ni(t)==="[object Map]",Za=t=>Ni(t)==="[object Set]",V=t=>typeof t=="function",be=t=>typeof t=="string",Xt=t=>typeof t=="symbol",pe=t=>t!==null&&typeof t=="object",ec=t=>(pe(t)||V(t))&&V(t.then)&&V(t.catch),tc=Object.prototype.toString,Ni=t=>tc.call(t),nf=t=>Ni(t).slice(8,-1),nc=t=>Ni(t)==="[object Object]",xi=t=>be(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,is=oo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Oi=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},sf=/-\w/g,Xe=Oi(t=>t.replace(sf,e=>e.slice(1).toUpperCase())),rf=/\B([A-Z])/g,mn=Oi(t=>t.replace(rf,"-$1").toLowerCase()),Pi=Oi(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ji=Oi(t=>t?`on${Pi(t)}`:""),$t=(t,e)=>!Object.is(t,e),Xi=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},sc=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},of=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let fl;const Di=()=>fl||(fl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function co(t){if(W(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=be(s)?uf(s):co(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(be(t)||pe(t))return t}const lf=/;(?![^(]*\))/g,af=/:([^]+)/,cf=/\/\*[^]*?\*\//g;function uf(t){const e={};return t.replace(cf,"").split(lf).forEach(n=>{if(n){const s=n.split(af);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function uo(t){let e="";if(be(t))e=t;else if(W(t))for(let n=0;n<t.length;n++){const s=uo(t[n]);s&&(e+=s+" ")}else if(pe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const hf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ff=oo(hf);function ic(t){return!!t||t===""}const rc=t=>!!(t&&t.__v_isRef===!0),oc=t=>be(t)?t:t==null?"":W(t)||pe(t)&&(t.toString===tc||!V(t.toString))?rc(t)?oc(t.value):JSON.stringify(t,lc,2):String(t),lc=(t,e)=>rc(e)?lc(t,e.value):xn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[Zi(s,r)+" =>"]=i,n),{})}:Za(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Zi(n))}:Xt(e)?Zi(e):pe(e)&&!W(e)&&!nc(e)?String(e):e,Zi=(t,e="")=>{var n;return Xt(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Re;class ac{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Re,!e&&Re&&(this.index=(Re.scopes||(Re.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Re;try{return Re=this,e()}finally{Re=n}}}on(){++this._on===1&&(this.prevScope=Re,Re=this)}off(){this._on>0&&--this._on===0&&(Re=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function cc(t){return new ac(t)}function uc(){return Re}function df(t,e=!1){Re&&Re.cleanups.push(t)}let ae;const er=new WeakSet;class hc{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Re&&Re.active&&Re.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,er.has(this)&&(er.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||dc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,dl(this),pc(this);const e=ae,n=st;ae=this,st=!0;try{return this.fn()}finally{_c(this),ae=e,st=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)po(e);this.deps=this.depsTail=void 0,dl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?er.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Sr(this)&&this.run()}get dirty(){return Sr(this)}}let fc=0,rs,os;function dc(t,e=!1){if(t.flags|=8,e){t.next=os,os=t;return}t.next=rs,rs=t}function ho(){fc++}function fo(){if(--fc>0)return;if(os){let e=os;for(os=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;rs;){let e=rs;for(rs=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function pc(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function _c(t){let e,n=t.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),po(s),pf(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}t.deps=e,t.depsTail=n}function Sr(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(gc(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function gc(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===vs)||(t.globalVersion=vs,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Sr(t))))return;t.flags|=2;const e=t.dep,n=ae,s=st;ae=t,st=!0;try{pc(t);const i=t.fn(t._value);(e.version===0||$t(i,t._value))&&(t.flags|=128,t._value=i,e.version++)}catch(i){throw e.version++,i}finally{ae=n,st=s,_c(t),t.flags&=-3}}function po(t,e=!1){const{dep:n,prevSub:s,nextSub:i}=t;if(s&&(s.nextSub=i,t.prevSub=void 0),i&&(i.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)po(r,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function pf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let st=!0;const mc=[];function At(){mc.push(st),st=!1}function Nt(){const t=mc.pop();st=t===void 0?!0:t}function dl(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ae;ae=void 0;try{e()}finally{ae=n}}}let vs=0;class _f{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class _o{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ae||!st||ae===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ae)n=this.activeLink=new _f(ae,this),ae.deps?(n.prevDep=ae.depsTail,ae.depsTail.nextDep=n,ae.depsTail=n):ae.deps=ae.depsTail=n,yc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=ae.depsTail,n.nextDep=void 0,ae.depsTail.nextDep=n,ae.depsTail=n,ae.deps===n&&(ae.deps=s)}return n}trigger(e){this.version++,vs++,this.notify(e)}notify(e){ho();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{fo()}}}function yc(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)yc(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const ni=new WeakMap,un=Symbol(""),Ir=Symbol(""),Es=Symbol("");function Ae(t,e,n){if(st&&ae){let s=ni.get(t);s||ni.set(t,s=new Map);let i=s.get(n);i||(s.set(n,i=new _o),i.map=s,i.key=n),i.track()}}function St(t,e,n,s,i,r){const o=ni.get(t);if(!o){vs++;return}const l=a=>{a&&a.trigger()};if(ho(),e==="clear")o.forEach(l);else{const a=W(t),c=a&&xi(n);if(a&&n==="length"){const h=Number(s);o.forEach((u,f)=>{(f==="length"||f===Es||!Xt(f)&&f>=h)&&l(u)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(Es)),e){case"add":a?c&&l(o.get("length")):(l(o.get(un)),xn(t)&&l(o.get(Ir)));break;case"delete":a||(l(o.get(un)),xn(t)&&l(o.get(Ir)));break;case"set":xn(t)&&l(o.get(un));break}}fo()}function gf(t,e){const n=ni.get(t);return n&&n.get(e)}function bn(t){const e=Z(t);return e===t?e:(Ae(e,"iterate",Es),Je(t)?e:e.map(xt))}function go(t){return Ae(t=Z(t),"iterate",Es),t}function Ht(t,e){return Yt(t)?Tt(t)?Cs(xt(e)):Cs(e):xt(e)}const mf={__proto__:null,[Symbol.iterator](){return tr(this,Symbol.iterator,t=>Ht(this,t))},concat(...t){return bn(this).concat(...t.map(e=>W(e)?bn(e):e))},entries(){return tr(this,"entries",t=>(t[1]=Ht(this,t[1]),t))},every(t,e){return Et(this,"every",t,e,void 0,arguments)},filter(t,e){return Et(this,"filter",t,e,n=>n.map(s=>Ht(this,s)),arguments)},find(t,e){return Et(this,"find",t,e,n=>Ht(this,n),arguments)},findIndex(t,e){return Et(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Et(this,"findLast",t,e,n=>Ht(this,n),arguments)},findLastIndex(t,e){return Et(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Et(this,"forEach",t,e,void 0,arguments)},includes(...t){return nr(this,"includes",t)},indexOf(...t){return nr(this,"indexOf",t)},join(t){return bn(this).join(t)},lastIndexOf(...t){return nr(this,"lastIndexOf",t)},map(t,e){return Et(this,"map",t,e,void 0,arguments)},pop(){return Yn(this,"pop")},push(...t){return Yn(this,"push",t)},reduce(t,...e){return pl(this,"reduce",t,e)},reduceRight(t,...e){return pl(this,"reduceRight",t,e)},shift(){return Yn(this,"shift")},some(t,e){return Et(this,"some",t,e,void 0,arguments)},splice(...t){return Yn(this,"splice",t)},toReversed(){return bn(this).toReversed()},toSorted(t){return bn(this).toSorted(t)},toSpliced(...t){return bn(this).toSpliced(...t)},unshift(...t){return Yn(this,"unshift",t)},values(){return tr(this,"values",t=>Ht(this,t))}};function tr(t,e,n){const s=go(t),i=s[e]();return s!==t&&!Je(t)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=n(r.value)),r}),i}const yf=Array.prototype;function Et(t,e,n,s,i,r){const o=go(t),l=o!==t&&!Je(t),a=o[e];if(a!==yf[e]){const u=a.apply(t,r);return l?xt(u):u}let c=n;o!==t&&(l?c=function(u,f){return n.call(this,Ht(t,u),f,t)}:n.length>2&&(c=function(u,f){return n.call(this,u,f,t)}));const h=a.call(o,c,s);return l&&i?i(h):h}function pl(t,e,n,s){const i=go(t);let r=n;return i!==t&&(Je(t)?n.length>3&&(r=function(o,l,a){return n.call(this,o,l,a,t)}):r=function(o,l,a){return n.call(this,o,Ht(t,l),a,t)}),i[e](r,...s)}function nr(t,e,n){const s=Z(t);Ae(s,"iterate",Es);const i=s[e](...n);return(i===-1||i===!1)&&Mi(n[0])?(n[0]=Z(n[0]),s[e](...n)):i}function Yn(t,e,n=[]){At(),ho();const s=Z(t)[e].apply(t,n);return fo(),Nt(),s}const vf=oo("__proto__,__v_isRef,__isVue"),vc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Xt));function Ef(t){Xt(t)||(t=String(t));const e=Z(this);return Ae(e,"has",t),e.hasOwnProperty(t)}class Ec{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?xf:Sc:r?wc:bc).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=W(e);if(!i){let a;if(o&&(a=mf[n]))return a;if(n==="hasOwnProperty")return Ef}const l=Reflect.get(e,n,ge(e)?e:s);if((Xt(n)?vc.has(n):vf(n))||(i||Ae(e,"get",n),r))return l;if(ge(l)){const a=o&&xi(n)?l:l.value;return i&&pe(a)?Rr(a):a}return pe(l)?i?Rr(l):Ls(l):l}}class Cc extends Ec{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];const o=W(e)&&xi(n);if(!this._isShallow){const c=Yt(r);if(!Je(s)&&!Yt(s)&&(r=Z(r),s=Z(s)),!o&&ge(r)&&!ge(s))return c||(r.value=s),!0}const l=o?Number(n)<e.length:se(e,n),a=Reflect.set(e,n,s,ge(e)?e:i);return e===Z(i)&&(l?$t(s,r)&&St(e,"set",n,s):St(e,"add",n,s)),a}deleteProperty(e,n){const s=se(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&St(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!Xt(n)||!vc.has(n))&&Ae(e,"has",n),s}ownKeys(e){return Ae(e,"iterate",W(e)?"length":un),Reflect.ownKeys(e)}}class Cf extends Ec{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const bf=new Cc,wf=new Cf,Sf=new Cc(!0);const Tr=t=>t,Ks=t=>Reflect.getPrototypeOf(t);function If(t,e,n){return function(...s){const i=this.__v_raw,r=Z(i),o=xn(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),h=n?Tr:e?Cs:xt;return!e&&Ae(r,"iterate",a?Ir:un),{next(){const{value:u,done:f}=c.next();return f?{value:u,done:f}:{value:l?[h(u[0]),h(u[1])]:h(u),done:f}},[Symbol.iterator](){return this}}}}function zs(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Tf(t,e){const n={get(i){const r=this.__v_raw,o=Z(r),l=Z(i);t||($t(i,l)&&Ae(o,"get",i),Ae(o,"get",l));const{has:a}=Ks(o),c=e?Tr:t?Cs:xt;if(a.call(o,i))return c(r.get(i));if(a.call(o,l))return c(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!t&&Ae(Z(i),"iterate",un),i.size},has(i){const r=this.__v_raw,o=Z(r),l=Z(i);return t||($t(i,l)&&Ae(o,"has",i),Ae(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=Z(l),c=e?Tr:t?Cs:xt;return!t&&Ae(a,"iterate",un),l.forEach((h,u)=>i.call(r,c(h),c(u),o))}};return Pe(n,t?{add:zs("add"),set:zs("set"),delete:zs("delete"),clear:zs("clear")}:{add(i){!e&&!Je(i)&&!Yt(i)&&(i=Z(i));const r=Z(this);return Ks(r).has.call(r,i)||(r.add(i),St(r,"add",i,i)),this},set(i,r){!e&&!Je(r)&&!Yt(r)&&(r=Z(r));const o=Z(this),{has:l,get:a}=Ks(o);let c=l.call(o,i);c||(i=Z(i),c=l.call(o,i));const h=a.call(o,i);return o.set(i,r),c?$t(r,h)&&St(o,"set",i,r):St(o,"add",i,r),this},delete(i){const r=Z(this),{has:o,get:l}=Ks(r);let a=o.call(r,i);a||(i=Z(i),a=o.call(r,i)),l&&l.call(r,i);const c=r.delete(i);return a&&St(r,"delete",i,void 0),c},clear(){const i=Z(this),r=i.size!==0,o=i.clear();return r&&St(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=If(i,t,e)}),n}function mo(t,e){const n=Tf(t,e);return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(se(n,i)&&i in s?n:s,i,r)}const Rf={get:mo(!1,!1)},Af={get:mo(!1,!0)},Nf={get:mo(!0,!1)};const bc=new WeakMap,wc=new WeakMap,Sc=new WeakMap,xf=new WeakMap;function Of(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Pf(t){return t.__v_skip||!Object.isExtensible(t)?0:Of(nf(t))}function Ls(t){return Yt(t)?t:yo(t,!1,bf,Rf,bc)}function Ic(t){return yo(t,!1,Sf,Af,wc)}function Rr(t){return yo(t,!0,wf,Nf,Sc)}function yo(t,e,n,s,i){if(!pe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=Pf(t);if(r===0)return t;const o=i.get(t);if(o)return o;const l=new Proxy(t,r===2?s:n);return i.set(t,l),l}function Tt(t){return Yt(t)?Tt(t.__v_raw):!!(t&&t.__v_isReactive)}function Yt(t){return!!(t&&t.__v_isReadonly)}function Je(t){return!!(t&&t.__v_isShallow)}function Mi(t){return t?!!t.__v_raw:!1}function Z(t){const e=t&&t.__v_raw;return e?Z(e):t}function vo(t){return!se(t,"__v_skip")&&Object.isExtensible(t)&&sc(t,"__v_skip",!0),t}const xt=t=>pe(t)?Ls(t):t,Cs=t=>pe(t)?Rr(t):t;function ge(t){return t?t.__v_isRef===!0:!1}function fn(t){return Tc(t,!1)}function Df(t){return Tc(t,!0)}function Tc(t,e){return ge(t)?t:new Mf(t,e)}class Mf{constructor(e,n){this.dep=new _o,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Z(e),this._value=n?e:xt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Je(e)||Yt(e);e=s?e:Z(e),$t(e,n)&&(this._rawValue=e,this._value=s?e:xt(e),this.dep.trigger())}}function Gt(t){return ge(t)?t.value:t}const kf={get:(t,e,n)=>e==="__v_raw"?t:Gt(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return ge(i)&&!ge(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function Rc(t){return Tt(t)?t:new Proxy(t,kf)}function Lf(t){const e=W(t)?new Array(t.length):{};for(const n in t)e[n]=Ac(t,n);return e}class Ff{constructor(e,n,s){this._object=e,this._key=n,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._raw=Z(e);let i=!0,r=e;if(!W(e)||!xi(String(n)))do i=!Mi(r)||Je(r);while(i&&(r=r.__v_raw));this._shallow=i}get value(){let e=this._object[this._key];return this._shallow&&(e=Gt(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&ge(this._raw[this._key])){const n=this._object[this._key];if(ge(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return gf(this._raw,this._key)}}class Bf{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Hf(t,e,n){return ge(t)?t:V(t)?new Bf(t):pe(t)&&arguments.length>1?Ac(t,e,n):fn(t)}function Ac(t,e,n){return new Ff(t,e,n)}class Uf{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new _o(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ae!==this)return dc(this,!0),!0}get value(){const e=this.dep.track();return gc(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Wf(t,e,n=!1){let s,i;return V(t)?s=t:(s=t.get,i=t.set),new Uf(s,i,n)}const Ys={},si=new WeakMap;let rn;function Vf(t,e=!1,n=rn){if(n){let s=si.get(n);s||si.set(n,s=[]),s.push(t)}}function jf(t,e,n=ue){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=n,c=D=>i?D:Je(D)||i===!1||i===0?jt(D,1):jt(D);let h,u,f,_,m=!1,w=!1;if(ge(t)?(u=()=>t.value,m=Je(t)):Tt(t)?(u=()=>c(t),m=!0):W(t)?(w=!0,m=t.some(D=>Tt(D)||Je(D)),u=()=>t.map(D=>{if(ge(D))return D.value;if(Tt(D))return c(D);if(V(D))return a?a(D,2):D()})):V(t)?e?u=a?()=>a(t,2):t:u=()=>{if(f){At();try{f()}finally{Nt()}}const D=rn;rn=h;try{return a?a(t,3,[_]):t(_)}finally{rn=D}}:u=_t,e&&i){const D=u,$=i===!0?1/0:i;u=()=>jt(D(),$)}const M=uc(),P=()=>{h.stop(),M&&M.active&&ao(M.effects,h)};if(r&&e){const D=e;e=(...$)=>{D(...$),P()}}let x=w?new Array(t.length).fill(Ys):Ys;const k=D=>{if(!(!(h.flags&1)||!h.dirty&&!D))if(e){const $=h.run();if(i||m||(w?$.some((we,ie)=>$t(we,x[ie])):$t($,x))){f&&f();const we=rn;rn=h;try{const ie=[$,x===Ys?void 0:w&&x[0]===Ys?[]:x,_];x=$,a?a(e,3,ie):e(...ie)}finally{rn=we}}}else h.run()};return l&&l(k),h=new hc(u),h.scheduler=o?()=>o(k,!1):k,_=D=>Vf(D,!1,h),f=h.onStop=()=>{const D=si.get(h);if(D){if(a)a(D,4);else for(const $ of D)$();si.delete(h)}},e?s?k(!0):x=h.run():o?o(k.bind(null,!0),!0):h.run(),P.pause=h.pause.bind(h),P.resume=h.resume.bind(h),P.stop=P,P}function jt(t,e=1/0,n){if(e<=0||!pe(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ge(t))jt(t.value,e,n);else if(W(t))for(let s=0;s<t.length;s++)jt(t[s],e,n);else if(Za(t)||xn(t))t.forEach(s=>{jt(s,e,n)});else if(nc(t)){for(const s in t)jt(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&jt(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Fs(t,e,n,s){try{return s?t(...s):t()}catch(i){ki(i,e,n)}}function mt(t,e,n,s){if(V(t)){const i=Fs(t,e,n,s);return i&&ec(i)&&i.catch(r=>{ki(r,e,n)}),i}if(W(t)){const i=[];for(let r=0;r<t.length;r++)i.push(mt(t[r],e,n,s));return i}}function ki(t,e,n,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ue;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const h=l.ec;if(h){for(let u=0;u<h.length;u++)if(h[u](t,a,c)===!1)return}l=l.parent}if(r){At(),Fs(r,null,10,[t,a,c]),Nt();return}}$f(t,n,i,s,o)}function $f(t,e,n,s=!0,i=!1){if(i)throw t;console.error(t)}const Le=[];let dt=-1;const On=[];let Ut=null,In=0;const Nc=Promise.resolve();let ii=null;function Eo(t){const e=ii||Nc;return t?e.then(this?t.bind(this):t):e}function Gf(t){let e=dt+1,n=Le.length;for(;e<n;){const s=e+n>>>1,i=Le[s],r=bs(i);r<t||r===t&&i.flags&2?e=s+1:n=s}return e}function Co(t){if(!(t.flags&1)){const e=bs(t),n=Le[Le.length-1];!n||!(t.flags&2)&&e>=bs(n)?Le.push(t):Le.splice(Gf(e),0,t),t.flags|=1,xc()}}function xc(){ii||(ii=Nc.then(Pc))}function qf(t){W(t)?On.push(...t):Ut&&t.id===-1?Ut.splice(In+1,0,t):t.flags&1||(On.push(t),t.flags|=1),xc()}function _l(t,e,n=dt+1){for(;n<Le.length;n++){const s=Le[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;Le.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Oc(t){if(On.length){const e=[...new Set(On)].sort((n,s)=>bs(n)-bs(s));if(On.length=0,Ut){Ut.push(...e);return}for(Ut=e,In=0;In<Ut.length;In++){const n=Ut[In];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Ut=null,In=0}}const bs=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Pc(t){try{for(dt=0;dt<Le.length;dt++){const e=Le[dt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Fs(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;dt<Le.length;dt++){const e=Le[dt];e&&(e.flags&=-2)}dt=-1,Le.length=0,Oc(),ii=null,(Le.length||On.length)&&Pc()}}let et=null,Dc=null;function ri(t){const e=et;return et=t,Dc=t&&t.type.__scopeId||null,e}function ws(t,e=et,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&ai(-1);const r=ri(e);let o;try{o=t(...i)}finally{ri(r),s._d&&ai(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function nn(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(At(),mt(a,n,8,[t.el,l,t,e]),Nt())}}const Kf=Symbol("_vte"),zf=t=>t.__isTeleport,Yf=Symbol("_leaveCb");function bo(t,e){t.shapeFlag&6&&t.component?(t.transition=e,bo(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Mc(t,e){return V(t)?Pe({name:t.name},e,{setup:t}):t}function kc(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const oi=new WeakMap;function ls(t,e,n,s,i=!1){if(W(t)){t.forEach((m,w)=>ls(m,e&&(W(e)?e[w]:e),n,s,i));return}if(as(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ls(t,e,n,s.component.subTree);return}const r=s.shapeFlag&4?Ro(s.component):s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,h=l.refs===ue?l.refs={}:l.refs,u=l.setupState,f=Z(u),_=u===ue?Xa:m=>se(f,m);if(c!=null&&c!==a){if(gl(e),be(c))h[c]=null,_(c)&&(u[c]=null);else if(ge(c)){c.value=null;const m=e;m.k&&(h[m.k]=null)}}if(V(a))Fs(a,l,12,[o,h]);else{const m=be(a),w=ge(a);if(m||w){const M=()=>{if(t.f){const P=m?_(a)?u[a]:h[a]:a.value;if(i)W(P)&&ao(P,r);else if(W(P))P.includes(r)||P.push(r);else if(m)h[a]=[r],_(a)&&(u[a]=h[a]);else{const x=[r];a.value=x,t.k&&(h[t.k]=x)}}else m?(h[a]=o,_(a)&&(u[a]=o)):w&&(a.value=o,t.k&&(h[t.k]=o))};if(o){const P=()=>{M(),oi.delete(t)};P.id=-1,oi.set(t,P),Ke(P,n)}else gl(t),M()}}}function gl(t){const e=oi.get(t);e&&(e.flags|=8,oi.delete(t))}Di().requestIdleCallback;Di().cancelIdleCallback;const as=t=>!!t.type.__asyncLoader,Lc=t=>t.type.__isKeepAlive;function Qf(t,e){Fc(t,"a",e)}function Jf(t,e){Fc(t,"da",e)}function Fc(t,e,n=Oe){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(Li(e,s,n),n){let i=n.parent;for(;i&&i.parent;)Lc(i.parent.vnode)&&Xf(s,e,n,i),i=i.parent}}function Xf(t,e,n,s){const i=Li(e,t,s,!0);Fi(()=>{ao(s[e],i)},n)}function Li(t,e,n=Oe,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{At();const l=Hs(n),a=mt(e,n,t,o);return l(),Nt(),a});return s?i.unshift(r):i.push(r),r}}const Dt=t=>(e,n=Oe)=>{(!Is||t==="sp")&&Li(t,(...s)=>e(...s),n)},Zf=Dt("bm"),wo=Dt("m"),ed=Dt("bu"),td=Dt("u"),nd=Dt("bum"),Fi=Dt("um"),sd=Dt("sp"),id=Dt("rtg"),rd=Dt("rtc");function od(t,e=Oe){Li("ec",t,e)}const ld="components";function Bs(t,e){return cd(ld,t,!0,e)||t}const ad=Symbol.for("v-ndc");function cd(t,e,n=!0,s=!1){const i=et||Oe;if(i){const r=i.type;{const l=Xd(r,!1);if(l&&(l===e||l===Xe(e)||l===Pi(Xe(e))))return r}const o=ml(i[t]||r[t],e)||ml(i.appContext[t],e);return!o&&s?r:o}}function ml(t,e){return t&&(t[e]||t[Xe(e)]||t[Pi(Xe(e))])}const Ar=t=>t?su(t)?Ro(t):Ar(t.parent):null,cs=Pe(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ar(t.parent),$root:t=>Ar(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Hc(t),$forceUpdate:t=>t.f||(t.f=()=>{Co(t.update)}),$nextTick:t=>t.n||(t.n=Eo.bind(t.proxy)),$watch:t=>Cd.bind(t)}),sr=(t,e)=>t!==ue&&!t.__isScriptSetup&&se(t,e),ud={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(sr(s,e))return o[e]=1,s[e];if(i!==ue&&se(i,e))return o[e]=2,i[e];if(se(r,e))return o[e]=3,r[e];if(n!==ue&&se(n,e))return o[e]=4,n[e];Nr&&(o[e]=0)}}const c=cs[e];let h,u;if(c)return e==="$attrs"&&Ae(t.attrs,"get",""),c(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==ue&&se(n,e))return o[e]=4,n[e];if(u=a.config.globalProperties,se(u,e))return u[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return sr(i,e)?(i[e]=n,!0):s!==ue&&se(s,e)?(s[e]=n,!0):se(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,props:r,type:o}},l){let a;return!!(n[l]||t!==ue&&l[0]!=="$"&&se(t,l)||sr(e,l)||se(r,l)||se(s,l)||se(cs,l)||se(i.config.globalProperties,l)||(a=o.__cssModules)&&a[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:se(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function yl(t){return W(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Nr=!0;function hd(t){const e=Hc(t),n=t.proxy,s=t.ctx;Nr=!1,e.beforeCreate&&vl(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:h,beforeMount:u,mounted:f,beforeUpdate:_,updated:m,activated:w,deactivated:M,beforeDestroy:P,beforeUnmount:x,destroyed:k,unmounted:D,render:$,renderTracked:we,renderTriggered:ie,errorCaptured:z,serverPrefetch:Y,expose:me,inheritAttrs:De,components:Ge,directives:Be,filters:en}=e;if(c&&fd(c,s,null),o)for(const j in o){const te=o[j];V(te)&&(s[j]=te.bind(n))}if(i){const j=i.call(n,n);pe(j)&&(t.data=Ls(j))}if(Nr=!0,r)for(const j in r){const te=r[j],vt=V(te)?te.bind(n,n):V(te.get)?te.get.bind(n,n):_t,Lt=!V(te)&&V(te.set)?te.set.bind(n):_t,at=Fe({get:vt,set:Lt});Object.defineProperty(s,j,{enumerable:!0,configurable:!0,get:()=>at.value,set:He=>at.value=He})}if(l)for(const j in l)Bc(l[j],s,n,j);if(a){const j=V(a)?a.call(n):a;Reflect.ownKeys(j).forEach(te=>{Xs(te,j[te])})}h&&vl(h,t,"c");function _e(j,te){W(te)?te.forEach(vt=>j(vt.bind(n))):te&&j(te.bind(n))}if(_e(Zf,u),_e(wo,f),_e(ed,_),_e(td,m),_e(Qf,w),_e(Jf,M),_e(od,z),_e(rd,we),_e(id,ie),_e(nd,x),_e(Fi,D),_e(sd,Y),W(me))if(me.length){const j=t.exposed||(t.exposed={});me.forEach(te=>{Object.defineProperty(j,te,{get:()=>n[te],set:vt=>n[te]=vt,enumerable:!0})})}else t.exposed||(t.exposed={});$&&t.render===_t&&(t.render=$),De!=null&&(t.inheritAttrs=De),Ge&&(t.components=Ge),Be&&(t.directives=Be),Y&&kc(t)}function fd(t,e,n=_t){W(t)&&(t=xr(t));for(const s in t){const i=t[s];let r;pe(i)?"default"in i?r=gt(i.from||s,i.default,!0):r=gt(i.from||s):r=gt(i),ge(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function vl(t,e,n){mt(W(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Bc(t,e,n,s){let i=s.includes(".")?Vc(n,s):()=>n[s];if(be(t)){const r=e[t];V(r)&&us(i,r)}else if(V(t))us(i,t.bind(n));else if(pe(t))if(W(t))t.forEach(r=>Bc(r,e,n,s));else{const r=V(t.handler)?t.handler.bind(n):e[t.handler];V(r)&&us(i,r,t)}}function Hc(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>li(a,c,o,!0)),li(a,e,o)),pe(e)&&r.set(e,a),a}function li(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&li(t,r,n,!0),i&&i.forEach(o=>li(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=dd[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const dd={data:El,props:Cl,emits:Cl,methods:ss,computed:ss,beforeCreate:Me,created:Me,beforeMount:Me,mounted:Me,beforeUpdate:Me,updated:Me,beforeDestroy:Me,beforeUnmount:Me,destroyed:Me,unmounted:Me,activated:Me,deactivated:Me,errorCaptured:Me,serverPrefetch:Me,components:ss,directives:ss,watch:_d,provide:El,inject:pd};function El(t,e){return e?t?function(){return Pe(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function pd(t,e){return ss(xr(t),xr(e))}function xr(t){if(W(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Me(t,e){return t?[...new Set([].concat(t,e))]:e}function ss(t,e){return t?Pe(Object.create(null),t,e):e}function Cl(t,e){return t?W(t)&&W(e)?[...new Set([...t,...e])]:Pe(Object.create(null),yl(t),yl(e??{})):e}function _d(t,e){if(!t)return e;if(!e)return t;const n=Pe(Object.create(null),t);for(const s in e)n[s]=Me(t[s],e[s]);return n}function Uc(){return{app:null,config:{isNativeTag:Xa,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let gd=0;function md(t,e){return function(s,i=null){V(s)||(s=Pe({},s)),i!=null&&!pe(i)&&(i=null);const r=Uc(),o=new WeakSet,l=[];let a=!1;const c=r.app={_uid:gd++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:ep,get config(){return r.config},set config(h){},use(h,...u){return o.has(h)||(h&&V(h.install)?(o.add(h),h.install(c,...u)):V(h)&&(o.add(h),h(c,...u))),c},mixin(h){return r.mixins.includes(h)||r.mixins.push(h),c},component(h,u){return u?(r.components[h]=u,c):r.components[h]},directive(h,u){return u?(r.directives[h]=u,c):r.directives[h]},mount(h,u,f){if(!a){const _=c._ceVNode||de(s,i);return _.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),t(_,h,f),a=!0,c._container=h,h.__vue_app__=c,Ro(_.component)}},onUnmount(h){l.push(h)},unmount(){a&&(mt(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(h,u){return r.provides[h]=u,c},runWithContext(h){const u=hn;hn=c;try{return h()}finally{hn=u}}};return c}}let hn=null;function Xs(t,e){if(Oe){let n=Oe.provides;const s=Oe.parent&&Oe.parent.provides;s===n&&(n=Oe.provides=Object.create(s)),n[t]=e}}function gt(t,e,n=!1){const s=nu();if(s||hn){let i=hn?hn._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&t in i)return i[t];if(arguments.length>1)return n&&V(e)?e.call(s&&s.proxy):e}}function yd(){return!!(nu()||hn)}const vd=Symbol.for("v-scx"),Ed=()=>gt(vd);function us(t,e,n){return Wc(t,e,n)}function Wc(t,e,n=ue){const{immediate:s,deep:i,flush:r,once:o}=n,l=Pe({},n),a=e&&s||!e&&r!=="post";let c;if(Is){if(r==="sync"){const _=Ed();c=_.__watcherHandles||(_.__watcherHandles=[])}else if(!a){const _=()=>{};return _.stop=_t,_.resume=_t,_.pause=_t,_}}const h=Oe;l.call=(_,m,w)=>mt(_,h,m,w);let u=!1;r==="post"?l.scheduler=_=>{Ke(_,h&&h.suspense)}:r!=="sync"&&(u=!0,l.scheduler=(_,m)=>{m?_():Co(_)}),l.augmentJob=_=>{e&&(_.flags|=4),u&&(_.flags|=2,h&&(_.id=h.uid,_.i=h))};const f=jf(t,e,l);return Is&&(c?c.push(f):a&&f()),f}function Cd(t,e,n){const s=this.proxy,i=be(t)?t.includes(".")?Vc(s,t):()=>s[t]:t.bind(s,s);let r;V(e)?r=e:(r=e.handler,n=e);const o=Hs(this),l=Wc(i,r.bind(s),n);return o(),l}function Vc(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const bd=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Xe(e)}Modifiers`]||t[`${mn(e)}Modifiers`];function wd(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||ue;let i=n;const r=e.startsWith("update:"),o=r&&bd(s,e.slice(7));o&&(o.trim&&(i=n.map(h=>be(h)?h.trim():h)),o.number&&(i=n.map(of)));let l,a=s[l=Ji(e)]||s[l=Ji(Xe(e))];!a&&r&&(a=s[l=Ji(mn(e))]),a&&mt(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,mt(c,t,6,i)}}const Sd=new WeakMap;function jc(t,e,n=!1){const s=n?Sd:e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!V(t)){const a=c=>{const h=jc(c,e,!0);h&&(l=!0,Pe(o,h))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(pe(t)&&s.set(t,null),null):(W(r)?r.forEach(a=>o[a]=null):Pe(o,r),pe(t)&&s.set(t,o),o)}function Bi(t,e){return!t||!Ai(e)?!1:(e=e.slice(2).replace(/Once$/,""),se(t,e[0].toLowerCase()+e.slice(1))||se(t,mn(e))||se(t,e))}function bl(t){const{type:e,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:c,renderCache:h,props:u,data:f,setupState:_,ctx:m,inheritAttrs:w}=t,M=ri(t);let P,x;try{if(n.shapeFlag&4){const D=i||s,$=D;P=pt(c.call($,D,h,u,_,f,m)),x=l}else{const D=e;P=pt(D.length>1?D(u,{attrs:l,slots:o,emit:a}):D(u,null)),x=e.props?l:Id(l)}}catch(D){hs.length=0,ki(D,t,1),P=de(Ln)}let k=P;if(x&&w!==!1){const D=Object.keys(x),{shapeFlag:$}=k;D.length&&$&7&&(r&&D.some(lo)&&(x=Td(x,r)),k=Fn(k,x,!1,!0))}return n.dirs&&(k=Fn(k,null,!1,!0),k.dirs=k.dirs?k.dirs.concat(n.dirs):n.dirs),n.transition&&bo(k,n.transition),P=k,ri(M),P}const Id=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ai(n))&&((e||(e={}))[n]=t[n]);return e},Td=(t,e)=>{const n={};for(const s in t)(!lo(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function Rd(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?wl(s,o,c):!!o;if(a&8){const h=e.dynamicProps;for(let u=0;u<h.length;u++){const f=h[u];if(o[f]!==s[f]&&!Bi(c,f))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?wl(s,o,c):!0:!!o;return!1}function wl(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!Bi(n,r))return!0}return!1}function Ad({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const $c={},Gc=()=>Object.create($c),qc=t=>Object.getPrototypeOf(t)===$c;function Nd(t,e,n,s=!1){const i={},r=Gc();t.propsDefaults=Object.create(null),Kc(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:Ic(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function xd(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=Z(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const h=t.vnode.dynamicProps;for(let u=0;u<h.length;u++){let f=h[u];if(Bi(t.emitsOptions,f))continue;const _=e[f];if(a)if(se(r,f))_!==r[f]&&(r[f]=_,c=!0);else{const m=Xe(f);i[m]=Or(a,l,m,_,t,!1)}else _!==r[f]&&(r[f]=_,c=!0)}}}else{Kc(t,e,i,r)&&(c=!0);let h;for(const u in l)(!e||!se(e,u)&&((h=mn(u))===u||!se(e,h)))&&(a?n&&(n[u]!==void 0||n[h]!==void 0)&&(i[u]=Or(a,l,u,void 0,t,!0)):delete i[u]);if(r!==l)for(const u in r)(!e||!se(e,u))&&(delete r[u],c=!0)}c&&St(t.attrs,"set","")}function Kc(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(is(a))continue;const c=e[a];let h;i&&se(i,h=Xe(a))?!r||!r.includes(h)?n[h]=c:(l||(l={}))[h]=c:Bi(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=Z(n),c=l||ue;for(let h=0;h<r.length;h++){const u=r[h];n[u]=Or(i,a,u,c[u],t,!se(c,u))}}return o}function Or(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=se(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&V(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const h=Hs(i);s=c[n]=a.call(null,e),h()}}else s=a;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===mn(n))&&(s=!0))}return s}const Od=new WeakMap;function zc(t,e,n=!1){const s=n?Od:e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!V(t)){const h=u=>{a=!0;const[f,_]=zc(u,e,!0);Pe(o,f),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(h),t.extends&&h(t.extends),t.mixins&&t.mixins.forEach(h)}if(!r&&!a)return pe(t)&&s.set(t,Nn),Nn;if(W(r))for(let h=0;h<r.length;h++){const u=Xe(r[h]);Sl(u)&&(o[u]=ue)}else if(r)for(const h in r){const u=Xe(h);if(Sl(u)){const f=r[h],_=o[u]=W(f)||V(f)?{type:f}:Pe({},f),m=_.type;let w=!1,M=!0;if(W(m))for(let P=0;P<m.length;++P){const x=m[P],k=V(x)&&x.name;if(k==="Boolean"){w=!0;break}else k==="String"&&(M=!1)}else w=V(m)&&m.name==="Boolean";_[0]=w,_[1]=M,(w||se(_,"default"))&&l.push(u)}}const c=[o,l];return pe(t)&&s.set(t,c),c}function Sl(t){return t[0]!=="$"&&!is(t)}const So=t=>t==="_"||t==="_ctx"||t==="$stable",Io=t=>W(t)?t.map(pt):[pt(t)],Pd=(t,e,n)=>{if(e._n)return e;const s=ws((...i)=>Io(e(...i)),n);return s._c=!1,s},Yc=(t,e,n)=>{const s=t._ctx;for(const i in t){if(So(i))continue;const r=t[i];if(V(r))e[i]=Pd(i,r,s);else if(r!=null){const o=Io(r);e[i]=()=>o}}},Qc=(t,e)=>{const n=Io(e);t.slots.default=()=>n},Jc=(t,e,n)=>{for(const s in e)(n||!So(s))&&(t[s]=e[s])},Dd=(t,e,n)=>{const s=t.slots=Gc();if(t.vnode.shapeFlag&32){const i=e._;i?(Jc(s,e,n),n&&sc(s,"_",i,!0)):Yc(e,s)}else e&&Qc(t,e)},Md=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=ue;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:Jc(i,e,n):(r=!e.$stable,Yc(e,i)),o=e}else e&&(Qc(t,e),o={default:1});if(r)for(const l in i)!So(l)&&o[l]==null&&delete i[l]},Ke=Hd;function kd(t){return Ld(t)}function Ld(t,e){const n=Di();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:h,parentNode:u,nextSibling:f,setScopeId:_=_t,insertStaticContent:m}=t,w=(d,p,g,v=null,C=null,y=null,R=void 0,T=null,I=!!p.dynamicChildren)=>{if(d===p)return;d&&!Qn(d,p)&&(v=E(d),He(d,C,y,!0),d=null),p.patchFlag===-2&&(I=!1,p.dynamicChildren=null);const{type:b,ref:B,shapeFlag:N}=p;switch(b){case Hi:M(d,p,g,v);break;case Ln:P(d,p,g,v);break;case rr:d==null&&x(p,g,v,R);break;case wt:Ge(d,p,g,v,C,y,R,T,I);break;default:N&1?$(d,p,g,v,C,y,R,T,I):N&6?Be(d,p,g,v,C,y,R,T,I):(N&64||N&128)&&b.process(d,p,g,v,C,y,R,T,I,L)}B!=null&&C?ls(B,d&&d.ref,y,p||d,!p):B==null&&d&&d.ref!=null&&ls(d.ref,null,y,d,!0)},M=(d,p,g,v)=>{if(d==null)s(p.el=l(p.children),g,v);else{const C=p.el=d.el;p.children!==d.children&&c(C,p.children)}},P=(d,p,g,v)=>{d==null?s(p.el=a(p.children||""),g,v):p.el=d.el},x=(d,p,g,v)=>{[d.el,d.anchor]=m(d.children,p,g,v,d.el,d.anchor)},k=({el:d,anchor:p},g,v)=>{let C;for(;d&&d!==p;)C=f(d),s(d,g,v),d=C;s(p,g,v)},D=({el:d,anchor:p})=>{let g;for(;d&&d!==p;)g=f(d),i(d),d=g;i(p)},$=(d,p,g,v,C,y,R,T,I)=>{if(p.type==="svg"?R="svg":p.type==="math"&&(R="mathml"),d==null)we(p,g,v,C,y,R,T,I);else{const b=d.el&&d.el._isVueCE?d.el:null;try{b&&b._beginPatch(),Y(d,p,C,y,R,T,I)}finally{b&&b._endPatch()}}},we=(d,p,g,v,C,y,R,T)=>{let I,b;const{props:B,shapeFlag:N,transition:F,dirs:U}=d;if(I=d.el=o(d.type,y,B&&B.is,B),N&8?h(I,d.children):N&16&&z(d.children,I,null,v,C,ir(d,y),R,T),U&&nn(d,null,v,"created"),ie(I,d,d.scopeId,R,v),B){for(const le in B)le!=="value"&&!is(le)&&r(I,le,null,B[le],y,v);"value"in B&&r(I,"value",null,B.value,y),(b=B.onVnodeBeforeMount)&&ft(b,v,d)}U&&nn(d,null,v,"beforeMount");const X=Fd(C,F);X&&F.beforeEnter(I),s(I,p,g),((b=B&&B.onVnodeMounted)||X||U)&&Ke(()=>{b&&ft(b,v,d),X&&F.enter(I),U&&nn(d,null,v,"mounted")},C)},ie=(d,p,g,v,C)=>{if(g&&_(d,g),v)for(let y=0;y<v.length;y++)_(d,v[y]);if(C){let y=C.subTree;if(p===y||eu(y.type)&&(y.ssContent===p||y.ssFallback===p)){const R=C.vnode;ie(d,R,R.scopeId,R.slotScopeIds,C.parent)}}},z=(d,p,g,v,C,y,R,T,I=0)=>{for(let b=I;b<d.length;b++){const B=d[b]=T?Wt(d[b]):pt(d[b]);w(null,B,p,g,v,C,y,R,T)}},Y=(d,p,g,v,C,y,R)=>{const T=p.el=d.el;let{patchFlag:I,dynamicChildren:b,dirs:B}=p;I|=d.patchFlag&16;const N=d.props||ue,F=p.props||ue;let U;if(g&&sn(g,!1),(U=F.onVnodeBeforeUpdate)&&ft(U,g,p,d),B&&nn(p,d,g,"beforeUpdate"),g&&sn(g,!0),(N.innerHTML&&F.innerHTML==null||N.textContent&&F.textContent==null)&&h(T,""),b?me(d.dynamicChildren,b,T,g,v,ir(p,C),y):R||te(d,p,T,null,g,v,ir(p,C),y,!1),I>0){if(I&16)De(T,N,F,g,C);else if(I&2&&N.class!==F.class&&r(T,"class",null,F.class,C),I&4&&r(T,"style",N.style,F.style,C),I&8){const X=p.dynamicProps;for(let le=0;le<X.length;le++){const re=X[le],Ue=N[re],We=F[re];(We!==Ue||re==="value")&&r(T,re,Ue,We,C,g)}}I&1&&d.children!==p.children&&h(T,p.children)}else!R&&b==null&&De(T,N,F,g,C);((U=F.onVnodeUpdated)||B)&&Ke(()=>{U&&ft(U,g,p,d),B&&nn(p,d,g,"updated")},v)},me=(d,p,g,v,C,y,R)=>{for(let T=0;T<p.length;T++){const I=d[T],b=p[T],B=I.el&&(I.type===wt||!Qn(I,b)||I.shapeFlag&198)?u(I.el):g;w(I,b,B,null,v,C,y,R,!0)}},De=(d,p,g,v,C)=>{if(p!==g){if(p!==ue)for(const y in p)!is(y)&&!(y in g)&&r(d,y,p[y],null,C,v);for(const y in g){if(is(y))continue;const R=g[y],T=p[y];R!==T&&y!=="value"&&r(d,y,T,R,C,v)}"value"in g&&r(d,"value",p.value,g.value,C)}},Ge=(d,p,g,v,C,y,R,T,I)=>{const b=p.el=d?d.el:l(""),B=p.anchor=d?d.anchor:l("");let{patchFlag:N,dynamicChildren:F,slotScopeIds:U}=p;U&&(T=T?T.concat(U):U),d==null?(s(b,g,v),s(B,g,v),z(p.children||[],g,B,C,y,R,T,I)):N>0&&N&64&&F&&d.dynamicChildren?(me(d.dynamicChildren,F,g,C,y,R,T),(p.key!=null||C&&p===C.subTree)&&Xc(d,p,!0)):te(d,p,g,B,C,y,R,T,I)},Be=(d,p,g,v,C,y,R,T,I)=>{p.slotScopeIds=T,d==null?p.shapeFlag&512?C.ctx.activate(p,g,v,R,I):en(p,g,v,C,y,R,I):kt(d,p,I)},en=(d,p,g,v,C,y,R)=>{const T=d.component=Kd(d,v,C);if(Lc(d)&&(T.ctx.renderer=L),zd(T,!1,R),T.asyncDep){if(C&&C.registerDep(T,_e,R),!d.el){const I=T.subTree=de(Ln);P(null,I,p,g),d.placeholder=I.el}}else _e(T,d,p,g,C,y,R)},kt=(d,p,g)=>{const v=p.component=d.component;if(Rd(d,p,g))if(v.asyncDep&&!v.asyncResolved){j(v,p,g);return}else v.next=p,v.update();else p.el=d.el,v.vnode=p},_e=(d,p,g,v,C,y,R)=>{const T=()=>{if(d.isMounted){let{next:N,bu:F,u:U,parent:X,vnode:le}=d;{const ut=Zc(d);if(ut){N&&(N.el=le.el,j(d,N,R)),ut.asyncDep.then(()=>{d.isUnmounted||T()});return}}let re=N,Ue;sn(d,!1),N?(N.el=le.el,j(d,N,R)):N=le,F&&Xi(F),(Ue=N.props&&N.props.onVnodeBeforeUpdate)&&ft(Ue,X,N,le),sn(d,!0);const We=bl(d),ct=d.subTree;d.subTree=We,w(ct,We,u(ct.el),E(ct),d,C,y),N.el=We.el,re===null&&Ad(d,We.el),U&&Ke(U,C),(Ue=N.props&&N.props.onVnodeUpdated)&&Ke(()=>ft(Ue,X,N,le),C)}else{let N;const{el:F,props:U}=p,{bm:X,m:le,parent:re,root:Ue,type:We}=d,ct=as(p);sn(d,!1),X&&Xi(X),!ct&&(N=U&&U.onVnodeBeforeMount)&&ft(N,re,p),sn(d,!0);{Ue.ce&&Ue.ce._def.shadowRoot!==!1&&Ue.ce._injectChildStyle(We);const ut=d.subTree=bl(d);w(null,ut,g,v,d,C,y),p.el=ut.el}if(le&&Ke(le,C),!ct&&(N=U&&U.onVnodeMounted)){const ut=p;Ke(()=>ft(N,re,ut),C)}(p.shapeFlag&256||re&&as(re.vnode)&&re.vnode.shapeFlag&256)&&d.a&&Ke(d.a,C),d.isMounted=!0,p=g=v=null}};d.scope.on();const I=d.effect=new hc(T);d.scope.off();const b=d.update=I.run.bind(I),B=d.job=I.runIfDirty.bind(I);B.i=d,B.id=d.uid,I.scheduler=()=>Co(B),sn(d,!0),b()},j=(d,p,g)=>{p.component=d;const v=d.vnode.props;d.vnode=p,d.next=null,xd(d,p.props,v,g),Md(d,p.children,g),At(),_l(d),Nt()},te=(d,p,g,v,C,y,R,T,I=!1)=>{const b=d&&d.children,B=d?d.shapeFlag:0,N=p.children,{patchFlag:F,shapeFlag:U}=p;if(F>0){if(F&128){Lt(b,N,g,v,C,y,R,T,I);return}else if(F&256){vt(b,N,g,v,C,y,R,T,I);return}}U&8?(B&16&&Qe(b,C,y),N!==b&&h(g,N)):B&16?U&16?Lt(b,N,g,v,C,y,R,T,I):Qe(b,C,y,!0):(B&8&&h(g,""),U&16&&z(N,g,v,C,y,R,T,I))},vt=(d,p,g,v,C,y,R,T,I)=>{d=d||Nn,p=p||Nn;const b=d.length,B=p.length,N=Math.min(b,B);let F;for(F=0;F<N;F++){const U=p[F]=I?Wt(p[F]):pt(p[F]);w(d[F],U,g,null,C,y,R,T,I)}b>B?Qe(d,C,y,!0,!1,N):z(p,g,v,C,y,R,T,I,N)},Lt=(d,p,g,v,C,y,R,T,I)=>{let b=0;const B=p.length;let N=d.length-1,F=B-1;for(;b<=N&&b<=F;){const U=d[b],X=p[b]=I?Wt(p[b]):pt(p[b]);if(Qn(U,X))w(U,X,g,null,C,y,R,T,I);else break;b++}for(;b<=N&&b<=F;){const U=d[N],X=p[F]=I?Wt(p[F]):pt(p[F]);if(Qn(U,X))w(U,X,g,null,C,y,R,T,I);else break;N--,F--}if(b>N){if(b<=F){const U=F+1,X=U<B?p[U].el:v;for(;b<=F;)w(null,p[b]=I?Wt(p[b]):pt(p[b]),g,X,C,y,R,T,I),b++}}else if(b>F)for(;b<=N;)He(d[b],C,y,!0),b++;else{const U=b,X=b,le=new Map;for(b=X;b<=F;b++){const qe=p[b]=I?Wt(p[b]):pt(p[b]);qe.key!=null&&le.set(qe.key,b)}let re,Ue=0;const We=F-X+1;let ct=!1,ut=0;const zn=new Array(We);for(b=0;b<We;b++)zn[b]=0;for(b=U;b<=N;b++){const qe=d[b];if(Ue>=We){He(qe,C,y,!0);continue}let ht;if(qe.key!=null)ht=le.get(qe.key);else for(re=X;re<=F;re++)if(zn[re-X]===0&&Qn(qe,p[re])){ht=re;break}ht===void 0?He(qe,C,y,!0):(zn[ht-X]=b+1,ht>=ut?ut=ht:ct=!0,w(qe,p[ht],g,null,C,y,R,T,I),Ue++)}const cl=ct?Bd(zn):Nn;for(re=cl.length-1,b=We-1;b>=0;b--){const qe=X+b,ht=p[qe],ul=p[qe+1],hl=qe+1<B?ul.el||ul.placeholder:v;zn[b]===0?w(null,ht,g,hl,C,y,R,T,I):ct&&(re<0||b!==cl[re]?at(ht,g,hl,2):re--)}}},at=(d,p,g,v,C=null)=>{const{el:y,type:R,transition:T,children:I,shapeFlag:b}=d;if(b&6){at(d.component.subTree,p,g,v);return}if(b&128){d.suspense.move(p,g,v);return}if(b&64){R.move(d,p,g,L);return}if(R===wt){s(y,p,g);for(let N=0;N<I.length;N++)at(I[N],p,g,v);s(d.anchor,p,g);return}if(R===rr){k(d,p,g);return}if(v!==2&&b&1&&T)if(v===0)T.beforeEnter(y),s(y,p,g),Ke(()=>T.enter(y),C);else{const{leave:N,delayLeave:F,afterLeave:U}=T,X=()=>{d.ctx.isUnmounted?i(y):s(y,p,g)},le=()=>{y._isLeaving&&y[Yf](!0),N(y,()=>{X(),U&&U()})};F?F(y,X,le):le()}else s(y,p,g)},He=(d,p,g,v=!1,C=!1)=>{const{type:y,props:R,ref:T,children:I,dynamicChildren:b,shapeFlag:B,patchFlag:N,dirs:F,cacheIndex:U}=d;if(N===-2&&(C=!1),T!=null&&(At(),ls(T,null,g,d,!0),Nt()),U!=null&&(p.renderCache[U]=void 0),B&256){p.ctx.deactivate(d);return}const X=B&1&&F,le=!as(d);let re;if(le&&(re=R&&R.onVnodeBeforeUnmount)&&ft(re,p,d),B&6)tn(d.component,g,v);else{if(B&128){d.suspense.unmount(g,v);return}X&&nn(d,null,p,"beforeUnmount"),B&64?d.type.remove(d,p,g,L,v):b&&!b.hasOnce&&(y!==wt||N>0&&N&64)?Qe(b,p,g,!1,!0):(y===wt&&N&384||!C&&B&16)&&Qe(I,p,g),v&&En(d)}(le&&(re=R&&R.onVnodeUnmounted)||X)&&Ke(()=>{re&&ft(re,p,d),X&&nn(d,null,p,"unmounted")},g)},En=d=>{const{type:p,el:g,anchor:v,transition:C}=d;if(p===wt){Cn(g,v);return}if(p===rr){D(d);return}const y=()=>{i(g),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(d.shapeFlag&1&&C&&!C.persisted){const{leave:R,delayLeave:T}=C,I=()=>R(g,y);T?T(d.el,y,I):I()}else y()},Cn=(d,p)=>{let g;for(;d!==p;)g=f(d),i(d),d=g;i(p)},tn=(d,p,g)=>{const{bum:v,scope:C,job:y,subTree:R,um:T,m:I,a:b}=d;Il(I),Il(b),v&&Xi(v),C.stop(),y&&(y.flags|=8,He(R,d,p,g)),T&&Ke(T,p),Ke(()=>{d.isUnmounted=!0},p)},Qe=(d,p,g,v=!1,C=!1,y=0)=>{for(let R=y;R<d.length;R++)He(d[R],p,g,v,C)},E=d=>{if(d.shapeFlag&6)return E(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const p=f(d.anchor||d.el),g=p&&p[Kf];return g?f(g):p};let O=!1;const A=(d,p,g)=>{d==null?p._vnode&&He(p._vnode,null,null,!0):w(p._vnode||null,d,p,null,null,null,g),p._vnode=d,O||(O=!0,_l(),Oc(),O=!1)},L={p:w,um:He,m:at,r:En,mt:en,mc:z,pc:te,pbc:me,n:E,o:t};return{render:A,hydrate:void 0,createApp:md(A)}}function ir({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function sn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Fd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Xc(t,e,n=!1){const s=t.children,i=e.children;if(W(s)&&W(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Wt(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&Xc(o,l)),l.type===Hi&&l.patchFlag!==-1&&(l.el=o.el),l.type===Ln&&!l.el&&(l.el=o.el)}}function Bd(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function Zc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Zc(e)}function Il(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const eu=t=>t.__isSuspense;function Hd(t,e){e&&e.pendingBranch?W(t)?e.effects.push(...t):e.effects.push(t):qf(t)}const wt=Symbol.for("v-fgt"),Hi=Symbol.for("v-txt"),Ln=Symbol.for("v-cmt"),rr=Symbol.for("v-stc"),hs=[];let ze=null;function ot(t=!1){hs.push(ze=t?null:[])}function Ud(){hs.pop(),ze=hs[hs.length-1]||null}let Ss=1;function ai(t,e=!1){Ss+=t,t<0&&ze&&e&&(ze.hasOnce=!0)}function Wd(t){return t.dynamicChildren=Ss>0?ze||Nn:null,Ud(),Ss>0&&ze&&ze.push(t),t}function lt(t,e,n,s,i,r){return Wd(Q(t,e,n,s,i,r,!0))}function ci(t){return t?t.__v_isVNode===!0:!1}function Qn(t,e){return t.type===e.type&&t.key===e.key}const tu=({key:t})=>t??null,Zs=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?be(t)||ge(t)||V(t)?{i:et,r:t,k:e,f:!!n}:t:null);function Q(t,e=null,n=null,s=0,i=null,r=t===wt?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&tu(e),ref:e&&Zs(e),scopeId:Dc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:et};return l?(To(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=be(n)?8:16),Ss>0&&!o&&ze&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&ze.push(a),a}const de=Vd;function Vd(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===ad)&&(t=Ln),ci(t)){const l=Fn(t,e,!0);return n&&To(l,n),Ss>0&&!r&&ze&&(l.shapeFlag&6?ze[ze.indexOf(t)]=l:ze.push(l)),l.patchFlag=-2,l}if(Zd(t)&&(t=t.__vccOpts),e){e=jd(e);let{class:l,style:a}=e;l&&!be(l)&&(e.class=uo(l)),pe(a)&&(Mi(a)&&!W(a)&&(a=Pe({},a)),e.style=co(a))}const o=be(t)?1:eu(t)?128:zf(t)?64:pe(t)?4:V(t)?2:0;return Q(t,e,n,s,i,o,r,!0)}function jd(t){return t?Mi(t)||qc(t)?Pe({},t):t:null}function Fn(t,e,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=t,c=e?$d(i||{},e):i,h={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&tu(c),ref:e&&e.ref?n&&r?W(r)?r.concat(Zs(e)):[r,Zs(e)]:Zs(e):r,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==wt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Fn(t.ssContent),ssFallback:t.ssFallback&&Fn(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&s&&bo(h,a.clone(h)),h}function Bn(t=" ",e=0){return de(Hi,null,t,e)}function pt(t){return t==null||typeof t=="boolean"?de(Ln):W(t)?de(wt,null,t.slice()):ci(t)?Wt(t):de(Hi,null,String(t))}function Wt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Fn(t)}function To(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(W(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),To(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!qc(e)?e._ctx=et:i===3&&et&&(et.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:et},n=32):(e=String(e),s&64?(n=16,e=[Bn(e)]):n=8);t.children=e,t.shapeFlag|=n}function $d(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=uo([e.class,s.class]));else if(i==="style")e.style=co([e.style,s.style]);else if(Ai(i)){const r=e[i],o=s[i];o&&r!==o&&!(W(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function ft(t,e,n,s=null){mt(t,e,7,[n,s])}const Gd=Uc();let qd=0;function Kd(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Gd,r={uid:qd++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ac(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:zc(s,i),emitsOptions:jc(s,i),emit:null,emitted:null,propsDefaults:ue,inheritAttrs:s.inheritAttrs,ctx:ue,data:ue,props:ue,attrs:ue,slots:ue,refs:ue,setupState:ue,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=wd.bind(null,r),t.ce&&t.ce(r),r}let Oe=null;const nu=()=>Oe||et;let ui,Pr;{const t=Di(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};ui=e("__VUE_INSTANCE_SETTERS__",n=>Oe=n),Pr=e("__VUE_SSR_SETTERS__",n=>Is=n)}const Hs=t=>{const e=Oe;return ui(t),t.scope.on(),()=>{t.scope.off(),ui(e)}},Tl=()=>{Oe&&Oe.scope.off(),ui(null)};function su(t){return t.vnode.shapeFlag&4}let Is=!1;function zd(t,e=!1,n=!1){e&&Pr(e);const{props:s,children:i}=t.vnode,r=su(t);Nd(t,s,r,e),Dd(t,i,n||e);const o=r?Yd(t,e):void 0;return e&&Pr(!1),o}function Yd(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,ud);const{setup:s}=n;if(s){At();const i=t.setupContext=s.length>1?Jd(t):null,r=Hs(t),o=Fs(s,t,0,[t.props,i]),l=ec(o);if(Nt(),r(),(l||t.sp)&&!as(t)&&kc(t),l){if(o.then(Tl,Tl),e)return o.then(a=>{Rl(t,a)}).catch(a=>{ki(a,t,0)});t.asyncDep=o}else Rl(t,o)}else iu(t)}function Rl(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:pe(e)&&(t.setupState=Rc(e)),iu(t)}function iu(t,e,n){const s=t.type;t.render||(t.render=s.render||_t);{const i=Hs(t);At();try{hd(t)}finally{Nt(),i()}}}const Qd={get(t,e){return Ae(t,"get",""),t[e]}};function Jd(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Qd),slots:t.slots,emit:t.emit,expose:e}}function Ro(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Rc(vo(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in cs)return cs[n](t)},has(e,n){return n in e||n in cs}})):t.proxy}function Xd(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function Zd(t){return V(t)&&"__vccOpts"in t}const Fe=(t,e)=>Wf(t,e,Is);function ru(t,e,n){try{ai(-1);const s=arguments.length;return s===2?pe(e)&&!W(e)?ci(e)?de(t,null,[e]):de(t,e):de(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&ci(n)&&(n=[n]),de(t,e,n))}finally{ai(1)}}const ep="3.5.25";/**
* @vue/runtime-dom v3.5.25
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Dr;const Al=typeof window<"u"&&window.trustedTypes;if(Al)try{Dr=Al.createPolicy("vue",{createHTML:t=>t})}catch{}const ou=Dr?t=>Dr.createHTML(t):t=>t,tp="http://www.w3.org/2000/svg",np="http://www.w3.org/1998/Math/MathML",bt=typeof document<"u"?document:null,Nl=bt&&bt.createElement("template"),sp={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?bt.createElementNS(tp,t):e==="mathml"?bt.createElementNS(np,t):n?bt.createElement(t,{is:n}):bt.createElement(t);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>bt.createTextNode(t),createComment:t=>bt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>bt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Nl.innerHTML=ou(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const l=Nl.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},ip=Symbol("_vtc");function rp(t,e,n){const s=t[ip];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const xl=Symbol("_vod"),op=Symbol("_vsh"),lp=Symbol(""),ap=/(?:^|;)\s*display\s*:/;function cp(t,e,n){const s=t.style,i=be(n);let r=!1;if(n&&!i){if(e)if(be(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&ei(s,l,"")}else for(const o in e)n[o]==null&&ei(s,o,"");for(const o in n)o==="display"&&(r=!0),ei(s,o,n[o])}else if(i){if(e!==n){const o=s[lp];o&&(n+=";"+o),s.cssText=n,r=ap.test(n)}}else e&&t.removeAttribute("style");xl in t&&(t[xl]=r?s.display:"",t[op]&&(s.display="none"))}const Ol=/\s*!important$/;function ei(t,e,n){if(W(n))n.forEach(s=>ei(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=up(t,e);Ol.test(n)?t.setProperty(mn(s),n.replace(Ol,""),"important"):t[s]=n}}const Pl=["Webkit","Moz","ms"],or={};function up(t,e){const n=or[e];if(n)return n;let s=Xe(e);if(s!=="filter"&&s in t)return or[e]=s;s=Pi(s);for(let i=0;i<Pl.length;i++){const r=Pl[i]+s;if(r in t)return or[e]=r}return e}const Dl="http://www.w3.org/1999/xlink";function Ml(t,e,n,s,i,r=ff(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Dl,e.slice(6,e.length)):t.setAttributeNS(Dl,e,n):n==null||r&&!ic(n)?t.removeAttribute(e):t.setAttribute(e,r?"":Xt(n)?String(n):n)}function kl(t,e,n,s,i){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?ou(n):n);return}const r=t.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=ic(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(i||e)}function hp(t,e,n,s){t.addEventListener(e,n,s)}function fp(t,e,n,s){t.removeEventListener(e,n,s)}const Ll=Symbol("_vei");function dp(t,e,n,s,i=null){const r=t[Ll]||(t[Ll]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=pp(e);if(s){const c=r[e]=mp(s,i);hp(t,l,c,a)}else o&&(fp(t,l,o,a),r[e]=void 0)}}const Fl=/(?:Once|Passive|Capture)$/;function pp(t){let e;if(Fl.test(t)){e={};let s;for(;s=t.match(Fl);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):mn(t.slice(2)),e]}let lr=0;const _p=Promise.resolve(),gp=()=>lr||(_p.then(()=>lr=0),lr=Date.now());function mp(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;mt(yp(s,n.value),e,5,[s])};return n.value=t,n.attached=gp(),n}function yp(t,e){if(W(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Bl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,vp=(t,e,n,s,i,r)=>{const o=i==="svg";e==="class"?rp(t,s,o):e==="style"?cp(t,n,s):Ai(e)?lo(e)||dp(t,e,n,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Ep(t,e,s,o))?(kl(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Ml(t,e,s,o,r,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!be(s))?kl(t,Xe(e),s,r,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),Ml(t,e,s,o))};function Ep(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Bl(e)&&V(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Bl(e)&&be(n)?!1:e in t}const Cp=Pe({patchProp:vp},sp);let Hl;function bp(){return Hl||(Hl=kd(Cp))}const wp=(...t)=>{const e=bp().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=Ip(s);if(!i)return;const r=e._component;!V(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,Sp(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function Sp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Ip(t){return be(t)?document.querySelector(t):t}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let lu;const Ui=t=>lu=t,au=Symbol();function Mr(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var fs;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(fs||(fs={}));function Tp(){const t=cc(!0),e=t.run(()=>fn({}));let n=[],s=[];const i=vo({install(r){Ui(i),i._a=r,r.provide(au,i),r.config.globalProperties.$pinia=i,s.forEach(o=>n.push(o)),s=[]},use(r){return this._a?n.push(r):s.push(r),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return i}const cu=()=>{};function Ul(t,e,n,s=cu){t.push(e);const i=()=>{const r=t.indexOf(e);r>-1&&(t.splice(r,1),s())};return!n&&uc()&&df(i),i}function wn(t,...e){t.slice().forEach(n=>{n(...e)})}const Rp=t=>t(),Wl=Symbol(),ar=Symbol();function kr(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,s)=>t.set(s,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],i=t[n];Mr(i)&&Mr(s)&&t.hasOwnProperty(n)&&!ge(s)&&!Tt(s)?t[n]=kr(i,s):t[n]=s}return t}const Ap=Symbol();function Np(t){return!Mr(t)||!t.hasOwnProperty(Ap)}const{assign:Bt}=Object;function xp(t){return!!(ge(t)&&t.effect)}function Op(t,e,n,s){const{state:i,actions:r,getters:o}=e,l=n.state.value[t];let a;function c(){l||(n.state.value[t]=i?i():{});const h=Lf(n.state.value[t]);return Bt(h,r,Object.keys(o||{}).reduce((u,f)=>(u[f]=vo(Fe(()=>{Ui(n);const _=n._s.get(t);return o[f].call(_,_)})),u),{}))}return a=uu(t,c,e,n,s,!0),a}function uu(t,e,n={},s,i,r){let o;const l=Bt({actions:{}},n),a={deep:!0};let c,h,u=[],f=[],_;const m=s.state.value[t];!r&&!m&&(s.state.value[t]={}),fn({});let w;function M(z){let Y;c=h=!1,typeof z=="function"?(z(s.state.value[t]),Y={type:fs.patchFunction,storeId:t,events:_}):(kr(s.state.value[t],z),Y={type:fs.patchObject,payload:z,storeId:t,events:_});const me=w=Symbol();Eo().then(()=>{w===me&&(c=!0)}),h=!0,wn(u,Y,s.state.value[t])}const P=r?function(){const{state:Y}=n,me=Y?Y():{};this.$patch(De=>{Bt(De,me)})}:cu;function x(){o.stop(),u=[],f=[],s._s.delete(t)}const k=(z,Y="")=>{if(Wl in z)return z[ar]=Y,z;const me=function(){Ui(s);const De=Array.from(arguments),Ge=[],Be=[];function en(j){Ge.push(j)}function kt(j){Be.push(j)}wn(f,{args:De,name:me[ar],store:$,after:en,onError:kt});let _e;try{_e=z.apply(this&&this.$id===t?this:$,De)}catch(j){throw wn(Be,j),j}return _e instanceof Promise?_e.then(j=>(wn(Ge,j),j)).catch(j=>(wn(Be,j),Promise.reject(j))):(wn(Ge,_e),_e)};return me[Wl]=!0,me[ar]=Y,me},D={_p:s,$id:t,$onAction:Ul.bind(null,f),$patch:M,$reset:P,$subscribe(z,Y={}){const me=Ul(u,z,Y.detached,()=>De()),De=o.run(()=>us(()=>s.state.value[t],Ge=>{(Y.flush==="sync"?h:c)&&z({storeId:t,type:fs.direct,events:_},Ge)},Bt({},a,Y)));return me},$dispose:x},$=Ls(D);s._s.set(t,$);const ie=(s._a&&s._a.runWithContext||Rp)(()=>s._e.run(()=>(o=cc()).run(()=>e({action:k}))));for(const z in ie){const Y=ie[z];if(ge(Y)&&!xp(Y)||Tt(Y))r||(m&&Np(Y)&&(ge(Y)?Y.value=m[z]:kr(Y,m[z])),s.state.value[t][z]=Y);else if(typeof Y=="function"){const me=k(Y,z);ie[z]=me,l.actions[z]=Y}}return Bt($,ie),Bt(Z($),ie),Object.defineProperty($,"$state",{get:()=>s.state.value[t],set:z=>{M(Y=>{Bt(Y,z)})}}),s._p.forEach(z=>{Bt($,o.run(()=>z({store:$,app:s._a,pinia:s,options:l})))}),m&&r&&n.hydrate&&n.hydrate($.$state,m),c=!0,h=!0,$}/*! #__NO_SIDE_EFFECTS__ */function Pp(t,e,n){let s,i;const r=typeof e=="function";s=t,i=r?n:e;function o(l,a){const c=yd();return l=l||(c?gt(au,null):null),l&&Ui(l),l=lu,l._s.has(s)||(r?uu(s,e,i,l):Op(s,i,l)),l._s.get(s)}return o.$id=s,o}function Dp(t){{const e=Z(t),n={};for(const s in e){const i=e[s];i.effect?n[s]=Fe({get:()=>t[s],set(r){t[s]=r}}):(ge(i)||Tt(i))&&(n[s]=Hf(t,s))}return n}}var Vl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=function(t,e){if(!t)throw Gn(e)},Gn=function(t){return new Error("Firebase Database ("+hu.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Mp=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ao={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,h=r>>2,u=(r&3)<<4|l>>4;let f=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(f=64)),s.push(n[h],n[u],n[f],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(fu(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Mp(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const u=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||u==null)throw new kp;const f=r<<2|l>>4;if(s.push(f),c!==64){const _=l<<4&240|c>>2;if(s.push(_),u!==64){const m=c<<6&192|u;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class kp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const du=function(t){const e=fu(t);return Ao.encodeByteArray(e,!0)},hi=function(t){return du(t).replace(/\./g,"")},Lr=function(t){try{return Ao.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(t){return pu(void 0,t)}function pu(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Fp(n)||(t[n]=pu(t[n],e[n]));return t}function Fp(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp=()=>Bp().__FIREBASE_DEFAULTS__,Up=()=>{if(typeof process>"u"||typeof Vl>"u")return;const t=Vl.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Wp=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Lr(t[1]);return e&&JSON.parse(e)},_u=()=>{try{return Hp()||Up()||Wp()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Vp=t=>{var e,n;return(n=(e=_u())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},jp=t=>{const e=Vp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},gu=()=>{var t;return(t=_u())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[hi(JSON.stringify(n)),hi(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gp(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function mu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Gp())}function qp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Kp(){return hu.NODE_ADMIN===!0}function zp(){try{return typeof indexedDB=="object"}catch{return!1}}function Yp(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp="FirebaseError";class Us extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Qp,Object.setPrototypeOf(this,Us.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yu.prototype.create)}}class yu{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Jp(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Us(i,l,s)}}function Jp(t,e){return t.replace(Xp,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Xp=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(t){return JSON.parse(t)}function Te(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Ts(Lr(r[0])||""),n=Ts(Lr(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Zp=function(t){const e=vu(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},e_=function(t){const e=vu(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Hn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function jl(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function fi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function Fr(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if($l(r)&&$l(o)){if(!Fr(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function $l(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)s[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const f=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,h;for(let u=0;u<80;u++){u<40?u<20?(c=l^r&(o^l),h=1518500249):(c=r^o^l,h=1859775393):u<60?(c=r&o|l&(r|o),h=2400959708):(c=r^o^l,h=3395469782);const f=(i<<5|i>>>27)+c+a+h+s[u]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Eu(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,S(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Wi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(t){return t&&t._delegate?t._delegate:t}class Rs{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new No;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(o_(e))try{this.getOrInitializeService({instanceIdentifier:on})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=on){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=on){return this.instances.has(e)}getOptions(e=on){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:r_(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=on){return this.component?this.component.multipleInstances?e:on:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function r_(t){return t===on?void 0:t}function o_(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new i_(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ce||(ce={}));const a_={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},c_=ce.INFO,u_={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},h_=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=u_[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Cu{constructor(e){this.name=e,this._logLevel=c_,this._logHandler=h_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?a_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const f_=(t,e)=>e.some(n=>t instanceof n);let Gl,ql;function d_(){return Gl||(Gl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function p_(){return ql||(ql=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bu=new WeakMap,Br=new WeakMap,wu=new WeakMap,cr=new WeakMap,xo=new WeakMap;function __(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(qt(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&bu.set(n,t)}).catch(()=>{}),xo.set(e,t),e}function g_(t){if(Br.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Br.set(t,e)}let Hr={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Br.get(t);if(e==="objectStoreNames")return t.objectStoreNames||wu.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return qt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function m_(t){Hr=t(Hr)}function y_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ur(this),e,...n);return wu.set(s,e.sort?e.sort():[e]),qt(s)}:p_().includes(t)?function(...e){return t.apply(ur(this),e),qt(bu.get(this))}:function(...e){return qt(t.apply(ur(this),e))}}function v_(t){return typeof t=="function"?y_(t):(t instanceof IDBTransaction&&g_(t),f_(t,d_())?new Proxy(t,Hr):t)}function qt(t){if(t instanceof IDBRequest)return __(t);if(cr.has(t))return cr.get(t);const e=v_(t);return e!==t&&(cr.set(t,e),xo.set(e,t)),e}const ur=t=>xo.get(t);function E_(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=qt(o);return s&&o.addEventListener("upgradeneeded",a=>{s(qt(o.result),a.oldVersion,a.newVersion,qt(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const C_=["get","getKey","getAll","getAllKeys","count"],b_=["put","add","delete","clear"],hr=new Map;function Kl(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(hr.get(e))return hr.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=b_.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||C_.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return hr.set(e,r),r}m_(t=>({...t,get:(e,n,s)=>Kl(e,n)||t.get(e,n,s),has:(e,n)=>!!Kl(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(S_(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function S_(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ur="@firebase/app",zl="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new Cu("@firebase/app"),I_="@firebase/app-compat",T_="@firebase/analytics-compat",R_="@firebase/analytics",A_="@firebase/app-check-compat",N_="@firebase/app-check",x_="@firebase/auth",O_="@firebase/auth-compat",P_="@firebase/database",D_="@firebase/data-connect",M_="@firebase/database-compat",k_="@firebase/functions",L_="@firebase/functions-compat",F_="@firebase/installations",B_="@firebase/installations-compat",H_="@firebase/messaging",U_="@firebase/messaging-compat",W_="@firebase/performance",V_="@firebase/performance-compat",j_="@firebase/remote-config",$_="@firebase/remote-config-compat",G_="@firebase/storage",q_="@firebase/storage-compat",K_="@firebase/firestore",z_="@firebase/vertexai-preview",Y_="@firebase/firestore-compat",Q_="firebase",J_="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr="[DEFAULT]",X_={[Ur]:"fire-core",[I_]:"fire-core-compat",[R_]:"fire-analytics",[T_]:"fire-analytics-compat",[N_]:"fire-app-check",[A_]:"fire-app-check-compat",[x_]:"fire-auth",[O_]:"fire-auth-compat",[P_]:"fire-rtdb",[D_]:"fire-data-connect",[M_]:"fire-rtdb-compat",[k_]:"fire-fn",[L_]:"fire-fn-compat",[F_]:"fire-iid",[B_]:"fire-iid-compat",[H_]:"fire-fcm",[U_]:"fire-fcm-compat",[W_]:"fire-perf",[V_]:"fire-perf-compat",[j_]:"fire-rc",[$_]:"fire-rc-compat",[G_]:"fire-gcs",[q_]:"fire-gcs-compat",[K_]:"fire-fst",[Y_]:"fire-fst-compat",[z_]:"fire-vertex","fire-js":"fire-js",[Q_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=new Map,Z_=new Map,Vr=new Map;function Yl(t,e){try{t.container.addComponent(e)}catch(n){Ot.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function pi(t){const e=t.name;if(Vr.has(e))return Ot.debug(`There were multiple attempts to register component ${e}.`),!1;Vr.set(e,t);for(const n of di.values())Yl(n,t);for(const n of Z_.values())Yl(n,t);return!0}function eg(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new yu("app","Firebase",tg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Rs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=J_;function Su(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Wr,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw Kt.create("bad-app-name",{appName:String(i)});if(n||(n=gu()),!n)throw Kt.create("no-options");const r=di.get(i);if(r){if(Fr(n,r.options)&&Fr(s,r.config))return r;throw Kt.create("duplicate-app",{appName:i})}const o=new l_(i);for(const a of Vr.values())o.addComponent(a);const l=new ng(n,s,o);return di.set(i,l),l}function ig(t=Wr){const e=di.get(t);if(!e&&t===Wr&&gu())return Su();if(!e)throw Kt.create("no-app",{appName:t});return e}function Pn(t,e,n){var s;let i=(s=X_[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${i}" with version "${e}":`];r&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ot.warn(l.join(" "));return}pi(new Rs(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg="firebase-heartbeat-database",og=1,As="firebase-heartbeat-store";let fr=null;function Iu(){return fr||(fr=E_(rg,og,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(As)}catch(n){console.warn(n)}}}}).catch(t=>{throw Kt.create("idb-open",{originalErrorMessage:t.message})})),fr}async function lg(t){try{const n=(await Iu()).transaction(As),s=await n.objectStore(As).get(Tu(t));return await n.done,s}catch(e){if(e instanceof Us)Ot.warn(e.message);else{const n=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(n.message)}}}async function Ql(t,e){try{const s=(await Iu()).transaction(As,"readwrite");await s.objectStore(As).put(e,Tu(t)),await s.done}catch(n){if(n instanceof Us)Ot.warn(n.message);else{const s=Kt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ot.warn(s.message)}}}function Tu(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag=1024,cg=30*24*60*60*1e3;class ug{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new fg(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Jl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=cg}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Ot.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Jl(),{heartbeatsToSend:s,unsentEntries:i}=hg(this._heartbeatsCache.heartbeats),r=hi(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Ot.warn(n),""}}}function Jl(){return new Date().toISOString().substring(0,10)}function hg(t,e=ag){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Xl(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Xl(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class fg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zp()?Yp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await lg(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ql(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ql(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Xl(t){return hi(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(t){pi(new Rs("platform-logger",e=>new w_(e),"PRIVATE")),pi(new Rs("heartbeat",e=>new ug(e),"PRIVATE")),Pn(Ur,zl,t),Pn(Ur,zl,"esm2017"),Pn("fire-js","")}dg("");var pg="firebase",_g="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pn(pg,_g,"app");var Zl={};const ea="@firebase/database",ta="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ru="";function gg(t){Ru=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Te(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ts(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Mt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new mg(e)}}catch{}return new yg},an=Au("localStorage"),vg=Au("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=new Cu("@firebase/database"),Eg=function(){let t=1;return function(){return t++}}(),Nu=function(t){const e=s_(t),n=new n_;n.update(e);const s=n.digest();return Ao.encodeByteArray(s)},Ws=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ws.apply(null,s):typeof s=="object"?e+=Te(s):e+=s,e+=" "}return e};let ds=null,na=!0;const Cg=function(t,e){S(!0,"Can't turn on custom loggers persistently."),Dn.logLevel=ce.VERBOSE,ds=Dn.log.bind(Dn)},Ne=function(...t){if(na===!0&&(na=!1,ds===null&&vg.get("logging_enabled")===!0&&Cg()),ds){const e=Ws.apply(null,t);ds(e)}},Vs=function(t){return function(...e){Ne(t,...e)}},jr=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ws(...t);Dn.error(e)},Pt=function(...t){const e=`FIREBASE FATAL ERROR: ${Ws(...t)}`;throw Dn.error(e),new Error(e)},Ye=function(...t){const e="FIREBASE WARNING: "+Ws(...t);Dn.warn(e)},bg=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ye("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},xu=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},wg=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Un="[MIN_NAME]",dn="[MAX_NAME]",qn=function(t,e){if(t===e)return 0;if(t===Un||e===dn)return-1;if(e===Un||t===dn)return 1;{const n=sa(t),s=sa(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},Sg=function(t,e){return t===e?0:t<e?-1:1},Jn=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Te(e))},Oo=function(t){if(typeof t!="object"||t===null)return Te(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Te(e[s]),n+=":",n+=Oo(t[e[s]]);return n+="}",n},Ou=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function $e(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Pu=function(t){S(!xu(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const h=c.join("");let u="";for(a=0;a<64;a+=8){let f=parseInt(h.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),u=u+f}return u.toLowerCase()},Ig=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Tg=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Rg(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const Ag=new RegExp("^-?(0*)\\d{1,10}$"),Ng=-2147483648,xg=2147483647,sa=function(t){if(Ag.test(t)){const e=Number(t);if(e>=Ng&&e<=xg)return e}return null},js=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Ye("Exception was thrown by user callback.",n),e},Math.floor(0))}},Og=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ps=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Ye(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ne("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ye(e)}}class ti{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ti.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po="5",Du="v",Mu="s",ku="r",Lu="f",Fu=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Bu="ls",Hu="p",$r="ac",Uu="websocket",Wu="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=an.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&an.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Mg(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ju(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let s;if(e===Uu)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Wu)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Mg(t)&&(n.ns=t.namespace);const i=[];return $e(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(){this.counters_={}}incrementCounter(e,n=1){Mt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Lp(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr={},pr={};function Do(t){const e=t.toString();return dr[e]||(dr[e]=new kg),dr[e]}function Lg(t,e){const n=t.toString();return pr[n]||(pr[n]=e()),pr[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&js(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="start",Bg="close",Hg="pLPCommand",Ug="pRTLPCB",$u="id",Gu="pw",qu="ser",Wg="cb",Vg="seg",jg="ts",$g="d",Gg="dframe",Ku=1870,zu=30,qg=Ku-zu,Kg=25e3,zg=3e4;class Rn{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Vs(e),this.stats_=Do(n),this.urlFn=a=>(this.appCheckToken&&(a[$r]=this.appCheckToken),ju(n,Wu,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Fg(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(zg)),wg(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Mo((...r)=>{const[o,l,a,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ia)this.id=l,this.password=a;else if(o===Bg)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[ia]="t",s[qu]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Wg]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Du]=Po,this.transportSessionId&&(s[Mu]=this.transportSessionId),this.lastSessionId&&(s[Bu]=this.lastSessionId),this.applicationId&&(s[Hu]=this.applicationId),this.appCheckToken&&(s[$r]=this.appCheckToken),typeof location<"u"&&location.hostname&&Fu.test(location.hostname)&&(s[ku]=Lu);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Rn.forceAllow_=!0}static forceDisallow(){Rn.forceDisallow_=!0}static isAvailable(){return Rn.forceAllow_?!0:!Rn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ig()&&!Tg()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Te(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=du(n),i=Ou(s,qg);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Gg]="t",s[$u]=e,s[Gu]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Te(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Mo{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Eg(),window[Hg+this.uniqueCallbackIdentifier]=e,window[Ug+this.uniqueCallbackIdentifier]=n,this.myIFrame=Mo.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ne("frame writing exception"),l.stack&&Ne(l.stack),Ne(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ne("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[$u]=this.myID,e[Gu]=this.myPW,e[qu]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+zu+s.length<=Ku;){const o=this.pendingSegs.shift();s=s+"&"+Vg+i+"="+o.seg+"&"+jg+i+"="+o.ts+"&"+$g+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Kg)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Ne("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg=16384,Qg=45e3;let _i=null;typeof MozWebSocket<"u"?_i=MozWebSocket:typeof WebSocket<"u"&&(_i=WebSocket);class Ze{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Vs(this.connId),this.stats_=Do(n),this.connURL=Ze.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Du]=Po,typeof location<"u"&&location.hostname&&Fu.test(location.hostname)&&(o[ku]=Lu),n&&(o[Mu]=n),s&&(o[Bu]=s),i&&(o[$r]=i),r&&(o[Hu]=r),ju(e,Uu,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,an.set("previous_websocket_failure",!0);try{let s;Kp(),this.mySock=new _i(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Ze.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&_i!==null&&!Ze.forceDisallow_}static previouslyFailed(){return an.isInMemoryStorage||an.get("previous_websocket_failure")===!0}markConnectionHealthy(){an.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Ts(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Te(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ou(n,Yg);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Qg))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ze.responsesRequiredToBeHealthy=2;Ze.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Rn,Ze]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Ze&&Ze.isAvailable();let s=n&&!Ze.previouslyFailed();if(e.webSocketOnly&&(n||Ye("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Ze];else{const i=this.transports_=[];for(const r of Ns.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ns.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ns.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg=6e4,Xg=5e3,Zg=10*1024,em=100*1024,_r="t",ra="d",tm="s",oa="r",nm="e",la="o",aa="a",ca="n",ua="p",sm="h";class im{constructor(e,n,s,i,r,o,l,a,c,h){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Vs("c:"+this.id+":"),this.transportManager_=new Ns(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=ps(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>em?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Zg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(_r in e){const n=e[_r];n===aa?this.upgradeIfSecondaryHealthy_():n===oa?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===la&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ua,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:aa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ca,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Jn("t",e),s=Jn("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Jn(_r,e);if(ra in e){const s=e[ra];if(n===sm){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===ca){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===tm?this.onConnectionShutdown_(s):n===oa?this.onReset_(s):n===nm?jr("Server Error: "+s):n===la?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):jr("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Po!==s&&Ye("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),ps(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Jg))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ps(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Xg))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ua,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(an.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi extends Qu{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!mu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new gi}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=32,fa=768;class oe{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ee(){return new oe("")}function q(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Qt(t){return t.pieces_.length-t.pieceNum_}function he(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new oe(t.pieces_,e)}function Ju(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function rm(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Xu(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Zu(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new oe(e,0)}function Ce(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof oe)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new oe(n,0)}function K(t){return t.pieceNum_>=t.pieces_.length}function Ve(t,e){const n=q(t),s=q(e);if(n===null)return e;if(n===s)return Ve(he(t),he(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ko(t,e){if(Qt(t)!==Qt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function tt(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Qt(t)>Qt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class om{constructor(e,n){this.errorPrefix_=n,this.parts_=Xu(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Wi(this.parts_[s]);eh(this)}}function lm(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Wi(e),eh(t)}function am(t){const e=t.parts_.pop();t.byteLength_-=Wi(e),t.parts_.length>0&&(t.byteLength_-=1)}function eh(t){if(t.byteLength_>fa)throw new Error(t.errorPrefix_+"has a key path longer than "+fa+" bytes ("+t.byteLength_+").");if(t.parts_.length>ha)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ha+") or object contains a cycle "+ln(t))}function ln(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo extends Qu{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new Lo}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=1e3,cm=60*5*1e3,da=30*1e3,um=1.3,hm=3e4,fm="server_kill",pa=3;class Rt extends Yu{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=Rt.nextPersistentConnectionId_++,this.log_=Vs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Xn,this.maxReconnectDelay_=cm,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Lo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&gi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(Te(r)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new No,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;Rt.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Mt(e,"w")){const s=Hn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Ye(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||e_(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=da)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Zp(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Te(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):jr("Unrecognized action received from server: "+Te(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>hm&&(this.reconnectDelay_=Xn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*um)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Rt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(u){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(u)};this.realtime_={close:a,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,f]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?Ne("getToken() completed but was canceled"):(Ne("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=f&&f.token,l=new im(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{Ye(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(fm)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&Ye(u),a())}}}interrupt(e){Ne("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ne("Resuming connection for reason: "+e),delete this.interruptReasons_[e],jl(this.interruptReasons_)&&(this.reconnectDelay_=Xn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Oo(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new oe(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Ne("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=pa&&(this.reconnectDelay_=da,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ne("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=pa&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Ru.replace(/\./g,"-")]=1,mu()?e["framework.cordova"]=1:qp()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gi.getInstance().currentlyOnline();return jl(this.interruptReasons_)&&e}}Rt.nextPersistentConnectionId_=0;Rt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new G(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new G(Un,e),i=new G(Un,n);return this.compare(s,i)!==0}minPost(){return G.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs;class th extends ji{static get __EMPTY_NODE(){return Qs}static set __EMPTY_NODE(e){Qs=e}compare(e,n){return qn(e.name,n.name)}isDefinedOn(e){throw Gn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return G.MIN}maxPost(){return new G(dn,Qs)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new G(e,Qs)}toString(){return".key"}}const Mn=new th;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ie{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Ie.RED,this.left=i??je.EMPTY_NODE,this.right=r??je.EMPTY_NODE}copy(e,n,s,i,r){return new Ie(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return je.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return je.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ie.RED=!0;Ie.BLACK=!1;class dm{copy(e,n,s,i,r){return this}insert(e,n,s){return new Ie(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class je{constructor(e,n=je.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new je(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ie.BLACK,null,null))}remove(e){return new je(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ie.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Js(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Js(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Js(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Js(this.root_,null,this.comparator_,!0,e)}}je.EMPTY_NODE=new dm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(t,e){return qn(t.name,e.name)}function Fo(t,e){return qn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gr;function _m(t){Gr=t}const nh=function(t){return typeof t=="number"?"number:"+Pu(t):"string:"+t},sh=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Mt(e,".sv"),"Priority must be a string or number.")}else S(t===Gr||t.isEmpty(),"priority of unexpected type.");S(t===Gr||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _a;class Se{constructor(e,n=Se.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),sh(this.priorityNode_)}static set __childrenNodeConstructor(e){_a=e}static get __childrenNodeConstructor(){return _a}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Se(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Se.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return K(e)?this:q(e)===".priority"?this.priorityNode_:Se.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Se.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=q(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(S(s!==".priority"||Qt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Se.__childrenNodeConstructor.EMPTY_NODE.updateChild(he(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+nh(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Pu(this.value_):e+=this.value_,this.lazyHash_=Nu(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Se.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Se.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=Se.VALUE_TYPE_ORDER.indexOf(n),r=Se.VALUE_TYPE_ORDER.indexOf(s);return S(i>=0,"Unknown leaf type: "+n),S(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Se.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ih,rh;function gm(t){ih=t}function mm(t){rh=t}class ym extends ji{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?qn(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return G.MIN}maxPost(){return new G(dn,new Se("[PRIORITY-POST]",rh))}makePost(e,n){const s=ih(e);return new G(n,new Se("[PRIORITY-POST]",s))}toString(){return".priority"}}const ve=new ym;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=Math.log(2);class Em{constructor(e){const n=r=>parseInt(Math.log(r)/vm,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mi=function(t,e,n,s){t.sort(e);const i=function(a,c){const h=c-a;let u,f;if(h===0)return null;if(h===1)return u=t[a],f=n?n(u):u,new Ie(f,u.node,Ie.BLACK,null,null);{const _=parseInt(h/2,10)+a,m=i(a,_),w=i(_+1,c);return u=t[_],f=n?n(u):u,new Ie(f,u.node,Ie.BLACK,m,w)}},r=function(a){let c=null,h=null,u=t.length;const f=function(m,w){const M=u-m,P=u;u-=m;const x=i(M+1,P),k=t[M],D=n?n(k):k;_(new Ie(D,k.node,w,null,x))},_=function(m){c?(c.left=m,c=m):(h=m,c=m)};for(let m=0;m<a.count;++m){const w=a.nextBitIsOne(),M=Math.pow(2,a.count-(m+1));w?f(M,Ie.BLACK):(f(M,Ie.BLACK),f(M,Ie.RED))}return h},o=new Em(t.length),l=r(o);return new je(s||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gr;const Sn={};class It{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return S(Sn&&ve,"ChildrenNode.ts has not been loaded"),gr=gr||new It({".priority":Sn},{".priority":ve}),gr}get(e){const n=Hn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof je?n:null}hasIndex(e){return Mt(this.indexSet_,e.toString())}addIndex(e,n){S(e!==Mn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(G.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=mi(s,e.getCompare()):l=Sn;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const h=Object.assign({},this.indexes_);return h[a]=l,new It(h,c)}addToIndexes(e,n){const s=fi(this.indexes_,(i,r)=>{const o=Hn(this.indexSet_,r);if(S(o,"Missing index implementation for "+r),i===Sn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(G.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),mi(l,o.getCompare())}else return Sn;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new G(e.name,l))),a.insert(e,e.node)}});return new It(s,this.indexSet_)}removeFromIndexes(e,n){const s=fi(this.indexes_,i=>{if(i===Sn)return i;{const r=n.get(e.name);return r?i.remove(new G(e.name,r)):i}});return new It(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn;class H{constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&sh(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Zn||(Zn=new H(new je(Fo),null,It.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Zn}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Zn:n}}getChild(e){const n=q(e);return n===null?this:this.getImmediateChild(n).getChild(he(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new G(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Zn:this.priorityNode_;return new H(i,o,r)}}updateChild(e,n){const s=q(e);if(s===null)return n;{S(q(e)!==".priority"||Qt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(he(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(ve,(o,l)=>{n[o]=l.val(e),s++,r&&H.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+nh(this.getPriority().val())+":"),this.forEachChild(ve,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Nu(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new G(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new G(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new G(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,G.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,G.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===$s?-1:0}withIndex(e){if(e===Mn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Mn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(ve),i=n.getIterator(ve);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Mn?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Cm extends H{constructor(){super(new je(Fo),H.EMPTY_NODE,It.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const $s=new Cm;Object.defineProperties(G,{MIN:{value:new G(Un,H.EMPTY_NODE)},MAX:{value:new G(dn,$s)}});th.__EMPTY_NODE=H.EMPTY_NODE;Se.__childrenNodeConstructor=H;_m($s);mm($s);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm=!0;function xe(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Se(n,xe(e))}if(!(t instanceof Array)&&bm){const n=[];let s=!1;if($e(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=xe(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new G(o,a)))}}),n.length===0)return H.EMPTY_NODE;const r=mi(n,pm,o=>o.name,Fo);if(s){const o=mi(n,ve.getCompare());return new H(r,xe(e),new It({".priority":o},{".priority":ve}))}else return new H(r,xe(e),It.Default)}else{let n=H.EMPTY_NODE;return $e(t,(s,i)=>{if(Mt(t,s)&&s.substring(0,1)!=="."){const r=xe(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(xe(e))}}gm(xe);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm extends ji{constructor(e){super(),this.indexPath_=e,S(!K(e)&&q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?qn(e.name,n.name):r}makePost(e,n){const s=xe(e),i=H.EMPTY_NODE.updateChild(this.indexPath_,s);return new G(n,i)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,$s);return new G(dn,e)}toString(){return Xu(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm extends ji{compare(e,n){const s=e.node.compareTo(n.node);return s===0?qn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return G.MIN}maxPost(){return G.MAX}makePost(e,n){const s=xe(e);return new G(n,s)}toString(){return".value"}}const Im=new Sm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(t){return{type:"value",snapshotNode:t}}function Wn(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function xs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Os(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Tm(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(xs(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Wn(n,s)):o.trackChildChange(Os(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(ve,(i,r)=>{n.hasChild(i)||s.trackChildChange(xs(i,r))}),n.isLeafNode()||n.forEachChild(ve,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Os(i,r,o))}else s.trackChildChange(Wn(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.indexedFilter_=new Bo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ps.getStartPost_(e),this.endPost_=Ps.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new G(n,s))||(s=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=H.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(H.EMPTY_NODE);const r=this;return n.forEachChild(ve,(o,l)=>{r.matches(new G(o,l))||(i=i.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Ps(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new G(n,s))||(s=H.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=H.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(H.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(f,_)=>u(_,f)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new G(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),h=this.rangedFilter_.matches(a);if(l.hasChild(n)){const u=l.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const _=f==null?1:o(f,a);if(h&&!s.isEmpty()&&_>=0)return r!=null&&r.trackChildChange(Os(n,s,u)),l.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(xs(n,u));const w=l.updateImmediateChild(n,H.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Wn(f.name,f.node)),w.updateImmediateChild(f.name,f.node)):w}}else return s.isEmpty()?e:h&&o(c,a)>=0?(r!=null&&(r.trackChildChange(xs(c.name,c.node)),r.trackChildChange(Wn(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,H.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ve}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Un}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:dn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ve}copy(){const e=new Ho;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Am(t){return t.loadsAllData()?new Bo(t.getIndex()):t.hasLimit()?new Rm(t):new Ps(t)}function ga(t){const e={};if(t.isDefault())return e;let n;if(t.index_===ve?n="$priority":t.index_===Im?n="$value":t.index_===Mn?n="$key":(S(t.index_ instanceof wm,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Te(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=Te(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+Te(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=Te(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+Te(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function ma(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==ve&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi extends Yu{constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Vs("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=yi.getListenId_(e,s),l={};this.listens_[o]=l;const a=ga(e._queryParams);this.restRequest_(r+".json",a,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),Hn(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=yi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=ga(e._queryParams),s=e._path.toString(),i=new No;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+t_(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Ts(l.responseText)}catch{Ye("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&Ye("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(){return{value:null,children:new Map}}function lh(t,e,n){if(K(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=q(e);t.children.has(s)||t.children.set(s,vi());const i=t.children.get(s);e=he(e),lh(i,e,n)}}function qr(t,e,n){t.value!==null?n(e,t.value):xm(t,(s,i)=>{const r=new oe(e.toString()+"/"+s);qr(i,r,n)})}function xm(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&$e(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=10*1e3,Pm=30*1e3,Dm=5*60*1e3;class Mm{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Om(e);const s=ya+(Pm-ya)*Math.random();ps(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;$e(e,(i,r)=>{r>0&&Mt(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),ps(this.reportStats_.bind(this),Math.floor(Math.random()*2*Dm))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(nt||(nt={}));function ah(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Uo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Wo(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=nt.ACK_USER_WRITE,this.source=ah()}operationForChild(e){if(K(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new oe(e));return new Ei(ee(),n,this.revert)}}else return S(q(this.path)===e,"operationForChild called for unrelated child."),new Ei(he(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,n){this.source=e,this.path=n,this.type=nt.LISTEN_COMPLETE}operationForChild(e){return K(this.path)?new Ds(this.source,ee()):new Ds(this.source,he(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=nt.OVERWRITE}operationForChild(e){return K(this.path)?new pn(this.source,ee(),this.snap.getImmediateChild(e)):new pn(this.source,he(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=nt.MERGE}operationForChild(e){if(K(this.path)){const n=this.children.subtree(new oe(e));return n.isEmpty()?null:n.value?new pn(this.source,ee(),n.value):new Ms(this.source,ee(),n)}else return S(q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ms(this.source,he(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(K(e))return this.isFullyInitialized()&&!this.filtered_;const n=q(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Lm(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Tm(o.childName,o.snapshotNode))}),es(t,i,"child_removed",e,s,n),es(t,i,"child_added",e,s,n),es(t,i,"child_moved",r,s,n),es(t,i,"child_changed",e,s,n),es(t,i,"value",e,s,n),i}function es(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>Bm(t,l,a)),o.forEach(l=>{const a=Fm(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function Fm(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Bm(t,e,n){if(e.childName==null||n.childName==null)throw Gn("Should only compare child_ events.");const s=new G(e.childName,e.snapshotNode),i=new G(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(t,e){return{eventCache:t,serverCache:e}}function _s(t,e,n,s){return $i(new _n(e,n,s),t.serverCache)}function ch(t,e,n,s){return $i(t.eventCache,new _n(e,n,s))}function Kr(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function gn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mr;const Hm=()=>(mr||(mr=new je(Sg)),mr);class fe{constructor(e,n=Hm()){this.value=e,this.children=n}static fromObject(e){let n=new fe(null);return $e(e,(s,i)=>{n=n.set(new oe(s),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ee(),value:this.value};if(K(e))return null;{const s=q(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(he(e),n);return r!=null?{path:Ce(new oe(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(K(e))return this;{const n=q(e),s=this.children.get(n);return s!==null?s.subtree(he(e)):new fe(null)}}set(e,n){if(K(e))return new fe(n,this.children);{const s=q(e),r=(this.children.get(s)||new fe(null)).set(he(e),n),o=this.children.insert(s,r);return new fe(this.value,o)}}remove(e){if(K(e))return this.children.isEmpty()?new fe(null):new fe(null,this.children);{const n=q(e),s=this.children.get(n);if(s){const i=s.remove(he(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new fe(null):new fe(this.value,r)}else return this}}get(e){if(K(e))return this.value;{const n=q(e),s=this.children.get(n);return s?s.get(he(e)):null}}setTree(e,n){if(K(e))return n;{const s=q(e),r=(this.children.get(s)||new fe(null)).setTree(he(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new fe(this.value,o)}}fold(e){return this.fold_(ee(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(Ce(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,ee(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(K(e))return null;{const r=q(e),o=this.children.get(r);return o?o.findOnPath_(he(e),Ce(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ee(),n)}foreachOnPath_(e,n,s){if(K(e))return this;{this.value&&s(n,this.value);const i=q(e),r=this.children.get(i);return r?r.foreachOnPath_(he(e),Ce(n,i),s):new fe(null)}}foreach(e){this.foreach_(ee(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(Ce(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.writeTree_=e}static empty(){return new it(new fe(null))}}function gs(t,e,n){if(K(e))return new it(new fe(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Ve(i,e);return r=r.updateChild(o,n),new it(t.writeTree_.set(i,r))}else{const i=new fe(n),r=t.writeTree_.setTree(e,i);return new it(r)}}}function va(t,e,n){let s=t;return $e(n,(i,r)=>{s=gs(s,Ce(e,i),r)}),s}function Ea(t,e){if(K(e))return it.empty();{const n=t.writeTree_.setTree(e,new fe(null));return new it(n)}}function zr(t,e){return yn(t,e)!=null}function yn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Ve(n.path,e)):null}function Ca(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(ve,(s,i)=>{e.push(new G(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new G(s,i.value))}),e}function zt(t,e){if(K(e))return t;{const n=yn(t,e);return n!=null?new it(new fe(n)):new it(t.writeTree_.subtree(e))}}function Yr(t){return t.writeTree_.isEmpty()}function Vn(t,e){return uh(ee(),t.writeTree_,e)}function uh(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(S(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=uh(Ce(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(Ce(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(t,e){return ph(e,t)}function Um(t,e,n,s,i){S(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=gs(t.visibleWrites,e,n)),t.lastWriteId=s}function Wm(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function Vm(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&jm(l,s.path)?i=!1:tt(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return $m(t),!0;if(s.snap)t.visibleWrites=Ea(t.visibleWrites,s.path);else{const l=s.children;$e(l,a=>{t.visibleWrites=Ea(t.visibleWrites,Ce(s.path,a))})}return!0}else return!1}function jm(t,e){if(t.snap)return tt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&tt(Ce(t.path,n),e))return!0;return!1}function $m(t){t.visibleWrites=hh(t.allWrites,Gm,ee()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Gm(t){return t.visible}function hh(t,e,n){let s=it.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)tt(n,o)?(l=Ve(n,o),s=gs(s,l,r.snap)):tt(o,n)&&(l=Ve(o,n),s=gs(s,ee(),r.snap.getChild(l)));else if(r.children){if(tt(n,o))l=Ve(n,o),s=va(s,l,r.children);else if(tt(o,n))if(l=Ve(o,n),K(l))s=va(s,ee(),r.children);else{const a=Hn(r.children,q(l));if(a){const c=a.getChild(he(l));s=gs(s,ee(),c)}}}else throw Gn("WriteRecord should have .snap or .children")}}return s}function fh(t,e,n,s,i){if(!s&&!i){const r=yn(t.visibleWrites,e);if(r!=null)return r;{const o=zt(t.visibleWrites,e);if(Yr(o))return n;if(n==null&&!zr(o,ee()))return null;{const l=n||H.EMPTY_NODE;return Vn(o,l)}}}else{const r=zt(t.visibleWrites,e);if(!i&&Yr(r))return n;if(!i&&n==null&&!zr(r,ee()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(tt(c.path,e)||tt(e,c.path))},l=hh(t.allWrites,o,e),a=n||H.EMPTY_NODE;return Vn(l,a)}}}function qm(t,e,n){let s=H.EMPTY_NODE;const i=yn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ve,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=zt(t.visibleWrites,e);return n.forEachChild(ve,(o,l)=>{const a=Vn(zt(r,new oe(o)),l);s=s.updateImmediateChild(o,a)}),Ca(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=zt(t.visibleWrites,e);return Ca(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function Km(t,e,n,s,i){S(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=Ce(e,n);if(zr(t.visibleWrites,r))return null;{const o=zt(t.visibleWrites,r);return Yr(o)?i.getChild(n):Vn(o,i.getChild(n))}}function zm(t,e,n,s){const i=Ce(e,n),r=yn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=zt(t.visibleWrites,i);return Vn(o,s.getNode().getImmediateChild(n))}else return null}function Ym(t,e){return yn(t.visibleWrites,e)}function Qm(t,e,n,s,i,r,o){let l;const a=zt(t.visibleWrites,e),c=yn(a,ee());if(c!=null)l=c;else if(n!=null)l=Vn(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const h=[],u=o.getCompare(),f=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=f.getNext();for(;_&&h.length<i;)u(_,s)!==0&&h.push(_),_=f.getNext();return h}else return[]}function Jm(){return{visibleWrites:it.empty(),allWrites:[],lastWriteId:-1}}function Ci(t,e,n,s){return fh(t.writeTree,t.treePath,e,n,s)}function jo(t,e){return qm(t.writeTree,t.treePath,e)}function ba(t,e,n,s){return Km(t.writeTree,t.treePath,e,n,s)}function bi(t,e){return Ym(t.writeTree,Ce(t.treePath,e))}function Xm(t,e,n,s,i,r){return Qm(t.writeTree,t.treePath,e,n,s,i,r)}function $o(t,e,n){return zm(t.writeTree,t.treePath,e,n)}function dh(t,e){return ph(Ce(t.treePath,e),t.writeTree)}function ph(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,Os(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,xs(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Wn(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,Os(s,e.snapshotNode,i.oldSnap));else throw Gn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const _h=new ey;class Go{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new _n(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $o(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:gn(this.viewCache_),r=Xm(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(t){return{filter:t}}function ny(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function sy(t,e,n,s,i){const r=new Zm;let o,l;if(n.type===nt.OVERWRITE){const c=n;c.source.fromUser?o=Qr(t,e,c.path,c.snap,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!K(c.path),o=wi(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===nt.MERGE){const c=n;c.source.fromUser?o=ry(t,e,c.path,c.children,s,i,r):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=Jr(t,e,c.path,c.children,s,i,l,r))}else if(n.type===nt.ACK_USER_WRITE){const c=n;c.revert?o=ay(t,e,c.path,s,i,r):o=oy(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===nt.LISTEN_COMPLETE)o=ly(t,e,n.path,s,r);else throw Gn("Unknown operation type: "+n.type);const a=r.getChanges();return iy(e,o,a),{viewCache:o,changes:a}}function iy(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Kr(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(oh(Kr(e)))}}function gh(t,e,n,s,i,r){const o=e.eventCache;if(bi(s,n)!=null)return e;{let l,a;if(K(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=gn(e),h=c instanceof H?c:H.EMPTY_NODE,u=jo(s,h);l=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Ci(s,gn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=q(n);if(c===".priority"){S(Qt(n)===1,"Can't have a priority with additional path components");const h=o.getNode();a=e.serverCache.getNode();const u=ba(s,n,h,a);u!=null?l=t.filter.updatePriority(h,u):l=o.getNode()}else{const h=he(n);let u;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=ba(s,n,o.getNode(),a);f!=null?u=o.getNode().getImmediateChild(c).updateChild(h,f):u=o.getNode().getImmediateChild(c)}else u=$o(s,c,e.serverCache);u!=null?l=t.filter.updateChild(o.getNode(),c,u,h,i,r):l=o.getNode()}}return _s(e,l,o.isFullyInitialized()||K(n),t.filter.filtersNodes())}}function wi(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const h=o?t.filter:t.filter.getIndexedFilter();if(K(n))c=h.updateFullNode(a.getNode(),s,null);else if(h.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=h.updateFullNode(a.getNode(),_,null)}else{const _=q(n);if(!a.isCompleteForPath(n)&&Qt(n)>1)return e;const m=he(n),M=a.getNode().getImmediateChild(_).updateChild(m,s);_===".priority"?c=h.updatePriority(a.getNode(),M):c=h.updateChild(a.getNode(),_,M,m,_h,null)}const u=ch(e,c,a.isFullyInitialized()||K(n),h.filtersNodes()),f=new Go(i,u,r);return gh(t,u,n,i,f,l)}function Qr(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const h=new Go(i,e,r);if(K(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=_s(e,c,!0,t.filter.filtersNodes());else{const u=q(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=_s(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=he(n),_=l.getNode().getImmediateChild(u);let m;if(K(f))m=s;else{const w=h.getCompleteChild(u);w!=null?Ju(f)===".priority"&&w.getChild(Zu(f)).isEmpty()?m=w:m=w.updateChild(f,s):m=H.EMPTY_NODE}if(_.equals(m))a=e;else{const w=t.filter.updateChild(l.getNode(),u,m,f,h,o);a=_s(e,w,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function wa(t,e){return t.eventCache.isCompleteForChild(e)}function ry(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const h=Ce(n,a);wa(e,q(h))&&(l=Qr(t,l,h,c,i,r,o))}),s.foreach((a,c)=>{const h=Ce(n,a);wa(e,q(h))||(l=Qr(t,l,h,c,i,r,o))}),l}function Sa(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Jr(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;K(n)?c=s:c=new fe(null).setTree(n,s);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,f)=>{if(h.hasChild(u)){const _=e.serverCache.getNode().getImmediateChild(u),m=Sa(t,_,f);a=wi(t,a,new oe(u),m,i,r,o,l)}}),c.children.inorderTraversal((u,f)=>{const _=!e.serverCache.isCompleteForChild(u)&&f.value===null;if(!h.hasChild(u)&&!_){const m=e.serverCache.getNode().getImmediateChild(u),w=Sa(t,m,f);a=wi(t,a,new oe(u),w,i,r,o,l)}}),a}function oy(t,e,n,s,i,r,o){if(bi(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(K(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return wi(t,e,n,a.getNode().getChild(n),i,r,l,o);if(K(n)){let c=new fe(null);return a.getNode().forEachChild(Mn,(h,u)=>{c=c.set(new oe(h),u)}),Jr(t,e,n,c,i,r,l,o)}else return e}else{let c=new fe(null);return s.foreach((h,u)=>{const f=Ce(n,h);a.isCompleteForPath(f)&&(c=c.set(h,a.getNode().getChild(f)))}),Jr(t,e,n,c,i,r,l,o)}}function ly(t,e,n,s,i){const r=e.serverCache,o=ch(e,r.getNode(),r.isFullyInitialized()||K(n),r.isFiltered());return gh(t,o,n,s,_h,i)}function ay(t,e,n,s,i,r){let o;if(bi(s,n)!=null)return e;{const l=new Go(s,e,i),a=e.eventCache.getNode();let c;if(K(n)||q(n)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=Ci(s,gn(e));else{const u=e.serverCache.getNode();S(u instanceof H,"serverChildren would be complete if leaf node"),h=jo(s,u)}h=h,c=t.filter.updateFullNode(a,h,r)}else{const h=q(n);let u=$o(s,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=a.getImmediateChild(h)),u!=null?c=t.filter.updateChild(a,h,u,he(n),l,r):e.eventCache.getNode().hasChild(h)?c=t.filter.updateChild(a,h,H.EMPTY_NODE,he(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ci(s,gn(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||bi(s,ee())!=null,_s(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Bo(s.getIndex()),r=Am(s);this.processor_=ty(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(H.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(H.EMPTY_NODE,l.getNode(),null),h=new _n(a,o.isFullyInitialized(),i.filtersNodes()),u=new _n(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=$i(u,h),this.eventGenerator_=new km(this.query_)}get query(){return this.query_}}function uy(t){return t.viewCache_.serverCache.getNode()}function hy(t,e){const n=gn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!K(e)&&!n.getImmediateChild(q(e)).isEmpty())?n.getChild(e):null}function Ia(t){return t.eventRegistrations_.length===0}function fy(t,e){t.eventRegistrations_.push(e)}function Ta(t,e,n){const s=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Ra(t,e,n,s){e.type===nt.MERGE&&e.source.queryId!==null&&(S(gn(t.viewCache_),"We should always have a full cache before handling merges"),S(Kr(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=sy(t.processor_,i,e,n,s);return ny(t.processor_,r.viewCache),S(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,mh(t,r.changes,r.viewCache.eventCache.getNode(),null)}function dy(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(ve,(r,o)=>{s.push(Wn(r,o))}),n.isFullyInitialized()&&s.push(oh(n.getNode())),mh(t,s,n.getNode(),e)}function mh(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Lm(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Si;class py{constructor(){this.views=new Map}}function _y(t){S(!Si,"__referenceConstructor has already been defined"),Si=t}function gy(){return S(Si,"Reference.ts has not been loaded"),Si}function my(t){return t.views.size===0}function qo(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return S(r!=null,"SyncTree gave us an op for an invalid query."),Ra(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Ra(o,e,n,s));return r}}function yy(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=Ci(n,i?s:null),a=!1;l?a=!0:s instanceof H?(l=jo(n,s),a=!1):(l=H.EMPTY_NODE,a=!1);const c=$i(new _n(l,a,!1),new _n(s,i,!1));return new cy(e,c)}return o}function vy(t,e,n,s,i,r){const o=yy(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),fy(o,n),dy(o,n)}function Ey(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=Jt(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(Ta(c,n,s)),Ia(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(Ta(a,n,s)),Ia(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!Jt(t)&&r.push(new(gy())(e._repo,e._path)),{removed:r,events:o}}function yh(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function kn(t,e){let n=null;for(const s of t.views.values())n=n||hy(s,e);return n}function vh(t,e){if(e._queryParams.loadsAllData())return Gi(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Eh(t,e){return vh(t,e)!=null}function Jt(t){return Gi(t)!=null}function Gi(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii;function Cy(t){S(!Ii,"__referenceConstructor has already been defined"),Ii=t}function by(){return S(Ii,"Reference.ts has not been loaded"),Ii}let wy=1;class Aa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new fe(null),this.pendingWriteTree_=Jm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Sy(t,e,n,s,i){return Um(t.pendingWriteTree_,e,n,s,i),i?Gs(t,new pn(ah(),e,n)):[]}function An(t,e,n=!1){const s=Wm(t.pendingWriteTree_,e);if(Vm(t.pendingWriteTree_,e)){let r=new fe(null);return s.snap!=null?r=r.set(ee(),!0):$e(s.children,o=>{r=r.set(new oe(o),!0)}),Gs(t,new Ei(s.path,r,n))}else return[]}function qi(t,e,n){return Gs(t,new pn(Uo(),e,n))}function Iy(t,e,n){const s=fe.fromObject(n);return Gs(t,new Ms(Uo(),e,s))}function Ty(t,e){return Gs(t,new Ds(Uo(),e))}function Ry(t,e,n){const s=Ko(t,n);if(s){const i=zo(s),r=i.path,o=i.queryId,l=Ve(r,e),a=new Ds(Wo(o),l);return Yo(t,r,a)}else return[]}function Xr(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Eh(o,e))){const a=Ey(o,e,n,s);my(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const h=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(f,_)=>Jt(_));if(h&&!u){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const _=xy(f);for(let m=0;m<_.length;++m){const w=_[m],M=w.query,P=Sh(t,w);t.listenProvider_.startListening(ms(M),Ti(t,M),P.hashFn,P.onComplete)}}}!u&&c.length>0&&!s&&(h?t.listenProvider_.stopListening(ms(e),null):c.forEach(f=>{const _=t.queryToTagMap.get(Ki(f));t.listenProvider_.stopListening(ms(f),_)}))}Oy(t,c)}return l}function Ay(t,e,n,s){const i=Ko(t,s);if(i!=null){const r=zo(i),o=r.path,l=r.queryId,a=Ve(o,e),c=new pn(Wo(l),a,n);return Yo(t,o,c)}else return[]}function Ny(t,e,n,s){const i=Ko(t,s);if(i){const r=zo(i),o=r.path,l=r.queryId,a=Ve(o,e),c=fe.fromObject(n),h=new Ms(Wo(l),a,c);return Yo(t,o,h)}else return[]}function Na(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,_)=>{const m=Ve(f,i);r=r||kn(_,m),o=o||Jt(_)});let l=t.syncPointTree_.get(i);l?(o=o||Jt(l),r=r||kn(l,ee())):(l=new py,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=H.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,m)=>{const w=kn(m,ee());w&&(r=r.updateImmediateChild(_,w))}));const c=Eh(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=Ki(e);S(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const _=Py();t.queryToTagMap.set(f,_),t.tagToQueryMap.set(_,f)}const h=Vo(t.pendingWriteTree_,i);let u=vy(l,e,n,h,r,a);if(!c&&!o&&!s){const f=vh(l,e);u=u.concat(Dy(t,e,f))}return u}function Ch(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Ve(o,e),c=kn(l,a);if(c)return c});return fh(i,e,r,n,!0)}function Gs(t,e){return bh(e,t.syncPointTree_,null,Vo(t.pendingWriteTree_,ee()))}function bh(t,e,n,s){if(K(t.path))return wh(t,e,n,s);{const i=e.get(ee());n==null&&i!=null&&(n=kn(i,ee()));let r=[];const o=q(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,h=dh(s,o);r=r.concat(bh(l,a,c,h))}return i&&(r=r.concat(qo(i,t,s,n))),r}}function wh(t,e,n,s){const i=e.get(ee());n==null&&i!=null&&(n=kn(i,ee()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=dh(s,o),h=t.operationForChild(o);h&&(r=r.concat(wh(h,l,a,c)))}),i&&(r=r.concat(qo(i,t,s,n))),r}function Sh(t,e){const n=e.query,s=Ti(t,n);return{hashFn:()=>(uy(e)||H.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Ry(t,n._path,s):Ty(t,n._path);{const r=Rg(i,n);return Xr(t,n,null,r)}}}}function Ti(t,e){const n=Ki(e);return t.queryToTagMap.get(n)}function Ki(t){return t._path.toString()+"$"+t._queryIdentifier}function Ko(t,e){return t.tagToQueryMap.get(e)}function zo(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new oe(t.substr(0,e))}}function Yo(t,e,n){const s=t.syncPointTree_.get(e);S(s,"Missing sync point for query tag that we're tracking");const i=Vo(t.pendingWriteTree_,e);return qo(s,n,i,null)}function xy(t){return t.fold((e,n,s)=>{if(n&&Jt(n))return[Gi(n)];{let i=[];return n&&(i=yh(n)),$e(s,(r,o)=>{i=i.concat(o)}),i}})}function ms(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(by())(t._repo,t._path):t}function Oy(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Ki(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function Py(){return wy++}function Dy(t,e,n){const s=e._path,i=Ti(t,e),r=Sh(t,n),o=t.listenProvider_.startListening(ms(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)S(!Jt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,h,u)=>{if(!K(c)&&h&&Jt(h))return[Gi(h).query];{let f=[];return h&&(f=f.concat(yh(h).map(_=>_.query))),$e(u,(_,m)=>{f=f.concat(m)}),f}});for(let c=0;c<a.length;++c){const h=a[c];t.listenProvider_.stopListening(ms(h),Ti(t,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Qo(n)}node(){return this.node_}}class Jo{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Ce(this.path_,e);return new Jo(this.syncTree_,n)}node(){return Ch(this.syncTree_,this.path_)}}const My=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},xa=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return ky(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Ly(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},ky=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},Ly=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&S(!1,"Unexpected increment value: "+s);const i=e.node();if(S(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Fy=function(t,e,n,s){return Xo(e,new Jo(n,t),s)},By=function(t,e,n){return Xo(t,new Qo(e),n)};function Xo(t,e,n){const s=t.getPriority().val(),i=xa(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=xa(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new Se(l,xe(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Se(i))),o.forEachChild(ve,(l,a)=>{const c=Xo(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function el(t,e){let n=e instanceof oe?e:new oe(e),s=t,i=q(n);for(;i!==null;){const r=Hn(s.node.children,i)||{children:{},childCount:0};s=new Zo(i,s,r),n=he(n),i=q(n)}return s}function Kn(t){return t.node.value}function Ih(t,e){t.node.value=e,Zr(t)}function Th(t){return t.node.childCount>0}function Hy(t){return Kn(t)===void 0&&!Th(t)}function zi(t,e){$e(t.node.children,(n,s)=>{e(new Zo(n,t,s))})}function Rh(t,e,n,s){n&&e(t),zi(t,i=>{Rh(i,e,!0)})}function Uy(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function qs(t){return new oe(t.parent===null?t.name:qs(t.parent)+"/"+t.name)}function Zr(t){t.parent!==null&&Wy(t.parent,t.name,t)}function Wy(t,e,n){const s=Hy(n),i=Mt(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,Zr(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Zr(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=/[\[\].#$\/\u0000-\u001F\u007F]/,jy=/[\[\].#$\u0000-\u001F\u007F]/,yr=10*1024*1024,Ah=function(t){return typeof t=="string"&&t.length!==0&&!Vy.test(t)},Nh=function(t){return typeof t=="string"&&t.length!==0&&!jy.test(t)},$y=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Nh(t)},xh=function(t,e,n){const s=n instanceof oe?new om(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ln(s));if(typeof e=="function")throw new Error(t+"contains a function "+ln(s)+" with contents = "+e.toString());if(xu(e))throw new Error(t+"contains "+e.toString()+" "+ln(s));if(typeof e=="string"&&e.length>yr/3&&Wi(e)>yr)throw new Error(t+"contains a string greater than "+yr+" utf8 bytes "+ln(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if($e(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ah(o)))throw new Error(t+" contains an invalid key ("+o+") "+ln(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);lm(s,o),xh(t,l,s),am(s)}),i&&r)throw new Error(t+' contains ".value" child '+ln(s)+" in addition to actual children.")}},Oh=function(t,e,n,s){if(!Nh(n))throw new Error(Eu(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Gy=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Oh(t,e,n)},qy=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ah(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!$y(n))throw new Error(Eu(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ph(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!ko(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function Dh(t,e,n){Ph(t,n),Mh(t,s=>ko(s,e))}function vn(t,e,n){Ph(t,n),Mh(t,s=>tt(s,e)||tt(e,s))}function Mh(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(zy(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function zy(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();ds&&Ne("event: "+n.toString()),js(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy="repo_interrupt",Qy=25;class Jy{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ky,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=vi(),this.transactionQueueTree_=new Zo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Xy(t,e,n){if(t.stats_=Do(t.repoInfo_),t.forceRestClient_||Og())t.server_=new yi(t.repoInfo_,(s,i,r,o)=>{Oa(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Pa(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Te(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new Rt(t.repoInfo_,e,(s,i,r,o)=>{Oa(t,s,i,r,o)},s=>{Pa(t,s)},s=>{ev(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=Lg(t.repoInfo_,()=>new Mm(t.stats_,t.server_)),t.infoData_=new Nm,t.infoSyncTree_=new Aa({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=qi(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),tl(t,"connected",!1),t.serverSyncTree_=new Aa({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);vn(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Zy(t){const n=t.infoData_.getNode(new oe(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function kh(t){return My({timestamp:Zy(t)})}function Oa(t,e,n,s,i){t.dataUpdateCount++;const r=new oe(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=fi(n,c=>xe(c));o=Ny(t.serverSyncTree_,r,a,i)}else{const a=xe(n);o=Ay(t.serverSyncTree_,r,a,i)}else if(s){const a=fi(n,c=>xe(c));o=Iy(t.serverSyncTree_,r,a)}else{const a=xe(n);o=qi(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=sl(t,r)),vn(t.eventQueue_,l,o)}function Pa(t,e){tl(t,"connected",e),e===!1&&nv(t)}function ev(t,e){$e(e,(n,s)=>{tl(t,n,s)})}function tl(t,e,n){const s=new oe("/.info/"+e),i=xe(n);t.infoData_.updateSnapshot(s,i);const r=qi(t.infoSyncTree_,s,i);vn(t.eventQueue_,s,r)}function tv(t){return t.nextWriteId_++}function nv(t){Lh(t,"onDisconnectEvents");const e=kh(t),n=vi();qr(t.onDisconnect_,ee(),(i,r)=>{const o=Fy(i,r,t.serverSyncTree_,e);lh(n,i,o)});let s=[];qr(n,ee(),(i,r)=>{s=s.concat(qi(t.serverSyncTree_,i,r));const o=av(t,i);sl(t,o)}),t.onDisconnect_=vi(),vn(t.eventQueue_,ee(),s)}function sv(t,e,n){let s;q(e._path)===".info"?s=Na(t.infoSyncTree_,e,n):s=Na(t.serverSyncTree_,e,n),Dh(t.eventQueue_,e._path,s)}function iv(t,e,n){let s;q(e._path)===".info"?s=Xr(t.infoSyncTree_,e,n):s=Xr(t.serverSyncTree_,e,n),Dh(t.eventQueue_,e._path,s)}function rv(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Yy)}function Lh(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ne(n,...e)}function Fh(t,e,n){return Ch(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function nl(t,e=t.transactionQueueTree_){if(e||Yi(t,e),Kn(e)){const n=Hh(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&ov(t,qs(e),n)}else Th(e)&&zi(e,n=>{nl(t,n)})}function ov(t,e,n){const s=n.map(c=>c.currentWriteId),i=Fh(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const h=n[c];S(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=Ve(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{Lh(t,"transaction put response",{path:a.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let f=0;f<n.length;f++)n[f].status=2,h=h.concat(An(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&u.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Yi(t,el(t.transactionQueueTree_,e)),nl(t,t.transactionQueueTree_),vn(t.eventQueue_,e,h);for(let f=0;f<u.length;f++)js(u[f])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{Ye("transaction at "+a.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}sl(t,e)}},o)}function sl(t,e){const n=Bh(t,e),s=qs(n),i=Hh(t,n);return lv(t,i,s),s}function lv(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Ve(n,a.path);let h=!1,u;if(S(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)h=!0,u=a.abortReason,i=i.concat(An(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=Qy)h=!0,u="maxretry",i=i.concat(An(t.serverSyncTree_,a.currentWriteId,!0));else{const f=Fh(t,a.path,o);a.currentInputSnapshot=f;const _=e[l].update(f.val());if(_!==void 0){xh("transaction failed: Data returned ",_,a.path);let m=xe(_);typeof _=="object"&&_!=null&&Mt(_,".priority")||(m=m.updatePriority(f.getPriority()));const M=a.currentWriteId,P=kh(t),x=By(m,f,P);a.currentOutputSnapshotRaw=m,a.currentOutputSnapshotResolved=x,a.currentWriteId=tv(t),o.splice(o.indexOf(M),1),i=i.concat(Sy(t.serverSyncTree_,a.path,x,a.currentWriteId,a.applyLocally)),i=i.concat(An(t.serverSyncTree_,M,!0))}else h=!0,u="nodata",i=i.concat(An(t.serverSyncTree_,a.currentWriteId,!0))}vn(t.eventQueue_,n,i),i=[],h&&(e[l].status=2,function(f){setTimeout(f,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(u==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(u),!1,null))))}Yi(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)js(s[l]);nl(t,t.transactionQueueTree_)}function Bh(t,e){let n,s=t.transactionQueueTree_;for(n=q(e);n!==null&&Kn(s)===void 0;)s=el(s,n),e=he(e),n=q(e);return s}function Hh(t,e){const n=[];return Uh(t,e,n),n.sort((s,i)=>s.order-i.order),n}function Uh(t,e,n){const s=Kn(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);zi(e,i=>{Uh(t,i,n)})}function Yi(t,e){const n=Kn(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,Ih(e,n.length>0?n:void 0)}zi(e,s=>{Yi(t,s)})}function av(t,e){const n=qs(Bh(t,e)),s=el(t.transactionQueueTree_,e);return Uy(s,i=>{vr(t,i)}),vr(t,s),Rh(s,i=>{vr(t,i)}),n}function vr(t,e){const n=Kn(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(An(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ih(e,void 0):n.length=r+1,vn(t.eventQueue_,qs(e),i);for(let o=0;o<s.length;o++)js(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function uv(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Ye(`Invalid query segment '${n}' in query '${t}'`)}return e}const Da=function(t,e){const n=hv(t),s=n.namespace;n.domain==="firebase.com"&&Pt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Pt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||bg();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Vu(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new oe(n.pathString)}},hv=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let h=t.indexOf("/");h===-1&&(h=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(h,u)),h<u&&(i=cv(t.substring(h,u)));const f=uv(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Te(this.snapshot.exportVal())}}class dv{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return K(this._path)?null:Ju(this._path)}get ref(){return new Zt(this._repo,this._path)}get _queryIdentifier(){const e=ma(this._queryParams),n=Oo(e);return n==="{}"?"default":n}get _queryObject(){return ma(this._queryParams)}isEqual(e){if(e=Vi(e),!(e instanceof il))return!1;const n=this._repo===e._repo,s=ko(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+rm(this._path)}}class Zt extends il{constructor(e,n){super(e,n,new Ho,!1)}get parent(){const e=Zu(this._path);return e===null?null:new Zt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ri{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new oe(e),s=eo(this.ref,e);return new Ri(this._node.getChild(n),s,ve)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ri(i,eo(this.ref,s),ve)))}hasChild(e){const n=new oe(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function _v(t,e){return t=Vi(t),t._checkNotDeleted("ref"),eo(t._root,e)}function eo(t,e){return t=Vi(t),q(t._path)===null?Gy("child","path",e):Oh("child","path",e),new Zt(t._repo,Ce(t._path,e))}class rl{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new fv("value",this,new Ri(e.snapshotNode,new Zt(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new dv(this,e,n):null}matches(e){return e instanceof rl?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function gv(t,e,n,s,i){const r=new pv(n,void 0),o=new rl(r);return sv(t._repo,t,o),()=>iv(t._repo,t,o)}function mv(t,e,n,s){return gv(t,"value",e)}_y(Zt);Cy(Zt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv="FIREBASE_DATABASE_EMULATOR_HOST",to={};let vv=!1;function Ev(t,e,n,s){t.repoInfo_=new Vu(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),s&&(t.authTokenProvider_=s)}function Cv(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Pt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ne("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Da(r,i),l=o.repoInfo,a;typeof process<"u"&&Zl&&(a=Zl[yv]),a?(r=`http://${a}?ns=${l.namespace}`,o=Da(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new Dg(t.name,t.options,e);qy("Invalid Firebase Database URL",o),K(o.path)||Pt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=wv(l,t,c,new Pg(t.name,n));return new Sv(h,t)}function bv(t,e){const n=to[e];(!n||n[t.key]!==t)&&Pt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),rv(t),delete n[t.key]}function wv(t,e,n,s){let i=to[e.name];i||(i={},to[e.name]=i);let r=i[t.toURLString()];return r&&Pt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Jy(t,vv,n,s),i[t.toURLString()]=r,r}class Sv{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Xy(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Zt(this._repo,ee())),this._rootInternal}_delete(){return this._rootInternal!==null&&(bv(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Pt("Cannot call "+e+" on a deleted database.")}}function Iv(t=ig(),e){const n=eg(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=jp("database");s&&Tv(n,...s)}return n}function Tv(t,e,n,s={}){t=Vi(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Pt("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Pt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new ti(ti.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:$p(s.mockUserToken,t.app.options.projectId);r=new ti(o)}Ev(i,e,n,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rv(t){gg(sg),pi(new Rs("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Cv(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Pn(ea,ta,t),Pn(ea,ta,"esm2017")}Rt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Rt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Rv();const Av={apiKey:"AIzaSyBlCGfn3wL69ArzYp0F46ocSTJXT3b_1Kc",authDomain:"youngsungallery-admin.firebaseapp.com",databaseURL:"https://youngsungallery-admin-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"youngsungallery-admin",storageBucket:"youngsungallery-admin.firebasestorage.app",messagingSenderId:"390092602898",appId:"1:390092602898:web:fa0b9a642da767dd0922cb"},Nv=Su(Av),Ma=Iv(Nv),Wh=Pp("time",()=>{const t=fn(0),e=fn(new Date);let n=null;function s(){n||(n=setInterval(()=>{e.value=new Date},1e3))}function i(){if(!Ma){console.error("Firebase Realtime Database 인스턴스를 찾을 수 없습니다. db 객체 import 경로를 확인하세요.");return}const o=_v(Ma,".info/serverTimeOffset");mv(o,l=>{t.value=l.val()||0})}const r=Fe(()=>{const o=e.value.getTime(),l=t.value,a=o+l;return new Date(a)});return s(),i(),{localNow:e,serverTimeOffset:t,correctedServerTime:r,startLocalTimeUpdate:s,initializeFirebaseTimeOffset:i}}),yt=(t,e)=>{const n=t.__vccOpts||t;for(const[s,i]of e)n[s]=i;return n},xv={id:"app-container"},Ov={__name:"App",setup(t){return Wh(),wo(()=>{console.log("[App.vue] 앱 시작 완료. Firebase 시간 동기화는 스토어에서 자동으로 처리됩니다.")}),Fi(()=>{}),(e,n)=>{const s=Bs("router-view");return ot(),lt("div",xv,[de(s)])}}},Pv=yt(Ov,[["__scopeId","data-v-1d6bfbbd"]]),Dv="modulepreload",Mv=function(t){return"/website/"+t},ka={},ts=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(a=>{if(a=Mv(a),a in ka)return;ka[a]=!0;const c=a.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Dv,c||(u.as="script"),u.crossOrigin="",u.href=a,l&&u.setAttribute("nonce",l),document.head.appendChild(u),c)return new Promise((f,_)=>{u.addEventListener("load",f),u.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${a}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Tn=typeof document<"u";function Vh(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function kv(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Vh(t.default)}const ne=Object.assign;function Er(t,e){const n={};for(const s in e){const i=e[s];n[s]=rt(i)?i.map(t):t(i)}return n}const ys=()=>{},rt=Array.isArray;function La(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const jh=/#/g,Lv=/&/g,Fv=/\//g,Bv=/=/g,Hv=/\?/g,$h=/\+/g,Uv=/%5B/g,Wv=/%5D/g,Gh=/%5E/g,Vv=/%60/g,qh=/%7B/g,jv=/%7C/g,Kh=/%7D/g,$v=/%20/g;function ol(t){return t==null?"":encodeURI(""+t).replace(jv,"|").replace(Uv,"[").replace(Wv,"]")}function Gv(t){return ol(t).replace(qh,"{").replace(Kh,"}").replace(Gh,"^")}function no(t){return ol(t).replace($h,"%2B").replace($v,"+").replace(jh,"%23").replace(Lv,"%26").replace(Vv,"`").replace(qh,"{").replace(Kh,"}").replace(Gh,"^")}function qv(t){return no(t).replace(Bv,"%3D")}function Kv(t){return ol(t).replace(jh,"%23").replace(Hv,"%3F")}function zv(t){return Kv(t).replace(Fv,"%2F")}function ks(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const Yv=/\/$/,Qv=t=>t.replace(Yv,"");function Cr(t,e,n="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return a=l>=0&&a>l?-1:a,a>=0&&(s=e.slice(0,a),r=e.slice(a,l>0?l:e.length),i=t(r.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=eE(s??e,n),{fullPath:s+r+o,path:s,query:i,hash:ks(o)}}function Jv(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Fa(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Xv(t,e,n){const s=e.matched.length-1,i=n.matched.length-1;return s>-1&&s===i&&jn(e.matched[s],n.matched[i])&&zh(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function jn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function zh(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!Zv(t[n],e[n]))return!1;return!0}function Zv(t,e){return rt(t)?Ba(t,e):rt(e)?Ba(e,t):(t==null?void 0:t.valueOf())===(e==null?void 0:e.valueOf())}function Ba(t,e){return rt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function eE(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=n.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const Ft={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let so=function(t){return t.pop="pop",t.push="push",t}({}),br=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function tE(t){if(!t)if(Tn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Qv(t)}const nE=/^[^#]+#/;function sE(t,e){return t.replace(nE,"#")+e}function iE(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Qi=()=>({left:window.scrollX,top:window.scrollY});function rE(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=iE(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ha(t,e){return(history.state?history.state.position-e:-1)+t}const io=new Map;function oE(t,e){io.set(t,e)}function lE(t){const e=io.get(t);return io.delete(t),e}function aE(t){return typeof t=="string"||t&&typeof t=="object"}function Yh(t){return typeof t=="string"||typeof t=="symbol"}let ye=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Qh=Symbol("");ye.MATCHER_NOT_FOUND+"",ye.NAVIGATION_GUARD_REDIRECT+"",ye.NAVIGATION_ABORTED+"",ye.NAVIGATION_CANCELLED+"",ye.NAVIGATION_DUPLICATED+"";function $n(t,e){return ne(new Error,{type:t,[Qh]:!0},e)}function Ct(t,e){return t instanceof Error&&Qh in t&&(e==null||!!(t.type&e))}const cE=["params","query","hash"];function uE(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of cE)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function hE(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const i=n[s].replace($h," "),r=i.indexOf("="),o=ks(r<0?i:i.slice(0,r)),l=r<0?null:ks(i.slice(r+1));if(o in e){let a=e[o];rt(a)||(a=e[o]=[a]),a.push(l)}else e[o]=l}return e}function Ua(t){let e="";for(let n in t){const s=t[n];if(n=qv(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(rt(s)?s.map(i=>i&&no(i)):[s&&no(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function fE(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=rt(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const dE=Symbol(""),Wa=Symbol(""),ll=Symbol(""),Jh=Symbol(""),ro=Symbol("");function ns(){let t=[];function e(s){return t.push(s),()=>{const i=t.indexOf(s);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Vt(t,e,n,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const c=f=>{f===!1?a($n(ye.NAVIGATION_ABORTED,{from:n,to:e})):f instanceof Error?a(f):aE(f)?a($n(ye.NAVIGATION_GUARD_REDIRECT,{from:e,to:f})):(o&&s.enterCallbacks[i]===o&&typeof f=="function"&&o.push(f),l())},h=r(()=>t.call(s&&s.instances[i],e,n,c));let u=Promise.resolve(h);t.length<3&&(u=u.then(c)),u.catch(f=>a(f))})}function wr(t,e,n,s,i=r=>r()){const r=[];for(const o of t)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(Vh(a)){const c=(a.__vccOpts||a)[e];c&&r.push(Vt(c,n,s,o,l,i))}else{let c=a();r.push(()=>c.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const u=kv(h)?h.default:h;o.mods[l]=h,o.components[l]=u;const f=(u.__vccOpts||u)[e];return f&&Vt(f,n,s,o,l,i)()}))}}return r}function pE(t,e){const n=[],s=[],i=[],r=Math.max(e.matched.length,t.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(t.matched.find(c=>jn(c,l))?s.push(l):n.push(l));const a=t.matched[o];a&&(e.matched.find(c=>jn(c,a))||i.push(a))}return[n,s,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let _E=()=>location.protocol+"//"+location.host;function Xh(t,e){const{pathname:n,search:s,hash:i}=e,r=t.indexOf("#");if(r>-1){let o=i.includes(t.slice(r))?t.slice(r).length:1,l=i.slice(o);return l[0]!=="/"&&(l="/"+l),Fa(l,"")}return Fa(n,t)+s+i}function gE(t,e,n,s){let i=[],r=[],o=null;const l=({state:f})=>{const _=Xh(t,location),m=n.value,w=e.value;let M=0;if(f){if(n.value=_,e.value=f,o&&o===m){o=null;return}M=w?f.position-w.position:0}else s(_);i.forEach(P=>{P(n.value,m,{delta:M,type:so.pop,direction:M?M>0?br.forward:br.back:br.unknown})})};function a(){o=n.value}function c(f){i.push(f);const _=()=>{const m=i.indexOf(f);m>-1&&i.splice(m,1)};return r.push(_),_}function h(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(ne({},f.state,{scroll:Qi()}),"")}}function u(){for(const f of r)f();r=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",h),document.removeEventListener("visibilitychange",h)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",h),document.addEventListener("visibilitychange",h),{pauseListeners:a,listen:c,destroy:u}}function Va(t,e,n,s=!1,i=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:i?Qi():null}}function mE(t){const{history:e,location:n}=window,s={value:Xh(t,n)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,c,h){const u=t.indexOf("#"),f=u>-1?(n.host&&document.querySelector("base")?t:t.slice(u))+a:_E()+t+a;try{e[h?"replaceState":"pushState"](c,"",f),i.value=c}catch(_){console.error(_),n[h?"replace":"assign"](f)}}function o(a,c){r(a,ne({},e.state,Va(i.value.back,a,i.value.forward,!0),c,{position:i.value.position}),!0),s.value=a}function l(a,c){const h=ne({},i.value,e.state,{forward:a,scroll:Qi()});r(h.current,h,!0),r(a,ne({},Va(s.value,a,null),{position:h.position+1},c),!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function yE(t){t=tE(t);const e=mE(t),n=gE(t,e.state,e.location,e.replace);function s(r,o=!0){o||n.pauseListeners(),history.go(r)}const i=ne({location:"",base:t,go:s,createHref:sE.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}let cn=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var Ee=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(Ee||{});const vE={type:cn.Static,value:""},EE=/[a-zA-Z0-9_]/;function CE(t){if(!t)return[[]];if(t==="/")return[[vE]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${c}": ${_}`)}let n=Ee.Static,s=n;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,c="",h="";function u(){c&&(n===Ee.Static?r.push({type:cn.Static,value:c}):n===Ee.Param||n===Ee.ParamRegExp||n===Ee.ParamRegExpEnd?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:cn.Param,value:c,regexp:h,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=a}for(;l<t.length;){if(a=t[l++],a==="\\"&&n!==Ee.ParamRegExp){s=n,n=Ee.EscapeNext;continue}switch(n){case Ee.Static:a==="/"?(c&&u(),o()):a===":"?(u(),n=Ee.Param):f();break;case Ee.EscapeNext:f(),n=s;break;case Ee.Param:a==="("?n=Ee.ParamRegExp:EE.test(a)?f():(u(),n=Ee.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case Ee.ParamRegExp:a===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+a:n=Ee.ParamRegExpEnd:h+=a;break;case Ee.ParamRegExpEnd:u(),n=Ee.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--,h="";break;default:e("Unknown state");break}}return n===Ee.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),u(),o(),i}const ja="[^/]+?",bE={sensitive:!1,strict:!1,start:!0,end:!0};var ke=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(ke||{});const wE=/[.+*?^${}()[\]/\\]/g;function SE(t,e){const n=ne({},bE,e),s=[];let i=n.start?"^":"";const r=[];for(const c of t){const h=c.length?[]:[ke.Root];n.strict&&!c.length&&(i+="/");for(let u=0;u<c.length;u++){const f=c[u];let _=ke.Segment+(n.sensitive?ke.BonusCaseSensitive:0);if(f.type===cn.Static)u||(i+="/"),i+=f.value.replace(wE,"\\$&"),_+=ke.Static;else if(f.type===cn.Param){const{value:m,repeatable:w,optional:M,regexp:P}=f;r.push({name:m,repeatable:w,optional:M});const x=P||ja;if(x!==ja){_+=ke.BonusCustomRegExp;try{`${x}`}catch(D){throw new Error(`Invalid custom RegExp for param "${m}" (${x}): `+D.message)}}let k=w?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;u||(k=M&&c.length<2?`(?:/${k})`:"/"+k),M&&(k+="?"),i+=k,_+=ke.Dynamic,M&&(_+=ke.BonusOptional),w&&(_+=ke.BonusRepeatable),x===".*"&&(_+=ke.BonusWildcard)}h.push(_)}s.push(h)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=ke.BonusStrict}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function l(c){const h=c.match(o),u={};if(!h)return null;for(let f=1;f<h.length;f++){const _=h[f]||"",m=r[f-1];u[m.name]=_&&m.repeatable?_.split("/"):_}return u}function a(c){let h="",u=!1;for(const f of t){(!u||!h.endsWith("/"))&&(h+="/"),u=!1;for(const _ of f)if(_.type===cn.Static)h+=_.value;else if(_.type===cn.Param){const{value:m,repeatable:w,optional:M}=_,P=m in c?c[m]:"";if(rt(P)&&!w)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const x=rt(P)?P.join("/"):P;if(!x)if(M)f.length<2&&(h.endsWith("/")?h=h.slice(0,-1):u=!0);else throw new Error(`Missing required param "${m}"`);h+=x}}return h||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function IE(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===ke.Static+ke.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===ke.Static+ke.Segment?1:-1:0}function Zh(t,e){let n=0;const s=t.score,i=e.score;for(;n<s.length&&n<i.length;){const r=IE(s[n],i[n]);if(r)return r;n++}if(Math.abs(i.length-s.length)===1){if($a(s))return 1;if($a(i))return-1}return i.length-s.length}function $a(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const TE={strict:!1,end:!0,sensitive:!1};function RE(t,e,n){const s=SE(CE(t.path),n),i=ne(s,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function AE(t,e){const n=[],s=new Map;e=La(TE,e);function i(u){return s.get(u)}function r(u,f,_){const m=!_,w=qa(u);w.aliasOf=_&&_.record;const M=La(e,u),P=[w];if("alias"in u){const D=typeof u.alias=="string"?[u.alias]:u.alias;for(const $ of D)P.push(qa(ne({},w,{components:_?_.record.components:w.components,path:$,aliasOf:_?_.record:w})))}let x,k;for(const D of P){const{path:$}=D;if(f&&$[0]!=="/"){const we=f.record.path,ie=we[we.length-1]==="/"?"":"/";D.path=f.record.path+($&&ie+$)}if(x=RE(D,f,M),_?_.alias.push(x):(k=k||x,k!==x&&k.alias.push(x),m&&u.name&&!Ka(x)&&o(u.name)),ef(x)&&a(x),w.children){const we=w.children;for(let ie=0;ie<we.length;ie++)r(we[ie],x,_&&_.children[ie])}_=_||x}return k?()=>{o(k)}:ys}function o(u){if(Yh(u)){const f=s.get(u);f&&(s.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&s.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function l(){return n}function a(u){const f=OE(u,n);n.splice(f,0,u),u.record.name&&!Ka(u)&&s.set(u.record.name,u)}function c(u,f){let _,m={},w,M;if("name"in u&&u.name){if(_=s.get(u.name),!_)throw $n(ye.MATCHER_NOT_FOUND,{location:u});M=_.record.name,m=ne(Ga(f.params,_.keys.filter(k=>!k.optional).concat(_.parent?_.parent.keys.filter(k=>k.optional):[]).map(k=>k.name)),u.params&&Ga(u.params,_.keys.map(k=>k.name))),w=_.stringify(m)}else if(u.path!=null)w=u.path,_=n.find(k=>k.re.test(w)),_&&(m=_.parse(w),M=_.record.name);else{if(_=f.name?s.get(f.name):n.find(k=>k.re.test(f.path)),!_)throw $n(ye.MATCHER_NOT_FOUND,{location:u,currentLocation:f});M=_.record.name,m=ne({},f.params,u.params),w=_.stringify(m)}const P=[];let x=_;for(;x;)P.unshift(x.record),x=x.parent;return{name:M,path:w,params:m,matched:P,meta:xE(P)}}t.forEach(u=>r(u));function h(){n.length=0,s.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:h,getRoutes:l,getRecordMatcher:i}}function Ga(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function qa(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:NE(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function NE(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Ka(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function xE(t){return t.reduce((e,n)=>ne(e,n.meta),{})}function OE(t,e){let n=0,s=e.length;for(;n!==s;){const r=n+s>>1;Zh(t,e[r])<0?s=r:n=r+1}const i=PE(t);return i&&(s=e.lastIndexOf(i,s-1)),s}function PE(t){let e=t;for(;e=e.parent;)if(ef(e)&&Zh(t,e)===0)return e}function ef({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function za(t){const e=gt(ll),n=gt(Jh),s=Fe(()=>{const a=Gt(t.to);return e.resolve(a)}),i=Fe(()=>{const{matched:a}=s.value,{length:c}=a,h=a[c-1],u=n.matched;if(!h||!u.length)return-1;const f=u.findIndex(jn.bind(null,h));if(f>-1)return f;const _=Ya(a[c-2]);return c>1&&Ya(h)===_&&u[u.length-1].path!==_?u.findIndex(jn.bind(null,a[c-2])):f}),r=Fe(()=>i.value>-1&&FE(n.params,s.value.params)),o=Fe(()=>i.value>-1&&i.value===n.matched.length-1&&zh(n.params,s.value.params));function l(a={}){if(LE(a)){const c=e[Gt(t.replace)?"replace":"push"](Gt(t.to)).catch(ys);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:Fe(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function DE(t){return t.length===1?t[0]:t}const ME=Mc({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:za,setup(t,{slots:e}){const n=Ls(za(t)),{options:s}=gt(ll),i=Fe(()=>({[Qa(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Qa(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const r=e.default&&DE(e.default(n));return t.custom?r:ru("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}}),kE=ME;function LE(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function FE(t,e){for(const n in e){const s=e[n],i=t[n];if(typeof s=="string"){if(s!==i)return!1}else if(!rt(i)||i.length!==s.length||s.some((r,o)=>r.valueOf()!==i[o].valueOf()))return!1}return!0}function Ya(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Qa=(t,e,n)=>t??e??n,BE=Mc({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=gt(ro),i=Fe(()=>t.route||s.value),r=gt(Wa,0),o=Fe(()=>{let c=Gt(r);const{matched:h}=i.value;let u;for(;(u=h[c])&&!u.components;)c++;return c}),l=Fe(()=>i.value.matched[o.value]);Xs(Wa,Fe(()=>o.value+1)),Xs(dE,l),Xs(ro,i);const a=fn();return us(()=>[a.value,l.value,t.name],([c,h,u],[f,_,m])=>{h&&(h.instances[u]=c,_&&_!==h&&c&&c===f&&(h.leaveGuards.size||(h.leaveGuards=_.leaveGuards),h.updateGuards.size||(h.updateGuards=_.updateGuards))),c&&h&&(!_||!jn(h,_)||!f)&&(h.enterCallbacks[u]||[]).forEach(w=>w(c))},{flush:"post"}),()=>{const c=i.value,h=t.name,u=l.value,f=u&&u.components[h];if(!f)return Ja(n.default,{Component:f,route:c});const _=u.props[h],m=_?_===!0?c.params:typeof _=="function"?_(c):_:null,M=ru(f,ne({},m,e,{onVnodeUnmounted:P=>{P.component.isUnmounted&&(u.instances[h]=null)},ref:a}));return Ja(n.default,{Component:M,route:c})||M}}});function Ja(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const HE=BE;function UE(t){const e=AE(t.routes,t),n=t.parseQuery||hE,s=t.stringifyQuery||Ua,i=t.history,r=ns(),o=ns(),l=ns(),a=Df(Ft);let c=Ft;Tn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Er.bind(null,E=>""+E),u=Er.bind(null,zv),f=Er.bind(null,ks);function _(E,O){let A,L;return Yh(E)?(A=e.getRecordMatcher(E),L=O):L=E,e.addRoute(L,A)}function m(E){const O=e.getRecordMatcher(E);O&&e.removeRoute(O)}function w(){return e.getRoutes().map(E=>E.record)}function M(E){return!!e.getRecordMatcher(E)}function P(E,O){if(O=ne({},O||a.value),typeof E=="string"){const g=Cr(n,E,O.path),v=e.resolve({path:g.path},O),C=i.createHref(g.fullPath);return ne(g,v,{params:f(v.params),hash:ks(g.hash),redirectedFrom:void 0,href:C})}let A;if(E.path!=null)A=ne({},E,{path:Cr(n,E.path,O.path).path});else{const g=ne({},E.params);for(const v in g)g[v]==null&&delete g[v];A=ne({},E,{params:u(g)}),O.params=u(O.params)}const L=e.resolve(A,O),J=E.hash||"";L.params=h(f(L.params));const d=Jv(s,ne({},E,{hash:Gv(J),path:L.path})),p=i.createHref(d);return ne({fullPath:d,hash:J,query:s===Ua?fE(E.query):E.query||{}},L,{redirectedFrom:void 0,href:p})}function x(E){return typeof E=="string"?Cr(n,E,a.value.path):ne({},E)}function k(E,O){if(c!==E)return $n(ye.NAVIGATION_CANCELLED,{from:O,to:E})}function D(E){return ie(E)}function $(E){return D(ne(x(E),{replace:!0}))}function we(E,O){const A=E.matched[E.matched.length-1];if(A&&A.redirect){const{redirect:L}=A;let J=typeof L=="function"?L(E,O):L;return typeof J=="string"&&(J=J.includes("?")||J.includes("#")?J=x(J):{path:J},J.params={}),ne({query:E.query,hash:E.hash,params:J.path!=null?{}:E.params},J)}}function ie(E,O){const A=c=P(E),L=a.value,J=E.state,d=E.force,p=E.replace===!0,g=we(A,L);if(g)return ie(ne(x(g),{state:typeof g=="object"?ne({},J,g.state):J,force:d,replace:p}),O||A);const v=A;v.redirectedFrom=O;let C;return!d&&Xv(s,L,A)&&(C=$n(ye.NAVIGATION_DUPLICATED,{to:v,from:L}),at(L,L,!0,!1)),(C?Promise.resolve(C):me(v,L)).catch(y=>Ct(y)?Ct(y,ye.NAVIGATION_GUARD_REDIRECT)?y:Lt(y):te(y,v,L)).then(y=>{if(y){if(Ct(y,ye.NAVIGATION_GUARD_REDIRECT))return ie(ne({replace:p},x(y.to),{state:typeof y.to=="object"?ne({},J,y.to.state):J,force:d}),O||v)}else y=Ge(v,L,!0,p,J);return De(v,L,y),y})}function z(E,O){const A=k(E,O);return A?Promise.reject(A):Promise.resolve()}function Y(E){const O=Cn.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(E):E()}function me(E,O){let A;const[L,J,d]=pE(E,O);A=wr(L.reverse(),"beforeRouteLeave",E,O);for(const g of L)g.leaveGuards.forEach(v=>{A.push(Vt(v,E,O))});const p=z.bind(null,E,O);return A.push(p),Qe(A).then(()=>{A=[];for(const g of r.list())A.push(Vt(g,E,O));return A.push(p),Qe(A)}).then(()=>{A=wr(J,"beforeRouteUpdate",E,O);for(const g of J)g.updateGuards.forEach(v=>{A.push(Vt(v,E,O))});return A.push(p),Qe(A)}).then(()=>{A=[];for(const g of d)if(g.beforeEnter)if(rt(g.beforeEnter))for(const v of g.beforeEnter)A.push(Vt(v,E,O));else A.push(Vt(g.beforeEnter,E,O));return A.push(p),Qe(A)}).then(()=>(E.matched.forEach(g=>g.enterCallbacks={}),A=wr(d,"beforeRouteEnter",E,O,Y),A.push(p),Qe(A))).then(()=>{A=[];for(const g of o.list())A.push(Vt(g,E,O));return A.push(p),Qe(A)}).catch(g=>Ct(g,ye.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function De(E,O,A){l.list().forEach(L=>Y(()=>L(E,O,A)))}function Ge(E,O,A,L,J){const d=k(E,O);if(d)return d;const p=O===Ft,g=Tn?history.state:{};A&&(L||p?i.replace(E.fullPath,ne({scroll:p&&g&&g.scroll},J)):i.push(E.fullPath,J)),a.value=E,at(E,O,A,p),Lt()}let Be;function en(){Be||(Be=i.listen((E,O,A)=>{if(!tn.listening)return;const L=P(E),J=we(L,tn.currentRoute.value);if(J){ie(ne(J,{replace:!0,force:!0}),L).catch(ys);return}c=L;const d=a.value;Tn&&oE(Ha(d.fullPath,A.delta),Qi()),me(L,d).catch(p=>Ct(p,ye.NAVIGATION_ABORTED|ye.NAVIGATION_CANCELLED)?p:Ct(p,ye.NAVIGATION_GUARD_REDIRECT)?(ie(ne(x(p.to),{force:!0}),L).then(g=>{Ct(g,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&!A.delta&&A.type===so.pop&&i.go(-1,!1)}).catch(ys),Promise.reject()):(A.delta&&i.go(-A.delta,!1),te(p,L,d))).then(p=>{p=p||Ge(L,d,!1),p&&(A.delta&&!Ct(p,ye.NAVIGATION_CANCELLED)?i.go(-A.delta,!1):A.type===so.pop&&Ct(p,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),De(L,d,p)}).catch(ys)}))}let kt=ns(),_e=ns(),j;function te(E,O,A){Lt(E);const L=_e.list();return L.length?L.forEach(J=>J(E,O,A)):console.error(E),Promise.reject(E)}function vt(){return j&&a.value!==Ft?Promise.resolve():new Promise((E,O)=>{kt.add([E,O])})}function Lt(E){return j||(j=!E,en(),kt.list().forEach(([O,A])=>E?A(E):O()),kt.reset()),E}function at(E,O,A,L){const{scrollBehavior:J}=t;if(!Tn||!J)return Promise.resolve();const d=!A&&lE(Ha(E.fullPath,0))||(L||!A)&&history.state&&history.state.scroll||null;return Eo().then(()=>J(E,O,d)).then(p=>p&&rE(p)).catch(p=>te(p,E,O))}const He=E=>i.go(E);let En;const Cn=new Set,tn={currentRoute:a,listening:!0,addRoute:_,removeRoute:m,clearRoutes:e.clearRoutes,hasRoute:M,getRoutes:w,resolve:P,options:t,push:D,replace:$,go:He,back:()=>He(-1),forward:()=>He(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:_e.add,isReady:vt,install(E){E.component("RouterLink",kE),E.component("RouterView",HE),E.config.globalProperties.$router=tn,Object.defineProperty(E.config.globalProperties,"$route",{enumerable:!0,get:()=>Gt(a)}),Tn&&!En&&a.value===Ft&&(En=!0,D(i.location).catch(L=>{}));const O={};for(const L in Ft)Object.defineProperty(O,L,{get:()=>a.value[L],enumerable:!0});E.provide(ll,tn),E.provide(Jh,Ic(O)),E.provide(ro,a);const A=E.unmount;Cn.add(E),E.unmount=function(){Cn.delete(E),Cn.size<1&&(c=Ft,Be&&Be(),Be=null,a.value=Ft,En=!1,j=!1),A()}}};function Qe(E){return E.reduce((O,A)=>O.then(()=>Y(A)),Promise.resolve())}return tn}const WE={},VE={class:"header-logo-container"};function jE(t,e){const n=Bs("RouterLink");return ot(),lt("div",VE,[de(n,{to:"/",class:"logo-link"},{default:ws(()=>[...e[0]||(e[0]=[Q("span",{class:"site-name"},"영선갤러리",-1)])]),_:1})])}const $E=yt(WE,[["render",jE],["__scopeId","data-v-cef83870"]]),GE={class:"main-nav"},qE={__name:"MainNav",setup(t){return(e,n)=>{const s=Bs("RouterLink");return ot(),lt("nav",GE,[Q("ul",null,[Q("li",null,[de(s,{to:"/exhibitions",class:"nav-link"},{default:ws(()=>[...n[0]||(n[0]=[Q("span",null,"전시",-1)])]),_:1})]),Q("li",null,[de(s,{to:"/artworks",class:"nav-link"},{default:ws(()=>[...n[1]||(n[1]=[Q("span",null,"작품",-1)])]),_:1})])])])}}},KE=yt(qE,[["__scopeId","data-v-a0425ff1"]]),zE={class:"app-header"},YE={class:"header-inner"},QE={class:"header-right-group"},JE={__name:"MainHeader",setup(t){return(e,n)=>(ot(),lt("header",zE,[Q("div",YE,[de($E),Q("div",QE,[de(KE),n[0]||(n[0]=Q("div",{class:"header-right-utility"},null,-1))])])]))}},XE=yt(JE,[["__scopeId","data-v-7c8557b5"]]);function ZE(){const t=Wh(),{serverTimeOffset:e}=Dp(t),n=fn(new Date);let s;return wo(()=>{s=setInterval(()=>{n.value=new Date},1e3)}),Fi(()=>{s&&clearInterval(s)}),{formattedServerTime:Fe(()=>{const r=n.value,o=e.value,l=r.getTime()+(o||0),a=new Date(l);return a&&!isNaN(a.getTime())?a.toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}):"시간 로딩 중..."})}}const eC={class:"copyright-section"},tC={__name:"CopyrightSection",props:{formattedServerTime:{type:String,default:"시간 정보를 불러오는 중..."}},setup(t){return console.log(`[CopyrightSection.vue] Received formattedServerTime prop: ${t.formattedServerTime}`),(n,s)=>(ot(),lt("div",eC,[s[0]||(s[0]=Q("p",null,"Copyright © 2025 Youngsun Gallery. All rights reserved.",-1)),Q("p",null,"현재 서버 시각: "+oc(t.formattedServerTime),1)]))}},nC=yt(tC,[["__scopeId","data-v-42f9e73c"]]),sC="/website/vite.svg",iC="/website/vue.svg",rC={class:"footer-section tech-stack"},oC={__name:"TechStackSection",setup(t){return(e,n)=>(ot(),lt("div",rC,[...n[0]||(n[0]=[Q("a",{href:"https://vitejs.dev",target:"_blank",rel:"noopener noreferrer"},[Q("img",{src:sC,class:"icon",alt:"Vite logo"})],-1),Q("a",{href:"https://vuejs.org/",target:"_blank",rel:"noopener noreferrer"},[Q("img",{src:iC,class:"icon",alt:"Vue logo"})],-1),Q("span",null,"Powered by Vite & Vue",-1)])]))}},lC=yt(oC,[["__scopeId","data-v-cc699b64"]]),aC={class:"footer-section contact-info"},cC={__name:"ContactInfoSection",setup(t){return(e,n)=>(ot(),lt("div",aC,[...n[0]||(n[0]=[Q("p",null,[Q("a",{href:"https://naver.me/xzlgF1UM",target:"_blank",rel:"noopener noreferrer"},[Bn(" 경기 수원시 영통구 덕영대로 1471번길 2층 "),Q("span",{class:"icon"},"🗺️")])],-1),Q("p",null,[Q("a",{href:"tel:031-203-1089"},[Bn(" 031-203-1089 "),Q("span",{class:"icon"},"📞")])],-1)])]))}},uC=yt(cC,[["__scopeId","data-v-8e260d68"]]),hC="/website/youtube.png",fC="/website/kakaotalk.png",dC={class:"footer-section social-links"},pC={__name:"SocialLinksSection",setup(t){return(e,n)=>(ot(),lt("div",dC,[...n[0]||(n[0]=[Q("a",{href:"https://www.youtube.com/@%EC%98%81%EC%84%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC",target:"_blank",rel:"noopener noreferrer"},[Q("img",{src:hC,class:"icon",alt:"YouTube icon"}),Bn(" 영선갤러리 유튜브 ")],-1),Q("a",{href:"https://open.kakao.com/o/gNPhwidf",target:"_blank",rel:"noopener noreferrer"},[Q("img",{src:fC,class:"icon",alt:"KakaoTalk icon"}),Bn(" 영선갤러리 카카오톡 ")],-1)])]))}},_C=yt(pC,[["__scopeId","data-v-06ad5ac5"]]),gC={class:"app-footer"},mC={__name:"TheFooter",setup(t){const{formattedServerTime:e}=ZE();return(n,s)=>(ot(),lt("footer",gC,[s[0]||(s[0]=Q("hr",{class:"footer-divider"},null,-1)),de(nC,{formattedServerTime:Gt(e)},null,8,["formattedServerTime"]),s[1]||(s[1]=Q("hr",{class:"footer-divider"},null,-1)),de(lC),s[2]||(s[2]=Q("hr",{class:"footer-divider"},null,-1)),de(uC),s[3]||(s[3]=Q("hr",{class:"footer-divider"},null,-1)),de(_C)]))}},yC=yt(mC,[["__scopeId","data-v-25842b3b"]]),vC={class:"main-layout-wrapper"},EC={class:"main-content"},CC={__name:"MainLayout",setup(t){return(e,n)=>{const s=Bs("router-view");return ot(),lt("div",vC,[de(XE),Q("div",EC,[de(s)]),de(yC)])}}},bC=yt(CC,[["__scopeId","data-v-679369b4"]]),wC={__name:"HomeView",setup(t){return(e,n)=>{const s=Bs("router-link");return ot(),lt("div",null,[n[1]||(n[1]=Q("h1",null,"영선갤러리 본사이트 - 홈",-1)),n[2]||(n[2]=Q("p",null,"환영합니다! 영선갤러리의 아름다운 작품들을 만나보세요.",-1)),de(s,{to:"/admin"},{default:ws(()=>[...n[0]||(n[0]=[Bn("관리자 페이지로 이동",-1)])]),_:1})])}}},SC=UE({history:yE("/website/"),routes:[{path:"/",component:bC,children:[{path:"",name:"home",component:wC},{path:"exhibitions",name:"exhibitions",component:()=>ts(()=>import("./NotFoundView-BJ6tjqvv.js"),[])},{path:"artworks",name:"artworks",component:()=>ts(()=>import("./NotFoundView-BJ6tjqvv.js"),[])},{path:"lectures",name:"lectures",component:()=>ts(()=>import("./NotFoundView-BJ6tjqvv.js"),[])},{path:"about",name:"about",component:()=>ts(()=>import("./NotFoundView-BJ6tjqvv.js"),[])}]},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>ts(()=>import("./NotFoundView-BJ6tjqvv.js"),[])}]}),al=wp(Pv),IC=Tp();al.use(IC);al.use(SC);al.mount("#app");export{yt as _,Q as a,de as b,lt as c,Bn as d,ot as o,Bs as r,ws as w};
