import{r as q,_ as me,R as I,a as de,c as pe,P as m,b as Pn,h as jn,j as l,l as Se}from"./index-D9jjzhzb.js";import{a as ne}from"./CContainer-D-X2fmCf.js";import{C as In}from"./CCollapse-CVFDtGx3.js";import{a as Tn,b as Mn,c as Ln,d as Pe,e as pt,f as ht}from"./CNavItem-hX69jj-7.js";import{C as ce,a as j}from"./CRow-DNhdtRDb.js";import{C as zn}from"./CForm-D9ERDgJD.js";import{C as Fn,a as _n}from"./CInputGroupText-8n4-zcUm.js";import{C as Rn}from"./CFormInput-CuhmxhYZ.js";import"./CFormControlWrapper-fnGJS7iU.js";import"./CFormControlValidation-CHjUXGjU.js";import"./CFormLabel-CBuRc9oP.js";var ae=q.forwardRef(function(e,t){var n,a=e.align,r=e.className,s=e.fluid,i=e.rounded,o=e.thumbnail,c=me(e,["align","className","fluid","rounded","thumbnail"]);return I.createElement("img",de({className:pe((n={},n["float-".concat(a)]=a&&(a==="start"||a==="end"),n["d-block mx-auto"]=a&&a==="center",n["img-fluid"]=s,n.rounded=i,n["img-thumbnail"]=o,n),r)||void 0},c,{ref:t}))});ae.propTypes={align:m.oneOf(["start","center","end"]),className:m.string,fluid:m.bool,rounded:m.bool,thumbnail:m.bool};ae.displayName="CImage";var Ze=q.forwardRef(function(e,t){var n,a=e.children,r=e.as,s=r===void 0?"nav":r,i=e.className,o=e.color,c=e.colorScheme,f=e.container,d=e.expand,h=e.placement,p=me(e,["children","as","className","color","colorScheme","container","expand","placement"]);return I.createElement(s,de({className:pe("navbar",(n={},n["bg-".concat(o)]=o,n[typeof d=="boolean"?"navbar-expand":"navbar-expand-".concat(d)]=d,n),h,i)},c&&{"data-coreui-theme":c},p,{ref:t}),f?I.createElement("div",{className:typeof f=="string"?"container-".concat(f):"container"},a):I.createElement(I.Fragment,null,a))});Ze.propTypes={as:m.elementType,children:m.node,className:m.string,color:Pn,colorScheme:m.oneOf(["dark","light"]),container:m.oneOfType([m.bool,m.oneOf(["sm","md","lg","xl","xxl","fluid"])]),expand:m.oneOfType([m.bool,m.oneOf(["sm","md","lg","xl","xxl"])]),placement:m.oneOf(["fixed-top","fixed-bottom","sticky-top"])};Ze.displayName="CNavbar";var et=q.forwardRef(function(e,t){var n=e.children,a=e.as,r=e.className,s=me(e,["children","as","className"]),i=a??(s.href?"a":"span");return I.createElement(i,de({className:pe("navbar-brand",r)},s,{ref:t}),n)});et.propTypes={as:m.elementType,children:m.node,className:m.string};et.displayName="CNavbarBrand";var tt=q.forwardRef(function(e,t){var n=e.children,a=e.as,r=a===void 0?"ul":a,s=e.className,i=me(e,["children","as","className"]);return I.createElement(r,de({className:pe("navbar-nav",s),role:"navigation",ref:t},i),n)});tt.propTypes={as:m.elementType,children:m.node,className:m.string};tt.displayName="CNavbarNav";var nt=q.forwardRef(function(e,t){var n=e.children,a=e.className,r=me(e,["children","className"]);return I.createElement("button",de({type:"button",className:pe("navbar-toggler",a)},r,{ref:t}),n??I.createElement("span",{className:"navbar-toggler-icon"}))});nt.propTypes={children:m.node,className:m.string};nt.displayName="CNavbarToggler";const gt=()=>{};let at={},Bt={},Vt=null,$t={mark:gt,measure:gt};try{typeof window<"u"&&(at=window),typeof document<"u"&&(Bt=document),typeof MutationObserver<"u"&&(Vt=MutationObserver),typeof performance<"u"&&($t=performance)}catch{}const{userAgent:bt=""}=at.navigator||{},W=at,g=Bt,yt=Vt,be=$t;W.document;const D=!!g.documentElement&&!!g.head&&typeof g.addEventListener=="function"&&typeof g.createElement=="function",Kt=~bt.indexOf("MSIE")||~bt.indexOf("Trident/");var b="classic",qt="duotone",C="sharp",O="sharp-duotone",Dn=[b,qt,C,O],Un={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},vt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Yn=["kit"],Wn=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,Gn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Hn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},Xn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Bn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},Vn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},$n={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},Kn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Jt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},qn=["solid","regular","light","thin","duotone","brands"],Qt=[1,2,3,4,5,6,7,8,9,10],Jn=Qt.concat([11,12,13,14,15,16,17,18,19,20]),se={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Qn=[...Object.keys(Vn),...qn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",se.GROUP,se.SWAP_OPACITY,se.PRIMARY,se.SECONDARY].concat(Qt.map(e=>"".concat(e,"x"))).concat(Jn.map(e=>"w-".concat(e))),Zn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},ea={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},ta={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},xt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const _="___FONT_AWESOME___",Fe=16,Zt="fa",en="svg-inline--fa",$="data-fa-i2svg",_e="data-fa-pseudo-element",na="data-fa-pseudo-element-pending",rt="data-prefix",st="data-icon",Nt="fontawesome-i2svg",aa="async",ra=["HTML","HEAD","STYLE","SCRIPT"],tn=(()=>{try{return!0}catch{return!1}})(),nn=[b,C,O];function he(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[b]}})}const an={...Jt};an[b]={...Jt[b],...vt.kit,...vt["kit-duotone"]};const B=he(an),Re={...Kn};Re[b]={...Re[b],...xt.kit,...xt["kit-duotone"]};const fe=he(Re),De={...$n};De[b]={...De[b],...ta.kit};const V=he(De),Ue={...Bn};Ue[b]={...Ue[b],...ea.kit};const sa=he(Ue),ia=Wn,rn="fa-layers-text",oa=Gn,la={...Un};he(la);const ca=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],je=se,ee=new Set;Object.keys(fe[b]).map(ee.add.bind(ee));Object.keys(fe[C]).map(ee.add.bind(ee));Object.keys(fe[O]).map(ee.add.bind(ee));const fa=[...Yn,...Qn],oe=W.FontAwesomeConfig||{};function ua(e){var t=g.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function ma(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}g&&typeof g.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const r=ma(ua(n));r!=null&&(oe[a]=r)});const sn={styleDefault:"solid",familyDefault:"classic",cssPrefix:Zt,replacementClass:en,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};oe.familyPrefix&&(oe.cssPrefix=oe.familyPrefix);const te={...sn,...oe};te.autoReplaceSvg||(te.observeMutations=!1);const u={};Object.keys(sn).forEach(e=>{Object.defineProperty(u,e,{enumerable:!0,set:function(t){te[e]=t,le.forEach(n=>n(u))},get:function(){return te[e]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(e){te.cssPrefix=e,le.forEach(t=>t(u))},get:function(){return te.cssPrefix}});W.FontAwesomeConfig=u;const le=[];function da(e){return le.push(e),()=>{le.splice(le.indexOf(e),1)}}const U=Fe,M={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function pa(e){if(!e||!D)return;const t=g.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=g.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const s=n[r],i=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=s)}return g.head.insertBefore(t,a),e}const ha="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ue(){let e=12,t="";for(;e-- >0;)t+=ha[Math.random()*62|0];return t}function re(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function it(e){return e.classList?re(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function on(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ga(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(on(e[n]),'" '),"").trim()}function we(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function ot(e){return e.size!==M.size||e.x!==M.x||e.y!==M.y||e.rotate!==M.rotate||e.flipX||e.flipY}function ba(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const r={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(t.x*32,", ").concat(t.y*32,") "),i="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(s," ").concat(i," ").concat(o)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:c,path:f}}function ya(e){let{transform:t,width:n=Fe,height:a=Fe,startCentered:r=!1}=e,s="";return r&&Kt?s+="translate(".concat(t.x/U-n/2,"em, ").concat(t.y/U-a/2,"em) "):r?s+="translate(calc(-50% + ".concat(t.x/U,"em), calc(-50% + ").concat(t.y/U,"em)) "):s+="translate(".concat(t.x/U,"em, ").concat(t.y/U,"em) "),s+="scale(".concat(t.size/U*(t.flipX?-1:1),", ").concat(t.size/U*(t.flipY?-1:1),") "),s+="rotate(".concat(t.rotate,"deg) "),s}var va=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function ln(){const e=Zt,t=en,n=u.cssPrefix,a=u.replacementClass;let r=va;if(n!==e||a!==t){const s=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");r=r.replace(s,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(o,".".concat(a))}return r}let At=!1;function Ie(){u.autoAddCss&&!At&&(pa(ln()),At=!0)}var xa={mixout(){return{dom:{css:ln,insertCss:Ie}}},hooks(){return{beforeDOMElementCreation(){Ie()},beforeI2svg(){Ie()}}}};const R=W||{};R[_]||(R[_]={});R[_].styles||(R[_].styles={});R[_].hooks||(R[_].hooks={});R[_].shims||(R[_].shims=[]);var L=R[_];const cn=[],fn=function(){g.removeEventListener("DOMContentLoaded",fn),xe=1,cn.map(e=>e())};let xe=!1;D&&(xe=(g.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(g.readyState),xe||g.addEventListener("DOMContentLoaded",fn));function Na(e){D&&(xe?setTimeout(e,0):cn.push(e))}function ge(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?on(e):"<".concat(t," ").concat(ga(n),">").concat(a.map(ge).join(""),"</").concat(t,">")}function wt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var Te=function(t,n,a,r){var s=Object.keys(t),i=s.length,o=n,c,f,d;for(a===void 0?(c=1,d=t[s[0]]):(c=0,d=a);c<i;c++)f=s[c],d=o(d,t[f],f,t);return d};function Aa(e){const t=[];let n=0;const a=e.length;for(;n<a;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const s=e.charCodeAt(n++);(s&64512)==56320?t.push(((r&1023)<<10)+(s&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function Ye(e){const t=Aa(e);return t.length===1?t[0].toString(16):null}function wa(e,t){const n=e.length;let a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function kt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function We(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=kt(t);typeof L.hooks.addPack=="function"&&!a?L.hooks.addPack(e,kt(t)):L.styles[e]={...L.styles[e]||{},...r},e==="fas"&&We("fa",t)}const{styles:X,shims:ka}=L,Ca={[b]:Object.values(V[b]),[C]:Object.values(V[C]),[O]:Object.values(V[O])};let lt=null,un={},mn={},dn={},pn={},hn={};const Oa={[b]:Object.keys(B[b]),[C]:Object.keys(B[C]),[O]:Object.keys(B[O])};function Ea(e){return~fa.indexOf(e)}function Sa(e,t){const n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!Ea(r)?r:null}const gn=()=>{const e=a=>Te(X,(r,s,i)=>(r[i]=Te(s,a,{}),r),{});un=e((a,r,s)=>(r[3]&&(a[r[3]]=s),r[2]&&r[2].filter(o=>typeof o=="number").forEach(o=>{a[o.toString(16)]=s}),a)),mn=e((a,r,s)=>(a[s]=s,r[2]&&r[2].filter(o=>typeof o=="string").forEach(o=>{a[o]=s}),a)),hn=e((a,r,s)=>{const i=r[2];return a[s]=s,i.forEach(o=>{a[o]=s}),a});const t="far"in X||u.autoFetchSvg,n=Te(ka,(a,r)=>{const s=r[0];let i=r[1];const o=r[2];return i==="far"&&!t&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:o}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:o}),a},{names:{},unicodes:{}});dn=n.names,pn=n.unicodes,lt=ke(u.styleDefault,{family:u.familyDefault})};da(e=>{lt=ke(e.styleDefault,{family:u.familyDefault})});gn();function ct(e,t){return(un[e]||{})[t]}function Pa(e,t){return(mn[e]||{})[t]}function Y(e,t){return(hn[e]||{})[t]}function bn(e){return dn[e]||{prefix:null,iconName:null}}function ja(e){const t=pn[e],n=ct("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function G(){return lt}const ft=()=>({prefix:null,iconName:null,rest:[]});function ke(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=b}=t,a=B[n][e],r=fe[n][e]||fe[n][a],s=e in L.styles?e:null;return r||s||null}const Ia={[b]:Object.keys(V[b]),[C]:Object.keys(V[C]),[O]:Object.keys(V[O])};function Ce(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t,a={[b]:"".concat(u.cssPrefix,"-").concat(b),[C]:"".concat(u.cssPrefix,"-").concat(C),[O]:"".concat(u.cssPrefix,"-").concat(O)};let r=null,s=b;const i=Dn.filter(c=>c!==qt);i.forEach(c=>{(e.includes(a[c])||e.some(f=>Ia[c].includes(f)))&&(s=c)});const o=e.reduce((c,f)=>{const d=Sa(u.cssPrefix,f);if(X[f]?(f=Ca[s].includes(f)?sa[s][f]:f,r=f,c.prefix=f):Oa[s].indexOf(f)>-1?(r=f,c.prefix=ke(f,{family:s})):d?c.iconName=d:f!==u.replacementClass&&!i.some(h=>f===a[h])&&c.rest.push(f),!n&&c.prefix&&c.iconName){const h=r==="fa"?bn(c.iconName):{},p=Y(c.prefix,c.iconName);h.prefix&&(r=null),c.iconName=h.iconName||p||c.iconName,c.prefix=h.prefix||c.prefix,c.prefix==="far"&&!X.far&&X.fas&&!u.autoFetchSvg&&(c.prefix="fas")}return c},ft());return(e.includes("fa-brands")||e.includes("fab"))&&(o.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(o.prefix="fad"),!o.prefix&&s===C&&(X.fass||u.autoFetchSvg)&&(o.prefix="fass",o.iconName=Y(o.prefix,o.iconName)||o.iconName),!o.prefix&&s===O&&(X.fasds||u.autoFetchSvg)&&(o.prefix="fasds",o.iconName=Y(o.prefix,o.iconName)||o.iconName),(o.prefix==="fa"||r==="fa")&&(o.prefix=G()||"fas"),o}class Ta{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(s=>{this.definitions[s]={...this.definitions[s]||{},...r[s]},We(s,r[s]);const i=V[b][s];i&&We(i,r[s]),gn()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:s,iconName:i,icon:o}=a[r],c=o[2];t[s]||(t[s]={}),c.length>0&&c.forEach(f=>{typeof f=="string"&&(t[s][f]=o)}),t[s][i]=o}),t}}let Ct=[],J={};const Z={},Ma=Object.keys(Z);function La(e,t){let{mixoutsTo:n}=t;return Ct=e,J={},Object.keys(Z).forEach(a=>{Ma.indexOf(a)===-1&&delete Z[a]}),Ct.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(s=>{typeof r[s]=="function"&&(n[s]=r[s]),typeof r[s]=="object"&&Object.keys(r[s]).forEach(i=>{n[s]||(n[s]={}),n[s][i]=r[s][i]})}),a.hooks){const s=a.hooks();Object.keys(s).forEach(i=>{J[i]||(J[i]=[]),J[i].push(s[i])})}a.provides&&a.provides(Z)}),n}function Ge(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(J[e]||[]).forEach(i=>{t=i.apply(null,[t,...a])}),t}function K(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(J[e]||[]).forEach(s=>{s.apply(null,n)})}function H(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Z[e]?Z[e].apply(null,t):void 0}function He(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||G();if(t)return t=Y(n,t)||t,wt(yn.definitions,n,t)||wt(L.styles,n,t)}const yn=new Ta,za=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,K("noAuto")},Fa={i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return D?(K("beforeI2svg",e),H("pseudoElements2svg",e),H("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,Na(()=>{Ra({autoReplaceSvgRoot:t}),K("watch",e)})}},_a={icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:Y(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=ke(e[0]);return{prefix:n,iconName:Y(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(u.cssPrefix,"-"))>-1||e.match(ia))){const t=Ce(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||G(),iconName:Y(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=G();return{prefix:t,iconName:Y(t,e)||e}}}},E={noAuto:za,config:u,dom:Fa,parse:_a,library:yn,findIconDefinition:He,toHtml:ge},Ra=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=g}=e;(Object.keys(L.styles).length>0||u.autoFetchSvg)&&D&&u.autoReplaceSvg&&E.dom.i2svg({node:t})};function Oe(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>ge(n))}}),Object.defineProperty(e,"node",{get:function(){if(!D)return;const n=g.createElement("div");return n.innerHTML=e.html,n.children}}),e}function Da(e){let{children:t,main:n,mask:a,attributes:r,styles:s,transform:i}=e;if(ot(i)&&n.found&&!a.found){const{width:o,height:c}=n,f={x:o/c/2,y:.5};r.style=we({...s,"transform-origin":"".concat(f.x+i.x/16,"em ").concat(f.y+i.y/16,"em")})}return[{tag:"svg",attributes:r,children:t}]}function Ua(e){let{prefix:t,iconName:n,children:a,attributes:r,symbol:s}=e;const i=s===!0?"".concat(t,"-").concat(u.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:i},children:a}]}]}function ut(e){const{icons:{main:t,mask:n},prefix:a,iconName:r,transform:s,symbol:i,title:o,maskId:c,titleId:f,extra:d,watchable:h=!1}=e,{width:p,height:v}=n.found?n:t,k=a==="fak",S=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(P=>d.classes.indexOf(P)===-1).filter(P=>P!==""||!!P).concat(d.classes).join(" ");let y={children:[],attributes:{...d.attributes,"data-prefix":a,"data-icon":r,class:S,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(p," ").concat(v)}};const N=k&&!~d.classes.indexOf("fa-fw")?{width:"".concat(p/v*16*.0625,"em")}:{};h&&(y.attributes[$]=""),o&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(f||ue())},children:[o]}),delete y.attributes.title);const x={...y,prefix:a,iconName:r,main:t,mask:n,maskId:c,transform:s,symbol:i,styles:{...N,...d.styles}},{children:A,attributes:F}=n.found&&t.found?H("generateAbstractMask",x)||{children:[],attributes:{}}:H("generateAbstractIcon",x)||{children:[],attributes:{}};return x.children=A,x.attributes=F,i?Ua(x):Da(x)}function Ot(e){const{content:t,width:n,height:a,transform:r,title:s,extra:i,watchable:o=!1}=e,c={...i.attributes,...s?{title:s}:{},class:i.classes.join(" ")};o&&(c[$]="");const f={...i.styles};ot(r)&&(f.transform=ya({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const d=we(f);d.length>0&&(c.style=d);const h=[];return h.push({tag:"span",attributes:c,children:[t]}),s&&h.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),h}function Ya(e){const{content:t,title:n,extra:a}=e,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},s=we(a.styles);s.length>0&&(r.style=s);const i=[];return i.push({tag:"span",attributes:r,children:[t]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:Me}=L;function Xe(e){const t=e[0],n=e[1],[a]=e.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(je.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(je.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(je.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:r}}const Wa={found:!1,width:512,height:512};function Ga(e,t){!tn&&!u.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Be(e,t){let n=t;return t==="fa"&&u.styleDefault!==null&&(t=G()),new Promise((a,r)=>{if(n==="fa"){const s=bn(e)||{};e=s.iconName||e,t=s.prefix||t}if(e&&t&&Me[t]&&Me[t][e]){const s=Me[t][e];return a(Xe(s))}Ga(e,t),a({...Wa,icon:u.showMissingIcons&&e?H("missingIconAbstract")||{}:{}})})}const Et=()=>{},Ve=u.measurePerformance&&be&&be.mark&&be.measure?be:{mark:Et,measure:Et},ie='FA "6.6.0"',Ha=e=>(Ve.mark("".concat(ie," ").concat(e," begins")),()=>vn(e)),vn=e=>{Ve.mark("".concat(ie," ").concat(e," ends")),Ve.measure("".concat(ie," ").concat(e),"".concat(ie," ").concat(e," begins"),"".concat(ie," ").concat(e," ends"))};var mt={begin:Ha,end:vn};const ye=()=>{};function St(e){return typeof(e.getAttribute?e.getAttribute($):null)=="string"}function Xa(e){const t=e.getAttribute?e.getAttribute(rt):null,n=e.getAttribute?e.getAttribute(st):null;return t&&n}function Ba(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(u.replacementClass)}function Va(){return u.autoReplaceSvg===!0?ve.replace:ve[u.autoReplaceSvg]||ve.replace}function $a(e){return g.createElementNS("http://www.w3.org/2000/svg",e)}function Ka(e){return g.createElement(e)}function xn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?$a:Ka}=t;if(typeof e=="string")return g.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(s){a.setAttribute(s,e.attributes[s])}),(e.children||[]).forEach(function(s){a.appendChild(xn(s,{ceFn:n}))}),a}function qa(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const ve={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(xn(n),t)}),t.getAttribute($)===null&&u.keepOriginalSource){let n=g.createComment(qa(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~it(t).indexOf(u.replacementClass))return ve.replace(e);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const s=n[0].attributes.class.split(" ").reduce((i,o)=>(o===u.replacementClass||o.match(a)?i.toSvg.push(o):i.toNode.push(o),i),{toNode:[],toSvg:[]});n[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",s.toNode.join(" "))}const r=n.map(s=>ge(s)).join(`
`);t.setAttribute($,""),t.innerHTML=r}};function Pt(e){e()}function Nn(e,t){const n=typeof t=="function"?t:ye;if(e.length===0)n();else{let a=Pt;u.mutateApproach===aa&&(a=W.requestAnimationFrame||Pt),a(()=>{const r=Va(),s=mt.begin("mutate");e.map(r),s(),n()})}}let dt=!1;function An(){dt=!0}function $e(){dt=!1}let Ne=null;function jt(e){if(!yt||!u.observeMutations)return;const{treeCallback:t=ye,nodeCallback:n=ye,pseudoElementsCallback:a=ye,observeMutationsRoot:r=g}=e;Ne=new yt(s=>{if(dt)return;const i=G();re(s).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!St(o.addedNodes[0])&&(u.searchPseudoElements&&a(o.target),t(o.target)),o.type==="attributes"&&o.target.parentNode&&u.searchPseudoElements&&a(o.target.parentNode),o.type==="attributes"&&St(o.target)&&~ca.indexOf(o.attributeName))if(o.attributeName==="class"&&Xa(o.target)){const{prefix:c,iconName:f}=Ce(it(o.target));o.target.setAttribute(rt,c||i),f&&o.target.setAttribute(st,f)}else Ba(o.target)&&n(o.target)})}),D&&Ne.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Ja(){Ne&&Ne.disconnect()}function Qa(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,r)=>{const s=r.split(":"),i=s[0],o=s.slice(1);return i&&o.length>0&&(a[i]=o.join(":").trim()),a},{})),n}function Za(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let r=Ce(it(e));return r.prefix||(r.prefix=G()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Pa(r.prefix,e.innerText)||ct(r.prefix,Ye(e.innerText))),!r.iconName&&u.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function er(e){const t=re(e.attributes).reduce((r,s)=>(r.name!=="class"&&r.name!=="style"&&(r[s.name]=s.value),r),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return u.autoA11y&&(n?t["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||ue()):(t["aria-hidden"]="true",t.focusable="false")),t}function tr(){return{iconName:null,title:null,titleId:null,prefix:null,transform:M,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function It(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Za(e),s=er(e),i=Ge("parseNodeAttributes",{},e);let o=t.styleParser?Qa(e):[];return{iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:M,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:o,attributes:s},...i}}const{styles:nr}=L;function wn(e){const t=u.autoReplaceSvg==="nest"?It(e,{styleParser:!1}):It(e);return~t.extra.classes.indexOf(rn)?H("generateLayersText",e,t):H("generateSvgReplacementMutation",e,t)}let z=new Set;nn.map(e=>{z.add("fa-".concat(e))});Object.keys(B[b]).map(z.add.bind(z));Object.keys(B[C]).map(z.add.bind(z));Object.keys(B[O]).map(z.add.bind(z));z=[...z];function Tt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!D)return Promise.resolve();const n=g.documentElement.classList,a=d=>n.add("".concat(Nt,"-").concat(d)),r=d=>n.remove("".concat(Nt,"-").concat(d)),s=u.autoFetchSvg?z:nn.map(d=>"fa-".concat(d)).concat(Object.keys(nr));s.includes("fa")||s.push("fa");const i=[".".concat(rn,":not([").concat($,"])")].concat(s.map(d=>".".concat(d,":not([").concat($,"])"))).join(", ");if(i.length===0)return Promise.resolve();let o=[];try{o=re(e.querySelectorAll(i))}catch{}if(o.length>0)a("pending"),r("complete");else return Promise.resolve();const c=mt.begin("onTree"),f=o.reduce((d,h)=>{try{const p=wn(h);p&&d.push(p)}catch(p){tn||p.name==="MissingIcon"&&console.error(p)}return d},[]);return new Promise((d,h)=>{Promise.all(f).then(p=>{Nn(p,()=>{a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),c(),d()})}).catch(p=>{c(),h(p)})})}function ar(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;wn(e).then(n=>{n&&Nn([n],t)})}function rr(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:He(t||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:He(r||{})),e(a,{...n,mask:r})}}const sr=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=M,symbol:a=!1,mask:r=null,maskId:s=null,title:i=null,titleId:o=null,classes:c=[],attributes:f={},styles:d={}}=t;if(!e)return;const{prefix:h,iconName:p,icon:v}=e;return Oe({type:"icon",...e},()=>(K("beforeDOMElementCreation",{iconDefinition:e,params:t}),u.autoA11y&&(i?f["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(o||ue()):(f["aria-hidden"]="true",f.focusable="false")),ut({icons:{main:Xe(v),mask:r?Xe(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:h,iconName:p,transform:{...M,...n},symbol:a,title:i,maskId:s,titleId:o,extra:{attributes:f,styles:d,classes:c}})))};var ir={mixout(){return{icon:rr(sr)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=Tt,e.nodeCallback=ar,e}}},provides(e){e.i2svg=function(t){const{node:n=g,callback:a=()=>{}}=t;return Tt(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:r,titleId:s,prefix:i,transform:o,symbol:c,mask:f,maskId:d,extra:h}=n;return new Promise((p,v)=>{Promise.all([Be(a,i),f.iconName?Be(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(k=>{let[S,y]=k;p([t,ut({icons:{main:S,mask:y},prefix:i,iconName:a,transform:o,symbol:c,maskId:d,title:r,titleId:s,extra:h,watchable:!0})])}).catch(v)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:r,transform:s,styles:i}=t;const o=we(i);o.length>0&&(a.style=o);let c;return ot(s)&&(c=H("generateAbstractTransformGrouping",{main:r,transform:s,containerWidth:r.width,iconWidth:r.width})),n.push(c||r.icon),{children:n,attributes:a}}}},or={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return Oe({type:"layer"},()=>{K("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(r=>{Array.isArray(r)?r.map(s=>{a=a.concat(s.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},lr={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:s={}}=t;return Oe({type:"counter",content:e},()=>(K("beforeDOMElementCreation",{content:e,params:t}),Ya({content:e.toString(),title:n,extra:{attributes:r,styles:s,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},cr={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=M,title:a=null,classes:r=[],attributes:s={},styles:i={}}=t;return Oe({type:"text",content:e},()=>(K("beforeDOMElementCreation",{content:e,params:t}),Ot({content:e,transform:{...M,...n},title:a,extra:{attributes:s,styles:i,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:r,extra:s}=n;let i=null,o=null;if(Kt){const c=parseInt(getComputedStyle(t).fontSize,10),f=t.getBoundingClientRect();i=f.width/c,o=f.height/c}return u.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([t,Ot({content:t.innerHTML,width:i,height:o,transform:r,title:a,extra:s,watchable:!0})])}}};const fr=new RegExp('"',"ug"),Mt=[1105920,1112319],Lt={FontAwesome:{normal:"fas",400:"fas"},...Xn,...Hn,...Zn},Ke=Object.keys(Lt).reduce((e,t)=>(e[t.toLowerCase()]=Lt[t],e),{}),ur=Object.keys(Ke).reduce((e,t)=>{const n=Ke[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function mr(e){const t=e.replace(fr,""),n=wa(t,0),a=n>=Mt[0]&&n<=Mt[1],r=t.length===2?t[0]===t[1]:!1;return{value:Ye(r?t[0]:t),isSecondary:a||r}}function dr(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),r=isNaN(a)?"normal":a;return(Ke[n]||{})[r]||ur[n]}function zt(e,t){const n="".concat(na).concat(t.replace(":","-"));return new Promise((a,r)=>{if(e.getAttribute(n)!==null)return a();const i=re(e.children).filter(p=>p.getAttribute(_e)===t)[0],o=W.getComputedStyle(e,t),c=o.getPropertyValue("font-family"),f=c.match(oa),d=o.getPropertyValue("font-weight"),h=o.getPropertyValue("content");if(i&&!f)return e.removeChild(i),a();if(f&&h!=="none"&&h!==""){const p=o.getPropertyValue("content");let v=dr(c,d);const{value:k,isSecondary:S}=mr(p),y=f[0].startsWith("FontAwesome");let N=ct(v,k),x=N;if(y){const A=ja(k);A.iconName&&A.prefix&&(N=A.iconName,v=A.prefix)}if(N&&!S&&(!i||i.getAttribute(rt)!==v||i.getAttribute(st)!==x)){e.setAttribute(n,x),i&&e.removeChild(i);const A=tr(),{extra:F}=A;F.attributes[_e]=t,Be(N,v).then(P=>{const En=ut({...A,icons:{main:P,mask:ft()},prefix:v,iconName:x,extra:F,watchable:!0}),Ee=g.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(Ee,e.firstChild):e.appendChild(Ee),Ee.outerHTML=En.map(Sn=>ge(Sn)).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function pr(e){return Promise.all([zt(e,"::before"),zt(e,"::after")])}function hr(e){return e.parentNode!==document.head&&!~ra.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(_e)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function Ft(e){if(D)return new Promise((t,n)=>{const a=re(e.querySelectorAll("*")).filter(hr).map(pr),r=mt.begin("searchPseudoElements");An(),Promise.all(a).then(()=>{r(),$e(),t()}).catch(()=>{r(),$e(),n()})})}var gr={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=Ft,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=g}=t;u.searchPseudoElements&&Ft(n)}}};let _t=!1;var br={mixout(){return{dom:{unwatch(){An(),_t=!0}}}},hooks(){return{bootstrap(){jt(Ge("mutationObserverCallbacks",{}))},noAuto(){Ja()},watch(e){const{observeMutationsRoot:t}=e;_t?$e():jt(Ge("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const Rt=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),s=r[0];let i=r.slice(1).join("-");if(s&&i==="h")return n.flipX=!0,n;if(s&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(s){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},t)};var yr={mixout(){return{parse:{transform:e=>Rt(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=Rt(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:r,iconWidth:s}=t;const i={transform:"translate(".concat(r/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),d={transform:"".concat(o," ").concat(c," ").concat(f)},h={transform:"translate(".concat(s/2*-1," -256)")},p={outer:i,inner:d,path:h};return{tag:"g",attributes:{...p.outer},children:[{tag:"g",attributes:{...p.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...p.path}}]}]}}}};const Le={x:0,y:0,width:"100%",height:"100%"};function Dt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function vr(e){return e.tag==="g"?e.children:[e]}var xr={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?Ce(n.split(" ").map(r=>r.trim())):ft();return a.prefix||(a.prefix=G()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:r,mask:s,maskId:i,transform:o}=t;const{width:c,icon:f}=r,{width:d,icon:h}=s,p=ba({transform:o,containerWidth:d,iconWidth:c}),v={tag:"rect",attributes:{...Le,fill:"white"}},k=f.children?{children:f.children.map(Dt)}:{},S={tag:"g",attributes:{...p.inner},children:[Dt({tag:f.tag,attributes:{...f.attributes,...p.path},...k})]},y={tag:"g",attributes:{...p.outer},children:[S]},N="mask-".concat(i||ue()),x="clip-".concat(i||ue()),A={tag:"mask",attributes:{...Le,id:N,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[v,y]},F={tag:"defs",children:[{tag:"clipPath",attributes:{id:x},children:vr(h)},A]};return n.push(F,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(x,")"),mask:"url(#".concat(N,")"),...Le}}),{children:n,attributes:a}}}},Nr={provides(e){let t=!1;W.matchMedia&&(t=W.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const s={...r,attributeName:"opacity"},i={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return t||i.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...s,values:"1;0;1;1;0;1;"}}),n.push(i),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:t?[]:[{tag:"animate",attributes:{...s,values:"1;0;0;0;0;1;"}}]}),t||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...s,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Ar={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},wr=[xa,ir,or,lr,cr,gr,br,yr,xr,Nr,Ar];La(wr,{mixoutsTo:E});E.noAuto;E.config;E.library;E.dom;const qe=E.parse;E.findIconDefinition;E.toHtml;const kr=E.icon;E.layer;E.text;E.counter;function Ut(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ut(Object(n),!0).forEach(function(a){Q(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ut(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Ae(e){"@babel/helpers - typeof";return Ae=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ae(e)}function Q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Cr(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,s;for(s=0;s<a.length;s++)r=a[s],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}function Or(e,t){if(e==null)return{};var n=Cr(e,t),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)a=s[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function Je(e){return Er(e)||Sr(e)||Pr(e)||jr()}function Er(e){if(Array.isArray(e))return Qe(e)}function Sr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Pr(e,t){if(e){if(typeof e=="string")return Qe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Qe(e,t)}}function Qe(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function jr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ir(e){var t,n=e.beat,a=e.fade,r=e.beatFade,s=e.bounce,i=e.shake,o=e.flash,c=e.spin,f=e.spinPulse,d=e.spinReverse,h=e.pulse,p=e.fixedWidth,v=e.inverse,k=e.border,S=e.listItem,y=e.flip,N=e.size,x=e.rotation,A=e.pull,F=(t={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":s,"fa-shake":i,"fa-flash":o,"fa-spin":c,"fa-spin-reverse":d,"fa-spin-pulse":f,"fa-pulse":h,"fa-fw":p,"fa-inverse":v,"fa-border":k,"fa-li":S,"fa-flip":y===!0,"fa-flip-horizontal":y==="horizontal"||y==="both","fa-flip-vertical":y==="vertical"||y==="both"},Q(t,"fa-".concat(N),typeof N<"u"&&N!==null),Q(t,"fa-rotate-".concat(x),typeof x<"u"&&x!==null&&x!==0),Q(t,"fa-pull-".concat(A),typeof A<"u"&&A!==null),Q(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(F).map(function(P){return F[P]?P:null}).filter(function(P){return P})}function Tr(e){return e=e-0,e===e}function kn(e){return Tr(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Mr=["style"];function Lr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function zr(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=kn(n.slice(0,a)),s=n.slice(a+1).trim();return r.startsWith("webkit")?t[Lr(r)]=s:t[r]=s,t},{})}function Cn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(c){return Cn(e,c)}),r=Object.keys(t.attributes||{}).reduce(function(c,f){var d=t.attributes[f];switch(f){case"class":c.attrs.className=d,delete t.attributes.class;break;case"style":c.attrs.style=zr(d);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?c.attrs[f.toLowerCase()]=d:c.attrs[kn(f)]=d}return c},{attrs:{}}),s=n.style,i=s===void 0?{}:s,o=Or(n,Mr);return r.attrs.style=T(T({},r.attrs.style),i),e.apply(void 0,[t.tag,T(T({},r.attrs),o)].concat(Je(a)))}var On=!1;try{On=!0}catch{}function Fr(){if(!On&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Yt(e){if(e&&Ae(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(qe.icon)return qe.icon(e);if(e===null)return null;if(e&&Ae(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function ze(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?Q({},e,t):{}}var Wt={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},w=I.forwardRef(function(e,t){var n=T(T({},Wt),e),a=n.icon,r=n.mask,s=n.symbol,i=n.className,o=n.title,c=n.titleId,f=n.maskId,d=Yt(a),h=ze("classes",[].concat(Je(Ir(n)),Je((i||"").split(" ")))),p=ze("transform",typeof n.transform=="string"?qe.transform(n.transform):n.transform),v=ze("mask",Yt(r)),k=kr(d,T(T(T(T({},h),p),v),{},{symbol:s,title:o,titleId:c,maskId:f}));if(!k)return Fr("Could not find icon",d),null;var S=k.abstract,y={ref:t};return Object.keys(n).forEach(function(N){Wt.hasOwnProperty(N)||(y[N]=n[N])}),_r(S[0],y)});w.displayName="FontAwesomeIcon";w.propTypes={beat:m.bool,border:m.bool,beatFade:m.bool,bounce:m.bool,className:m.string,fade:m.bool,flash:m.bool,mask:m.oneOfType([m.object,m.array,m.string]),maskId:m.string,fixedWidth:m.bool,inverse:m.bool,flip:m.oneOf([!0,!1,"horizontal","vertical","both"]),icon:m.oneOfType([m.object,m.array,m.string]),listItem:m.bool,pull:m.oneOf(["right","left"]),pulse:m.bool,rotation:m.oneOf([0,90,180,270]),shake:m.bool,size:m.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:m.bool,spinPulse:m.bool,spinReverse:m.bool,symbol:m.oneOfType([m.bool,m.string]),title:m.string,titleId:m.string,transform:m.oneOfType([m.string,m.object]),swapOpacity:m.bool};var _r=Cn.bind(null,I.createElement);const Rr={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144],"f007","M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"]},Dr={prefix:"fas",iconName:"route",icon:[512,512,[],"f4d7","M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5L320 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96 43 96 96s-43 96-96 96l-276.4 0c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2L416 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0c-53 0-96-43-96-96s43-96 96-96l39.8 0c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},Ur={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"]},Yr={prefix:"fas",iconName:"ship",icon:[576,512,[128674],"f21a","M192 32c0-17.7 14.3-32 32-32L352 0c17.7 0 32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 128 44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240l0-128c0-26.5 21.5-48 48-48l48 0 0-32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7l0-90.7-256 0 0 90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1c0 0 0 0 0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7c0 0 0 0 0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"]},Gt={prefix:"fas",iconName:"sun",icon:[512,512,[9728],"f185","M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]},Wr={prefix:"fas",iconName:"user-shield",icon:[640,512,[],"f505","M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c1.8 0 3.5-.2 5.3-.5c-76.3-55.1-99.8-141-103.1-200.2c-16.1-4.8-33.1-7.3-50.7-7.3l-91.4 0zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2c5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7l0-187.8L591.4 312z"]},Ht={prefix:"fas",iconName:"circle-half-stroke",icon:[512,512,[9680,"adjust"],"f042","M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"]},Xt={prefix:"fas",iconName:"moon",icon:[384,512,[127769,9214],"f186","M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]},Gr={prefix:"fas",iconName:"paper-plane",icon:[512,512,[61913],"f1d8","M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"]},ts=()=>{const[e,t]=q.useState(!1),{colorMode:n,setColorMode:a}=jn("coreui-free-react-admin-template-theme");return l.jsx(Ze,{expand:"sm",colorScheme:n,children:l.jsxs(ne,{fluid:!0,children:[l.jsx(et,{to:"/",as:Se,"data-aos":"fade-down","data-aos-duration":"1000",children:l.jsx(ae,{src:"/images/logo.png",width:"150px"})}),l.jsx(nt,{"aria-label":"Toggle navigation","aria-expanded":e,onClick:()=>t(!e)}),l.jsx(In,{className:"navbar-collapse",visible:e,children:l.jsxs(tt,{className:"ms-auto",children:[l.jsxs(Tn,{variant:"nav-item",placement:"bottom-end","data-aos":"fade-down","data-aos-duration":"1000",children:[l.jsx(Mn,{caret:!1,children:n==="dark"?l.jsx(w,{icon:Xt}):n==="auto"?l.jsx(w,{icon:Ht}):l.jsx(w,{icon:Gt})}),l.jsxs(Ln,{children:[l.jsxs(Pe,{active:n==="light",className:"d-flex align-items-center",as:"button",type:"button",onClick:()=>a("light"),children:[l.jsx(w,{className:"me-2",icon:Gt})," Light"]}),l.jsxs(Pe,{active:n==="dark",className:"d-flex align-items-center",as:"button",type:"button",onClick:()=>a("dark"),children:[l.jsx(w,{className:"me-2",icon:Xt,size:"lg"})," ","Dark"]}),l.jsxs(Pe,{active:n==="auto",className:"d-flex align-items-center",as:"button",type:"button",onClick:()=>a("auto"),children:[l.jsx(w,{className:"me-2",icon:Ht})," ","Auto"]})]})]}),l.jsx(pt,{children:l.jsx(ht,{to:"/login",as:Se,"data-aos":"fade-down","data-aos-duration":"1000",children:"Login"})}),l.jsx(pt,{children:l.jsx(ht,{to:"/register",as:Se,"data-aos":"fade-down","data-aos-duration":"1000",children:"Register"})})]})})]})})},ns=()=>l.jsx(ne,{fluid:!0,className:"h-100",children:l.jsxs(ce,{className:"h-100 justify-content-center align-items-center p-5",children:[l.jsxs(j,{xs:12,lg:5,className:"order-md-1 mb-4",children:[l.jsx("span",{"data-aos":"fade-up",children:"OUR SERVICES"}),l.jsx("h1",{className:"text-primary","data-aos":"fade-up",children:"We Provide Businesses with cutting-edge platform"}),l.jsx("p",{className:"lead","data-aos":"fade-up",children:"With advanced cybersecurity measures in place, businesses can trust that their data is protected while simplifying the complexities of management. Experience seamless logistics and improved operational performance with our state-of-the-art platform."})]}),l.jsx(j,{xs:12,lg:7,className:"order-md-2 mb-4",children:l.jsxs(ce,{xs:{cols:1,gutter:4},md:{cols:2},children:[l.jsxs(j,{xs:!0,"data-aos":"zoom-out-up",children:[l.jsx("div",{className:"mb-2 d-inline-block rounded-pill bg-primary bg-opacity-25 p-3",children:l.jsx(w,{style:{width:"40px",height:"40px"},icon:Yr,className:"fa-2x text-primary"})}),l.jsx("h3",{children:"Freight Management"}),l.jsx("p",{children:"Optimize your logistics with our comprehensive freight management solutions, ensuring timely and cost-effective deliveries. Monitor shipments in real-time to enhance visibility and efficiency."})]}),l.jsxs(j,{xs:!0,"data-aos":"zoom-out-up",children:[l.jsx("div",{className:"mb-2 d-inline-block rounded-pill bg-primary bg-opacity-25 p-3",children:l.jsx(w,{style:{width:"40px",height:"40px"},icon:Dr,className:"fa-2x text-primary"})}),l.jsx("h3",{children:"AI Powered Route"}),l.jsx("p",{children:"Leverage AI algorithms to determine the most efficient routes, reducing travel time and fuel costs. Our system continuously adapts to real-time conditions for optimal performance."})]}),l.jsxs(j,{xs:!0,"data-aos":"zoom-out-up",children:[l.jsx("div",{className:"mb-2 d-inline-block rounded-pill bg-primary bg-opacity-25 p-3",children:l.jsx(w,{style:{width:"40px",height:"40px"},icon:Rr,className:"fa-2x text-primary"})}),l.jsx("h3",{children:"Real Time Customer Service"}),l.jsx("p",{children:"Experience unparalleled support with our real-time customer service, available 24/7 to address inquiries and resolve issues. Enhance customer satisfaction through prompt and efficient communication."})]}),l.jsxs(j,{xs:!0,"data-aos":"zoom-out-up",children:[l.jsx("div",{className:"mb-2 d-inline-block rounded-pill bg-primary bg-opacity-25 p-3",children:l.jsx(w,{style:{width:"40px",height:"40px"},icon:Wr,className:"fa-2x text-primary"})}),l.jsx("h3",{children:"Advanced Cybersecurity Measures"}),l.jsx("p",{children:"Protect your data with state-of-the-art cybersecurity solutions designed to safeguard your information against evolving threats. Our proactive approach ensures compliance and minimizes risks."})]})]})})]})}),as=()=>l.jsx(ne,{fluid:!0,className:"h-100 p-5 bg-primary","data-aos":"fade-up",children:l.jsxs(ce,{className:"h-100 justify-content-start align-items-center",children:[l.jsx(j,{xs:12,md:5,className:"mb-4","data-aos":"zoom-in",children:l.jsx(ae,{fluid:!0,src:"/images/about.svg"})}),l.jsxs(j,{xs:12,md:7,lg:6,xl:5,className:"mb-4 p-2",children:[l.jsx("span",{className:"text-white","data-aos":"zoom-out-up",children:"ABOUT US"}),l.jsx("h1",{className:"text-white","data-aos":"zoom-out-up",children:"Axleshift Core 1"}),l.jsx("p",{className:"lead text-white","data-aos":"zoom-out-up",children:"We focus on enhancing the safety and efficiency of freight management systems. Our innovative solutions integrate advanced cybersecurity measures to protect sensitive data while providing efficient and better freight services. By leveraging cutting-edge technology, we ensure that businesses can confidently manage their freight operations in an increasingly complex digital landscape."})]})]})}),rs=()=>{const e=[{name:"Melvin Jones Repol",major:"IM",image:"https://avatars.githubusercontent.com/u/62317165?v=4"},{name:"John Reybel Pilon",major:"IM",image:"https://avatars.githubusercontent.com/u/62317165?v=4"},{name:"Maresa Gregana",major:"NA",image:"https://avatars.githubusercontent.com/u/62317165?v=4"},{name:"Jullana Mariz Jovenal",major:"IS",image:"https://avatars.githubusercontent.com/u/62317165?v=4"},{name:"Kenneth Pameroyan",major:"IS",image:"https://avatars.githubusercontent.com/u/62317165?v=4"}];return l.jsxs(ne,{fluid:!0,className:"h-100 p-5",children:[l.jsxs("div",{className:"mt-5 text-center mb-5","data-aos":"fade-down",children:[l.jsx("span",{children:"TEAM"}),l.jsx("h2",{className:"text-primary",children:"Our Tech-savy Team"})]}),l.jsx(ce,{children:e.map((t,n)=>l.jsx(j,{xs:12,md:4,className:"mb-4","data-aos":"fade-up ",children:l.jsxs("div",{className:"text-center d-flex flex-column justify-content-center",children:[l.jsx(ae,{src:t.image,className:"rounded-pill mx-auto mb-2 border border-primary p-1",style:{width:"100px",height:"100px"}}),l.jsxs("div",{className:"d-flex flex-column align-items-center",children:[l.jsx("h4",{children:t.name}),l.jsx("span",{children:t.major})]})]})},n))})]})},ss=()=>{const[e,t]=q.useState("");return l.jsx(ne,{fluid:!0,className:"h-100","data-aos":"fade-up",children:l.jsx("div",{className:"bg-primary m-2 m-md-5",children:l.jsxs(ce,{className:"h-100 justify-content-start align-items-center p-5",children:[l.jsxs(j,{xs:12,md:7,lg:6,xl:5,className:"mb-4 p-2","data-aos":"zoom-in-down",children:[l.jsx("h1",{className:"text-white",children:"Newsletter - Stay tune"}),l.jsx("p",{className:"lead text-white",children:"We will email you about our products newest updates."}),l.jsx(zn,{children:l.jsxs(Fn,{className:"mb-3",children:[l.jsx(Rn,{"aria-describedby":"basic-addon",type:"email",placeholder:"name@example.com",value:e,onChange:n=>t(n.target.value)}),l.jsx(_n,{id:"basic-addon",type:"submit",children:l.jsx(w,{icon:Gr,className:"text-white"})})]})})]}),l.jsx(j,{xs:12,md:5,className:"mb-4 p-2 text-center","data-aos":"zoom-in-left",children:l.jsx(w,{icon:Ur,className:"fa-8x"})})]})})})},is=()=>l.jsx(ne,{fluid:!0,className:"bg-secondary",children:l.jsx("footer",{className:"d-flex flex-wrap justify-content-between align-items-center p-5 border-top",children:l.jsxs("div",{className:"col-md-4",children:[l.jsx(ae,{src:"/images/logo.png",fluid:!0,width:"300px",alt:"Axleshift Core 1"}),l.jsx("p",{className:"mb-3 me-2 mb-md-0 lh-1",children:"© 2024 core1.axleshift.com"})]})})});export{as as About,is as Footer,ts as Navbar,ss as Newsletter,ns as Services,rs as Team};
