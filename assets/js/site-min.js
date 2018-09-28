/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],t):t(e.bootstrap={},e.jQuery)}(this,function(e,t){"use strict";function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),n.forEach(function(e){o(t,e,i[e])})}return t}function i(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */function r(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}function l(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},Vt))}}
/**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
function d(e){var t;return e&&"[object Function]"==={}.toString.call(e)}
/**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */function w(e,t){if(1!==e.nodeType)return[];
// NOTE: 1 DOM access here
var i=getComputedStyle(e,null);return t?i[t]:i}
/**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */function h(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}
/**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */function g(e){
// Return body, `getScroll` will take care to get the correct `scrollTop` from it
if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}
// Firefox want us to check `-x` and `-y` variations as well
var t=w(e),i=t.overflow,n=t.overflowX,o=t.overflowY;return/(auto|scroll|overlay)/.test(i+o+n)?e:g(h(e))}
/**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
function m(e){return 11===e?Jt:10===e?ei:Jt||ei}
/**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */function _(e){if(!e)return document.documentElement;
// Skip hidden elements which don't have an offsetParent
for(var t=m(10)?document.body:null,i=e.offsetParent
// NOTE: 1 DOM access here
;i===t&&e.nextElementSibling;)i=(e=e.nextElementSibling).offsetParent;var n=i&&i.nodeName;return n&&"BODY"!==n&&"HTML"!==n?
// .offsetParent will return the closest TD or TABLE in case
// no offsetParent is present, I hate this job...
-1!==["TD","TABLE"].indexOf(i.nodeName)&&"static"===w(i,"position")?_(i):i:e?e.ownerDocument.documentElement:document.documentElement}function c(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||_(e.firstElementChild)===e)}
/**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */function u(e){return null!==e.parentNode?u(e.parentNode):e}
/**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */function f(e,t){
// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;
// Here we make sure to give as "start" the element that comes first in the DOM
var i=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=i?e:t,o=i?t:e,s=document.createRange();s.setStart(n,0),s.setEnd(o,0);var r=s.commonAncestorContainer;
// Both nodes are inside #document
if(e!==r&&t!==r||n.contains(o))return c(r)?r:_(r);
// one of the nodes is inside shadowDOM, find which one
var a=u(e);return a.host?f(a.host,t):f(e,u(t).host)}
/**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */function p(e,t
/*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */){var i,n="top"===(1<arguments.length&&void 0!==t?t:"top")?"scrollTop":"scrollLeft",o=e.nodeName;if("BODY"!==o&&"HTML"!==o)return e[n];var s=e.ownerDocument.documentElement,r;return(e.ownerDocument.scrollingElement||s)[n]}function v(e,t,i
/*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */){var n=2<arguments.length&&void 0!==i&&i,o=p(t,"top"),s=p(t,"left"),r=n?-1:1;return e.top+=o*r,e.bottom+=o*r,e.left+=s*r,e.right+=s*r,e}function y(e,t){var i="x"===t?"Left":"Top",n="Left"===i?"Right":"Bottom";return parseFloat(e["border"+i+"Width"],10)+parseFloat(e["border"+n+"Width"],10)}function b(e,t,i,n){return Math.max(t["offset"+e],t["scroll"+e],i["client"+e],i["offset"+e],i["scroll"+e],m(10)?i["offset"+e]+n["margin"+("Height"===e?"Top":"Left")]+n["margin"+("Height"===e?"Bottom":"Right")]:0)}function T(){var e=document.body,t=document.documentElement,i=m(10)&&getComputedStyle(t);return{height:b("Height",e,t,i),width:b("Width",e,t,i)}}
/**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
function k(e){return oi({},e,{right:e.left+e.width,bottom:e.top+e.height})}
/**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */function S(e){var t={};
// IE10 10 FIX: Please, don't ask, the element isn't
// considered in DOM in some circumstances...
// This isn't reproducible in IE10 compatibility mode of IE11
try{if(m(10)){t=e.getBoundingClientRect();var i=p(e,"top"),n=p(e,"left");t.top+=i,t.left+=n,t.bottom+=i,t.right+=n}else t=e.getBoundingClientRect()}catch(e){}var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},s="HTML"===e.nodeName?T():{},r=s.width||e.clientWidth||o.right-o.left,a=s.height||e.clientHeight||o.bottom-o.top,l=e.offsetWidth-r,d=e.offsetHeight-a;
// subtract scrollbar size from sizes
// if an hypothetical scrollbar is detected, we must be sure it's not a `border`
// we make this check conditional for performance reasons
if(l||d){var c=w(e);l-=y(c,"x"),d-=y(c,"y"),o.width-=l,o.height-=d}return k(o)}function C(e,t,i){var n=2<arguments.length&&void 0!==i&&i,o=m(10),s="HTML"===t.nodeName,r=S(e),a=S(t),l=g(e),d=w(t),c=parseFloat(d.borderTopWidth,10),u=parseFloat(d.borderLeftWidth,10);
// In cases where the parent is fixed, we must ignore negative scroll in offset calc
n&&"HTML"===t.nodeName&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var p=k({top:r.top-a.top-c,left:r.left-a.left-u,width:r.width,height:r.height});
// Subtract margins of documentElement in case it's being used as parent
// we do this only on HTML because it's the only element that behaves
// differently when margins are applied to it. The margins are included in
// the box of the documentElement, in the other cases not.
if(p.marginTop=0,p.marginLeft=0,!o&&s){var h=parseFloat(d.marginTop,10),f=parseFloat(d.marginLeft,10);p.top-=c-h,p.bottom-=c-h,p.left-=u-f,p.right-=u-f,
// Attach marginTop and marginLeft because in some circumstances we may need them
p.marginTop=h,p.marginLeft=f}return(o&&!n?t.contains(l):t===l&&"BODY"!==l.nodeName)&&(p=v(p,t)),p}function E(e,t
/**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */){var i=1<arguments.length&&void 0!==t&&t,n=e.ownerDocument.documentElement,o=C(e,n),s=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=i?0:p(n),l=i?0:p(n,"left"),d;return k({top:a-o.top+o.marginTop,left:l-o.left+o.marginLeft,width:s,height:r})}function A(e){var t=e.nodeName;return"BODY"!==t&&"HTML"!==t&&("fixed"===w(e,"position")||A(h(e)))}
/**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */function x(e){
// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!e||!e.parentElement||m())return document.documentElement;for(var t=e.parentElement;t&&"none"===w(t,"transform");)t=t.parentElement;return t||document.documentElement}
/**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */function D(e,t,i,n,o){var s=4<arguments.length&&void 0!==o&&o,r={top:0,left:0},a=s?x(e):f(e,t);
// NOTE: 1 DOM access here
// Handle viewport case
if("viewport"===n)r=E(a,s);else{
// Handle other cases based on DOM element used as boundaries
var l=void 0;"scrollParent"===n?"BODY"===(l=g(h(t))).nodeName&&(l=e.ownerDocument.documentElement):l="window"===n?e.ownerDocument.documentElement:n;var d=C(l,a,s);
// In case of HTML, we need a different computation
if("HTML"!==l.nodeName||A(a))
// for all the other DOM elements, this one is good
r=d;else{var c=T(),u=c.height,p=c.width;r.top+=d.top-d.marginTop,r.bottom=u+d.top,r.left+=d.left-d.marginLeft,r.right=p+d.left}}
// Add paddings
return r.left+=i,r.top+=i,r.right-=i,r.bottom-=i,r}function I(e){var t,i;return e.width*e.height}
/**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function O(e,t,n,i,o,s
/**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */){var r=5<arguments.length&&void 0!==s?s:0;if(-1===e.indexOf("auto"))return e;var a=D(n,i,r,o),l={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},d=Object.keys(l).map(function(e){return oi({key:e},l[e],{area:I(l[e])})}).sort(function(e,t){return t.area-e.area}),c=d.filter(function(e){var t=e.width,i=e.height;return t>=n.clientWidth&&i>=n.clientHeight}),u=0<c.length?c[0].key:d[0].key,p=e.split("-")[1];return u+(p?"-"+p:"")}function $(e,t,i,n
/**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */){var o=3<arguments.length&&void 0!==n?n:null,s;return C(i,o?x(t):f(t,i),o)}function N(e){var t=getComputedStyle(e),i=parseFloat(t.marginTop)+parseFloat(t.marginBottom),n=parseFloat(t.marginLeft)+parseFloat(t.marginRight),o;return{width:e.offsetWidth+n,height:e.offsetHeight+i}}
/**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */function P(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}
/**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */function j(e,t,i){i=i.split("-")[0];
// Get popper node sizes
var n=N(e),o={width:n.width,height:n.height},s=-1!==["right","left"].indexOf(i),r=s?"top":"left",a=s?"left":"top",l=s?"height":"width",d=s?"width":"height";
// Add position, width and height to our offsets object
return o[r]=t[r]+t[l]/2-n[l]/2,o[a]=i===a?t[a]-n[d]:t[P(a)],o}
/**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */function H(e,t){
// use native find if supported
return Array.prototype.find?e.find(t):e.filter(t)[0];
// use `filter` to obtain the same behavior of `find`
}
/**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */function L(e,t,i){
// use native findIndex if supported
if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===i});
// use `find` + `indexOf` if `findIndex` isn't supported
var n=H(e,function(e){return e[t]===i});return e.indexOf(n)}
/**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */function M(e,i,t){var n;return(void 0===t?e:e.slice(0,L(e,"name",t))).forEach(function(e){e.function&&
// eslint-disable-line dot-notation
console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;// eslint-disable-line dot-notation
e.enabled&&d(t)&&(
// Add properties to offsets to make them a complete clientRect object
// we do this before each modifier to make sure the previous one doesn't
// mess with these values
i.offsets.popper=k(i.offsets.popper),i.offsets.reference=k(i.offsets.reference),i=t(i,e))}),i}
/**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */function W(){
// if popper is destroyed, don't perform any further update
if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};
// compute reference element offsets
e.offsets.reference=$(this.state,this.popper,this.reference,this.options.positionFixed),
// compute auto placement, store placement inside the data object,
// modifiers will be able to edit `placement` if needed
// and refer to originalPlacement to know the original value
e.placement=O(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),
// store the computed placement inside `originalPlacement`
e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,
// compute the popper offsets
e.offsets.popper=j(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",
// run the modifiers
e=M(this.modifiers,e),
// the first `update` will call `onCreate` callback
// the other ones will call `onUpdate` callback
this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}
/**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */function F(e,n){return e.some(function(e){var t=e.name,i;return e.enabled&&t===n})}
/**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */function z(e){for(var t=[!1,"ms","Webkit","Moz","O"],i=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var o=t[n],s=o?""+o+i:e;if(void 0!==document.body.style[s])return s}return null}
/**
   * Destroy the popper
   * @method
   * @memberof Popper
   */function q(){return this.state.isDestroyed=!0,
// touch DOM only if `applyStyle` modifier is enabled
F(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[z("transform")]=""),this.disableEventListeners(),
// remove the popper if user explicity asked for the deletion on destroy
// do not use `remove` because IE11 doesn't support it
this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}
/**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */function R(e){var t=e.ownerDocument;return t?t.defaultView:window}function U(e,t,i,n){var o="BODY"===e.nodeName,s=o?e.ownerDocument.defaultView:e;s.addEventListener(t,i,{passive:!0}),o||U(g(s.parentNode),t,i,n),n.push(s)}
/**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function B(e,t,i,n){
// Resize event listener on window
i.updateBound=n,R(e).addEventListener("resize",i.updateBound,{passive:!0});
// Scroll event listener on scroll parents
var o=g(e);return U(o,"scroll",i.updateBound,i.scrollParents),i.scrollElement=o,i.eventsEnabled=!0,i}
/**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */function Q(){this.state.eventsEnabled||(this.state=B(this.reference,this.options,this.state,this.scheduleUpdate))}
/**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function K(e,t){
// Remove resize event listener on window
return R(e).removeEventListener("resize",t.updateBound),
// Remove scroll event listener on scroll parents
t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),
// Reset state
t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}
/**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger onUpdate callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */function Y(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=K(this.reference,this.state))}
/**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */function V(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}
/**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function X(i,n){Object.keys(n).forEach(function(e){var t="";
// add unit if the value is numeric and is one of the following
-1!==["width","height","top","right","bottom","left"].indexOf(e)&&V(n[e])&&(t="px"),i.style[e]=n[e]+t})}
/**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function G(i,n){Object.keys(n).forEach(function(e){var t;!1!==n[e]?i.setAttribute(e,n[e]):i.removeAttribute(e)})}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */function Z(e){
// any property present in `data.styles` will be applied to the popper,
// in this way we can make the 3rd party modifiers add custom styles to it
// Be aware, modifiers could override the properties defined in the previous
// lines of this modifier!
return X(e.instance.popper,e.styles),
// any property present in `data.attributes` will be applied to the popper,
// they will be set as HTML attributes of the element
G(e.instance.popper,e.attributes),
// if arrowElement is defined and arrowStyles has some properties
e.arrowElement&&Object.keys(e.arrowStyles).length&&X(e.arrowElement,e.arrowStyles),e}
/**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */function J(e,t,i,n,o){
// compute reference element offsets
var s=$(o,t,e,i.positionFixed),r=O(i.placement,s,t,e,i.modifiers.flip.boundariesElement,i.modifiers.flip.padding);
// compute auto placement, store placement inside the data object,
// modifiers will be able to edit `placement` if needed
// and refer to originalPlacement to know the original value
return t.setAttribute("x-placement",r),
// Apply `position` to popper before anything else because
// without the position applied we can't guarantee correct computations
X(t,{position:i.positionFixed?"fixed":"absolute"}),i}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ee(e,t){var i=t.x,n=t.y,o=e.offsets.popper,s=H(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==s&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var r=void 0!==s?s:t.gpuAcceleration,a,l=S(_(e.instance.popper)),d={position:o.position},c={left:Math.floor(o.left),top:Math.round(o.top),bottom:Math.round(o.bottom),right:Math.floor(o.right)},u="bottom"===i?"top":"bottom",p="right"===n?"left":"right",h=z("transform"),f=void 0,g=void 0;if(g="bottom"===u?-l.height+c.bottom:c.top,f="right"===p?-l.width+c.right:c.left,r&&h)d[h]="translate3d("+f+"px, "+g+"px, 0)",d[u]=0,d[p]=0,d.willChange="transform";else{
// othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
var m="bottom"===u?-1:1,v="right"===p?-1:1;d[u]=g*m,d[p]=f*v,d.willChange=u+", "+p}
// Attributes
var y={"x-placement":e.placement};
// Update `data` attributes, styles and arrowStyles
return e.attributes=oi({},y,e.attributes),e.styles=oi({},d,e.styles),e.arrowStyles=oi({},e.offsets.arrow,e.arrowStyles),e}
/**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */function te(e,i,t){var n=H(e,function(e){var t;return e.name===i}),o=!!n&&e.some(function(e){return e.name===t&&e.enabled&&e.order<n.order});if(!o){var s="`"+i+"`",r="`"+t+"`";console.warn(r+" modifier is required by "+s+" modifier in order to work, be sure to include it before "+s+"!")}return o}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ie(e,t){var i;
// arrow depends on keepTogether in order to work
if(!te(e.instance.modifiers,"arrow","keepTogether"))return e;var n=t.element;
// if arrowElement is a string, suppose it's a CSS selector
if("string"==typeof n){
// if arrowElement is not found, don't run the modifier
if(!(n=e.instance.popper.querySelector(n)))return e}else
// if the arrowElement isn't a query selector we must check that the
// provided DOM node is child of its popper node
if(!e.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var o=e.placement.split("-")[0],s=e.offsets,r=s.popper,a=s.reference,l=-1!==["left","right"].indexOf(o),d=l?"height":"width",c=l?"Top":"Left",u=c.toLowerCase(),p=l?"left":"top",h=l?"bottom":"right",f=N(n)[d];
//
// extends keepTogether behavior making sure the popper and its
// reference have enough pixels in conjuction
//
// top/left side
a[h]-f<r[u]&&(e.offsets.popper[u]-=r[u]-(a[h]-f)),
// bottom/right side
a[u]+f>r[h]&&(e.offsets.popper[u]+=a[u]+f-r[h]),e.offsets.popper=k(e.offsets.popper);
// compute center of the popper
var g=a[u]+a[d]/2-f/2,m=w(e.instance.popper),v=parseFloat(m["margin"+c],10),y=parseFloat(m["border"+c+"Width"],10),_=g-e.offsets.popper[u]-v-y;
// Compute the sideValue using the updated popper offsets
// take popper margin in account because we don't have this info available
// prevent arrowElement from being placed not contiguously to its popper
return _=Math.max(Math.min(r[d]-f,_),0),e.arrowElement=n,e.offsets.arrow=(ni(i={},u,Math.round(_)),ni(i,p,""),i),e}
/**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */function ne(e){return"end"===e?"start":"start"===e?"end":e}
/**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-right` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
/**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
function oe(e,t){var i=1<arguments.length&&void 0!==t&&t,n=ri.indexOf(e),o=ri.slice(n+1).concat(ri.slice(0,n));return i?o.reverse():o}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
function se(h,f){
// if `inner` modifier is enabled, we can't use the `flip` modifier
if(F(h.instance.modifiers,"inner"))return h;if(h.flipped&&h.placement===h.originalPlacement)
// seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
return h;var g=D(h.instance.popper,h.instance.reference,f.padding,f.boundariesElement,h.positionFixed),m=h.placement.split("-")[0],v=P(m),y=h.placement.split("-")[1]||"",_=[];switch(f.behavior){case ai:_=[m,v];break;case li:_=oe(m);break;case di:_=oe(m,!0);break;default:_=f.behavior}return _.forEach(function(e,t){if(m!==e||_.length===t+1)return h;m=h.placement.split("-")[0],v=P(m);var i=h.offsets.popper,n=h.offsets.reference,o=Math.floor,s="left"===m&&o(i.right)>o(n.left)||"right"===m&&o(i.left)<o(n.right)||"top"===m&&o(i.bottom)>o(n.top)||"bottom"===m&&o(i.top)<o(n.bottom),r=o(i.left)<o(g.left),a=o(i.right)>o(g.right),l=o(i.top)<o(g.top),d=o(i.bottom)>o(g.bottom),c="left"===m&&r||"right"===m&&a||"top"===m&&l||"bottom"===m&&d,u=-1!==["top","bottom"].indexOf(m),p=!!f.flipVariations&&(u&&"start"===y&&r||u&&"end"===y&&a||!u&&"start"===y&&l||!u&&"end"===y&&d);(s||c||p)&&(
// this boolean to detect any flip loop
h.flipped=!0,(s||c)&&(m=_[t+1]),p&&(y=ne(y)),h.placement=m+(y?"-"+y:""),
// this object contains `position`, we want to preserve it along with
// any additional property we may add in the future
h.offsets.popper=oi({},h.offsets.popper,j(h.instance.popper,h.offsets.reference,h.placement)),h=M(h.instance.modifiers,h,"flip"))}),h}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function re(e){var t=e.offsets,i=t.popper,n=t.reference,o=e.placement.split("-")[0],s=Math.floor,r=-1!==["top","bottom"].indexOf(o),a=r?"right":"bottom",l=r?"left":"top",d=r?"width":"height";return i[a]<s(n[l])&&(e.offsets.popper[l]=s(n[l])-i[d]),i[l]>s(n[a])&&(e.offsets.popper[l]=s(n[a])),e}
/**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */function ae(e,t,i,n){
// separate value from unit
var o=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+o[1],r=o[2];
// If it's not a number it's an operator, I guess
if(!s)return e;if(0===r.indexOf("%")){var a=void 0,l;switch(r){case"%p":a=i;break;case"%":case"%r":default:a=n}return k(a)[t]/100*s}if("vh"!==r&&"vw"!==r)
// if is an explicit pixel unit, we get rid of the unit and keep the value
// if is an implicit unit, it's px, and we return just the value
return s;
// if is a vh or vw, we calculate the size based on the viewport
var d=void 0;return(d="vh"===r?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*s}
/**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */function le(e,o,s,t){var r=[0,0],a=-1!==["right","left"].indexOf(t),i=e.split(/(\+|\-)/).map(function(e){return e.trim()}),n=i.indexOf(H(i,function(e){return-1!==e.search(/,|\s/)}));
// Use height if placement is left or right and index is 0 otherwise use width
// in this way the first offset will use an axis and the second one
// will use the other one
i[n]&&-1===i[n].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
// If divider is found, we divide the list of values and operands to divide
// them by ofset X and Y.
var l=/\s*,\s*|\s+/,d=-1!==n?[i.slice(0,n).concat([i[n].split(l)[0]]),[i[n].split(l)[1]].concat(i.slice(n+1))]:[i];
// Convert the values with units to absolute pixels to allow our computations
// Loop trough the offsets arrays and execute the operations
return(d=d.map(function(e,t){
// Most of the units rely on the orientation of the popper
var i=(1===t?!a:a)?"height":"width",n=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,n=!0,e):n?(e[e.length-1]+=t,n=!1,e):e.concat(t)},[]).map(function(e){return ae(e,i,o,s)})})).forEach(function(i,n){i.forEach(function(e,t){V(e)&&(r[n]+=e*("-"===i[t-1]?-1:1))})}),r}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */function de(e,t){var i=t.offset,n=e.placement,o=e.offsets,s=o.popper,r=o.reference,a=n.split("-")[0],l=void 0;return l=V(+i)?[+i,0]:le(i,s,r,a),"left"===a?(s.top+=l[0],s.left-=l[1]):"right"===a?(s.top+=l[0],s.left+=l[1]):"top"===a?(s.left+=l[0],s.top-=l[1]):"bottom"===a&&(s.left+=l[0],s.top+=l[1]),e.popper=s,e}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ce(e,o){var t=o.boundariesElement||_(e.instance.popper);
// If offsetParent is the reference element, we really want to
// go one step up and use the next offsetParent as reference to
// avoid to make this modifier completely useless and look like broken
e.instance.reference===t&&(t=_(t));
// NOTE: DOM access here
// resets the popper's position so that the document size can be calculated excluding
// the size of the popper element itself
var i=z("transform"),n=e.instance.popper.style,s=n.top,r=n.left,a=n[i];n.top="",n.left="",n[i]="";var l=D(e.instance.popper,e.instance.reference,o.padding,t,e.positionFixed);
// NOTE: DOM access here
// restores the original style properties after the offsets have been computed
n.top=s,n.left=r,n[i]=a,o.boundaries=l;var d=o.priority,c=e.offsets.popper,u={primary:function e(t){var i=c[t];return c[t]<l[t]&&!o.escapeWithReference&&(i=Math.max(c[t],l[t])),ni({},t,i)},secondary:function e(t){var i="right"===t?"left":"top",n=c[i];return c[t]>l[t]&&!o.escapeWithReference&&(n=Math.min(c[i],l[t]-("right"===t?c.width:c.height))),ni({},i,n)}};return d.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";c=oi({},c,u[t](e))}),e.offsets.popper=c,e}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ue(e){var t=e.placement,i=t.split("-")[0],n=t.split("-")[1];
// if shift shiftvariation is specified, run the modifier
if(n){var o=e.offsets,s=o.reference,r=o.popper,a=-1!==["bottom","top"].indexOf(i),l=a?"left":"top",d=a?"width":"height",c={start:ni({},l,s[l]),end:ni({},l,s[l]+s[d]-r[d])};e.offsets.popper=oi({},r,c[n])}return e}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function pe(e){if(!te(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,i=H(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<i.top||t.left>i.right||t.top>i.bottom||t.right<i.left){
// Avoid unnecessary DOM access if visibility hasn't changed
if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{
// Avoid unnecessary DOM access if visibility hasn't changed
if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function he(e){var t=e.placement,i=t.split("-")[0],n=e.offsets,o=n.popper,s=n.reference,r=-1!==["left","right"].indexOf(i),a=-1===["top","left"].indexOf(i);return o[r?"left":"top"]=s[i]-(a?o[r?"width":"height"]:0),e.placement=P(t),e.offsets.popper=k(o),e}
/**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */
/**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */for(var fe=function(o){// Shoutout AngusCroll (https://goo.gl/pxwQGp)
function l(e){return{}.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()}function e(){return{bindType:n,delegateType:n,handle:function e(t){if(o(t.target).is(this))return t.handleObj.handler.apply(this,arguments);// eslint-disable-line prefer-rest-params
}}}function t(e){var t=this,i=!1;return o(this).one(d.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||d.triggerTransitionEnd(t)},e),this}function i(){o.fn.emulateTransitionEnd=t,o.event.special[d.TRANSITION_END]=e()}
/**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */
/**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
var n="transitionend",s=1e6,r=1e3,d={TRANSITION_END:"bsTransitionEnd",getUID:function e(t){for(;
// eslint-disable-next-line no-bitwise
t+=~~(Math.random()*s),document.getElementById(t););return t},getSelectorFromElement:function e(t){var i=t.getAttribute("data-target");i&&"#"!==i||(i=t.getAttribute("href")||"");try{return document.querySelector(i)?i:null}catch(e){return null}},getTransitionDurationFromElement:function e(t){if(!t)return 0;// Get transition-duration of the element
var i=o(t).css("transition-duration"),n;// Return 0 if element or transition duration is not found
return parseFloat(i)?(// If multiple durations are defined, take the first
i=i.split(",")[0],parseFloat(i)*r):0},reflow:function e(t){return t.offsetHeight},triggerTransitionEnd:function e(t){o(t).trigger(n)},
// TODO: Remove in v5
supportsTransitionEnd:function e(){return Boolean(n)},isElement:function e(t){return(t[0]||t).nodeType},typeCheckConfig:function e(t,i,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var s=n[o],r=i[o],a=r&&d.isElement(r)?"element":l(r);if(!new RegExp(s).test(a))throw new Error(t.toUpperCase()+': Option "'+o+'" provided type "'+a+'" but expected type "'+s+'".')}}};return i(),d}(t=t&&t.hasOwnProperty("default")?t.default:t),ge=(ve="alert",ye="4.1.3",we="."+(_e="bs.alert"),be=".data-api",Te=(me=t).fn[ve],ke='[data-dismiss="alert"]',Se={CLOSE:"close"+we,CLOSED:"closed"+we,CLICK_DATA_API:"click"+we+be},Ce="alert",Ee="fade",Ae="show"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,xe=
/* */
function(){function n(e){this._element=e}// Getters
var e=n.prototype;
// Public
return e.close=function e(t){var i=this._element,n;t&&(i=this._getRootElement(t)),this._triggerCloseEvent(i).isDefaultPrevented()||this._removeElement(i)},e.dispose=function e(){me.removeData(this._element,_e),this._element=null},// Private
e._getRootElement=function e(t){var i=fe.getSelectorFromElement(t),n=!1;return i&&(n=document.querySelector(i)),n||(n=me(t).closest("."+Ce)[0]),n},e._triggerCloseEvent=function e(t){var i=me.Event(Se.CLOSE);return me(t).trigger(i),i},e._removeElement=function e(t){var i=this;if(me(t).removeClass(Ae),me(t).hasClass(Ee)){var n=fe.getTransitionDurationFromElement(t);me(t).one(fe.TRANSITION_END,function(e){return i._destroyElement(t,e)}).emulateTransitionEnd(n)}else this._destroyElement(t)},e._destroyElement=function e(t){me(t).detach().trigger(Se.CLOSED).remove()},// Static
n._jQueryInterface=function e(i){return this.each(function(){var e=me(this),t=e.data(_e);t||(t=new n(this),e.data(_e,t)),"close"===i&&t[i](this)})},n._handleDismiss=function e(t){return function(e){e&&e.preventDefault(),t.close(this)}},s(n,null,[{key:"VERSION",get:function e(){return ye}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
me(document).on(Se.CLICK_DATA_API,ke,xe._handleDismiss(new xe)),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
me.fn[ve]=xe._jQueryInterface,me.fn[ve].Constructor=xe,me.fn[ve].noConflict=function(){return me.fn[ve]=Te,xe._jQueryInterface},xe),me,ve,ye,_e,we,be,Te,ke,Se,Ce,Ee,Ae,xe,De=(Oe="button",$e="4.1.3",Pe="."+(Ne="bs.button"),je=".data-api",He=(Ie=t).fn[Oe],Le="active",Me="btn",Fe='[data-toggle^="button"]',ze='[data-toggle="buttons"]',qe="input",Re=".active",Ue=".btn",Be={CLICK_DATA_API:"click"+Pe+je,FOCUS_BLUR_DATA_API:(We="focus")+Pe+je+" blur"+Pe+je
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},Qe=
/* */
function(){function i(e){this._element=e}// Getters
var e=i.prototype;
// Public
return e.toggle=function e(){var t=!0,i=!0,n=Ie(this._element).closest(ze)[0];if(n){var o=this._element.querySelector(qe);if(o){if("radio"===o.type)if(o.checked&&this._element.classList.contains(Le))t=!1;else{var s=n.querySelector(Re);s&&Ie(s).removeClass(Le)}if(t){if(o.hasAttribute("disabled")||n.hasAttribute("disabled")||o.classList.contains("disabled")||n.classList.contains("disabled"))return;o.checked=!this._element.classList.contains(Le),Ie(o).trigger("change")}o.focus(),i=!1}}i&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(Le)),t&&Ie(this._element).toggleClass(Le)},e.dispose=function e(){Ie.removeData(this._element,Ne),this._element=null},// Static
i._jQueryInterface=function e(t){return this.each(function(){var e=Ie(this).data(Ne);e||(e=new i(this),Ie(this).data(Ne,e)),"toggle"===t&&e[t]()})},s(i,null,[{key:"VERSION",get:function e(){return $e}}]),i}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
Ie(document).on(Be.CLICK_DATA_API,Fe,function(e){e.preventDefault();var t=e.target;Ie(t).hasClass(Me)||(t=Ie(t).closest(Ue)),Qe._jQueryInterface.call(Ie(t),"toggle")}).on(Be.FOCUS_BLUR_DATA_API,Fe,function(e){var t=Ie(e.target).closest(Ue)[0];Ie(t).toggleClass(We,/^focus(in)?$/.test(e.type))}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Ie.fn[Oe]=Qe._jQueryInterface,Ie.fn[Oe].Constructor=Qe,Ie.fn[Oe].noConflict=function(){return Ie.fn[Oe]=He,Qe._jQueryInterface},Qe),Ie,Oe,$e,Ne,Pe,je,He,Le,Me,We,Fe,ze,qe,Re,Ue,Be,Qe,Ke=(Ve="carousel",Xe="4.1.3",Ze="."+(Ge="bs.carousel"),Je=".data-api",et=(Ye=t).fn[Ve],tt=37,it=39,ot={interval:5e3,keyboard:!0,slide:!(nt=500),pause:"hover",wrap:!0},st={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},rt="next",at="prev",lt="left",dt="right",ct={SLIDE:"slide"+Ze,SLID:"slid"+Ze,KEYDOWN:"keydown"+Ze,MOUSEENTER:"mouseenter"+Ze,MOUSELEAVE:"mouseleave"+Ze,TOUCHEND:"touchend"+Ze,LOAD_DATA_API:"load"+Ze+Je,CLICK_DATA_API:"click"+Ze+Je},ut="carousel",pt="active",ht="slide",ft="carousel-item-right",gt="carousel-item-left",mt="carousel-item-next",vt="carousel-item-prev",yt="carousel-item",_t=".active",wt=".active.carousel-item",bt=".carousel-item",Tt=".carousel-item-next, .carousel-item-prev",kt=".carousel-indicators",St="[data-slide], [data-slide-to]",Ct='[data-ride="carousel"]'
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Et=
/* */
function(){function r(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(t),this._element=Ye(e)[0],this._indicatorsElement=this._element.querySelector(kt),this._addEventListeners()}// Getters
var e=r.prototype;
// Public
return e.next=function e(){this._isSliding||this._slide(rt)},e.nextWhenVisible=function e(){
// Don't call next when the page isn't visible
// or the carousel or its parent isn't visible
!document.hidden&&Ye(this._element).is(":visible")&&"hidden"!==Ye(this._element).css("visibility")&&this.next()},e.prev=function e(){this._isSliding||this._slide(at)},e.pause=function e(t){t||(this._isPaused=!0),this._element.querySelector(Tt)&&(fe.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function e(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function e(t){var i=this;this._activeElement=this._element.querySelector(wt);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)Ye(this._element).one(ct.SLID,function(){return i.to(t)});else{if(n===t)return this.pause(),void this.cycle();var o=n<t?rt:at;this._slide(o,this._items[t])}},e.dispose=function e(){Ye(this._element).off(Ze),Ye.removeData(this._element,Ge),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},// Private
e._getConfig=function e(t){return t=a({},ot,t),fe.typeCheckConfig(Ve,t,st),t},e._addEventListeners=function e(){var t=this;this._config.keyboard&&Ye(this._element).on(ct.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&(Ye(this._element).on(ct.MOUSEENTER,function(e){return t.pause(e)}).on(ct.MOUSELEAVE,function(e){return t.cycle(e)}),"ontouchstart"in document.documentElement&&
// If it's a touch-enabled device, mouseenter/leave are fired as
// part of the mouse compatibility events on first tap - the carousel
// would stop cycling until user tapped out of it;
// here, we listen for touchend, explicitly pause the carousel
// (as if it's the second time we tap on it, mouseenter compat event
// is NOT fired) and after a timeout (to allow for mouse compatibility
// events to fire) we explicitly restart cycling
Ye(this._element).on(ct.TOUCHEND,function(){t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},nt+t._config.interval)}))},e._keydown=function e(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next();break;default:}},e._getItemIndex=function e(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(bt)):[],this._items.indexOf(t)},e._getItemByDirection=function e(t,i){var n=t===rt,o=t===at,s=this._getItemIndex(i),r=this._items.length-1,a;if((o&&0===s||n&&s===r)&&!this._config.wrap)return i;var l,d=(s+(t===at?-1:1))%this._items.length;return-1===d?this._items[this._items.length-1]:this._items[d]},e._triggerSlideEvent=function e(t,i){var n=this._getItemIndex(t),o=this._getItemIndex(this._element.querySelector(wt)),s=Ye.Event(ct.SLIDE,{relatedTarget:t,direction:i,from:o,to:n});return Ye(this._element).trigger(s),s},e._setActiveIndicatorElement=function e(t){if(this._indicatorsElement){var i=[].slice.call(this._indicatorsElement.querySelectorAll(_t));Ye(i).removeClass(pt);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&Ye(n).addClass(pt)}},e._slide=function e(t,i){var n=this,o=this._element.querySelector(wt),s=this._getItemIndex(o),r=i||o&&this._getItemByDirection(t,o),a=this._getItemIndex(r),l=Boolean(this._interval),d,c,u,p;if(u=t===rt?(d=gt,c=mt,lt):(d=ft,c=vt,dt),r&&Ye(r).hasClass(pt))this._isSliding=!1;else if(!this._triggerSlideEvent(r,u).isDefaultPrevented()&&o&&r){this._isSliding=!0,l&&this.pause(),this._setActiveIndicatorElement(r);var h=Ye.Event(ct.SLID,{relatedTarget:r,direction:u,from:s,to:a});if(Ye(this._element).hasClass(ht)){Ye(r).addClass(c),fe.reflow(r),Ye(o).addClass(d),Ye(r).addClass(d);var f=fe.getTransitionDurationFromElement(o);Ye(o).one(fe.TRANSITION_END,function(){Ye(r).removeClass(d+" "+c).addClass(pt),Ye(o).removeClass(pt+" "+c+" "+d),n._isSliding=!1,setTimeout(function(){return Ye(n._element).trigger(h)},0)}).emulateTransitionEnd(f)}else Ye(o).removeClass(pt),Ye(r).addClass(pt),this._isSliding=!1,Ye(this._element).trigger(h);l&&this.cycle()}},// Static
r._jQueryInterface=function e(n){return this.each(function(){var e=Ye(this).data(Ge),t=a({},ot,Ye(this).data());"object"==typeof n&&(t=a({},t,n));var i="string"==typeof n?n:t.slide;if(e||(e=new r(this,t),Ye(this).data(Ge,e)),"number"==typeof n)e.to(n);else if("string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}else t.interval&&(e.pause(),e.cycle())})},r._dataApiClickHandler=function e(t){var i=fe.getSelectorFromElement(this);if(i){var n=Ye(i)[0];if(n&&Ye(n).hasClass(ut)){var o=a({},Ye(n).data(),Ye(this).data()),s=this.getAttribute("data-slide-to");s&&(o.interval=!1),r._jQueryInterface.call(Ye(n),o),s&&Ye(n).data(Ge).to(s),t.preventDefault()}}},s(r,null,[{key:"VERSION",get:function e(){return Xe}},{key:"Default",get:function e(){return ot}}]),r}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
Ye(document).on(ct.CLICK_DATA_API,St,Et._dataApiClickHandler),Ye(window).on(ct.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(Ct)),t=0,i=e.length;t<i;t++){var n=Ye(e[t]);Et._jQueryInterface.call(n,n.data())}}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Ye.fn[Ve]=Et._jQueryInterface,Ye.fn[Ve].Constructor=Et,Ye.fn[Ve].noConflict=function(){return Ye.fn[Ve]=et,Et._jQueryInterface},Et),Ye,Ve,Xe,Ge,Ze,Je,et,tt,it,nt,ot,st,rt,at,lt,dt,ct,ut,pt,ht,ft,gt,mt,vt,yt,_t,wt,bt,Tt,kt,St,Ct,Et,At=(Dt="collapse",It="4.1.3",$t="."+(Ot="bs.collapse"),Nt=".data-api",Pt=(xt=t).fn[Dt],jt={toggle:!0,parent:""},Ht={toggle:"boolean",parent:"(string|element)"},Lt={SHOW:"show"+$t,SHOWN:"shown"+$t,HIDE:"hide"+$t,HIDDEN:"hidden"+$t,CLICK_DATA_API:"click"+$t+Nt},Mt="show",Wt="collapse",Ft="collapsing",zt="collapsed",qt="width",Rt="height",Ut=".show, .collapsing",Bt='[data-toggle="collapse"]'
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Qt=
/* */
function(){function c(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=xt.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var i=[].slice.call(document.querySelectorAll(Bt)),n=0,o=i.length;n<o;n++){var s=i[n],r=fe.getSelectorFromElement(s),a=[].slice.call(document.querySelectorAll(r)).filter(function(e){return e===t});null!==r&&0<a.length&&(this._selector=r,this._triggerArray.push(s))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}// Getters
var e=c.prototype;
// Public
return e.toggle=function e(){xt(this._element).hasClass(Mt)?this.hide():this.show()},e.show=function e(){var t=this,i,n;if(!this._isTransitioning&&!xt(this._element).hasClass(Mt)&&(this._parent&&0===(i=[].slice.call(this._parent.querySelectorAll(Ut)).filter(function(e){return e.getAttribute("data-parent")===t._config.parent})).length&&(i=null),!(i&&(n=xt(i).not(this._selector).data(Ot))&&n._isTransitioning))){var o=xt.Event(Lt.SHOW);if(xt(this._element).trigger(o),!o.isDefaultPrevented()){i&&(c._jQueryInterface.call(xt(i).not(this._selector),"hide"),n||xt(i).data(Ot,null));var s=this._getDimension();xt(this._element).removeClass(Wt).addClass(Ft),this._element.style[s]=0,this._triggerArray.length&&xt(this._triggerArray).removeClass(zt).attr("aria-expanded",!0),this.setTransitioning(!0);var r=function e(){xt(t._element).removeClass(Ft).addClass(Wt).addClass(Mt),t._element.style[s]="",t.setTransitioning(!1),xt(t._element).trigger(Lt.SHOWN)},a,l="scroll"+(s[0].toUpperCase()+s.slice(1)),d=fe.getTransitionDurationFromElement(this._element);xt(this._element).one(fe.TRANSITION_END,r).emulateTransitionEnd(d),this._element.style[s]=this._element[l]+"px"}}},e.hide=function e(){var t=this;if(!this._isTransitioning&&xt(this._element).hasClass(Mt)){var i=xt.Event(Lt.HIDE);if(xt(this._element).trigger(i),!i.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",fe.reflow(this._element),xt(this._element).addClass(Ft).removeClass(Wt).removeClass(Mt);var o=this._triggerArray.length;if(0<o)for(var s=0;s<o;s++){var r=this._triggerArray[s],a=fe.getSelectorFromElement(r),l;if(null!==a)xt([].slice.call(document.querySelectorAll(a))).hasClass(Mt)||xt(r).addClass(zt).attr("aria-expanded",!1)}this.setTransitioning(!0);var d=function e(){t.setTransitioning(!1),xt(t._element).removeClass(Ft).addClass(Wt).trigger(Lt.HIDDEN)};this._element.style[n]="";var c=fe.getTransitionDurationFromElement(this._element);xt(this._element).one(fe.TRANSITION_END,d).emulateTransitionEnd(c)}}},e.setTransitioning=function e(t){this._isTransitioning=t},e.dispose=function e(){xt.removeData(this._element,Ot),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},// Private
e._getConfig=function e(t){return(t=a({},jt,t)).toggle=Boolean(t.toggle),// Coerce string values
fe.typeCheckConfig(Dt,t,Ht),t},e._getDimension=function e(){var t;return xt(this._element).hasClass(qt)?qt:Rt},e._getParent=function e(){var i=this,t=null;fe.isElement(this._config.parent)?(t=this._config.parent,// It's a jQuery object
void 0!==this._config.parent.jquery&&(t=this._config.parent[0])):t=document.querySelector(this._config.parent);var n='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',o=[].slice.call(t.querySelectorAll(n));return xt(o).each(function(e,t){i._addAriaAndCollapsedClass(c._getTargetFromElement(t),[t])}),t},e._addAriaAndCollapsedClass=function e(t,i){if(t){var n=xt(t).hasClass(Mt);i.length&&xt(i).toggleClass(zt,!n).attr("aria-expanded",n)}},// Static
c._getTargetFromElement=function e(t){var i=fe.getSelectorFromElement(t);return i?document.querySelector(i):null},c._jQueryInterface=function e(n){return this.each(function(){var e=xt(this),t=e.data(Ot),i=a({},jt,e.data(),"object"==typeof n&&n?n:{});if(!t&&i.toggle&&/show|hide/.test(n)&&(i.toggle=!1),t||(t=new c(this,i),e.data(Ot,t)),"string"==typeof n){if(void 0===t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(c,null,[{key:"VERSION",get:function e(){return It}},{key:"Default",get:function e(){return jt}}]),c}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
xt(document).on(Lt.CLICK_DATA_API,Bt,function(e){
// preventDefault only for <a> elements (which change the URL) not inside the collapsible element
"A"===e.currentTarget.tagName&&e.preventDefault();var n=xt(this),t=fe.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(t));xt(i).each(function(){var e=xt(this),t,i=e.data(Ot)?"toggle":n.data();Qt._jQueryInterface.call(e,i)})}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
xt.fn[Dt]=Qt._jQueryInterface,xt.fn[Dt].Constructor=Qt,xt.fn[Dt].noConflict=function(){return xt.fn[Dt]=Pt,Qt._jQueryInterface},Qt),xt,Dt,It,Ot,$t,Nt,Pt,jt,Ht,Lt,Mt,Wt,Ft,zt,qt,Rt,Ut,Bt,Qt,Kt="undefined"!=typeof window&&"undefined"!=typeof document,Yt=["Edge","Trident","Firefox"],Vt=0,Xt=0
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */;Xt<Yt.length;Xt+=1)if(Kt&&0<=navigator.userAgent.indexOf(Yt[Xt])){Vt=1;break}var Gt,Zt=Kt&&window.Promise?r:l,Jt=Kt&&!(!window.MSInputMethodContext||!document.documentMode),ei=Kt&&/MSIE 10/.test(navigator.userAgent),ti=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},ii=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),ni=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e},oi=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},si=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],ri=si.slice(3),ai="flip",li="clockwise",di="counterclockwise",ci,ui={
/**
     * Popper's placement
     * @prop {Popper.placements} placement='bottom'
     */
placement:"bottom",
/**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
positionFixed:!1,
/**
     * Whether events (resize, scroll) are initially enabled
     * @prop {Boolean} eventsEnabled=true
     */
eventsEnabled:!0,
/**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
removeOnDestroy:!1,
/**
     * Callback called when the popper is created.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
onCreate:function e(){},
/**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
onUpdate:function e(){},
/**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js
     * @prop {modifiers}
     */
modifiers:{
/**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
shift:{
/** @prop {number} order=100 - Index used to define the order of execution */
order:100,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:ue},
/**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unitless, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the height.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
     *
     * @memberof modifiers
     * @inner
     */
offset:{
/** @prop {number} order=200 - Index used to define the order of execution */
order:200,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:de,
/** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
offset:0},
/**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * An scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
preventOverflow:{
/** @prop {number} order=300 - Index used to define the order of execution */
order:300,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:ce,
/**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
priority:["left","right","top","bottom"],
/**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper this makes sure the popper has always a little padding
       * between the edges of its container
       */
padding:5,
/**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier, can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
boundariesElement:"scrollParent"},
/**
     * Modifier used to make sure the reference and its popper stay near eachothers
     * without leaving any gap between the two. Expecially useful when the arrow is
     * enabled and you want to assure it to point to its reference element.
     * It cares only about the first axis, you can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
keepTogether:{
/** @prop {number} order=400 - Index used to define the order of execution */
order:400,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:re},
/**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjuction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
arrow:{
/** @prop {number} order=500 - Index used to define the order of execution */
order:500,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:ie,
/** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
element:"[x-arrow]"},
/**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
flip:{
/** @prop {number} order=600 - Index used to define the order of execution */
order:600,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:se,
/**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations).
       */
behavior:"flip",
/**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
padding:5,
/**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position,
       * the popper will never be placed outside of the defined boundaries
       * (except if keepTogether is enabled)
       */
boundariesElement:"viewport"},
/**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
inner:{
/** @prop {number} order=700 - Index used to define the order of execution */
order:700,
/** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
enabled:!1,
/** @prop {ModifierFn} */
fn:he},
/**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
hide:{
/** @prop {number} order=800 - Index used to define the order of execution */
order:800,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:pe},
/**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
computeStyle:{
/** @prop {number} order=850 - Index used to define the order of execution */
order:850,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:ee,
/**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
gpuAcceleration:!0,
/**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
x:"bottom",
/**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
y:"right"},
/**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define you own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
applyStyle:{
/** @prop {number} order=900 - Index used to define the order of execution */
order:900,
/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
enabled:!0,
/** @prop {ModifierFn} */
fn:Z,
/** @prop {Function} */
onLoad:J,
/**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
gpuAcceleration:void 0}}},pi=function(){
/**
     * Create a new Popper.js instance
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper.
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
function r(e,t,i){var n=this,o=2<arguments.length&&void 0!==i?i:{};ti(this,r),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},
// make update() debounced, so that it only runs at most once-per-tick
this.update=Zt(this.update.bind(this)),
// with {} we create a new object with the options inside it
this.options=oi({},r.Defaults,o),
// init state
this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},
// get reference and popper elements (allow jQuery wrappers)
this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,
// Deep merge modifiers options
this.options.modifiers={},Object.keys(oi({},r.Defaults.modifiers,o.modifiers)).forEach(function(e){n.options.modifiers[e]=oi({},r.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),
// Refactoring modifiers' list (Object => Array)
this.modifiers=Object.keys(this.options.modifiers).map(function(e){return oi({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),
// modifiers have the ability to execute arbitrary code when Popper.js get inited
// such code is executed in the same order of its modifier
// they could add new properties to their options configuration
// BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
this.modifiers.forEach(function(e){e.enabled&&d(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)}),
// fire the first update to position the popper in the right place
this.update();var s=this.options.eventsEnabled;s&&
// setup event listeners, they will take care of update the position in specific situations
this.enableEventListeners(),this.state.eventsEnabled=s}
// We can't use class properties because they don't get listed in the
// class prototype and break stuff like Sinon stubs
return ii(r,[{key:"update",value:function e(){return W.call(this)}},{key:"destroy",value:function e(){return q.call(this)}},{key:"enableEventListeners",value:function e(){return Q.call(this)}},{key:"disableEventListeners",value:function e(){return Y.call(this)}
/**
       * Schedule an update, it will run on the next UI update available
       * @method scheduleUpdate
       * @memberof Popper
       */
/**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */}]),r}();
/**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
/**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */
pi.Utils=("undefined"!=typeof window?window:global).PopperUtils,pi.placements=si,pi.Defaults=ui;
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
var hi=(gi="dropdown",mi="4.1.3",yi="."+(vi="bs.dropdown"),_i=".data-api",wi=(fi=t).fn[gi],bi=27,Ti=32,ki=9,Si=38,Ci=40,Ei=3,Ai=new RegExp("38|40|27"),xi={HIDE:"hide"+yi,HIDDEN:"hidden"+yi,SHOW:"show"+yi,SHOWN:"shown"+yi,CLICK:"click"+yi,CLICK_DATA_API:"click"+yi+_i,KEYDOWN_DATA_API:"keydown"+yi+_i,KEYUP_DATA_API:"keyup"+yi+_i},Di="disabled",Ii="show",Oi="dropup",$i="dropright",Ni="dropleft",Pi="dropdown-menu-right",ji="dropdown-menu-left",Hi="position-static",Li='[data-toggle="dropdown"]',Mi=".dropdown form",Wi=".dropdown-menu",Fi=".navbar-nav",zi=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",qi="top-start",Ri="top-end",Ui="bottom-start",Bi="bottom-end",Qi="right-start",Ki="right-end",Yi="left-start",Vi="left-end",Xi={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Gi={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},Zi=
/* */
function(){function c(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}// Getters
var e=c.prototype;
// Public
return e.toggle=function e(){if(!this._element.disabled&&!fi(this._element).hasClass(Di)){var t=c._getParentFromElement(this._element),i=fi(this._menu).hasClass(Ii);if(c._clearMenus(),!i){var n={relatedTarget:this._element},o=fi.Event(xi.SHOW,n);if(fi(t).trigger(o),!o.isDefaultPrevented()){// Disable totally Popper.js for Dropdown in Navbar
if(!this._inNavbar){
/**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
if(void 0===pi)throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");var s=this._element;"parent"===this._config.reference?s=t:fe.isElement(this._config.reference)&&(s=this._config.reference,// Check if it's jQuery element
void 0!==this._config.reference.jquery&&(s=this._config.reference[0])),// If boundary is not `scrollParent`, then set position to `static`
// to allow the menu to "escape" the scroll parent's boundaries
// https://github.com/twbs/bootstrap/issues/24251
"scrollParent"!==this._config.boundary&&fi(t).addClass(Hi),this._popper=new pi(s,this._menu,this._getPopperConfig())}// If this is a touch-enabled device we add extra
// empty mouseover listeners to the body's immediate children;
// only needed because of broken event delegation on iOS
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
"ontouchstart"in document.documentElement&&0===fi(t).closest(Fi).length&&fi(document.body).children().on("mouseover",null,fi.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),fi(this._menu).toggleClass(Ii),fi(t).toggleClass(Ii).trigger(fi.Event(xi.SHOWN,n))}}}},e.dispose=function e(){fi.removeData(this._element,vi),fi(this._element).off(yi),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function e(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},// Private
e._addEventListeners=function e(){var t=this;fi(this._element).on(xi.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},e._getConfig=function e(t){return t=a({},this.constructor.Default,fi(this._element).data(),t),fe.typeCheckConfig(gi,t,this.constructor.DefaultType),t},e._getMenuElement=function e(){if(!this._menu){var t=c._getParentFromElement(this._element);t&&(this._menu=t.querySelector(Wi))}return this._menu},e._getPlacement=function e(){var t=fi(this._element.parentNode),i=Ui;// Handle dropup
return t.hasClass(Oi)?(i=qi,fi(this._menu).hasClass(Pi)&&(i=Ri)):t.hasClass($i)?i=Qi:t.hasClass(Ni)?i=Yi:fi(this._menu).hasClass(Pi)&&(i=Bi),i},e._detectNavbar=function e(){return 0<fi(this._element).closest(".navbar").length},e._getPopperConfig=function e(){var t=this,i={};"function"==typeof this._config.offset?i.fn=function(e){return e.offsets=a({},e.offsets,t._config.offset(e.offsets)||{}),e}:i.offset=this._config.offset;var n={placement:this._getPlacement(),modifiers:{offset:i,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(n.modifiers.applyStyle={enabled:!1}),n},// Static
c._jQueryInterface=function e(i){return this.each(function(){var e=fi(this).data(vi),t;if(e||(e=new c(this,"object"==typeof i?i:null),fi(this).data(vi,e)),"string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},c._clearMenus=function e(t){if(!t||3!==t.which&&("keyup"!==t.type||9===t.which))for(var i=[].slice.call(document.querySelectorAll(Li)),n=0,o=i.length;n<o;n++){var s=c._getParentFromElement(i[n]),r=fi(i[n]).data(vi),a={relatedTarget:i[n]};if(t&&"click"===t.type&&(a.clickEvent=t),r){var l=r._menu;if(fi(s).hasClass(Ii)&&!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&9===t.which)&&fi.contains(s,t.target))){var d=fi.Event(xi.HIDE,a);fi(s).trigger(d),d.isDefaultPrevented()||(// If this is a touch-enabled device we remove the extra
// empty mouseover listeners we added for iOS support
"ontouchstart"in document.documentElement&&fi(document.body).children().off("mouseover",null,fi.noop),i[n].setAttribute("aria-expanded","false"),fi(l).removeClass(Ii),fi(s).removeClass(Ii).trigger(fi.Event(xi.HIDDEN,a)))}}}},c._getParentFromElement=function e(t){var i,n=fe.getSelectorFromElement(t);return n&&(i=document.querySelector(n)),i||t.parentNode},// eslint-disable-next-line complexity
c._dataApiKeydownHandler=function e(t){
// If not input/textarea:
//  - And not a key in REGEXP_KEYDOWN => not a dropdown command
// If input/textarea:
//  - If space key => not a dropdown command
//  - If key is other than escape
//    - If key is not up or down => not a dropdown command
//    - If trigger inside the menu => not a dropdown command
if((/input|textarea/i.test(t.target.tagName)?!(32===t.which||27!==t.which&&(40!==t.which&&38!==t.which||fi(t.target).closest(Wi).length)):Ai.test(t.which))&&(t.preventDefault(),t.stopPropagation(),!this.disabled&&!fi(this).hasClass(Di))){var i=c._getParentFromElement(this),n=fi(i).hasClass(Ii);if((n||27===t.which&&32===t.which)&&(!n||27!==t.which&&32!==t.which)){var o=[].slice.call(i.querySelectorAll(zi));if(0!==o.length){var s=o.indexOf(t.target);38===t.which&&0<s&&
// Up
s--,40===t.which&&s<o.length-1&&
// Down
s++,s<0&&(s=0),o[s].focus()}}else{if(27===t.which){var r=i.querySelector(Li);fi(r).trigger("focus")}fi(this).trigger("click")}}},s(c,null,[{key:"VERSION",get:function e(){return mi}},{key:"Default",get:function e(){return Xi}},{key:"DefaultType",get:function e(){return Gi}}]),c}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
fi(document).on(xi.KEYDOWN_DATA_API,Li,Zi._dataApiKeydownHandler).on(xi.KEYDOWN_DATA_API,Wi,Zi._dataApiKeydownHandler).on(xi.CLICK_DATA_API+" "+xi.KEYUP_DATA_API,Zi._clearMenus).on(xi.CLICK_DATA_API,Li,function(e){e.preventDefault(),e.stopPropagation(),Zi._jQueryInterface.call(fi(this),"toggle")}).on(xi.CLICK_DATA_API,Mi,function(e){e.stopPropagation()}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
fi.fn[gi]=Zi._jQueryInterface,fi.fn[gi].Constructor=Zi,fi.fn[gi].noConflict=function(){return fi.fn[gi]=wi,Zi._jQueryInterface},Zi),fi,gi,mi,vi,yi,_i,wi,bi,Ti,ki,Si,Ci,Ei,Ai,xi,Di,Ii,Oi,$i,Ni,Pi,ji,Hi,Li,Mi,Wi,Fi,zi,qi,Ri,Ui,Bi,Qi,Ki,Yi,Vi,Xi,Gi,Zi,Ji=(tn="modal",nn="4.1.3",sn="."+(on="bs.modal"),rn=".data-api",an=(en=t).fn[tn],ln=27,dn={backdrop:!0,keyboard:!0,focus:!0,show:!0},cn={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},un={HIDE:"hide"+sn,HIDDEN:"hidden"+sn,SHOW:"show"+sn,SHOWN:"shown"+sn,FOCUSIN:"focusin"+sn,RESIZE:"resize"+sn,CLICK_DISMISS:"click.dismiss"+sn,KEYDOWN_DISMISS:"keydown.dismiss"+sn,MOUSEUP_DISMISS:"mouseup.dismiss"+sn,MOUSEDOWN_DISMISS:"mousedown.dismiss"+sn,CLICK_DATA_API:"click"+sn+rn},pn="modal-scrollbar-measure",hn="modal-backdrop",fn="modal-open",gn="fade",mn="show",vn=".modal-dialog",yn='[data-toggle="modal"]',_n='[data-dismiss="modal"]',wn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",bn=".sticky-top"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Tn=
/* */
function(){function o(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(vn),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._scrollbarWidth=0}// Getters
var e=o.prototype;
// Public
return e.toggle=function e(t){return this._isShown?this.hide():this.show(t)},e.show=function e(t){var i=this;if(!this._isTransitioning&&!this._isShown){en(this._element).hasClass(gn)&&(this._isTransitioning=!0);var n=en.Event(un.SHOW,{relatedTarget:t});en(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),en(document.body).addClass(fn),this._setEscapeEvent(),this._setResizeEvent(),en(this._element).on(un.CLICK_DISMISS,_n,function(e){return i.hide(e)}),en(this._dialog).on(un.MOUSEDOWN_DISMISS,function(){en(i._element).one(un.MOUSEUP_DISMISS,function(e){en(e.target).is(i._element)&&(i._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return i._showElement(t)}))}},e.hide=function e(t){var i=this;if(t&&t.preventDefault(),!this._isTransitioning&&this._isShown){var n=en.Event(un.HIDE);if(en(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var o=en(this._element).hasClass(gn);if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),en(document).off(un.FOCUSIN),en(this._element).removeClass(mn),en(this._element).off(un.CLICK_DISMISS),en(this._dialog).off(un.MOUSEDOWN_DISMISS),o){var s=fe.getTransitionDurationFromElement(this._element);en(this._element).one(fe.TRANSITION_END,function(e){return i._hideModal(e)}).emulateTransitionEnd(s)}else this._hideModal()}}},e.dispose=function e(){en.removeData(this._element,on),en(window,document,this._element,this._backdrop).off(sn),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},e.handleUpdate=function e(){this._adjustDialog()},// Private
e._getConfig=function e(t){return t=a({},dn,t),fe.typeCheckConfig(tn,t,cn),t},e._showElement=function e(t){var i=this,n=en(this._element).hasClass(gn);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||
// Don't move modal's DOM position
document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,n&&fe.reflow(this._element),en(this._element).addClass(mn),this._config.focus&&this._enforceFocus();var o=en.Event(un.SHOWN,{relatedTarget:t}),s=function e(){i._config.focus&&i._element.focus(),i._isTransitioning=!1,en(i._element).trigger(o)};if(n){var r=fe.getTransitionDurationFromElement(this._element);en(this._dialog).one(fe.TRANSITION_END,s).emulateTransitionEnd(r)}else s()},e._enforceFocus=function e(){var t=this;en(document).off(un.FOCUSIN).on(un.FOCUSIN,function(e){document!==e.target&&t._element!==e.target&&0===en(t._element).has(e.target).length&&t._element.focus()})},e._setEscapeEvent=function e(){var t=this;this._isShown&&this._config.keyboard?en(this._element).on(un.KEYDOWN_DISMISS,function(e){27===e.which&&(e.preventDefault(),t.hide())}):this._isShown||en(this._element).off(un.KEYDOWN_DISMISS)},e._setResizeEvent=function e(){var t=this;this._isShown?en(window).on(un.RESIZE,function(e){return t.handleUpdate(e)}):en(window).off(un.RESIZE)},e._hideModal=function e(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){en(document.body).removeClass(fn),t._resetAdjustments(),t._resetScrollbar(),en(t._element).trigger(un.HIDDEN)})},e._removeBackdrop=function e(){this._backdrop&&(en(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function e(t){var i=this,n=en(this._element).hasClass(gn)?gn:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=hn,n&&this._backdrop.classList.add(n),en(this._backdrop).appendTo(document.body),en(this._element).on(un.CLICK_DISMISS,function(e){i._ignoreBackdropClick?i._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===i._config.backdrop?i._element.focus():i.hide())}),n&&fe.reflow(this._backdrop),en(this._backdrop).addClass(mn),!t)return;if(!n)return void t();var o=fe.getTransitionDurationFromElement(this._backdrop);en(this._backdrop).one(fe.TRANSITION_END,t).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){en(this._backdrop).removeClass(mn);var s=function e(){i._removeBackdrop(),t&&t()};if(en(this._element).hasClass(gn)){var r=fe.getTransitionDurationFromElement(this._backdrop);en(this._backdrop).one(fe.TRANSITION_END,s).emulateTransitionEnd(r)}else s()}else t&&t()},// ----------------------------------------------------------------------
// the following methods are used to handle overflowing modals
// todo (fat): these should probably be refactored out of modal.js
// ----------------------------------------------------------------------
e._adjustDialog=function e(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function e(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function e(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function e(){var o=this;if(this._isBodyOverflowing){
// Note: DOMNode.style.paddingRight returns the actual value or '' if not set
//   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
var t=[].slice.call(document.querySelectorAll(wn)),i=[].slice.call(document.querySelectorAll(bn));// Adjust fixed content padding
en(t).each(function(e,t){var i=t.style.paddingRight,n=en(t).css("padding-right");en(t).data("padding-right",i).css("padding-right",parseFloat(n)+o._scrollbarWidth+"px")}),// Adjust sticky content margin
en(i).each(function(e,t){var i=t.style.marginRight,n=en(t).css("margin-right");en(t).data("margin-right",i).css("margin-right",parseFloat(n)-o._scrollbarWidth+"px")});// Adjust body padding
var n=document.body.style.paddingRight,s=en(document.body).css("padding-right");en(document.body).data("padding-right",n).css("padding-right",parseFloat(s)+this._scrollbarWidth+"px")}},e._resetScrollbar=function e(){
// Restore fixed content padding
var t=[].slice.call(document.querySelectorAll(wn));en(t).each(function(e,t){var i=en(t).data("padding-right");en(t).removeData("padding-right"),t.style.paddingRight=i||""});// Restore sticky content
var i=[].slice.call(document.querySelectorAll(""+bn));en(i).each(function(e,t){var i=en(t).data("margin-right");void 0!==i&&en(t).css("margin-right",i).removeData("margin-right")});// Restore body padding
var n=en(document.body).data("padding-right");en(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},e._getScrollbarWidth=function e(){
// thx d.walsh
var t=document.createElement("div");t.className=pn,document.body.appendChild(t);var i=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),i},// Static
o._jQueryInterface=function e(i,n){return this.each(function(){var e=en(this).data(on),t=a({},dn,en(this).data(),"object"==typeof i&&i?i:{});if(e||(e=new o(this,t),en(this).data(on,e)),"string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i](n)}else t.show&&e.show(n)})},s(o,null,[{key:"VERSION",get:function e(){return nn}},{key:"Default",get:function e(){return dn}}]),o}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
en(document).on(un.CLICK_DATA_API,yn,function(e){var t=this,i,n=fe.getSelectorFromElement(this);n&&(i=document.querySelector(n));var o=en(i).data(on)?"toggle":a({},en(i).data(),en(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var s=en(i).one(un.SHOW,function(e){e.isDefaultPrevented()||s.one(un.HIDDEN,function(){en(t).is(":visible")&&t.focus()})});Tn._jQueryInterface.call(en(i),o,this)}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
en.fn[tn]=Tn._jQueryInterface,en.fn[tn].Constructor=Tn,en.fn[tn].noConflict=function(){return en.fn[tn]=an,Tn._jQueryInterface},Tn),en,tn,nn,on,sn,rn,an,ln,dn,cn,un,pn,hn,fn,gn,mn,vn,yn,_n,wn,bn,Tn,kn=(Cn="tooltip",En="4.1.3",xn="."+(An="bs.tooltip"),Dn=(Sn=t).fn[Cn],In="bs-tooltip",On=new RegExp("(^|\\s)"+In+"\\S+","g"),Pn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!(Nn={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"}),selector:!($n={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"}),placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},Hn="out",Ln={HIDE:"hide"+xn,HIDDEN:"hidden"+xn,SHOW:(jn="show")+xn,SHOWN:"shown"+xn,INSERTED:"inserted"+xn,CLICK:"click"+xn,FOCUSIN:"focusin"+xn,FOCUSOUT:"focusout"+xn,MOUSEENTER:"mouseenter"+xn,MOUSELEAVE:"mouseleave"+xn},Mn="fade",Wn="show",Fn=".tooltip",zn=".tooltip-inner",qn=".arrow",Rn="hover",Un="focus",Bn="click",Qn="manual"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Kn=
/* */
function(){function n(e,t){
/**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
if(void 0===pi)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");// private
this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,// Protected
this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}// Getters
var e=n.prototype;
// Public
return e.enable=function e(){this._isEnabled=!0},e.disable=function e(){this._isEnabled=!1},e.toggleEnabled=function e(){this._isEnabled=!this._isEnabled},e.toggle=function e(t){if(this._isEnabled)if(t){var i=this.constructor.DATA_KEY,n=Sn(t.currentTarget).data(i);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),Sn(t.currentTarget).data(i,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(Sn(this.getTipElement()).hasClass(Wn))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function e(){clearTimeout(this._timeout),Sn.removeData(this.element,this.constructor.DATA_KEY),Sn(this.element).off(this.constructor.EVENT_KEY),Sn(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&Sn(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function e(){var i=this;if("none"===Sn(this.element).css("display"))throw new Error("Please use show on visible elements");var t=Sn.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){Sn(this.element).trigger(t);var n=Sn.contains(this.element.ownerDocument.documentElement,this.element);if(t.isDefaultPrevented()||!n)return;var o=this.getTipElement(),s=fe.getUID(this.constructor.NAME);o.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&Sn(o).addClass(Mn);var r="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,a=this._getAttachment(r);this.addAttachmentClass(a);var l=!1===this.config.container?document.body:Sn(document).find(this.config.container);Sn(o).data(this.constructor.DATA_KEY,this),Sn.contains(this.element.ownerDocument.documentElement,this.tip)||Sn(o).appendTo(l),Sn(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new pi(this.element,o,{placement:a,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:qn},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function e(t){t.originalPlacement!==t.placement&&i._handlePopperPlacementChange(t)},onUpdate:function e(t){i._handlePopperPlacementChange(t)}}),Sn(o).addClass(Wn),// If this is a touch-enabled device we add extra
// empty mouseover listeners to the body's immediate children;
// only needed because of broken event delegation on iOS
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
"ontouchstart"in document.documentElement&&Sn(document.body).children().on("mouseover",null,Sn.noop);var d=function e(){i.config.animation&&i._fixTransition();var t=i._hoverState;i._hoverState=null,Sn(i.element).trigger(i.constructor.Event.SHOWN),t===Hn&&i._leave(null,i)};if(Sn(this.tip).hasClass(Mn)){var c=fe.getTransitionDurationFromElement(this.tip);Sn(this.tip).one(fe.TRANSITION_END,d).emulateTransitionEnd(c)}else d()}},e.hide=function e(t){var i=this,n=this.getTipElement(),o=Sn.Event(this.constructor.Event.HIDE),s=function e(){i._hoverState!==jn&&n.parentNode&&n.parentNode.removeChild(n),i._cleanTipClass(),i.element.removeAttribute("aria-describedby"),Sn(i.element).trigger(i.constructor.Event.HIDDEN),null!==i._popper&&i._popper.destroy(),t&&t()};if(Sn(this.element).trigger(o),!o.isDefaultPrevented()){if(Sn(n).removeClass(Wn),// If this is a touch-enabled device we remove the extra
// empty mouseover listeners we added for iOS support
"ontouchstart"in document.documentElement&&Sn(document.body).children().off("mouseover",null,Sn.noop),this._activeTrigger[Bn]=!1,this._activeTrigger[Un]=!1,this._activeTrigger[Rn]=!1,Sn(this.tip).hasClass(Mn)){var r=fe.getTransitionDurationFromElement(n);Sn(n).one(fe.TRANSITION_END,s).emulateTransitionEnd(r)}else s();this._hoverState=""}},e.update=function e(){null!==this._popper&&this._popper.scheduleUpdate()},// Protected
e.isWithContent=function e(){return Boolean(this.getTitle())},e.addAttachmentClass=function e(t){Sn(this.getTipElement()).addClass(In+"-"+t)},e.getTipElement=function e(){return this.tip=this.tip||Sn(this.config.template)[0],this.tip},e.setContent=function e(){var t=this.getTipElement();this.setElementContent(Sn(t.querySelectorAll(zn)),this.getTitle()),Sn(t).removeClass(Mn+" "+Wn)},e.setElementContent=function e(t,i){var n=this.config.html;"object"==typeof i&&(i.nodeType||i.jquery)?
// Content is a DOM node or a jQuery
n?Sn(i).parent().is(t)||t.empty().append(i):t.text(Sn(i).text()):t[n?"html":"text"](i)},e.getTitle=function e(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},// Private
e._getAttachment=function e(t){return Nn[t.toUpperCase()]},e._setListeners=function e(){var n=this,t;this.config.trigger.split(" ").forEach(function(e){if("click"===e)Sn(n.element).on(n.constructor.Event.CLICK,n.config.selector,function(e){return n.toggle(e)});else if(e!==Qn){var t=e===Rn?n.constructor.Event.MOUSEENTER:n.constructor.Event.FOCUSIN,i=e===Rn?n.constructor.Event.MOUSELEAVE:n.constructor.Event.FOCUSOUT;Sn(n.element).on(t,n.config.selector,function(e){return n._enter(e)}).on(i,n.config.selector,function(e){return n._leave(e)})}Sn(n.element).closest(".modal").on("hide.bs.modal",function(){return n.hide()})}),this.config.selector?this.config=a({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function e(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function e(t,i){var n=this.constructor.DATA_KEY;(i=i||Sn(t.currentTarget).data(n))||(i=new this.constructor(t.currentTarget,this._getDelegateConfig()),Sn(t.currentTarget).data(n,i)),t&&(i._activeTrigger["focusin"===t.type?Un:Rn]=!0),Sn(i.getTipElement()).hasClass(Wn)||i._hoverState===jn?i._hoverState=jn:(clearTimeout(i._timeout),i._hoverState=jn,i.config.delay&&i.config.delay.show?i._timeout=setTimeout(function(){i._hoverState===jn&&i.show()},i.config.delay.show):i.show())},e._leave=function e(t,i){var n=this.constructor.DATA_KEY;(i=i||Sn(t.currentTarget).data(n))||(i=new this.constructor(t.currentTarget,this._getDelegateConfig()),Sn(t.currentTarget).data(n,i)),t&&(i._activeTrigger["focusout"===t.type?Un:Rn]=!1),i._isWithActiveTrigger()||(clearTimeout(i._timeout),i._hoverState=Hn,i.config.delay&&i.config.delay.hide?i._timeout=setTimeout(function(){i._hoverState===Hn&&i.hide()},i.config.delay.hide):i.hide())},e._isWithActiveTrigger=function e(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},e._getConfig=function e(t){return"number"==typeof(t=a({},this.constructor.Default,Sn(this.element).data(),"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),fe.typeCheckConfig(Cn,t,this.constructor.DefaultType),t},e._getDelegateConfig=function e(){var t={};if(this.config)for(var i in this.config)this.constructor.Default[i]!==this.config[i]&&(t[i]=this.config[i]);return t},e._cleanTipClass=function e(){var t=Sn(this.getTipElement()),i=t.attr("class").match(On);null!==i&&i.length&&t.removeClass(i.join(""))},e._handlePopperPlacementChange=function e(t){var i=t.instance;this.tip=i.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},e._fixTransition=function e(){var t=this.getTipElement(),i=this.config.animation;null===t.getAttribute("x-placement")&&(Sn(t).removeClass(Mn),this.config.animation=!1,this.hide(),this.show(),this.config.animation=i)},// Static
n._jQueryInterface=function e(i){return this.each(function(){var e=Sn(this).data(An),t="object"==typeof i&&i;if((e||!/dispose|hide/.test(i))&&(e||(e=new n(this,t),Sn(this).data(An,e)),"string"==typeof i)){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(n,null,[{key:"VERSION",get:function e(){return En}},{key:"Default",get:function e(){return Pn}},{key:"NAME",get:function e(){return Cn}},{key:"DATA_KEY",get:function e(){return An}},{key:"Event",get:function e(){return Ln}},{key:"EVENT_KEY",get:function e(){return xn}},{key:"DefaultType",get:function e(){return $n}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Sn.fn[Cn]=Kn._jQueryInterface,Sn.fn[Cn].Constructor=Kn,Sn.fn[Cn].noConflict=function(){return Sn.fn[Cn]=Dn,Kn._jQueryInterface},Kn),Sn,Cn,En,An,xn,Dn,In,On,$n,Nn,Pn,jn,Hn,Ln,Mn,Wn,Fn,zn,qn,Rn,Un,Bn,Qn,Kn,Yn=(Xn="popover",Gn="4.1.3",Jn="."+(Zn="bs.popover"),eo=(Vn=t).fn[Xn],to="bs-popover",io=new RegExp("(^|\\s)"+to+"\\S+","g"),no=a({},kn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),oo=a({},kn.DefaultType,{content:"(string|element|function)"}),so="fade",ao=".popover-header",lo=".popover-body",co={HIDE:"hide"+Jn,HIDDEN:"hidden"+Jn,SHOW:(ro="show")+Jn,SHOWN:"shown"+Jn,INSERTED:"inserted"+Jn,CLICK:"click"+Jn,FOCUSIN:"focusin"+Jn,FOCUSOUT:"focusout"+Jn,MOUSEENTER:"mouseenter"+Jn,MOUSELEAVE:"mouseleave"+Jn
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},uo=
/* */
function(e){function n(){return e.apply(this,arguments)||this}i(n,e);var t=n.prototype;
// Overrides
return t.isWithContent=function e(){return this.getTitle()||this._getContent()},t.addAttachmentClass=function e(t){Vn(this.getTipElement()).addClass(to+"-"+t)},t.getTipElement=function e(){return this.tip=this.tip||Vn(this.config.template)[0],this.tip},t.setContent=function e(){var t=Vn(this.getTipElement());// We use append for html objects to maintain js events
this.setElementContent(t.find(ao),this.getTitle());var i=this._getContent();"function"==typeof i&&(i=i.call(this.element)),this.setElementContent(t.find(lo),i),t.removeClass(so+" "+ro)},// Private
t._getContent=function e(){return this.element.getAttribute("data-content")||this.config.content},t._cleanTipClass=function e(){var t=Vn(this.getTipElement()),i=t.attr("class").match(io);null!==i&&0<i.length&&t.removeClass(i.join(""))},// Static
n._jQueryInterface=function e(i){return this.each(function(){var e=Vn(this).data(Zn),t="object"==typeof i?i:null;if((e||!/destroy|hide/.test(i))&&(e||(e=new n(this,t),Vn(this).data(Zn,e)),"string"==typeof i)){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(n,null,[{key:"VERSION",
// Getters
get:function e(){return Gn}},{key:"Default",get:function e(){return no}},{key:"NAME",get:function e(){return Xn}},{key:"DATA_KEY",get:function e(){return Zn}},{key:"Event",get:function e(){return co}},{key:"EVENT_KEY",get:function e(){return Jn}},{key:"DefaultType",get:function e(){return oo}}]),n}(kn),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Vn.fn[Xn]=uo._jQueryInterface,Vn.fn[Xn].Constructor=uo,Vn.fn[Xn].noConflict=function(){return Vn.fn[Xn]=eo,uo._jQueryInterface},uo),Vn,Xn,Gn,Zn,Jn,eo,to,io,no,oo,so,ro,ao,lo,co,uo,po=(fo="scrollspy",go="4.1.3",vo="."+(mo="bs.scrollspy"),yo=".data-api",_o=(ho=t).fn[fo],wo={offset:10,method:"auto",target:""},bo={offset:"number",method:"string",target:"(string|element)"},To={ACTIVATE:"activate"+vo,SCROLL:"scroll"+vo,LOAD_DATA_API:"load"+vo+yo},ko="dropdown-item",So="dropdown-menu",Co="active",Eo='[data-spy="scroll"]',Ao=".active",xo=".nav, .list-group",Do=".nav-link",Io=".nav-item",Oo=".list-group-item",$o=".dropdown",No=".dropdown-item",Po=".dropdown-toggle",jo="offset",Ho="position"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Lo=
/* */
function(){function n(e,t){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(t),this._selector=this._config.target+" "+Do+","+this._config.target+" "+Oo+","+this._config.target+" "+No,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,ho(this._scrollElement).on(To.SCROLL,function(e){return i._process(e)}),this.refresh(),this._process()}// Getters
var e=n.prototype;
// Public
return e.refresh=function e(){var t=this,i=this._scrollElement===this._scrollElement.window?jo:Ho,o="auto"===this._config.method?i:this._config.method,s=o===Ho?this._getScrollTop():0,n;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(e){var t,i=fe.getSelectorFromElement(e);if(i&&(t=document.querySelector(i)),t){var n=t.getBoundingClientRect();if(n.width||n.height)
// TODO (fat): remove sketch reliance on jQuery position/offset
return[ho(t)[o]().top+s,i]}return null}).filter(function(e){return e}).sort(function(e,t){return e[0]-t[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},e.dispose=function e(){ho.removeData(this._element,mo),ho(this._scrollElement).off(vo),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},// Private
e._getConfig=function e(t){if("string"!=typeof(t=a({},wo,"object"==typeof t&&t?t:{})).target){var i=ho(t.target).attr("id");i||(i=fe.getUID(fo),ho(t.target).attr("id",i)),t.target="#"+i}return fe.typeCheckConfig(fo,t,bo),t},e._getScrollTop=function e(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function e(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function e(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function e(){var t=this._getScrollTop()+this._config.offset,i=this._getScrollHeight(),n=this._config.offset+i-this._getOffsetHeight();if(this._scrollHeight!==i&&this.refresh(),n<=t){var o=this._targets[this._targets.length-1];this._activeTarget!==o&&this._activate(o)}else{if(this._activeTarget&&t<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var s,r=this._offsets.length;r--;){var a;this._activeTarget!==this._targets[r]&&t>=this._offsets[r]&&(void 0===this._offsets[r+1]||t<this._offsets[r+1])&&this._activate(this._targets[r])}}},e._activate=function e(t){this._activeTarget=t,this._clear();var i=this._selector.split(",");// eslint-disable-next-line arrow-body-style
i=i.map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'});var n=ho([].slice.call(document.querySelectorAll(i.join(","))));n.hasClass(ko)?(n.closest($o).find(Po).addClass(Co),n.addClass(Co)):(
// Set triggered link as active
n.addClass(Co),// Set triggered links parents as active
// With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
n.parents(xo).prev(Do+", "+Oo).addClass(Co),// Handle special case when .nav-link is inside .nav-item
n.parents(xo).prev(Io).children(Do).addClass(Co)),ho(this._scrollElement).trigger(To.ACTIVATE,{relatedTarget:t})},e._clear=function e(){var t=[].slice.call(document.querySelectorAll(this._selector));ho(t).filter(Ao).removeClass(Co)},// Static
n._jQueryInterface=function e(i){return this.each(function(){var e=ho(this).data(mo),t;if(e||(e=new n(this,"object"==typeof i&&i),ho(this).data(mo,e)),"string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(n,null,[{key:"VERSION",get:function e(){return go}},{key:"Default",get:function e(){return wo}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
ho(window).on(To.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(Eo)),t,i=e.length;i--;){var n=ho(e[i]);Lo._jQueryInterface.call(n,n.data())}}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
ho.fn[fo]=Lo._jQueryInterface,ho.fn[fo].Constructor=Lo,ho.fn[fo].noConflict=function(){return ho.fn[fo]=_o,Lo._jQueryInterface},Lo),ho,fo,go,mo,vo,yo,_o,wo,bo,To,ko,So,Co,Eo,Ao,xo,Do,Io,Oo,$o,No,Po,jo,Ho,Lo,Mo=(Fo="tab",zo="4.1.3",Ro="."+(qo="bs.tab"),Uo=".data-api",Bo=(Wo=t).fn.tab,Qo={HIDE:"hide"+Ro,HIDDEN:"hidden"+Ro,SHOW:"show"+Ro,SHOWN:"shown"+Ro,CLICK_DATA_API:"click"+Ro+Uo},Ko="dropdown-menu",Yo="active",Vo="disabled",Xo="fade",Go="show",Zo=".dropdown",Jo=".nav, .list-group",es=".active",ts="> li > .active",is='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',ns=".dropdown-toggle",os="> .dropdown-menu .active"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,ss=
/* */
function(){function n(e){this._element=e}// Getters
var e=n.prototype;
// Public
return e.show=function e(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&Wo(this._element).hasClass(Yo)||Wo(this._element).hasClass(Vo))){var t,o,i=Wo(this._element).closest(Jo)[0],s=fe.getSelectorFromElement(this._element);if(i){var r="UL"===i.nodeName?ts:es;o=(o=Wo.makeArray(Wo(i).find(r)))[o.length-1]}var a=Wo.Event(Qo.HIDE,{relatedTarget:this._element}),l=Wo.Event(Qo.SHOW,{relatedTarget:o});if(o&&Wo(o).trigger(a),Wo(this._element).trigger(l),!l.isDefaultPrevented()&&!a.isDefaultPrevented()){s&&(t=document.querySelector(s)),this._activate(this._element,i);var d=function e(){var t=Wo.Event(Qo.HIDDEN,{relatedTarget:n._element}),i=Wo.Event(Qo.SHOWN,{relatedTarget:o});Wo(o).trigger(t),Wo(n._element).trigger(i)};t?this._activate(t,t.parentNode,d):d()}}},e.dispose=function e(){Wo.removeData(this._element,qo),this._element=null},// Private
e._activate=function e(t,i,n){var o=this,s,r=(s="UL"===i.nodeName?Wo(i).find(ts):Wo(i).children(es))[0],a=n&&r&&Wo(r).hasClass(Xo),l=function e(){return o._transitionComplete(t,r,n)};if(r&&a){var d=fe.getTransitionDurationFromElement(r);Wo(r).one(fe.TRANSITION_END,l).emulateTransitionEnd(d)}else l()},e._transitionComplete=function e(t,i,n){if(i){Wo(i).removeClass(Go+" "+Yo);var o=Wo(i.parentNode).find(os)[0];o&&Wo(o).removeClass(Yo),"tab"===i.getAttribute("role")&&i.setAttribute("aria-selected",!1)}if(Wo(t).addClass(Yo),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),fe.reflow(t),Wo(t).addClass(Go),t.parentNode&&Wo(t.parentNode).hasClass(Ko)){var s=Wo(t).closest(Zo)[0];if(s){var r=[].slice.call(s.querySelectorAll(ns));Wo(r).addClass(Yo)}t.setAttribute("aria-expanded",!0)}n&&n()},// Static
n._jQueryInterface=function e(i){return this.each(function(){var e=Wo(this),t=e.data(qo);if(t||(t=new n(this),e.data(qo,t)),"string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},s(n,null,[{key:"VERSION",get:function e(){return zo}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
Wo(document).on(Qo.CLICK_DATA_API,is,function(e){e.preventDefault(),ss._jQueryInterface.call(Wo(this),"show")}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Wo.fn.tab=ss._jQueryInterface,Wo.fn.tab.Constructor=ss,Wo.fn.tab.noConflict=function(){return Wo.fn.tab=Bo,ss._jQueryInterface},ss),Wo,Fo,zo,qo,Ro,Uo,Bo,Qo,Ko,Yo,Vo,Xo,Go,Zo,Jo,es,ts,is,ns,os,ss;
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
!function(e){if(void 0===e)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=e.fn.jquery.split(" ")[0].split("."),i=1,n=2,o=9,s=1,r=4;if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||4<=t[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(t),e.Util=fe,e.Alert=ge,e.Button=De,e.Carousel=Ke,e.Collapse=At,e.Dropdown=hi,e.Modal=Ji,e.Popover=Yn,e.Scrollspy=po,e.Tab=Mo,e.Tooltip=kn,Object.defineProperty(e,"__esModule",{value:!0})}),
/*! Lity - v2.3.1 - 2018-04-20
* http://sorgalla.com/lity/
* Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
function(t,i){"function"==typeof define&&define.amd?define(["jquery"],function(e){return i(t,e)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=i(t,require("jquery")):t.lity=i(t,t.jQuery||t.Zepto)}("undefined"!=typeof window?window:this,function(e,u){"use strict";function p(e){var t=A();return W&&e.length?(e.one(W,t.resolve),setTimeout(t.resolve,500)):t.resolve(),t.promise()}function h(e,t,i){if(1===arguments.length)return u.extend({},e);if("string"==typeof t){if(void 0===i)return void 0===e[t]?null:e[t];e[t]=i}else u.extend(e,t);return this}function i(e){for(var t=decodeURI(e.split("#")[0]).split("&"),i={},n,o=0,s=t.length;o<s;o++)t[o]&&(i[(n=t[o].split("="))[0]]=n[1]);return i}function n(e,t){return e+(-1<e.indexOf("?")?"&":"?")+u.param(t)}function o(e,t){var i=e.indexOf("#");return-1===i?t:(0<i&&(e=e.substr(i)),t+e)}function r(e){return u('<span class="lity-error"/>').append(e)}function t(e,t){var i=t.opener()&&t.opener().data("lity-desc")||"Image with no description",n=u('<img src="'+e+'" alt="'+i+'"/>'),o=A(),s=function(){o.reject(r("Failed loading image"))};return n.on("load",function(){if(0===this.naturalWidth)return s();o.resolve(n)}).on("error",s),o.promise()}function s(e,t){var i,n,o;try{i=u(e)}catch(e){return!1}return!!i.length&&(n=u('<i style="display:none !important"/>'),o=i.hasClass("lity-hide"),t.element().one("lity:remove",function(){n.before(i).remove(),o&&!i.closest(".lity-content").length&&i.addClass("lity-hide")}),i.removeClass("lity-hide").after(n))}function a(e){var t=j.exec(e);return!!t&&f(o(e,n("https://www.youtube"+(t[2]||"")+".com/embed/"+t[4],u.extend({autoplay:1},i(t[5]||"")))))}function l(e){var t=H.exec(e);return!!t&&f(o(e,n("https://player.vimeo.com/video/"+t[3],u.extend({autoplay:1},i(t[4]||"")))))}function d(e){var t=M.exec(e);return!!t&&(0!==e.indexOf("http")&&(e="https:"+e),f(o(e,n("https://www.facebook.com/plugins/video.php?href="+e,u.extend({autoplay:1},i(t[4]||""))))))}function c(e){var t=L.exec(e);return!!t&&f(o(e,n("https://www.google."+t[3]+"/maps?"+t[6],{output:0<t[6].indexOf("layer=c")?"svembed":"embed"})))}function f(e){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+e+'"/></div>'}function g(){return C.documentElement.clientHeight?C.documentElement.clientHeight:Math.round(E.height())}function m(e){var t=b();t&&(
// ESC key
27===e.keyCode&&t.options("esc")&&t.close(),
// TAB key
9===e.keyCode&&v(e,t))}function v(e,t){var i=t.element().find($),n=i.index(C.activeElement);e.shiftKey&&n<=0?(i.get(i.length-1).focus(),e.preventDefault()):e.shiftKey||n!==i.length-1||(i.get(0).focus(),e.preventDefault())}function y(){u.each(D,function(e,t){t.resize()})}function _(e){1===D.unshift(e)&&(x.addClass("lity-active"),E.on({resize:y,keydown:m})),u("body > *").not(e.element()).addClass("lity-hidden").each(function(){var e=u(this);void 0===e.data(O)&&e.data(O,e.attr(I)||null)}).attr(I,"true")}function w(t){var e;t.element().attr(I,"true"),1===D.length&&(x.removeClass("lity-active"),E.off({resize:y,keydown:m})),(e=(D=u.grep(D,function(e){return t!==e})).length?D[0].element():u(".lity-hidden")).removeClass("lity-hidden").each(function(){var e=u(this),t=e.data(O);t?e.attr(I,t):e.removeAttr(I),e.removeData(O)})}function b(){return 0===D.length?null:D[0]}function T(i,n,o,e){var s="inline",r,a=u.extend({},o);return e&&a[e]?(r=a[e](i,n),s=e):(
// Run inline and iframe handlers after all other handlers
u.each(["inline","iframe"],function(e,t){delete a[t],a[t]=o[t]}),u.each(a,function(e,t){
// Handler might be "removed" by setting callback to null
return!t||(!(!t.test||t.test(i,n))||(!1!==(r=t(i,n))?(s=e,!1):void 0))})),{handler:s,content:r||""}}function k(e,t,i,n){function o(e){c=u(e).css("max-height",g()+"px"),d.find(".lity-loader").each(function(){var e=u(this);p(e).always(function(){e.remove()})}),d.removeClass("lity-loading").find(".lity-content").empty().append(c),a=!0,c.trigger("lity:ready",[s])}var s=this,r,a=!1,l=!1,d,c;t=u.extend({},N,t),d=u(t.template),
// -- API --
s.element=function(){return d},s.opener=function(){return i},s.options=u.proxy(h,s,t),s.handlers=u.proxy(h,s,t.handlers),s.resize=function(){a&&!l&&c.css("max-height",g()+"px").trigger("lity:resize",[s])},s.close=function(){if(a&&!l){l=!0,w(s);var e=A();
// We return focus only if the current focus is inside this instance
if(n&&(C.activeElement===d[0]||u.contains(d[0],C.activeElement)))try{n.focus()}catch(e){
// Ignore exceptions, eg. for SVG elements which can't be
// focused in IE11
}return c.trigger("lity:close",[s]),d.removeClass("lity-opened").addClass("lity-closed"),p(c.add(d)).always(function(){c.trigger("lity:remove",[s]),d.remove(),d=void 0,e.resolve()}),e.promise()}},
// -- Initialization --
r=T(e,s,t.handlers,t.handler),d.attr(I,"false").addClass("lity-loading lity-opened lity-"+r.handler).appendTo("body").focus().on("click","[data-lity-close]",function(e){u(e.target).is("[data-lity-close]")&&s.close()}).trigger("lity:open",[s]),_(s),u.when(r.content).always(o)}function S(e,t,i){e.preventDefault?(e.preventDefault(),e=(i=u(this)).data("lity-target")||i.attr("href")||i.attr("src")):i=u(i);var n=new k(e,u.extend({},i.data("lity-options")||i.data("lity"),t),i,C.activeElement);if(!e.preventDefault)return n}var C=e.document,E=u(e),A=u.Deferred,x=u("html"),D=[],I="aria-hidden",O="lity-"+I,$='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',N={esc:!0,handler:null,handlers:{image:t,inline:s,youtube:a,vimeo:l,googlemaps:c,facebookvideo:d,iframe:f},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},P=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,j=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,H=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,L=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,M=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,W=function(){var e=C.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==e.style[i])return t[i];return!1}();return t.test=function(e){return P.test(e)},S.version="2.3.1",S.options=u.proxy(h,S,N),S.handlers=u.proxy(h,S,N.handlers),S.current=b,u(C).on("click.lity","[data-lity]",S),S}),// Generated by CoffeeScript 1.9.2
/**
@license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */
function(){var I,O;I=this.jQuery||window.jQuery,O=I(window),I.fn.stick_in_parent=function(e){var k,t,S,i,n,C,o,E,A,s,x,D;for(null==e&&(e={}),D=e.sticky_class,C=e.inner_scrolling,x=e.recalc_every,s=e.parent,A=e.offset_top,E=e.spacer,S=e.bottoming,null==A&&(A=0),null==s&&(s=void 0),null==C&&(C=!0),null==D&&(D="is_stuck"),k=I(document),null==S&&(S=!0),i=function(r,a,l,d,c,u,p,h){var f,e,g,m,v,y,_,w,t,b,T,n;if(!r.data("sticky_kit")){if(r.data("sticky_kit",!0),v=k.height(),_=r.parent(),null!=s&&(_=_.closest(s)),!_.length)throw"failed to find stick parent";if(f=g=!1,(T=null!=E?E&&r.closest(E):I("<div />"))&&T.css("position",r.css("position")),(w=function(){var e,t,i;if(!h)return v=k.height(),e=parseInt(_.css("border-top-width"),10),t=parseInt(_.css("padding-top"),10),a=parseInt(_.css("padding-bottom"),10),l=_.offset().top+e+t,d=_.height(),g&&(f=g=!1,null==E&&(r.insertAfter(T),T.detach()),r.css({position:"",top:"",width:"",bottom:""}).removeClass(D),i=!0),c=r.offset().top-(parseInt(r.css("margin-top"),10)||0)-A,u=r.outerHeight(!0),p=r.css("float"),T&&T.css({width:r.outerWidth(!0),height:u,display:r.css("display"),"vertical-align":r.css("vertical-align"),float:p}),i?n():void 0})(),u!==d)return m=void 0,y=A,b=x,n=function(){var e,t,i,n,o,s;if(!h)return i=!1,null!=b&&(b-=1)<=0&&(b=x,w(),i=!0),i||k.height()===v||(w(),i=!0),n=O.scrollTop(),null!=m&&(t=n-m),m=n,g?(S&&(o=d+l<n+u+y,f&&!o&&(f=!1,r.css({position:"fixed",bottom:"",top:y}).trigger("sticky_kit:unbottom"))),n<c&&(g=!1,y=A,null==E&&("left"!==p&&"right"!==p||r.insertAfter(T),T.detach()),e={position:"",width:"",top:""},r.css(e).removeClass(D).trigger("sticky_kit:unstick")),C&&(s=O.height())<u+A&&(f||(y-=t,y=Math.max(s-u,y),y=Math.min(A,y),g&&r.css({top:y+"px"})))):c<n&&(g=!0,(e={position:"fixed",top:y}).width="border-box"===r.css("box-sizing")?r.outerWidth()+"px":r.width()+"px",r.css(e).addClass(D),null==E&&(r.after(T),"left"!==p&&"right"!==p||T.append(r)),r.trigger("sticky_kit:stick")),g&&S&&(null==o&&(o=d+l<n+u+y),!f&&o)?(f=!0,"static"===_.css("position")&&_.css({position:"relative"}),r.css({position:"absolute",bottom:a,top:"auto"}).trigger("sticky_kit:bottom")):void 0},t=function(){return w(),n()},e=function(){if(h=!0,O.off("touchmove",n),O.off("scroll",n),O.off("resize",t),I(document.body).off("sticky_kit:recalc",t),r.off("sticky_kit:detach",e),r.removeData("sticky_kit"),r.css({position:"",bottom:"",top:"",width:""}),_.position("position",""),g)return null==E&&("left"!==p&&"right"!==p||r.insertAfter(T),T.remove()),r.removeClass(D)},O.on("touchmove",n),O.on("scroll",n),O.on("resize",t),I(document.body).on("sticky_kit:recalc",t),r.on("sticky_kit:detach",e),setTimeout(n,0)}},n=0,o=this.length;n<o;n++)t=this[n],i(I(t));return this}}.call(this),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(c){"use strict";var a=window.Slick||{};(a=function(){function e(e,t){var i=this,n;i.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:c(e),appendDots:c(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return c('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},i.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},c.extend(i,i.initials),i.activeBreakpoint=null,i.animType=null,i.animProp=null,i.breakpoints=[],i.breakpointSettings=[],i.cssTransitions=!1,i.focussed=!1,i.interrupted=!1,i.hidden="hidden",i.paused=!0,i.positionProp=null,i.respondTo=null,i.rowCount=1,i.shouldClick=!0,i.$slider=c(e),i.$slidesCache=null,i.transformType=null,i.transitionType=null,i.visibilityChange="visibilitychange",i.windowWidth=0,i.windowTimer=null,n=c(e).data("slick")||{},i.options=c.extend({},i.defaults,t,n),i.currentSlide=i.options.initialSlide,i.originalSettings=i.options,void 0!==document.mozHidden?(i.hidden="mozHidden",i.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(i.hidden="webkitHidden",i.visibilityChange="webkitvisibilitychange"),i.autoPlay=c.proxy(i.autoPlay,i),i.autoPlayClear=c.proxy(i.autoPlayClear,i),i.autoPlayIterator=c.proxy(i.autoPlayIterator,i),i.changeSlide=c.proxy(i.changeSlide,i),i.clickHandler=c.proxy(i.clickHandler,i),i.selectHandler=c.proxy(i.selectHandler,i),i.setPosition=c.proxy(i.setPosition,i),i.swipeHandler=c.proxy(i.swipeHandler,i),i.dragHandler=c.proxy(i.dragHandler,i),i.keyHandler=c.proxy(i.keyHandler,i),i.instanceUid=o++,
// A simple way to check for HTML strings
// Strict HTML recognition (must start with <)
// Extracted from jQuery v1.11 source
i.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,i.registerBreakpoints(),i.init(!0)}var o=0;return e}()).prototype.activateADA=function(){var e;this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},a.prototype.addSlide=a.prototype.slickAdd=function(e,t,i){var n=this;if("boolean"==typeof t)i=t,t=null;else if(t<0||t>=n.slideCount)return!1;n.unload(),"number"==typeof t?0===t&&0===n.$slides.length?c(e).appendTo(n.$slideTrack):i?c(e).insertBefore(n.$slides.eq(t)):c(e).insertAfter(n.$slides.eq(t)):!0===i?c(e).prependTo(n.$slideTrack):c(e).appendTo(n.$slideTrack),n.$slides=n.$slideTrack.children(this.options.slide),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.append(n.$slides),n.$slides.each(function(e,t){c(t).attr("data-slick-index",e)}),n.$slidesCache=n.$slides,n.reinit()},a.prototype.animateHeight=function(){var e=this;if(1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical){var t=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.animate({height:t},e.options.speed)}},a.prototype.animateSlide=function(e,t){var i={},n=this;n.animateHeight(),!0===n.options.rtl&&!1===n.options.vertical&&(e=-e),!1===n.transformsEnabled?!1===n.options.vertical?n.$slideTrack.animate({left:e},n.options.speed,n.options.easing,t):n.$slideTrack.animate({top:e},n.options.speed,n.options.easing,t):!1===n.cssTransitions?(!0===n.options.rtl&&(n.currentLeft=-n.currentLeft),c({animStart:n.currentLeft}).animate({animStart:e},{duration:n.options.speed,easing:n.options.easing,step:function(e){e=Math.ceil(e),!1===n.options.vertical?i[n.animType]="translate("+e+"px, 0px)":i[n.animType]="translate(0px,"+e+"px)",n.$slideTrack.css(i)},complete:function(){t&&t.call()}})):(n.applyTransition(),e=Math.ceil(e),!1===n.options.vertical?i[n.animType]="translate3d("+e+"px, 0px, 0px)":i[n.animType]="translate3d(0px,"+e+"px, 0px)",n.$slideTrack.css(i),t&&setTimeout(function(){n.disableTransition(),t.call()},n.options.speed))},a.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=c(t).not(e.$slider)),t},a.prototype.asNavFor=function(t){var e,i=this.getNavTarget();null!==i&&"object"==typeof i&&i.each(function(){var e=c(this).slick("getSlick");e.unslicked||e.slideHandler(t,!0)})},a.prototype.applyTransition=function(e){var t=this,i={};!1===t.options.fade?i[t.transitionType]=t.transformType+" "+t.options.speed+"ms "+t.options.cssEase:i[t.transitionType]="opacity "+t.options.speed+"ms "+t.options.cssEase,!1===t.options.fade?t.$slideTrack.css(i):t.$slides.eq(e).css(i)},a.prototype.autoPlay=function(){var e=this;e.autoPlayClear(),e.slideCount>e.options.slidesToShow&&(e.autoPlayTimer=setInterval(e.autoPlayIterator,e.options.autoplaySpeed))},a.prototype.autoPlayClear=function(){var e=this;e.autoPlayTimer&&clearInterval(e.autoPlayTimer)},a.prototype.autoPlayIterator=function(){var e=this,t=e.currentSlide+e.options.slidesToScroll;e.paused||e.interrupted||e.focussed||(!1===e.options.infinite&&(1===e.direction&&e.currentSlide+1===e.slideCount-1?e.direction=0:0===e.direction&&(t=e.currentSlide-e.options.slidesToScroll,e.currentSlide-1==0&&(e.direction=1))),e.slideHandler(t))},a.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=c(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=c(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},a.prototype.buildDots=function(){var e=this,t,i;if(!0===e.options.dots&&e.slideCount>e.options.slidesToShow){for(e.$slider.addClass("slick-dotted"),i=c("<ul />").addClass(e.options.dotsClass),t=0;t<=e.getDotCount();t+=1)i.append(c("<li />").append(e.options.customPaging.call(this,e,t)));e.$dots=i.appendTo(e.options.appendDots),e.$dots.find("li").first().addClass("slick-active")}},a.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){c(t).attr("data-slick-index",e).data("originalStyling",c(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?c('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),c("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},a.prototype.buildRows=function(){var e=this,t,i,n,o,s,r,a;if(o=document.createDocumentFragment(),r=e.$slider.children(),0<e.options.rows){for(a=e.options.slidesPerRow*e.options.rows,s=Math.ceil(r.length/a),t=0;t<s;t++){var l=document.createElement("div");for(i=0;i<e.options.rows;i++){var d=document.createElement("div");for(n=0;n<e.options.slidesPerRow;n++){var c=t*a+(i*e.options.slidesPerRow+n);r.get(c)&&d.appendChild(r.get(c))}l.appendChild(d)}o.appendChild(l)}e.$slider.empty().append(o),e.$slider.children().children().children().css({width:100/e.options.slidesPerRow+"%",display:"inline-block"})}},a.prototype.checkResponsive=function(e,t){var i=this,n,o,s,r=!1,a=i.$slider.width(),l=window.innerWidth||c(window).width();if("window"===i.respondTo?s=l:"slider"===i.respondTo?s=a:"min"===i.respondTo&&(s=Math.min(l,a)),i.options.responsive&&i.options.responsive.length&&null!==i.options.responsive){for(n in o=null,i.breakpoints)i.breakpoints.hasOwnProperty(n)&&(!1===i.originalSettings.mobileFirst?s<i.breakpoints[n]&&(o=i.breakpoints[n]):s>i.breakpoints[n]&&(o=i.breakpoints[n]));null!==o?null!==i.activeBreakpoint?(o!==i.activeBreakpoint||t)&&(i.activeBreakpoint=o,"unslick"===i.breakpointSettings[o]?i.unslick(o):(i.options=c.extend({},i.originalSettings,i.breakpointSettings[o]),!0===e&&(i.currentSlide=i.options.initialSlide),i.refresh(e)),r=o):(i.activeBreakpoint=o,"unslick"===i.breakpointSettings[o]?i.unslick(o):(i.options=c.extend({},i.originalSettings,i.breakpointSettings[o]),!0===e&&(i.currentSlide=i.options.initialSlide),i.refresh(e)),r=o):null!==i.activeBreakpoint&&(i.activeBreakpoint=null,i.options=i.originalSettings,!0===e&&(i.currentSlide=i.options.initialSlide),i.refresh(e),r=o),
// only trigger breakpoints during an actual break. not on initialize.
e||!1===r||i.$slider.trigger("breakpoint",[i,r])}},a.prototype.changeSlide=function(e,t){var i=this,n=c(e.currentTarget),o,s,r;
// If target is a link, prevent default action.
switch(n.is("a")&&e.preventDefault(),
// If target is not the <li> element (ie: a child), find the <li>.
n.is("li")||(n=n.closest("li")),o=(r=i.slideCount%i.options.slidesToScroll!=0)?0:(i.slideCount-i.currentSlide)%i.options.slidesToScroll,e.data.message){case"previous":s=0===o?i.options.slidesToScroll:i.options.slidesToShow-o,i.slideCount>i.options.slidesToShow&&i.slideHandler(i.currentSlide-s,!1,t);break;case"next":s=0===o?i.options.slidesToScroll:o,i.slideCount>i.options.slidesToShow&&i.slideHandler(i.currentSlide+s,!1,t);break;case"index":var a=0===e.data.index?0:e.data.index||n.index()*i.options.slidesToScroll;i.slideHandler(i.checkNavigable(a),!1,t),n.children().trigger("focus");break;default:return}},a.prototype.checkNavigable=function(e){var t,i,n;if(n=0,e>(i=this.getNavigableIndexes())[i.length-1])e=i[i.length-1];else for(var o in i){if(e<i[o]){e=n;break}n=i[o]}return e},a.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(c("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",c.proxy(e.interrupt,e,!0)).off("mouseleave.slick",c.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),c(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&c(e.$slideTrack).children().off("click.slick",e.selectHandler),c(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),c(window).off("resize.slick.slick-"+e.instanceUid,e.resize),c("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),c(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},a.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",c.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",c.proxy(e.interrupt,e,!1))},a.prototype.cleanUpRows=function(){var e=this,t;0<e.options.rows&&((t=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(t))},a.prototype.clickHandler=function(e){var t;!1===this.shouldClick&&(e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault())},a.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),c(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){c(this).attr("style",c(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},a.prototype.disableTransition=function(e){var t=this,i={};i[t.transitionType]="",!1===t.options.fade?t.$slideTrack.css(i):t.$slides.eq(e).css(i)},a.prototype.fadeSlide=function(e,t){var i=this;!1===i.cssTransitions?(i.$slides.eq(e).css({zIndex:i.options.zIndex}),i.$slides.eq(e).animate({opacity:1},i.options.speed,i.options.easing,t)):(i.applyTransition(e),i.$slides.eq(e).css({opacity:1,zIndex:i.options.zIndex}),t&&setTimeout(function(){i.disableTransition(e),t.call()},i.options.speed))},a.prototype.fadeSlideOut=function(e){var t=this;!1===t.cssTransitions?t.$slides.eq(e).animate({opacity:0,zIndex:t.options.zIndex-2},t.options.speed,t.options.easing):(t.applyTransition(e),t.$slides.eq(e).css({opacity:0,zIndex:t.options.zIndex-2}))},a.prototype.filterSlides=a.prototype.slickFilter=function(e){var t=this;null!==e&&(t.$slidesCache=t.$slides,t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.filter(e).appendTo(t.$slideTrack),t.reinit())},a.prototype.focusHandler=function(){var i=this;i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(e){e.stopImmediatePropagation();var t=c(this);setTimeout(function(){i.options.pauseOnFocus&&(i.focussed=t.is(":focus"),i.autoPlay())},0)})},a.prototype.getCurrent=a.prototype.slickCurrentSlide=function(){var e;return this.currentSlide},a.prototype.getDotCount=function(){var e=this,t=0,i=0,n=0;if(!0===e.options.infinite)if(e.slideCount<=e.options.slidesToShow)++n;else for(;t<e.slideCount;)++n,t=i+e.options.slidesToScroll,i+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;else if(!0===e.options.centerMode)n=e.slideCount;else if(e.options.asNavFor)for(;t<e.slideCount;)++n,t=i+e.options.slidesToScroll,i+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;else n=1+Math.ceil((e.slideCount-e.options.slidesToShow)/e.options.slidesToScroll);return n-1},a.prototype.getLeft=function(e){var t=this,i,n,o=0,s,r;return t.slideOffset=0,n=t.$slides.first().outerHeight(!0),!0===t.options.infinite?(t.slideCount>t.options.slidesToShow&&(t.slideOffset=t.slideWidth*t.options.slidesToShow*-1,r=-1,!0===t.options.vertical&&!0===t.options.centerMode&&(2===t.options.slidesToShow?r=-1.5:1===t.options.slidesToShow&&(r=-2)),o=n*t.options.slidesToShow*r),t.slideCount%t.options.slidesToScroll!=0&&e+t.options.slidesToScroll>t.slideCount&&t.slideCount>t.options.slidesToShow&&(o=e>t.slideCount?(t.slideOffset=(t.options.slidesToShow-(e-t.slideCount))*t.slideWidth*-1,(t.options.slidesToShow-(e-t.slideCount))*n*-1):(t.slideOffset=t.slideCount%t.options.slidesToScroll*t.slideWidth*-1,t.slideCount%t.options.slidesToScroll*n*-1))):e+t.options.slidesToShow>t.slideCount&&(t.slideOffset=(e+t.options.slidesToShow-t.slideCount)*t.slideWidth,o=(e+t.options.slidesToShow-t.slideCount)*n),t.slideCount<=t.options.slidesToShow&&(o=t.slideOffset=0),!0===t.options.centerMode&&t.slideCount<=t.options.slidesToShow?t.slideOffset=t.slideWidth*Math.floor(t.options.slidesToShow)/2-t.slideWidth*t.slideCount/2:!0===t.options.centerMode&&!0===t.options.infinite?t.slideOffset+=t.slideWidth*Math.floor(t.options.slidesToShow/2)-t.slideWidth:!0===t.options.centerMode&&(t.slideOffset=0,t.slideOffset+=t.slideWidth*Math.floor(t.options.slidesToShow/2)),i=!1===t.options.vertical?e*t.slideWidth*-1+t.slideOffset:e*n*-1+o,!0===t.options.variableWidth&&(s=t.slideCount<=t.options.slidesToShow||!1===t.options.infinite?t.$slideTrack.children(".slick-slide").eq(e):t.$slideTrack.children(".slick-slide").eq(e+t.options.slidesToShow),i=!0===t.options.rtl?s[0]?-1*(t.$slideTrack.width()-s[0].offsetLeft-s.width()):0:s[0]?-1*s[0].offsetLeft:0,!0===t.options.centerMode&&(s=t.slideCount<=t.options.slidesToShow||!1===t.options.infinite?t.$slideTrack.children(".slick-slide").eq(e):t.$slideTrack.children(".slick-slide").eq(e+t.options.slidesToShow+1),i=!0===t.options.rtl?s[0]?-1*(t.$slideTrack.width()-s[0].offsetLeft-s.width()):0:s[0]?-1*s[0].offsetLeft:0,i+=(t.$list.width()-s.outerWidth())/2)),i},a.prototype.getOption=a.prototype.slickGetOption=function(e){var t;return this.options[e]},a.prototype.getNavigableIndexes=function(){var e=this,t=0,i=0,n=[],o;for(o=!1===e.options.infinite?e.slideCount:(t=-1*e.options.slidesToScroll,i=-1*e.options.slidesToScroll,2*e.slideCount);t<o;)n.push(t),t=i+e.options.slidesToScroll,i+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return n},a.prototype.getSlick=function(){return this},a.prototype.getSlideCount=function(){var i=this,e,n,o;return o=!0===i.options.centerMode?i.slideWidth*Math.floor(i.options.slidesToShow/2):0,!0===i.options.swipeToSlide?(i.$slideTrack.find(".slick-slide").each(function(e,t){if(t.offsetLeft-o+c(t).outerWidth()/2>-1*i.swipeLeft)return n=t,!1}),e=Math.abs(c(n).attr("data-slick-index")-i.currentSlide)||1):i.options.slidesToScroll},a.prototype.goTo=a.prototype.slickGoTo=function(e,t){var i;this.changeSlide({data:{message:"index",index:parseInt(e)}},t)},a.prototype.init=function(e){var t=this;c(t.$slider).hasClass("slick-initialized")||(c(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},a.prototype.initADA=function(){var n=this,i=Math.ceil(n.slideCount/n.options.slidesToShow),o=n.getNavigableIndexes().filter(function(e){return 0<=e&&e<n.slideCount});n.$slides.add(n.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==n.$dots&&(n.$slides.not(n.$slideTrack.find(".slick-cloned")).each(function(e){var t=o.indexOf(e);if(c(this).attr({role:"tabpanel",id:"slick-slide"+n.instanceUid+e,tabindex:-1}),-1!==t){var i="slick-slide-control"+n.instanceUid+t;c("#"+i).length&&c(this).attr({"aria-describedby":i})}}),n.$dots.attr("role","tablist").find("li").each(function(e){var t=o[e];c(this).attr({role:"presentation"}),c(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+n.instanceUid+e,"aria-controls":"slick-slide"+n.instanceUid+t,"aria-label":e+1+" of "+i,"aria-selected":null,tabindex:"-1"})}).eq(n.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var e=n.currentSlide,t=e+n.options.slidesToShow;e<t;e++)n.options.focusOnChange?n.$slides.eq(e).attr({tabindex:"0"}):n.$slides.eq(e).removeAttr("tabindex");n.activateADA()},a.prototype.initArrowEvents=function(){var e=this;!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},e.changeSlide),e.$nextArrow.off("click.slick").on("click.slick",{message:"next"},e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow.on("keydown.slick",e.keyHandler),e.$nextArrow.on("keydown.slick",e.keyHandler)))},a.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&(c("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&e.slideCount>e.options.slidesToShow&&c("li",e.$dots).on("mouseenter.slick",c.proxy(e.interrupt,e,!0)).on("mouseleave.slick",c.proxy(e.interrupt,e,!1))},a.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",c.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",c.proxy(e.interrupt,e,!1)))},a.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),c(document).on(e.visibilityChange,c.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&c(e.$slideTrack).children().on("click.slick",e.selectHandler),c(window).on("orientationchange.slick.slick-"+e.instanceUid,c.proxy(e.orientationChange,e)),c(window).on("resize.slick.slick-"+e.instanceUid,c.proxy(e.resize,e)),c("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),c(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),c(e.setPosition)},a.prototype.initUI=function(){var e=this;!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.show(),e.$nextArrow.show()),!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&e.$dots.show()},a.prototype.keyHandler=function(e){var t=this;
//Dont slide if the cursor is inside the form fields and arrow keys are pressed
e.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===e.keyCode&&!0===t.options.accessibility?t.changeSlide({data:{message:!0===t.options.rtl?"next":"previous"}}):39===e.keyCode&&!0===t.options.accessibility&&t.changeSlide({data:{message:!0===t.options.rtl?"previous":"next"}}))},a.prototype.lazyLoad=function(){function e(e){c("img[data-lazy]",e).each(function(){var e=c(this),t=c(this).attr("data-lazy"),i=c(this).attr("data-srcset"),n=c(this).attr("data-sizes")||s.$slider.attr("data-sizes"),o=document.createElement("img");o.onload=function(){e.animate({opacity:0},100,function(){i&&(e.attr("srcset",i),n&&e.attr("sizes",n)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),s.$slider.trigger("lazyLoaded",[s,e,t])})},o.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),s.$slider.trigger("lazyLoadError",[s,e,t])},o.src=t})}var s=this,t,i,n,o;if(!0===s.options.centerMode?o=!0===s.options.infinite?(n=s.currentSlide+(s.options.slidesToShow/2+1))+s.options.slidesToShow+2:(n=Math.max(0,s.currentSlide-(s.options.slidesToShow/2+1)),s.options.slidesToShow/2+1+2+s.currentSlide):(n=s.options.infinite?s.options.slidesToShow+s.currentSlide:s.currentSlide,o=Math.ceil(n+s.options.slidesToShow),!0===s.options.fade&&(0<n&&n--,o<=s.slideCount&&o++)),t=s.$slider.find(".slick-slide").slice(n,o),"anticipated"===s.options.lazyLoad)for(var r=n-1,a=o,l=s.$slider.find(".slick-slide"),d=0;d<s.options.slidesToScroll;d++)r<0&&(r=s.slideCount-1),t=(t=t.add(l.eq(r))).add(l.eq(a)),r--,a++;e(t),s.slideCount<=s.options.slidesToShow?e(i=s.$slider.find(".slick-slide")):s.currentSlide>=s.slideCount-s.options.slidesToShow?e(i=s.$slider.find(".slick-cloned").slice(0,s.options.slidesToShow)):0===s.currentSlide&&e(i=s.$slider.find(".slick-cloned").slice(-1*s.options.slidesToShow))},a.prototype.loadSlider=function(){var e=this;e.setPosition(),e.$slideTrack.css({opacity:1}),e.$slider.removeClass("slick-loading"),e.initUI(),"progressive"===e.options.lazyLoad&&e.progressiveLazyLoad()},a.prototype.next=a.prototype.slickNext=function(){var e;this.changeSlide({data:{message:"next"}})},a.prototype.orientationChange=function(){var e=this;e.checkResponsive(),e.setPosition()},a.prototype.pause=a.prototype.slickPause=function(){var e=this;e.autoPlayClear(),e.paused=!0},a.prototype.play=a.prototype.slickPlay=function(){var e=this;e.autoPlay(),e.options.autoplay=!0,e.paused=!1,e.focussed=!1,e.interrupted=!1},a.prototype.postSlide=function(e){var t=this,i;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&c(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},a.prototype.prev=a.prototype.slickPrev=function(){var e;this.changeSlide({data:{message:"previous"}})},a.prototype.preventDefault=function(e){e.preventDefault()},a.prototype.progressiveLazyLoad=function(e){e=e||1;var t=this,i=c("img[data-lazy]",t.$slider),n,o,s,r,a;i.length?(n=i.first(),o=n.attr("data-lazy"),s=n.attr("data-srcset"),r=n.attr("data-sizes")||t.$slider.attr("data-sizes"),(a=document.createElement("img")).onload=function(){s&&(n.attr("srcset",s),r&&n.attr("sizes",r)),n.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===t.options.adaptiveHeight&&t.setPosition(),t.$slider.trigger("lazyLoaded",[t,n,o]),t.progressiveLazyLoad()},a.onerror=function(){e<3?
/**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
setTimeout(function(){t.progressiveLazyLoad(e+1)},500):(n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),t.$slider.trigger("lazyLoadError",[t,n,o]),t.progressiveLazyLoad())},a.src=o):t.$slider.trigger("allImagesLoaded",[t])},a.prototype.refresh=function(e){var t=this,i,n;n=t.slideCount-t.options.slidesToShow,
// in non-infinite sliders, we don't want to go past the
// last visible index.
!t.options.infinite&&t.currentSlide>n&&(t.currentSlide=n),
// if less slides than to show, go to start.
t.slideCount<=t.options.slidesToShow&&(t.currentSlide=0),i=t.currentSlide,t.destroy(!0),c.extend(t,t.initials,{currentSlide:i}),t.init(),e||t.changeSlide({data:{message:"index",index:i}},!1)},a.prototype.registerBreakpoints=function(){var i=this,e,t,n,o=i.options.responsive||null;if("array"===c.type(o)&&o.length){for(e in i.respondTo=i.options.respondTo||"window",o)if(n=i.breakpoints.length-1,o.hasOwnProperty(e)){
// loop through the breakpoints and cut out any existing
// ones with the same breakpoint number, we don't want dupes.
for(t=o[e].breakpoint;0<=n;)i.breakpoints[n]&&i.breakpoints[n]===t&&i.breakpoints.splice(n,1),n--;i.breakpoints.push(t),i.breakpointSettings[t]=o[e].settings}i.breakpoints.sort(function(e,t){return i.options.mobileFirst?e-t:t-e})}},a.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&c(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},a.prototype.resize=function(){var e=this;c(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=c(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},a.prototype.removeSlide=a.prototype.slickRemove=function(e,t,i){var n=this;if(e="boolean"==typeof e?!0===(t=e)?0:n.slideCount-1:!0===t?--e:e,n.slideCount<1||e<0||e>n.slideCount-1)return!1;n.unload(),!0===i?n.$slideTrack.children().remove():n.$slideTrack.children(this.options.slide).eq(e).remove(),n.$slides=n.$slideTrack.children(this.options.slide),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.append(n.$slides),n.$slidesCache=n.$slides,n.reinit()},a.prototype.setCSS=function(e){var t=this,i={},n,o;!0===t.options.rtl&&(e=-e),n="left"==t.positionProp?Math.ceil(e)+"px":"0px",o="top"==t.positionProp?Math.ceil(e)+"px":"0px",i[t.positionProp]=e,!1===t.transformsEnabled||(!(i={})===t.cssTransitions?i[t.animType]="translate("+n+", "+o+")":i[t.animType]="translate3d("+n+", "+o+", 0px)"),t.$slideTrack.css(i)},a.prototype.setDimensions=function(){var e=this;!1===e.options.vertical?!0===e.options.centerMode&&e.$list.css({padding:"0px "+e.options.centerPadding}):(e.$list.height(e.$slides.first().outerHeight(!0)*e.options.slidesToShow),!0===e.options.centerMode&&e.$list.css({padding:e.options.centerPadding+" 0px"})),e.listWidth=e.$list.width(),e.listHeight=e.$list.height(),!1===e.options.vertical&&!1===e.options.variableWidth?(e.slideWidth=Math.ceil(e.listWidth/e.options.slidesToShow),e.$slideTrack.width(Math.ceil(e.slideWidth*e.$slideTrack.children(".slick-slide").length))):!0===e.options.variableWidth?e.$slideTrack.width(5e3*e.slideCount):(e.slideWidth=Math.ceil(e.listWidth),e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0)*e.$slideTrack.children(".slick-slide").length)));var t=e.$slides.first().outerWidth(!0)-e.$slides.first().width();!1===e.options.variableWidth&&e.$slideTrack.children(".slick-slide").width(e.slideWidth-t)},a.prototype.setFade=function(){var i=this,n;i.$slides.each(function(e,t){n=i.slideWidth*e*-1,!0===i.options.rtl?c(t).css({position:"relative",right:n,top:0,zIndex:i.options.zIndex-2,opacity:0}):c(t).css({position:"relative",left:n,top:0,zIndex:i.options.zIndex-2,opacity:0})}),i.$slides.eq(i.currentSlide).css({zIndex:i.options.zIndex-1,opacity:1})},a.prototype.setHeight=function(){var e=this;if(1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical){var t=e.$slides.eq(e.currentSlide).outerHeight(!0);e.$list.css("height",t)}},a.prototype.setOption=a.prototype.slickSetOption=function(e,t,i){
/**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */
var n=this,o,s,r,a,l=!1,d;if("object"===c.type(e)?(r=e,l=t,d="multiple"):"string"===c.type(e)&&(a=t,l=i,"responsive"===(r=e)&&"array"===c.type(t)?d="responsive":void 0!==t&&(d="single")),"single"===d)n.options[r]=a;else if("multiple"===d)c.each(r,function(e,t){n.options[e]=t});else if("responsive"===d)for(s in a)if("array"!==c.type(n.options.responsive))n.options.responsive=[a[s]];else{
// loop through the responsive object and splice out duplicates.
for(o=n.options.responsive.length-1;0<=o;)n.options.responsive[o].breakpoint===a[s].breakpoint&&n.options.responsive.splice(o,1),o--;n.options.responsive.push(a[s])}l&&(n.unload(),n.reinit())},a.prototype.setPosition=function(){var e=this;e.setDimensions(),e.setHeight(),!1===e.options.fade?e.setCSS(e.getLeft(e.currentSlide)):e.setFade(),e.$slider.trigger("setPosition",[e])},a.prototype.setProps=function(){var e=this,t=document.body.style;e.positionProp=!0===e.options.vertical?"top":"left","top"===e.positionProp?e.$slider.addClass("slick-vertical"):e.$slider.removeClass("slick-vertical"),void 0===t.WebkitTransition&&void 0===t.MozTransition&&void 0===t.msTransition||!0===e.options.useCSS&&(e.cssTransitions=!0),e.options.fade&&("number"==typeof e.options.zIndex?e.options.zIndex<3&&(e.options.zIndex=3):e.options.zIndex=e.defaults.zIndex),void 0!==t.OTransform&&(e.animType="OTransform",e.transformType="-o-transform",e.transitionType="OTransition",void 0===t.perspectiveProperty&&void 0===t.webkitPerspective&&(e.animType=!1)),void 0!==t.MozTransform&&(e.animType="MozTransform",e.transformType="-moz-transform",e.transitionType="MozTransition",void 0===t.perspectiveProperty&&void 0===t.MozPerspective&&(e.animType=!1)),void 0!==t.webkitTransform&&(e.animType="webkitTransform",e.transformType="-webkit-transform",e.transitionType="webkitTransition",void 0===t.perspectiveProperty&&void 0===t.webkitPerspective&&(e.animType=!1)),void 0!==t.msTransform&&(e.animType="msTransform",e.transformType="-ms-transform",e.transitionType="msTransition",void 0===t.msTransform&&(e.animType=!1)),void 0!==t.transform&&!1!==e.animType&&(e.animType="transform",e.transformType="transform",e.transitionType="transition"),e.transformsEnabled=e.options.useTransform&&null!==e.animType&&!1!==e.animType},a.prototype.setSlideClasses=function(e){var t=this,i,n,o,s;if(n=t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),t.$slides.eq(e).addClass("slick-current"),!0===t.options.centerMode){var r=t.options.slidesToShow%2==0?1:0;i=Math.floor(t.options.slidesToShow/2),!0===t.options.infinite&&(i<=e&&e<=t.slideCount-1-i?t.$slides.slice(e-i+r,e+i+1).addClass("slick-active").attr("aria-hidden","false"):(o=t.options.slidesToShow+e,n.slice(o-i+1+r,o+i+2).addClass("slick-active").attr("aria-hidden","false")),0===e?n.eq(n.length-1-t.options.slidesToShow).addClass("slick-center"):e===t.slideCount-1&&n.eq(t.options.slidesToShow).addClass("slick-center")),t.$slides.eq(e).addClass("slick-center")}else 0<=e&&e<=t.slideCount-t.options.slidesToShow?t.$slides.slice(e,e+t.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):n.length<=t.options.slidesToShow?n.addClass("slick-active").attr("aria-hidden","false"):(s=t.slideCount%t.options.slidesToShow,o=!0===t.options.infinite?t.options.slidesToShow+e:e,t.options.slidesToShow==t.options.slidesToScroll&&t.slideCount-e<t.options.slidesToShow?n.slice(o-(t.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):n.slice(o,o+t.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==t.options.lazyLoad&&"anticipated"!==t.options.lazyLoad||t.lazyLoad()},a.prototype.setupInfinite=function(){var e=this,t,i,n;if(!0===e.options.fade&&(e.options.centerMode=!1),!0===e.options.infinite&&!1===e.options.fade&&(i=null,e.slideCount>e.options.slidesToShow)){for(n=!0===e.options.centerMode?e.options.slidesToShow+1:e.options.slidesToShow,t=e.slideCount;t>e.slideCount-n;t-=1)i=t-1,c(e.$slides[i]).clone(!0).attr("id","").attr("data-slick-index",i-e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");for(t=0;t<n+e.slideCount;t+=1)i=t,c(e.$slides[i]).clone(!0).attr("id","").attr("data-slick-index",i+e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");e.$slideTrack.find(".slick-cloned").find("[id]").each(function(){c(this).attr("id","")})}},a.prototype.interrupt=function(e){var t=this;e||t.autoPlay(),t.interrupted=e},a.prototype.selectHandler=function(e){var t=this,i=c(e.target).is(".slick-slide")?c(e.target):c(e.target).parents(".slick-slide"),n=parseInt(i.attr("data-slick-index"));n||(n=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(n,!1,!0):t.slideHandler(n)},a.prototype.slideHandler=function(e,t,i){var n,o,s,r,a=null,l=this,d;if(t=t||!1,!(!0===l.animating&&!0===l.options.waitForAnimate||!0===l.options.fade&&l.currentSlide===e))if(!1===t&&l.asNavFor(e),n=e,a=l.getLeft(n),r=l.getLeft(l.currentSlide),l.currentLeft=null===l.swipeLeft?r:l.swipeLeft,!1===l.options.infinite&&!1===l.options.centerMode&&(e<0||e>l.getDotCount()*l.options.slidesToScroll))!1===l.options.fade&&(n=l.currentSlide,!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(r,function(){l.postSlide(n)}):l.postSlide(n));else if(!1===l.options.infinite&&!0===l.options.centerMode&&(e<0||e>l.slideCount-l.options.slidesToScroll))!1===l.options.fade&&(n=l.currentSlide,!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(r,function(){l.postSlide(n)}):l.postSlide(n));else{if(l.options.autoplay&&clearInterval(l.autoPlayTimer),o=n<0?l.slideCount%l.options.slidesToScroll!=0?l.slideCount-l.slideCount%l.options.slidesToScroll:l.slideCount+n:n>=l.slideCount?l.slideCount%l.options.slidesToScroll!=0?0:n-l.slideCount:n,l.animating=!0,l.$slider.trigger("beforeChange",[l,l.currentSlide,o]),s=l.currentSlide,l.currentSlide=o,l.setSlideClasses(l.currentSlide),l.options.asNavFor&&(d=(d=l.getNavTarget()).slick("getSlick")).slideCount<=d.options.slidesToShow&&d.setSlideClasses(l.currentSlide),l.updateDots(),l.updateArrows(),!0===l.options.fade)return!0!==i?(l.fadeSlideOut(s),l.fadeSlide(o,function(){l.postSlide(o)})):l.postSlide(o),void l.animateHeight();!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(a,function(){l.postSlide(o)}):l.postSlide(o)}},a.prototype.startLoad=function(){var e=this;!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow.hide(),e.$nextArrow.hide()),!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&e.$dots.hide(),e.$slider.addClass("slick-loading")},a.prototype.swipeDirection=function(){var e,t,i,n,o=this;return e=o.touchObject.startX-o.touchObject.curX,t=o.touchObject.startY-o.touchObject.curY,i=Math.atan2(t,e),(n=Math.round(180*i/Math.PI))<0&&(n=360-Math.abs(n)),n<=45&&0<=n?!1===o.options.rtl?"left":"right":n<=360&&315<=n?!1===o.options.rtl?"left":"right":135<=n&&n<=225?!1===o.options.rtl?"right":"left":!0===o.options.verticalSwiping?35<=n&&n<=135?"down":"up":"vertical"},a.prototype.swipeEnd=function(e){var t=this,i,n;if(t.dragging=!1,t.swiping=!1,t.scrolling)return t.scrolling=!1;if(t.interrupted=!1,t.shouldClick=!(10<t.touchObject.swipeLength),void 0===t.touchObject.curX)return!1;if(!0===t.touchObject.edgeHit&&t.$slider.trigger("edge",[t,t.swipeDirection()]),t.touchObject.swipeLength>=t.touchObject.minSwipe){switch(n=t.swipeDirection()){case"left":case"down":i=t.options.swipeToSlide?t.checkNavigable(t.currentSlide+t.getSlideCount()):t.currentSlide+t.getSlideCount(),t.currentDirection=0;break;case"right":case"up":i=t.options.swipeToSlide?t.checkNavigable(t.currentSlide-t.getSlideCount()):t.currentSlide-t.getSlideCount(),t.currentDirection=1;break;default:}"vertical"!=n&&(t.slideHandler(i),t.touchObject={},t.$slider.trigger("swipe",[t,n]))}else t.touchObject.startX!==t.touchObject.curX&&(t.slideHandler(t.currentSlide),t.touchObject={})},a.prototype.swipeHandler=function(e){var t=this;if(!(!1===t.options.swipe||"ontouchend"in document&&!1===t.options.swipe||!1===t.options.draggable&&-1!==e.type.indexOf("mouse")))switch(t.touchObject.fingerCount=e.originalEvent&&void 0!==e.originalEvent.touches?e.originalEvent.touches.length:1,t.touchObject.minSwipe=t.listWidth/t.options.touchThreshold,!0===t.options.verticalSwiping&&(t.touchObject.minSwipe=t.listHeight/t.options.touchThreshold),e.data.action){case"start":t.swipeStart(e);break;case"move":t.swipeMove(e);break;case"end":t.swipeEnd(e);break}},a.prototype.swipeMove=function(e){var t=this,i=!1,n,o,s,r,a,l;return a=void 0!==e.originalEvent?e.originalEvent.touches:null,!(!t.dragging||t.scrolling||a&&1!==a.length)&&(n=t.getLeft(t.currentSlide),t.touchObject.curX=void 0!==a?a[0].pageX:e.clientX,t.touchObject.curY=void 0!==a?a[0].pageY:e.clientY,t.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(t.touchObject.curX-t.touchObject.startX,2))),l=Math.round(Math.sqrt(Math.pow(t.touchObject.curY-t.touchObject.startY,2))),!t.options.verticalSwiping&&!t.swiping&&4<l?!(t.scrolling=!0):(!0===t.options.verticalSwiping&&(t.touchObject.swipeLength=l),o=t.swipeDirection(),void 0!==e.originalEvent&&4<t.touchObject.swipeLength&&(t.swiping=!0,e.preventDefault()),r=(!1===t.options.rtl?1:-1)*(t.touchObject.curX>t.touchObject.startX?1:-1),!0===t.options.verticalSwiping&&(r=t.touchObject.curY>t.touchObject.startY?1:-1),s=t.touchObject.swipeLength,(t.touchObject.edgeHit=!1)===t.options.infinite&&(0===t.currentSlide&&"right"===o||t.currentSlide>=t.getDotCount()&&"left"===o)&&(s=t.touchObject.swipeLength*t.options.edgeFriction,t.touchObject.edgeHit=!0),!1===t.options.vertical?t.swipeLeft=n+s*r:t.swipeLeft=n+s*(t.$list.height()/t.listWidth)*r,!0===t.options.verticalSwiping&&(t.swipeLeft=n+s*r),!0!==t.options.fade&&!1!==t.options.touchMove&&(!0===t.animating?(t.swipeLeft=null,!1):void t.setCSS(t.swipeLeft))))},a.prototype.swipeStart=function(e){var t=this,i;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return!(t.touchObject={});void 0!==e.originalEvent&&void 0!==e.originalEvent.touches&&(i=e.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==i?i.pageX:e.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==i?i.pageY:e.clientY,t.dragging=!0},a.prototype.unfilterSlides=a.prototype.slickUnfilter=function(){var e=this;null!==e.$slidesCache&&(e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.appendTo(e.$slideTrack),e.reinit())},a.prototype.unload=function(){var e=this;c(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},a.prototype.unslick=function(e){var t=this;t.$slider.trigger("unslick",[t,e]),t.destroy()},a.prototype.updateArrows=function(){var e=this,t;t=Math.floor(e.options.slidesToShow/2),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&!1===e.options.centerMode?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&!0===e.options.centerMode&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},a.prototype.updateDots=function(){var e=this;null!==e.$dots&&(e.$dots.find("li").removeClass("slick-active").end(),e.$dots.find("li").eq(Math.floor(e.currentSlide/e.options.slidesToScroll)).addClass("slick-active"))},a.prototype.visibility=function(){var e=this;e.options.autoplay&&(document[e.hidden]?e.interrupted=!0:e.interrupted=!1)},c.fn.slick=function(e){var t=this,i=e,n=Array.prototype.slice.call(arguments,1),o=t.length,s,r;for(s=0;s<o;s++)if("object"==typeof i||void 0===i?t[s].slick=new a(t[s],i):r=t[s].slick[i].apply(t[s].slick,n),void 0!==r)return r;return t}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(l){var n=-1,o=-1,d=function(e){return parseFloat(e)||0},c=function(e){var t=1,i=l(e),n=null,o=[];return i.each(function(){var e=l(this),t=e.offset().top-d(e.css("margin-top")),i=0<o.length?o[o.length-1]:null;null===i?o.push(e):Math.floor(Math.abs(n-t))<=1?o[o.length-1]=i.add(e):o.push(e),n=t}),o},u=function(e){var t={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?l.extend(t,e):("boolean"==typeof e?t.byRow=e:"remove"===e&&(t.remove=!0),t)},p=l.fn.matchHeight=function(e){var t=u(e);if(t.remove){var i=this;return this.css(t.property,""),l.each(p._groups,function(e,t){t.elements=t.elements.not(i)}),this}return this.length<=1&&!t.target||(p._groups.push({elements:this,options:t}),p._apply(this,t)),this};p.version="0.7.2",p._groups=[],p._throttle=80,p._maintainScroll=!1,p._beforeUpdate=null,p._afterUpdate=null,p._rows=c,p._parse=d,p._parseOptions=u,p._apply=function(e,t){var s=u(t),i=l(e),n=[i],o=l(window).scrollTop(),r=l("html").outerHeight(!0),a=i.parents().filter(":hidden");return a.each(function(){var e=l(this);e.data("style-cache",e.attr("style"))}),a.css("display","block"),s.byRow&&!s.target&&(i.each(function(){var e=l(this),t=e.css("display");"inline-block"!==t&&"flex"!==t&&"inline-flex"!==t&&(t="block"),e.data("style-cache",e.attr("style")),e.css({display:t,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),n=c(i),i.each(function(){var e=l(this);e.attr("style",e.data("style-cache")||"")})),l.each(n,function(e,t){var i=l(t),o=0;if(s.target)o=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var e=l(this),t=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var n={display:i};n[s.property]="",e.css(n),e.outerHeight(!1)>o&&(o=e.outerHeight(!1)),t?e.attr("style",t):e.css("display","")})}i.each(function(){var e=l(this),t=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(t+=d(e.css("border-top-width"))+d(e.css("border-bottom-width")),t+=d(e.css("padding-top"))+d(e.css("padding-bottom"))),e.css(s.property,o-t+"px"))})}),a.each(function(){var e=l(this);e.attr("style",e.data("style-cache")||null)}),p._maintainScroll&&l(window).scrollTop(o/r*l("html").outerHeight(!0)),this},p._applyDataApi=function(){var i={};l("[data-match-height], [data-mh]").each(function(){var e=l(this),t=e.attr("data-mh")||e.attr("data-match-height");i[t]=t in i?i[t].add(e):e}),l.each(i,function(){this.matchHeight(!0)})};var s=function(e){p._beforeUpdate&&p._beforeUpdate(e,p._groups),l.each(p._groups,function(){p._apply(this.elements,this.options)}),p._afterUpdate&&p._afterUpdate(e,p._groups)};p._update=function(e,t){if(t&&"resize"===t.type){var i=l(window).width();if(i===n)return;n=i}e?-1===o&&(o=setTimeout(function(){s(t),o=-1},p._throttle)):s(t)},l(p._applyDataApi);var e=l.fn.on?"on":"bind";l(window)[e]("load",function(e){p._update(!1,e)}),l(window)[e]("resize orientationchange",function(e){p._update(!0,e)})}),function(e){e(document).ready(function(){
// Matchheight
function e(){var e=jQuery("footer").height(),t=jQuery("header").height(),i,n=jQuery(window).height()-e-t-35;jQuery("#content").css("min-height",n)}e(),jQuery(window).resize(function(){e()})})}(jQuery),function(e){e(document).ready(function(){e(".js-slick-events").slick({dots:!0,infinite:!1,speed:300,slidesToShow:3,slidesToScroll:3,responsive:[{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})})}(jQuery),function(n){n(document).ready(function(){n(".mod-aanbodfilter a").mouseover(function(){var e=n(this).attr("data-aanbodfilter");n("a."+e).addClass("opacity1")}),n(".mod-aanbodfilter a").mouseleave(function(){n("a").removeClass("opacity1")}),n("a[data-aanbodfilter]").on("click",function(e){e.preventDefault(),n(".block").removeClass("active"),n(this).addClass("active"),n(".space .row").removeClass().addClass("row"),n(".space .row .block").closest(".row").addClass("aanbod");var t=n(this).attr("data-aanbodfilter"),i=n(".space ."+t);i.addClass("active"),n(".space .row").each(function(){n(this).addClass("active").addClass(t),n(this).find(".block").is(".links.active")&&n(this).addClass("links"),n(this).find(".block").is(".rechts.active")&&n(this).addClass("rechts")}),i.hasClass("detour")&&n(".hbar").closest(".row").addClass("rechts")})})}(jQuery),function(e){e(document).ready(function(){e(".card").matchHeight()})}(jQuery),function(e){e(document).ready(function(){e(".mod-filterbar label").hasClass("active")?e(".mod-filterbar").addClass("active"):e(".mod-filterbar").removeClass("active"),e(".mod-eventfilter-agenda").stick_in_parent(),e(".mod-filterbar label").click(function(){e(this).closest(".mod-filterbar").find("input").is(":checked")?e(this).closest(".mod-filterbar").addClass("active"):e(this).closest(".mod-filterbar").removeClass("active")})})}(jQuery),function(n){n(document).ready(function(){
// tablet "one touch (click)" X "hover" > link redirection
n("a[href]").on("touchmove touchend",function(e){
// if touchmove>touchend, set the data() for this element to true. then leave touchmove & let touchend fail(data=true) redirection
if("touchmove"!=e.type){
// if it's a simple touchend, data() for this element doesn't exist.
if("touchend"==e.type&&!n.data(this,"touchmove_cancel_redirection")){var t,i=n(this).attr("href");window.location=i}
// if touchmove>touchend, to be redirected on a future simple touchend for this element
n.data(this,"touchmove_cancel_redirection",!1)}else n.data(this,"touchmove_cancel_redirection",!0)})})}(jQuery),function(e){e(document).ready(function(){e(".js-menu").on("click",function(){e("body").toggleClass("menuopen"),e("body").toggleClass("opensidemenu"),e(".js-mobilemenu").toggleClass("open")}),jQuery(window).resize(function(){e("body").removeClass("menuopen").removeClass("opensidemenu")})})}(jQuery),function(t){t(document).ready(function(){t(window).scroll(function(){var e;100<=t(window).scrollTop()?t("header").addClass("scrolled"):t("header").removeClass("scrolled")})})}(jQuery),function(i){i(document).ready(function(){jQuery(".js-now").on("click",function(){var e=i(".datenow").text(),t=i(".timenow").text();i(".js-datepicker").attr("value",e),i(".js-timepicker").attr("value",t)})})}(jQuery);