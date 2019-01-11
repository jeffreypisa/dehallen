/*!
  * Bootstrap v4.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e(t.bootstrap={},t.jQuery)}(this,function(t,e){"use strict";function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(t){o(e,t,i[t])})}return e}function i(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */function r(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}function l(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},Ve))}}
/**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
function d(t){var e;return t&&"[object Function]"==={}.toString.call(t)}
/**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */function w(t,e){if(1!==t.nodeType)return[];
// NOTE: 1 DOM access here
var i=getComputedStyle(t,null);return e?i[e]:i}
/**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */function h(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}
/**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */function g(t){
// Return body, `getScroll` will take care to get the correct `scrollTop` from it
if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}
// Firefox want us to check `-x` and `-y` variations as well
var e=w(t),i=e.overflow,n=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(i+o+n)?t:g(h(t))}
/**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
function m(t){return 11===t?Je:10===t?ti:Je||ti}
/**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */function _(t){if(!t)return document.documentElement;
// Skip hidden elements which don't have an offsetParent
for(var e=m(10)?document.body:null,i=t.offsetParent
// NOTE: 1 DOM access here
;i===e&&t.nextElementSibling;)i=(t=t.nextElementSibling).offsetParent;var n=i&&i.nodeName;return n&&"BODY"!==n&&"HTML"!==n?
// .offsetParent will return the closest TD or TABLE in case
// no offsetParent is present, I hate this job...
-1!==["TD","TABLE"].indexOf(i.nodeName)&&"static"===w(i,"position")?_(i):i:t?t.ownerDocument.documentElement:document.documentElement}function c(t){var e=t.nodeName;return"BODY"!==e&&("HTML"===e||_(t.firstElementChild)===t)}
/**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */function u(t){return null!==t.parentNode?u(t.parentNode):t}
/**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */function f(t,e){
// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;
// Here we make sure to give as "start" the element that comes first in the DOM
var i=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,n=i?t:e,o=i?e:t,s=document.createRange();s.setStart(n,0),s.setEnd(o,0);var r=s.commonAncestorContainer;
// Both nodes are inside #document
if(t!==r&&e!==r||n.contains(o))return c(r)?r:_(r);
// one of the nodes is inside shadowDOM, find which one
var a=u(t);return a.host?f(a.host,e):f(t,u(e).host)}
/**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */function p(t,e
/*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */){var i,n="top"===(1<arguments.length&&void 0!==e?e:"top")?"scrollTop":"scrollLeft",o=t.nodeName;if("BODY"!==o&&"HTML"!==o)return t[n];var s=t.ownerDocument.documentElement,r;return(t.ownerDocument.scrollingElement||s)[n]}function v(t,e,i
/*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */){var n=2<arguments.length&&void 0!==i&&i,o=p(e,"top"),s=p(e,"left"),r=n?-1:1;return t.top+=o*r,t.bottom+=o*r,t.left+=s*r,t.right+=s*r,t}function y(t,e){var i="x"===e?"Left":"Top",n="Left"===i?"Right":"Bottom";return parseFloat(t["border"+i+"Width"],10)+parseFloat(t["border"+n+"Width"],10)}function b(t,e,i,n){return Math.max(e["offset"+t],e["scroll"+t],i["client"+t],i["offset"+t],i["scroll"+t],m(10)?i["offset"+t]+n["margin"+("Height"===t?"Top":"Left")]+n["margin"+("Height"===t?"Bottom":"Right")]:0)}function T(){var t=document.body,e=document.documentElement,i=m(10)&&getComputedStyle(e);return{height:b("Height",t,e,i),width:b("Width",t,e,i)}}
/**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
function k(t){return oi({},t,{right:t.left+t.width,bottom:t.top+t.height})}
/**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */function C(t){var e={};
// IE10 10 FIX: Please, don't ask, the element isn't
// considered in DOM in some circumstances...
// This isn't reproducible in IE10 compatibility mode of IE11
try{if(m(10)){e=t.getBoundingClientRect();var i=p(t,"top"),n=p(t,"left");e.top+=i,e.left+=n,e.bottom+=i,e.right+=n}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},s="HTML"===t.nodeName?T():{},r=s.width||t.clientWidth||o.right-o.left,a=s.height||t.clientHeight||o.bottom-o.top,l=t.offsetWidth-r,d=t.offsetHeight-a;
// subtract scrollbar size from sizes
// if an hypothetical scrollbar is detected, we must be sure it's not a `border`
// we make this check conditional for performance reasons
if(l||d){var c=w(t);l-=y(c,"x"),d-=y(c,"y"),o.width-=l,o.height-=d}return k(o)}function S(t,e,i){var n=2<arguments.length&&void 0!==i&&i,o=m(10),s="HTML"===e.nodeName,r=C(t),a=C(e),l=g(t),d=w(e),c=parseFloat(d.borderTopWidth,10),u=parseFloat(d.borderLeftWidth,10);
// In cases where the parent is fixed, we must ignore negative scroll in offset calc
n&&"HTML"===e.nodeName&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var p=k({top:r.top-a.top-c,left:r.left-a.left-u,width:r.width,height:r.height});
// Subtract margins of documentElement in case it's being used as parent
// we do this only on HTML because it's the only element that behaves
// differently when margins are applied to it. The margins are included in
// the box of the documentElement, in the other cases not.
if(p.marginTop=0,p.marginLeft=0,!o&&s){var h=parseFloat(d.marginTop,10),f=parseFloat(d.marginLeft,10);p.top-=c-h,p.bottom-=c-h,p.left-=u-f,p.right-=u-f,
// Attach marginTop and marginLeft because in some circumstances we may need them
p.marginTop=h,p.marginLeft=f}return(o&&!n?e.contains(l):e===l&&"BODY"!==l.nodeName)&&(p=v(p,e)),p}function E(t,e
/**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */){var i=1<arguments.length&&void 0!==e&&e,n=t.ownerDocument.documentElement,o=S(t,n),s=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=i?0:p(n),l=i?0:p(n,"left"),d;return k({top:a-o.top+o.marginTop,left:l-o.left+o.marginLeft,width:s,height:r})}function A(t){var e=t.nodeName;return"BODY"!==e&&"HTML"!==e&&("fixed"===w(t,"position")||A(h(t)))}
/**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */function x(t){
// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!t||!t.parentElement||m())return document.documentElement;for(var e=t.parentElement;e&&"none"===w(e,"transform");)e=e.parentElement;return e||document.documentElement}
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
   */function D(t,e,i,n,o){var s=4<arguments.length&&void 0!==o&&o,r={top:0,left:0},a=s?x(t):f(t,e);
// NOTE: 1 DOM access here
// Handle viewport case
if("viewport"===n)r=E(a,s);else{
// Handle other cases based on DOM element used as boundaries
var l=void 0;"scrollParent"===n?"BODY"===(l=g(h(e))).nodeName&&(l=t.ownerDocument.documentElement):l="window"===n?t.ownerDocument.documentElement:n;var d=S(l,a,s);
// In case of HTML, we need a different computation
if("HTML"!==l.nodeName||A(a))
// for all the other DOM elements, this one is good
r=d;else{var c=T(),u=c.height,p=c.width;r.top+=d.top-d.marginTop,r.bottom=u+d.top,r.left+=d.left-d.marginLeft,r.right=p+d.left}}
// Add paddings
return r.left+=i,r.top+=i,r.right-=i,r.bottom-=i,r}function I(t){var e,i;return t.width*t.height}
/**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function O(t,e,n,i,o,s
/**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */){var r=5<arguments.length&&void 0!==s?s:0;if(-1===t.indexOf("auto"))return t;var a=D(n,i,r,o),l={top:{width:a.width,height:e.top-a.top},right:{width:a.right-e.right,height:a.height},bottom:{width:a.width,height:a.bottom-e.bottom},left:{width:e.left-a.left,height:a.height}},d=Object.keys(l).map(function(t){return oi({key:t},l[t],{area:I(l[t])})}).sort(function(t,e){return e.area-t.area}),c=d.filter(function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight}),u=0<c.length?c[0].key:d[0].key,p=t.split("-")[1];return u+(p?"-"+p:"")}function $(t,e,i,n
/**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */){var o=3<arguments.length&&void 0!==n?n:null,s;return S(i,o?x(e):f(e,i),o)}function N(t){var e=getComputedStyle(t),i=parseFloat(e.marginTop)+parseFloat(e.marginBottom),n=parseFloat(e.marginLeft)+parseFloat(e.marginRight),o;return{width:t.offsetWidth+n,height:t.offsetHeight+i}}
/**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */function j(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}
/**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */function P(t,e,i){i=i.split("-")[0];
// Get popper node sizes
var n=N(t),o={width:n.width,height:n.height},s=-1!==["right","left"].indexOf(i),r=s?"top":"left",a=s?"left":"top",l=s?"height":"width",d=s?"width":"height";
// Add position, width and height to our offsets object
return o[r]=e[r]+e[l]/2-n[l]/2,o[a]=i===a?e[a]-n[d]:e[j(a)],o}
/**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */function H(t,e){
// use native find if supported
return Array.prototype.find?t.find(e):t.filter(e)[0];
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
   */function L(t,e,i){
// use native findIndex if supported
if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===i});
// use `find` + `indexOf` if `findIndex` isn't supported
var n=H(t,function(t){return t[e]===i});return t.indexOf(n)}
/**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */function M(t,i,e){var n;return(void 0===e?t:t.slice(0,L(t,"name",e))).forEach(function(t){t.function&&
// eslint-disable-line dot-notation
console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var e=t.function||t.fn;// eslint-disable-line dot-notation
t.enabled&&d(e)&&(
// Add properties to offsets to make them a complete clientRect object
// we do this before each modifier to make sure the previous one doesn't
// mess with these values
i.offsets.popper=k(i.offsets.popper),i.offsets.reference=k(i.offsets.reference),i=e(i,t))}),i}
/**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */function W(){
// if popper is destroyed, don't perform any further update
if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};
// compute reference element offsets
t.offsets.reference=$(this.state,this.popper,this.reference,this.options.positionFixed),
// compute auto placement, store placement inside the data object,
// modifiers will be able to edit `placement` if needed
// and refer to originalPlacement to know the original value
t.placement=O(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),
// store the computed placement inside `originalPlacement`
t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,
// compute the popper offsets
t.offsets.popper=P(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",
// run the modifiers
t=M(this.modifiers,t),
// the first `update` will call `onCreate` callback
// the other ones will call `onUpdate` callback
this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}
/**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */function F(t,n){return t.some(function(t){var e=t.name,i;return t.enabled&&e===n})}
/**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */function z(t){for(var e=[!1,"ms","Webkit","Moz","O"],i=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<e.length;n++){var o=e[n],s=o?""+o+i:t;if(void 0!==document.body.style[s])return s}return null}
/**
   * Destroy the popper
   * @method
   * @memberof Popper
   */function R(){return this.state.isDestroyed=!0,
// touch DOM only if `applyStyle` modifier is enabled
F(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[z("transform")]=""),this.disableEventListeners(),
// remove the popper if user explicity asked for the deletion on destroy
// do not use `remove` because IE11 doesn't support it
this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}
/**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */function U(t){var e=t.ownerDocument;return e?e.defaultView:window}function B(t,e,i,n){var o="BODY"===t.nodeName,s=o?t.ownerDocument.defaultView:t;s.addEventListener(e,i,{passive:!0}),o||B(g(s.parentNode),e,i,n),n.push(s)}
/**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function Q(t,e,i,n){
// Resize event listener on window
i.updateBound=n,U(t).addEventListener("resize",i.updateBound,{passive:!0});
// Scroll event listener on scroll parents
var o=g(t);return B(o,"scroll",i.updateBound,i.scrollParents),i.scrollElement=o,i.eventsEnabled=!0,i}
/**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */function q(){this.state.eventsEnabled||(this.state=Q(this.reference,this.options,this.state,this.scheduleUpdate))}
/**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function K(t,e){
// Remove resize event listener on window
return U(t).removeEventListener("resize",e.updateBound),
// Remove scroll event listener on scroll parents
e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),
// Reset state
e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e}
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
   */function V(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}
/**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function X(i,n){Object.keys(n).forEach(function(t){var e="";
// add unit if the value is numeric and is one of the following
-1!==["width","height","top","right","bottom","left"].indexOf(t)&&V(n[t])&&(e="px"),i.style[t]=n[t]+e})}
/**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function G(i,n){Object.keys(n).forEach(function(t){var e;!1!==n[t]?i.setAttribute(t,n[t]):i.removeAttribute(t)})}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */function Z(t){
// any property present in `data.styles` will be applied to the popper,
// in this way we can make the 3rd party modifiers add custom styles to it
// Be aware, modifiers could override the properties defined in the previous
// lines of this modifier!
return X(t.instance.popper,t.styles),
// any property present in `data.attributes` will be applied to the popper,
// they will be set as HTML attributes of the element
G(t.instance.popper,t.attributes),
// if arrowElement is defined and arrowStyles has some properties
t.arrowElement&&Object.keys(t.arrowStyles).length&&X(t.arrowElement,t.arrowStyles),t}
/**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */function J(t,e,i,n,o){
// compute reference element offsets
var s=$(o,e,t,i.positionFixed),r=O(i.placement,s,e,t,i.modifiers.flip.boundariesElement,i.modifiers.flip.padding);
// compute auto placement, store placement inside the data object,
// modifiers will be able to edit `placement` if needed
// and refer to originalPlacement to know the original value
return e.setAttribute("x-placement",r),
// Apply `position` to popper before anything else because
// without the position applied we can't guarantee correct computations
X(e,{position:i.positionFixed?"fixed":"absolute"}),i}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function tt(t,e){var i=e.x,n=e.y,o=t.offsets.popper,s=H(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==s&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var r=void 0!==s?s:e.gpuAcceleration,a,l=C(_(t.instance.popper)),d={position:o.position},c={left:Math.floor(o.left),top:Math.round(o.top),bottom:Math.round(o.bottom),right:Math.floor(o.right)},u="bottom"===i?"top":"bottom",p="right"===n?"left":"right",h=z("transform"),f=void 0,g=void 0;if(g="bottom"===u?-l.height+c.bottom:c.top,f="right"===p?-l.width+c.right:c.left,r&&h)d[h]="translate3d("+f+"px, "+g+"px, 0)",d[u]=0,d[p]=0,d.willChange="transform";else{
// othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
var m="bottom"===u?-1:1,v="right"===p?-1:1;d[u]=g*m,d[p]=f*v,d.willChange=u+", "+p}
// Attributes
var y={"x-placement":t.placement};
// Update `data` attributes, styles and arrowStyles
return t.attributes=oi({},y,t.attributes),t.styles=oi({},d,t.styles),t.arrowStyles=oi({},t.offsets.arrow,t.arrowStyles),t}
/**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */function et(t,i,e){var n=H(t,function(t){var e;return t.name===i}),o=!!n&&t.some(function(t){return t.name===e&&t.enabled&&t.order<n.order});if(!o){var s="`"+i+"`",r="`"+e+"`";console.warn(r+" modifier is required by "+s+" modifier in order to work, be sure to include it before "+s+"!")}return o}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function it(t,e){var i;
// arrow depends on keepTogether in order to work
if(!et(t.instance.modifiers,"arrow","keepTogether"))return t;var n=e.element;
// if arrowElement is a string, suppose it's a CSS selector
if("string"==typeof n){
// if arrowElement is not found, don't run the modifier
if(!(n=t.instance.popper.querySelector(n)))return t}else
// if the arrowElement isn't a query selector we must check that the
// provided DOM node is child of its popper node
if(!t.instance.popper.contains(n))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],s=t.offsets,r=s.popper,a=s.reference,l=-1!==["left","right"].indexOf(o),d=l?"height":"width",c=l?"Top":"Left",u=c.toLowerCase(),p=l?"left":"top",h=l?"bottom":"right",f=N(n)[d];
//
// extends keepTogether behavior making sure the popper and its
// reference have enough pixels in conjuction
//
// top/left side
a[h]-f<r[u]&&(t.offsets.popper[u]-=r[u]-(a[h]-f)),
// bottom/right side
a[u]+f>r[h]&&(t.offsets.popper[u]+=a[u]+f-r[h]),t.offsets.popper=k(t.offsets.popper);
// compute center of the popper
var g=a[u]+a[d]/2-f/2,m=w(t.instance.popper),v=parseFloat(m["margin"+c],10),y=parseFloat(m["border"+c+"Width"],10),_=g-t.offsets.popper[u]-v-y;
// Compute the sideValue using the updated popper offsets
// take popper margin in account because we don't have this info available
// prevent arrowElement from being placed not contiguously to its popper
return _=Math.max(Math.min(r[d]-f,_),0),t.arrowElement=n,t.offsets.arrow=(ni(i={},u,Math.round(_)),ni(i,p,""),i),t}
/**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */function nt(t){return"end"===t?"start":"start"===t?"end":t}
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
function ot(t,e){var i=1<arguments.length&&void 0!==e&&e,n=ri.indexOf(t),o=ri.slice(n+1).concat(ri.slice(0,n));return i?o.reverse():o}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
function st(h,f){
// if `inner` modifier is enabled, we can't use the `flip` modifier
if(F(h.instance.modifiers,"inner"))return h;if(h.flipped&&h.placement===h.originalPlacement)
// seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
return h;var g=D(h.instance.popper,h.instance.reference,f.padding,f.boundariesElement,h.positionFixed),m=h.placement.split("-")[0],v=j(m),y=h.placement.split("-")[1]||"",_=[];switch(f.behavior){case ai:_=[m,v];break;case li:_=ot(m);break;case di:_=ot(m,!0);break;default:_=f.behavior}return _.forEach(function(t,e){if(m!==t||_.length===e+1)return h;m=h.placement.split("-")[0],v=j(m);var i=h.offsets.popper,n=h.offsets.reference,o=Math.floor,s="left"===m&&o(i.right)>o(n.left)||"right"===m&&o(i.left)<o(n.right)||"top"===m&&o(i.bottom)>o(n.top)||"bottom"===m&&o(i.top)<o(n.bottom),r=o(i.left)<o(g.left),a=o(i.right)>o(g.right),l=o(i.top)<o(g.top),d=o(i.bottom)>o(g.bottom),c="left"===m&&r||"right"===m&&a||"top"===m&&l||"bottom"===m&&d,u=-1!==["top","bottom"].indexOf(m),p=!!f.flipVariations&&(u&&"start"===y&&r||u&&"end"===y&&a||!u&&"start"===y&&l||!u&&"end"===y&&d);(s||c||p)&&(
// this boolean to detect any flip loop
h.flipped=!0,(s||c)&&(m=_[e+1]),p&&(y=nt(y)),h.placement=m+(y?"-"+y:""),
// this object contains `position`, we want to preserve it along with
// any additional property we may add in the future
h.offsets.popper=oi({},h.offsets.popper,P(h.instance.popper,h.offsets.reference,h.placement)),h=M(h.instance.modifiers,h,"flip"))}),h}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function rt(t){var e=t.offsets,i=e.popper,n=e.reference,o=t.placement.split("-")[0],s=Math.floor,r=-1!==["top","bottom"].indexOf(o),a=r?"right":"bottom",l=r?"left":"top",d=r?"width":"height";return i[a]<s(n[l])&&(t.offsets.popper[l]=s(n[l])-i[d]),i[l]>s(n[a])&&(t.offsets.popper[l]=s(n[a])),t}
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
   */function at(t,e,i,n){
// separate value from unit
var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+o[1],r=o[2];
// If it's not a number it's an operator, I guess
if(!s)return t;if(0===r.indexOf("%")){var a=void 0,l;switch(r){case"%p":a=i;break;case"%":case"%r":default:a=n}return k(a)[e]/100*s}if("vh"!==r&&"vw"!==r)
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
   */function lt(t,o,s,e){var r=[0,0],a=-1!==["right","left"].indexOf(e),i=t.split(/(\+|\-)/).map(function(t){return t.trim()}),n=i.indexOf(H(i,function(t){return-1!==t.search(/,|\s/)}));
// Use height if placement is left or right and index is 0 otherwise use width
// in this way the first offset will use an axis and the second one
// will use the other one
i[n]&&-1===i[n].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
// If divider is found, we divide the list of values and operands to divide
// them by ofset X and Y.
var l=/\s*,\s*|\s+/,d=-1!==n?[i.slice(0,n).concat([i[n].split(l)[0]]),[i[n].split(l)[1]].concat(i.slice(n+1))]:[i];
// Convert the values with units to absolute pixels to allow our computations
// Loop trough the offsets arrays and execute the operations
return(d=d.map(function(t,e){
// Most of the units rely on the orientation of the popper
var i=(1===e?!a:a)?"height":"width",n=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,n=!0,t):n?(t[t.length-1]+=e,n=!1,t):t.concat(e)},[]).map(function(t){return at(t,i,o,s)})})).forEach(function(i,n){i.forEach(function(t,e){V(t)&&(r[n]+=t*("-"===i[e-1]?-1:1))})}),r}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */function dt(t,e){var i=e.offset,n=t.placement,o=t.offsets,s=o.popper,r=o.reference,a=n.split("-")[0],l=void 0;return l=V(+i)?[+i,0]:lt(i,s,r,a),"left"===a?(s.top+=l[0],s.left-=l[1]):"right"===a?(s.top+=l[0],s.left+=l[1]):"top"===a?(s.left+=l[0],s.top-=l[1]):"bottom"===a&&(s.left+=l[0],s.top+=l[1]),t.popper=s,t}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ct(t,o){var e=o.boundariesElement||_(t.instance.popper);
// If offsetParent is the reference element, we really want to
// go one step up and use the next offsetParent as reference to
// avoid to make this modifier completely useless and look like broken
t.instance.reference===e&&(e=_(e));
// NOTE: DOM access here
// resets the popper's position so that the document size can be calculated excluding
// the size of the popper element itself
var i=z("transform"),n=t.instance.popper.style,s=n.top,r=n.left,a=n[i];n.top="",n.left="",n[i]="";var l=D(t.instance.popper,t.instance.reference,o.padding,e,t.positionFixed);
// NOTE: DOM access here
// restores the original style properties after the offsets have been computed
n.top=s,n.left=r,n[i]=a,o.boundaries=l;var d=o.priority,c=t.offsets.popper,u={primary:function t(e){var i=c[e];return c[e]<l[e]&&!o.escapeWithReference&&(i=Math.max(c[e],l[e])),ni({},e,i)},secondary:function t(e){var i="right"===e?"left":"top",n=c[i];return c[e]>l[e]&&!o.escapeWithReference&&(n=Math.min(c[i],l[e]-("right"===e?c.width:c.height))),ni({},i,n)}};return d.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";c=oi({},c,u[e](t))}),t.offsets.popper=c,t}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ut(t){var e=t.placement,i=e.split("-")[0],n=e.split("-")[1];
// if shift shiftvariation is specified, run the modifier
if(n){var o=t.offsets,s=o.reference,r=o.popper,a=-1!==["bottom","top"].indexOf(i),l=a?"left":"top",d=a?"width":"height",c={start:ni({},l,s[l]),end:ni({},l,s[l]+s[d]-r[d])};t.offsets.popper=oi({},r,c[n])}return t}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function pt(t){if(!et(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,i=H(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<i.top||e.left>i.right||e.top>i.bottom||e.right<i.left){
// Avoid unnecessary DOM access if visibility hasn't changed
if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{
// Avoid unnecessary DOM access if visibility hasn't changed
if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}
/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ht(t){var e=t.placement,i=e.split("-")[0],n=t.offsets,o=n.popper,s=n.reference,r=-1!==["left","right"].indexOf(i),a=-1===["top","left"].indexOf(i);return o[r?"left":"top"]=s[i]-(a?o[r?"width":"height"]:0),t.placement=j(e),t.offsets.popper=k(o),t}
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
   */for(var ft=function(o){// Shoutout AngusCroll (https://goo.gl/pxwQGp)
function l(t){return{}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()}function t(){return{bindType:n,delegateType:n,handle:function t(e){if(o(e.target).is(this))return e.handleObj.handler.apply(this,arguments);// eslint-disable-line prefer-rest-params
}}}function e(t){var e=this,i=!1;return o(this).one(d.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||d.triggerTransitionEnd(e)},t),this}function i(){o.fn.emulateTransitionEnd=e,o.event.special[d.TRANSITION_END]=t()}
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
var n="transitionend",s=1e6,r=1e3,d={TRANSITION_END:"bsTransitionEnd",getUID:function t(e){for(;
// eslint-disable-next-line no-bitwise
e+=~~(Math.random()*s),document.getElementById(e););return e},getSelectorFromElement:function t(e){var i=e.getAttribute("data-target");i&&"#"!==i||(i=e.getAttribute("href")||"");try{var n;return 0<o(document).find(i).length?i:null}catch(t){return null}},getTransitionDurationFromElement:function t(e){if(!e)return 0;// Get transition-duration of the element
var i=o(e).css("transition-duration"),n;// Return 0 if element or transition duration is not found
return parseFloat(i)?(// If multiple durations are defined, take the first
i=i.split(",")[0],parseFloat(i)*r):0},reflow:function t(e){return e.offsetHeight},triggerTransitionEnd:function t(e){o(e).trigger(n)},
// TODO: Remove in v5
supportsTransitionEnd:function t(){return Boolean(n)},isElement:function t(e){return(e[0]||e).nodeType},typeCheckConfig:function t(e,i,n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var s=n[o],r=i[o],a=r&&d.isElement(r)?"element":l(r);if(!new RegExp(s).test(a))throw new Error(e.toUpperCase()+': Option "'+o+'" provided type "'+a+'" but expected type "'+s+'".')}}};return i(),d}(e=e&&e.hasOwnProperty("default")?e.default:e),gt=(vt="alert",yt="4.1.1",wt="."+(_t="bs.alert"),bt=".data-api",Tt=(mt=e).fn[vt],kt='[data-dismiss="alert"]',Ct={CLOSE:"close"+wt,CLOSED:"closed"+wt,CLICK_DATA_API:"click"+wt+bt},St="alert",Et="fade",At="show"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,xt=
/* */
function(){function n(t){this._element=t}// Getters
var t=n.prototype;
// Public
return t.close=function t(e){var i=this._element,n;e&&(i=this._getRootElement(e)),this._triggerCloseEvent(i).isDefaultPrevented()||this._removeElement(i)},t.dispose=function t(){mt.removeData(this._element,_t),this._element=null},// Private
t._getRootElement=function t(e){var i=ft.getSelectorFromElement(e),n=!1;return i&&(n=mt(i)[0]),n||(n=mt(e).closest("."+St)[0]),n},t._triggerCloseEvent=function t(e){var i=mt.Event(Ct.CLOSE);return mt(e).trigger(i),i},t._removeElement=function t(e){var i=this;if(mt(e).removeClass(At),mt(e).hasClass(Et)){var n=ft.getTransitionDurationFromElement(e);mt(e).one(ft.TRANSITION_END,function(t){return i._destroyElement(e,t)}).emulateTransitionEnd(n)}else this._destroyElement(e)},t._destroyElement=function t(e){mt(e).detach().trigger(Ct.CLOSED).remove()},// Static
n._jQueryInterface=function t(i){return this.each(function(){var t=mt(this),e=t.data(_t);e||(e=new n(this),t.data(_t,e)),"close"===i&&e[i](this)})},n._handleDismiss=function t(e){return function(t){t&&t.preventDefault(),e.close(this)}},s(n,null,[{key:"VERSION",get:function t(){return yt}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
mt(document).on(Ct.CLICK_DATA_API,kt,xt._handleDismiss(new xt)),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
mt.fn[vt]=xt._jQueryInterface,mt.fn[vt].Constructor=xt,mt.fn[vt].noConflict=function(){return mt.fn[vt]=Tt,xt._jQueryInterface},xt),mt,vt,yt,_t,wt,bt,Tt,kt,Ct,St,Et,At,xt,Dt=(Ot="button",$t="4.1.1",jt="."+(Nt="bs.button"),Pt=".data-api",Ht=(It=e).fn[Ot],Lt="active",Mt="btn",Ft='[data-toggle^="button"]',zt='[data-toggle="buttons"]',Rt="input",Ut=".active",Bt=".btn",Qt={CLICK_DATA_API:"click"+jt+Pt,FOCUS_BLUR_DATA_API:(Wt="focus")+jt+Pt+" blur"+jt+Pt
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},qt=
/* */
function(){function i(t){this._element=t}// Getters
var t=i.prototype;
// Public
return t.toggle=function t(){var e=!0,i=!0,n=It(this._element).closest(zt)[0];if(n){var o=It(this._element).find(Rt)[0];if(o){if("radio"===o.type)if(o.checked&&It(this._element).hasClass(Lt))e=!1;else{var s=It(n).find(Ut)[0];s&&It(s).removeClass(Lt)}if(e){if(o.hasAttribute("disabled")||n.hasAttribute("disabled")||o.classList.contains("disabled")||n.classList.contains("disabled"))return;o.checked=!It(this._element).hasClass(Lt),It(o).trigger("change")}o.focus(),i=!1}}i&&this._element.setAttribute("aria-pressed",!It(this._element).hasClass(Lt)),e&&It(this._element).toggleClass(Lt)},t.dispose=function t(){It.removeData(this._element,Nt),this._element=null},// Static
i._jQueryInterface=function t(e){return this.each(function(){var t=It(this).data(Nt);t||(t=new i(this),It(this).data(Nt,t)),"toggle"===e&&t[e]()})},s(i,null,[{key:"VERSION",get:function t(){return $t}}]),i}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
It(document).on(Qt.CLICK_DATA_API,Ft,function(t){t.preventDefault();var e=t.target;It(e).hasClass(Mt)||(e=It(e).closest(Bt)),qt._jQueryInterface.call(It(e),"toggle")}).on(Qt.FOCUS_BLUR_DATA_API,Ft,function(t){var e=It(t.target).closest(Bt)[0];It(e).toggleClass(Wt,/^focus(in)?$/.test(t.type))}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
It.fn[Ot]=qt._jQueryInterface,It.fn[Ot].Constructor=qt,It.fn[Ot].noConflict=function(){return It.fn[Ot]=Ht,qt._jQueryInterface},qt),It,Ot,$t,Nt,jt,Pt,Ht,Lt,Mt,Wt,Ft,zt,Rt,Ut,Bt,Qt,qt,Kt=(Vt="carousel",Xt="4.1.1",Zt="."+(Gt="bs.carousel"),Jt=".data-api",te=(Yt=e).fn[Vt],ee=37,ie=39,oe={interval:5e3,keyboard:!0,slide:!(ne=500),pause:"hover",wrap:!0},se={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},re="next",ae="prev",le="left",de="right",ce={SLIDE:"slide"+Zt,SLID:"slid"+Zt,KEYDOWN:"keydown"+Zt,MOUSEENTER:"mouseenter"+Zt,MOUSELEAVE:"mouseleave"+Zt,TOUCHEND:"touchend"+Zt,LOAD_DATA_API:"load"+Zt+Jt,CLICK_DATA_API:"click"+Zt+Jt},ue="carousel",pe="active",he="slide",fe="carousel-item-right",ge="carousel-item-left",me="carousel-item-next",ve="carousel-item-prev",ye="carousel-item",_e=".active",we=".active.carousel-item",be=".carousel-item",Te=".carousel-item-next, .carousel-item-prev",ke=".carousel-indicators",Ce="[data-slide], [data-slide-to]",Se='[data-ride="carousel"]'
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Ee=
/* */
function(){function r(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(e),this._element=Yt(t)[0],this._indicatorsElement=Yt(this._element).find(ke)[0],this._addEventListeners()}// Getters
var t=r.prototype;
// Public
return t.next=function t(){this._isSliding||this._slide(re)},t.nextWhenVisible=function t(){
// Don't call next when the page isn't visible
// or the carousel or its parent isn't visible
!document.hidden&&Yt(this._element).is(":visible")&&"hidden"!==Yt(this._element).css("visibility")&&this.next()},t.prev=function t(){this._isSliding||this._slide(ae)},t.pause=function t(e){e||(this._isPaused=!0),Yt(this._element).find(Te)[0]&&(ft.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},t.cycle=function t(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},t.to=function t(e){var i=this;this._activeElement=Yt(this._element).find(we)[0];var n=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)Yt(this._element).one(ce.SLID,function(){return i.to(e)});else{if(n===e)return this.pause(),void this.cycle();var o=n<e?re:ae;this._slide(o,this._items[e])}},t.dispose=function t(){Yt(this._element).off(Zt),Yt.removeData(this._element,Gt),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},// Private
t._getConfig=function t(e){return e=a({},oe,e),ft.typeCheckConfig(Vt,e,se),e},t._addEventListeners=function t(){var e=this;this._config.keyboard&&Yt(this._element).on(ce.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(Yt(this._element).on(ce.MOUSEENTER,function(t){return e.pause(t)}).on(ce.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&
// If it's a touch-enabled device, mouseenter/leave are fired as
// part of the mouse compatibility events on first tap - the carousel
// would stop cycling until user tapped out of it;
// here, we listen for touchend, explicitly pause the carousel
// (as if it's the second time we tap on it, mouseenter compat event
// is NOT fired) and after a timeout (to allow for mouse compatibility
// events to fire) we explicitly restart cycling
Yt(this._element).on(ce.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},ne+e._config.interval)}))},t._keydown=function t(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next();break;default:}},t._getItemIndex=function t(e){return this._items=Yt.makeArray(Yt(e).parent().find(be)),this._items.indexOf(e)},t._getItemByDirection=function t(e,i){var n=e===re,o=e===ae,s=this._getItemIndex(i),r=this._items.length-1,a;if((o&&0===s||n&&s===r)&&!this._config.wrap)return i;var l,d=(s+(e===ae?-1:1))%this._items.length;return-1===d?this._items[this._items.length-1]:this._items[d]},t._triggerSlideEvent=function t(e,i){var n=this._getItemIndex(e),o=this._getItemIndex(Yt(this._element).find(we)[0]),s=Yt.Event(ce.SLIDE,{relatedTarget:e,direction:i,from:o,to:n});return Yt(this._element).trigger(s),s},t._setActiveIndicatorElement=function t(e){if(this._indicatorsElement){Yt(this._indicatorsElement).find(_e).removeClass(pe);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&Yt(i).addClass(pe)}},t._slide=function t(e,i){var n=this,o=Yt(this._element).find(we)[0],s=this._getItemIndex(o),r=i||o&&this._getItemByDirection(e,o),a=this._getItemIndex(r),l=Boolean(this._interval),d,c,u,p;if(u=e===re?(d=ge,c=me,le):(d=fe,c=ve,de),r&&Yt(r).hasClass(pe))this._isSliding=!1;else if(!this._triggerSlideEvent(r,u).isDefaultPrevented()&&o&&r){this._isSliding=!0,l&&this.pause(),this._setActiveIndicatorElement(r);var h=Yt.Event(ce.SLID,{relatedTarget:r,direction:u,from:s,to:a});if(Yt(this._element).hasClass(he)){Yt(r).addClass(c),ft.reflow(r),Yt(o).addClass(d),Yt(r).addClass(d);var f=ft.getTransitionDurationFromElement(o);Yt(o).one(ft.TRANSITION_END,function(){Yt(r).removeClass(d+" "+c).addClass(pe),Yt(o).removeClass(pe+" "+c+" "+d),n._isSliding=!1,setTimeout(function(){return Yt(n._element).trigger(h)},0)}).emulateTransitionEnd(f)}else Yt(o).removeClass(pe),Yt(r).addClass(pe),this._isSliding=!1,Yt(this._element).trigger(h);l&&this.cycle()}},// Static
r._jQueryInterface=function t(n){return this.each(function(){var t=Yt(this).data(Gt),e=a({},oe,Yt(this).data());"object"==typeof n&&(e=a({},e,n));var i="string"==typeof n?n:e.slide;if(t||(t=new r(this,e),Yt(this).data(Gt,t)),"number"==typeof n)t.to(n);else if("string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}else e.interval&&(t.pause(),t.cycle())})},r._dataApiClickHandler=function t(e){var i=ft.getSelectorFromElement(this);if(i){var n=Yt(i)[0];if(n&&Yt(n).hasClass(ue)){var o=a({},Yt(n).data(),Yt(this).data()),s=this.getAttribute("data-slide-to");s&&(o.interval=!1),r._jQueryInterface.call(Yt(n),o),s&&Yt(n).data(Gt).to(s),e.preventDefault()}}},s(r,null,[{key:"VERSION",get:function t(){return Xt}},{key:"Default",get:function t(){return oe}}]),r}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
Yt(document).on(ce.CLICK_DATA_API,Ce,Ee._dataApiClickHandler),Yt(window).on(ce.LOAD_DATA_API,function(){Yt(Se).each(function(){var t=Yt(this);Ee._jQueryInterface.call(t,t.data())})}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Yt.fn[Vt]=Ee._jQueryInterface,Yt.fn[Vt].Constructor=Ee,Yt.fn[Vt].noConflict=function(){return Yt.fn[Vt]=te,Ee._jQueryInterface},Ee),Yt,Vt,Xt,Gt,Zt,Jt,te,ee,ie,ne,oe,se,re,ae,le,de,ce,ue,pe,he,fe,ge,me,ve,ye,_e,we,be,Te,ke,Ce,Se,Ee,Ae=(De="collapse",Ie="4.1.1",$e="."+(Oe="bs.collapse"),Ne=".data-api",je=(xe=e).fn[De],Pe={toggle:!0,parent:""},He={toggle:"boolean",parent:"(string|element)"},Le={SHOW:"show"+$e,SHOWN:"shown"+$e,HIDE:"hide"+$e,HIDDEN:"hidden"+$e,CLICK_DATA_API:"click"+$e+Ne},Me="show",We="collapse",Fe="collapsing",ze="collapsed",Re="width",Ue="height",Be=".show, .collapsing",Qe='[data-toggle="collapse"]'
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,qe=
/* */
function(){function c(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=xe.makeArray(xe('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var i=xe(Qe),n=0;n<i.length;n++){var o=i[n],s=ft.getSelectorFromElement(o);null!==s&&0<xe(s).filter(t).length&&(this._selector=s,this._triggerArray.push(o))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}// Getters
var t=c.prototype;
// Public
return t.toggle=function t(){xe(this._element).hasClass(Me)?this.hide():this.show()},t.show=function t(){var e=this,i,n;if(!this._isTransitioning&&!xe(this._element).hasClass(Me)&&(this._parent&&0===(i=xe.makeArray(xe(this._parent).find(Be).filter('[data-parent="'+this._config.parent+'"]'))).length&&(i=null),!(i&&(n=xe(i).not(this._selector).data(Oe))&&n._isTransitioning))){var o=xe.Event(Le.SHOW);if(xe(this._element).trigger(o),!o.isDefaultPrevented()){i&&(c._jQueryInterface.call(xe(i).not(this._selector),"hide"),n||xe(i).data(Oe,null));var s=this._getDimension();xe(this._element).removeClass(We).addClass(Fe),(this._element.style[s]=0)<this._triggerArray.length&&xe(this._triggerArray).removeClass(ze).attr("aria-expanded",!0),this.setTransitioning(!0);var r=function t(){xe(e._element).removeClass(Fe).addClass(We).addClass(Me),e._element.style[s]="",e.setTransitioning(!1),xe(e._element).trigger(Le.SHOWN)},a,l="scroll"+(s[0].toUpperCase()+s.slice(1)),d=ft.getTransitionDurationFromElement(this._element);xe(this._element).one(ft.TRANSITION_END,r).emulateTransitionEnd(d),this._element.style[s]=this._element[l]+"px"}}},t.hide=function t(){var e=this;if(!this._isTransitioning&&xe(this._element).hasClass(Me)){var i=xe.Event(Le.HIDE);if(xe(this._element).trigger(i),!i.isDefaultPrevented()){var n=this._getDimension();if(this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",ft.reflow(this._element),xe(this._element).addClass(Fe).removeClass(We).removeClass(Me),0<this._triggerArray.length)for(var o=0;o<this._triggerArray.length;o++){var s=this._triggerArray[o],r=ft.getSelectorFromElement(s),a;if(null!==r)xe(r).hasClass(Me)||xe(s).addClass(ze).attr("aria-expanded",!1)}this.setTransitioning(!0);var l=function t(){e.setTransitioning(!1),xe(e._element).removeClass(Fe).addClass(We).trigger(Le.HIDDEN)};this._element.style[n]="";var d=ft.getTransitionDurationFromElement(this._element);xe(this._element).one(ft.TRANSITION_END,l).emulateTransitionEnd(d)}}},t.setTransitioning=function t(e){this._isTransitioning=e},t.dispose=function t(){xe.removeData(this._element,Oe),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},// Private
t._getConfig=function t(e){return(e=a({},Pe,e)).toggle=Boolean(e.toggle),// Coerce string values
ft.typeCheckConfig(De,e,He),e},t._getDimension=function t(){var e;return xe(this._element).hasClass(Re)?Re:Ue},t._getParent=function t(){var i=this,e=null;ft.isElement(this._config.parent)?(e=this._config.parent,// It's a jQuery object
void 0!==this._config.parent.jquery&&(e=this._config.parent[0])):e=xe(this._config.parent)[0];var n='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return xe(e).find(n).each(function(t,e){i._addAriaAndCollapsedClass(c._getTargetFromElement(e),[e])}),e},t._addAriaAndCollapsedClass=function t(e,i){if(e){var n=xe(e).hasClass(Me);0<i.length&&xe(i).toggleClass(ze,!n).attr("aria-expanded",n)}},// Static
c._getTargetFromElement=function t(e){var i=ft.getSelectorFromElement(e);return i?xe(i)[0]:null},c._jQueryInterface=function t(n){return this.each(function(){var t=xe(this),e=t.data(Oe),i=a({},Pe,t.data(),"object"==typeof n&&n?n:{});if(!e&&i.toggle&&/show|hide/.test(n)&&(i.toggle=!1),e||(e=new c(this,i),t.data(Oe,e)),"string"==typeof n){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(c,null,[{key:"VERSION",get:function t(){return Ie}},{key:"Default",get:function t(){return Pe}}]),c}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
xe(document).on(Le.CLICK_DATA_API,Qe,function(t){
// preventDefault only for <a> elements (which change the URL) not inside the collapsible element
"A"===t.currentTarget.tagName&&t.preventDefault();var n=xe(this),e=ft.getSelectorFromElement(this);xe(e).each(function(){var t=xe(this),e,i=t.data(Oe)?"toggle":n.data();qe._jQueryInterface.call(t,i)})}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
xe.fn[De]=qe._jQueryInterface,xe.fn[De].Constructor=qe,xe.fn[De].noConflict=function(){return xe.fn[De]=je,qe._jQueryInterface},qe),xe,De,Ie,Oe,$e,Ne,je,Pe,He,Le,Me,We,Fe,ze,Re,Ue,Be,Qe,qe,Ke="undefined"!=typeof window&&"undefined"!=typeof document,Ye=["Edge","Trident","Firefox"],Ve=0,Xe=0
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */;Xe<Ye.length;Xe+=1)if(Ke&&0<=navigator.userAgent.indexOf(Ye[Xe])){Ve=1;break}var Ge,Ze=Ke&&window.Promise?r:l,Je=Ke&&!(!window.MSInputMethodContext||!document.documentMode),ti=Ke&&/MSIE 10/.test(navigator.userAgent),ei=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},ii=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),ni=function(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t},oi=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},si=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],ri=si.slice(3),ai="flip",li="clockwise",di="counterclockwise",ci,ui={
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
onCreate:function t(){},
/**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
onUpdate:function t(){},
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
fn:ut},
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
fn:dt,
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
fn:ct,
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
fn:rt},
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
fn:it,
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
fn:st,
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
fn:ht},
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
fn:pt},
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
fn:tt,
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
function r(t,e,i){var n=this,o=2<arguments.length&&void 0!==i?i:{};ei(this,r),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},
// make update() debounced, so that it only runs at most once-per-tick
this.update=Ze(this.update.bind(this)),
// with {} we create a new object with the options inside it
this.options=oi({},r.Defaults,o),
// init state
this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},
// get reference and popper elements (allow jQuery wrappers)
this.reference=t&&t.jquery?t[0]:t,this.popper=e&&e.jquery?e[0]:e,
// Deep merge modifiers options
this.options.modifiers={},Object.keys(oi({},r.Defaults.modifiers,o.modifiers)).forEach(function(t){n.options.modifiers[t]=oi({},r.Defaults.modifiers[t]||{},o.modifiers?o.modifiers[t]:{})}),
// Refactoring modifiers' list (Object => Array)
this.modifiers=Object.keys(this.options.modifiers).map(function(t){return oi({name:t},n.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),
// modifiers have the ability to execute arbitrary code when Popper.js get inited
// such code is executed in the same order of its modifier
// they could add new properties to their options configuration
// BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
this.modifiers.forEach(function(t){t.enabled&&d(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),
// fire the first update to position the popper in the right place
this.update();var s=this.options.eventsEnabled;s&&
// setup event listeners, they will take care of update the position in specific situations
this.enableEventListeners(),this.state.eventsEnabled=s}
// We can't use class properties because they don't get listed in the
// class prototype and break stuff like Sinon stubs
return ii(r,[{key:"update",value:function t(){return W.call(this)}},{key:"destroy",value:function t(){return R.call(this)}},{key:"enableEventListeners",value:function t(){return q.call(this)}},{key:"disableEventListeners",value:function t(){return Y.call(this)}
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
   * Bootstrap (v4.1.1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
var hi=(gi="dropdown",mi="4.1.1",yi="."+(vi="bs.dropdown"),_i=".data-api",wi=(fi=e).fn[gi],bi=27,Ti=32,ki=9,Ci=38,Si=40,Ei=3,Ai=new RegExp("38|40|27"),xi={HIDE:"hide"+yi,HIDDEN:"hidden"+yi,SHOW:"show"+yi,SHOWN:"shown"+yi,CLICK:"click"+yi,CLICK_DATA_API:"click"+yi+_i,KEYDOWN_DATA_API:"keydown"+yi+_i,KEYUP_DATA_API:"keyup"+yi+_i},Di="disabled",Ii="show",Oi="dropup",$i="dropright",Ni="dropleft",ji="dropdown-menu-right",Pi="dropdown-menu-left",Hi="position-static",Li='[data-toggle="dropdown"]',Mi=".dropdown form",Wi=".dropdown-menu",Fi=".navbar-nav",zi=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Ri="top-start",Ui="top-end",Bi="bottom-start",Qi="bottom-end",qi="right-start",Ki="right-end",Yi="left-start",Vi="left-end",Xi={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Gi={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},Zi=
/* */
function(){function d(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}// Getters
var t=d.prototype;
// Public
return t.toggle=function t(){if(!this._element.disabled&&!fi(this._element).hasClass(Di)){var e=d._getParentFromElement(this._element),i=fi(this._menu).hasClass(Ii);if(d._clearMenus(),!i){var n={relatedTarget:this._element},o=fi.Event(xi.SHOW,n);if(fi(e).trigger(o),!o.isDefaultPrevented()){// Disable totally Popper.js for Dropdown in Navbar
if(!this._inNavbar){
/**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
if(void 0===pi)throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");var s=this._element;"parent"===this._config.reference?s=e:ft.isElement(this._config.reference)&&(s=this._config.reference,// Check if it's jQuery element
void 0!==this._config.reference.jquery&&(s=this._config.reference[0])),// If boundary is not `scrollParent`, then set position to `static`
// to allow the menu to "escape" the scroll parent's boundaries
// https://github.com/twbs/bootstrap/issues/24251
"scrollParent"!==this._config.boundary&&fi(e).addClass(Hi),this._popper=new pi(s,this._menu,this._getPopperConfig())}// If this is a touch-enabled device we add extra
// empty mouseover listeners to the body's immediate children;
// only needed because of broken event delegation on iOS
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
"ontouchstart"in document.documentElement&&0===fi(e).closest(Fi).length&&fi(document.body).children().on("mouseover",null,fi.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),fi(this._menu).toggleClass(Ii),fi(e).toggleClass(Ii).trigger(fi.Event(xi.SHOWN,n))}}}},t.dispose=function t(){fi.removeData(this._element,vi),fi(this._element).off(yi),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},t.update=function t(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},// Private
t._addEventListeners=function t(){var e=this;fi(this._element).on(xi.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},t._getConfig=function t(e){return e=a({},this.constructor.Default,fi(this._element).data(),e),ft.typeCheckConfig(gi,e,this.constructor.DefaultType),e},t._getMenuElement=function t(){if(!this._menu){var e=d._getParentFromElement(this._element);this._menu=fi(e).find(Wi)[0]}return this._menu},t._getPlacement=function t(){var e=fi(this._element).parent(),i=Bi;// Handle dropup
return e.hasClass(Oi)?(i=Ri,fi(this._menu).hasClass(ji)&&(i=Ui)):e.hasClass($i)?i=qi:e.hasClass(Ni)?i=Yi:fi(this._menu).hasClass(ji)&&(i=Qi),i},t._detectNavbar=function t(){return 0<fi(this._element).closest(".navbar").length},t._getPopperConfig=function t(){var e=this,i={};"function"==typeof this._config.offset?i.fn=function(t){return t.offsets=a({},t.offsets,e._config.offset(t.offsets)||{}),t}:i.offset=this._config.offset;var n={placement:this._getPlacement(),modifiers:{offset:i,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(n.modifiers.applyStyle={enabled:!1}),n},// Static
d._jQueryInterface=function t(i){return this.each(function(){var t=fi(this).data(vi),e;if(t||(t=new d(this,"object"==typeof i?i:null),fi(this).data(vi,t)),"string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},d._clearMenus=function t(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var i=fi.makeArray(fi(Li)),n=0;n<i.length;n++){var o=d._getParentFromElement(i[n]),s=fi(i[n]).data(vi),r={relatedTarget:i[n]};if(s){var a=s._menu;if(fi(o).hasClass(Ii)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&fi.contains(o,e.target))){var l=fi.Event(xi.HIDE,r);fi(o).trigger(l),l.isDefaultPrevented()||(// If this is a touch-enabled device we remove the extra
// empty mouseover listeners we added for iOS support
"ontouchstart"in document.documentElement&&fi(document.body).children().off("mouseover",null,fi.noop),i[n].setAttribute("aria-expanded","false"),fi(a).removeClass(Ii),fi(o).removeClass(Ii).trigger(fi.Event(xi.HIDDEN,r)))}}}},d._getParentFromElement=function t(e){var i,n=ft.getSelectorFromElement(e);return n&&(i=fi(n)[0]),i||e.parentNode},// eslint-disable-next-line complexity
d._dataApiKeydownHandler=function t(e){
// If not input/textarea:
//  - And not a key in REGEXP_KEYDOWN => not a dropdown command
// If input/textarea:
//  - If space key => not a dropdown command
//  - If key is other than escape
//    - If key is not up or down => not a dropdown command
//    - If trigger inside the menu => not a dropdown command
if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||fi(e.target).closest(Wi).length)):Ai.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!fi(this).hasClass(Di))){var i=d._getParentFromElement(this),n=fi(i).hasClass(Ii);if((n||27===e.which&&32===e.which)&&(!n||27!==e.which&&32!==e.which)){var o=fi(i).find(zi).get();if(0!==o.length){var s=o.indexOf(e.target);38===e.which&&0<s&&
// Up
s--,40===e.which&&s<o.length-1&&
// Down
s++,s<0&&(s=0),o[s].focus()}}else{if(27===e.which){var r=fi(i).find(Li)[0];fi(r).trigger("focus")}fi(this).trigger("click")}}},s(d,null,[{key:"VERSION",get:function t(){return mi}},{key:"Default",get:function t(){return Xi}},{key:"DefaultType",get:function t(){return Gi}}]),d}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
fi(document).on(xi.KEYDOWN_DATA_API,Li,Zi._dataApiKeydownHandler).on(xi.KEYDOWN_DATA_API,Wi,Zi._dataApiKeydownHandler).on(xi.CLICK_DATA_API+" "+xi.KEYUP_DATA_API,Zi._clearMenus).on(xi.CLICK_DATA_API,Li,function(t){t.preventDefault(),t.stopPropagation(),Zi._jQueryInterface.call(fi(this),"toggle")}).on(xi.CLICK_DATA_API,Mi,function(t){t.stopPropagation()}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
fi.fn[gi]=Zi._jQueryInterface,fi.fn[gi].Constructor=Zi,fi.fn[gi].noConflict=function(){return fi.fn[gi]=wi,Zi._jQueryInterface},Zi),fi,gi,mi,vi,yi,_i,wi,bi,Ti,ki,Ci,Si,Ei,Ai,xi,Di,Ii,Oi,$i,Ni,ji,Pi,Hi,Li,Mi,Wi,Fi,zi,Ri,Ui,Bi,Qi,qi,Ki,Yi,Vi,Xi,Gi,Zi,Ji=(en="modal",nn="4.1.1",sn="."+(on="bs.modal"),rn=".data-api",an=(tn=e).fn[en],ln=27,dn={backdrop:!0,keyboard:!0,focus:!0,show:!0},cn={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},un={HIDE:"hide"+sn,HIDDEN:"hidden"+sn,SHOW:"show"+sn,SHOWN:"shown"+sn,FOCUSIN:"focusin"+sn,RESIZE:"resize"+sn,CLICK_DISMISS:"click.dismiss"+sn,KEYDOWN_DISMISS:"keydown.dismiss"+sn,MOUSEUP_DISMISS:"mouseup.dismiss"+sn,MOUSEDOWN_DISMISS:"mousedown.dismiss"+sn,CLICK_DATA_API:"click"+sn+rn},pn="modal-scrollbar-measure",hn="modal-backdrop",fn="modal-open",gn="fade",mn="show",vn=".modal-dialog",yn='[data-toggle="modal"]',_n='[data-dismiss="modal"]',wn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",bn=".sticky-top",Tn=".navbar-toggler"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,kn=
/* */
function(){function o(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=tn(t).find(vn)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._scrollbarWidth=0}// Getters
var t=o.prototype;
// Public
return t.toggle=function t(e){return this._isShown?this.hide():this.show(e)},t.show=function t(e){var i=this;if(!this._isTransitioning&&!this._isShown){tn(this._element).hasClass(gn)&&(this._isTransitioning=!0);var n=tn.Event(un.SHOW,{relatedTarget:e});tn(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),tn(document.body).addClass(fn),this._setEscapeEvent(),this._setResizeEvent(),tn(this._element).on(un.CLICK_DISMISS,_n,function(t){return i.hide(t)}),tn(this._dialog).on(un.MOUSEDOWN_DISMISS,function(){tn(i._element).one(un.MOUSEUP_DISMISS,function(t){tn(t.target).is(i._element)&&(i._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return i._showElement(e)}))}},t.hide=function t(e){var i=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var n=tn.Event(un.HIDE);if(tn(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var o=tn(this._element).hasClass(gn);if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),tn(document).off(un.FOCUSIN),tn(this._element).removeClass(mn),tn(this._element).off(un.CLICK_DISMISS),tn(this._dialog).off(un.MOUSEDOWN_DISMISS),o){var s=ft.getTransitionDurationFromElement(this._element);tn(this._element).one(ft.TRANSITION_END,function(t){return i._hideModal(t)}).emulateTransitionEnd(s)}else this._hideModal()}}},t.dispose=function t(){tn.removeData(this._element,on),tn(window,document,this._element,this._backdrop).off(sn),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},t.handleUpdate=function t(){this._adjustDialog()},// Private
t._getConfig=function t(e){return e=a({},dn,e),ft.typeCheckConfig(en,e,cn),e},t._showElement=function t(e){var i=this,n=tn(this._element).hasClass(gn);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||
// Don't move modal's DOM position
document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,n&&ft.reflow(this._element),tn(this._element).addClass(mn),this._config.focus&&this._enforceFocus();var o=tn.Event(un.SHOWN,{relatedTarget:e}),s=function t(){i._config.focus&&i._element.focus(),i._isTransitioning=!1,tn(i._element).trigger(o)};if(n){var r=ft.getTransitionDurationFromElement(this._element);tn(this._dialog).one(ft.TRANSITION_END,s).emulateTransitionEnd(r)}else s()},t._enforceFocus=function t(){var e=this;tn(document).off(un.FOCUSIN).on(un.FOCUSIN,function(t){document!==t.target&&e._element!==t.target&&0===tn(e._element).has(t.target).length&&e._element.focus()})},t._setEscapeEvent=function t(){var e=this;this._isShown&&this._config.keyboard?tn(this._element).on(un.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||tn(this._element).off(un.KEYDOWN_DISMISS)},t._setResizeEvent=function t(){var e=this;this._isShown?tn(window).on(un.RESIZE,function(t){return e.handleUpdate(t)}):tn(window).off(un.RESIZE)},t._hideModal=function t(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){tn(document.body).removeClass(fn),e._resetAdjustments(),e._resetScrollbar(),tn(e._element).trigger(un.HIDDEN)})},t._removeBackdrop=function t(){this._backdrop&&(tn(this._backdrop).remove(),this._backdrop=null)},t._showBackdrop=function t(e){var i=this,n=tn(this._element).hasClass(gn)?gn:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=hn,n&&tn(this._backdrop).addClass(n),tn(this._backdrop).appendTo(document.body),tn(this._element).on(un.CLICK_DISMISS,function(t){i._ignoreBackdropClick?i._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===i._config.backdrop?i._element.focus():i.hide())}),n&&ft.reflow(this._backdrop),tn(this._backdrop).addClass(mn),!e)return;if(!n)return void e();var o=ft.getTransitionDurationFromElement(this._backdrop);tn(this._backdrop).one(ft.TRANSITION_END,e).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){tn(this._backdrop).removeClass(mn);var s=function t(){i._removeBackdrop(),e&&e()};if(tn(this._element).hasClass(gn)){var r=ft.getTransitionDurationFromElement(this._backdrop);tn(this._backdrop).one(ft.TRANSITION_END,s).emulateTransitionEnd(r)}else s()}else e&&e()},// ----------------------------------------------------------------------
// the following methods are used to handle overflowing modals
// todo (fat): these should probably be refactored out of modal.js
// ----------------------------------------------------------------------
t._adjustDialog=function t(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},t._resetAdjustments=function t(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},t._checkScrollbar=function t(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},t._setScrollbar=function t(){var o=this;if(this._isBodyOverflowing){
// Note: DOMNode.style.paddingRight returns the actual value or '' if not set
//   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
// Adjust fixed content padding
tn(wn).each(function(t,e){var i=tn(e)[0].style.paddingRight,n=tn(e).css("padding-right");tn(e).data("padding-right",i).css("padding-right",parseFloat(n)+o._scrollbarWidth+"px")}),// Adjust sticky content margin
tn(bn).each(function(t,e){var i=tn(e)[0].style.marginRight,n=tn(e).css("margin-right");tn(e).data("margin-right",i).css("margin-right",parseFloat(n)-o._scrollbarWidth+"px")}),// Adjust navbar-toggler margin
tn(Tn).each(function(t,e){var i=tn(e)[0].style.marginRight,n=tn(e).css("margin-right");tn(e).data("margin-right",i).css("margin-right",parseFloat(n)+o._scrollbarWidth+"px")});// Adjust body padding
var e=document.body.style.paddingRight,i=tn(document.body).css("padding-right");tn(document.body).data("padding-right",e).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},t._resetScrollbar=function t(){
// Restore fixed content padding
tn(wn).each(function(t,e){var i=tn(e).data("padding-right");void 0!==i&&tn(e).css("padding-right",i).removeData("padding-right")}),// Restore sticky content and navbar-toggler margin
tn(bn+", "+Tn).each(function(t,e){var i=tn(e).data("margin-right");void 0!==i&&tn(e).css("margin-right",i).removeData("margin-right")});// Restore body padding
var e=tn(document.body).data("padding-right");void 0!==e&&tn(document.body).css("padding-right",e).removeData("padding-right")},t._getScrollbarWidth=function t(){
// thx d.walsh
var e=document.createElement("div");e.className=pn,document.body.appendChild(e);var i=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),i},// Static
o._jQueryInterface=function t(i,n){return this.each(function(){var t=tn(this).data(on),e=a({},dn,tn(this).data(),"object"==typeof i&&i?i:{});if(t||(t=new o(this,e),tn(this).data(on,t)),"string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i](n)}else e.show&&t.show(n)})},s(o,null,[{key:"VERSION",get:function t(){return nn}},{key:"Default",get:function t(){return dn}}]),o}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
tn(document).on(un.CLICK_DATA_API,yn,function(t){var e=this,i,n=ft.getSelectorFromElement(this);n&&(i=tn(n)[0]);var o=tn(i).data(on)?"toggle":a({},tn(i).data(),tn(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var s=tn(i).one(un.SHOW,function(t){t.isDefaultPrevented()||s.one(un.HIDDEN,function(){tn(e).is(":visible")&&e.focus()})});kn._jQueryInterface.call(tn(i),o,this)}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
tn.fn[en]=kn._jQueryInterface,tn.fn[en].Constructor=kn,tn.fn[en].noConflict=function(){return tn.fn[en]=an,kn._jQueryInterface},kn),tn,en,nn,on,sn,rn,an,ln,dn,cn,un,pn,hn,fn,gn,mn,vn,yn,_n,wn,bn,Tn,kn,Cn=(En="tooltip",An="4.1.1",Dn="."+(xn="bs.tooltip"),In=(Sn=e).fn[En],On="bs-tooltip",$n=new RegExp("(^|\\s)"+On+"\\S+","g"),Pn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!(jn={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"}),selector:!(Nn={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"}),placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},Ln="out",Mn={HIDE:"hide"+Dn,HIDDEN:"hidden"+Dn,SHOW:(Hn="show")+Dn,SHOWN:"shown"+Dn,INSERTED:"inserted"+Dn,CLICK:"click"+Dn,FOCUSIN:"focusin"+Dn,FOCUSOUT:"focusout"+Dn,MOUSEENTER:"mouseenter"+Dn,MOUSELEAVE:"mouseleave"+Dn},Wn="fade",Fn="show",zn=".tooltip",Rn=".tooltip-inner",Un=".arrow",Bn="hover",Qn="focus",qn="click",Kn="manual"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Yn=
/* */
function(){function n(t,e){
/**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
if(void 0===pi)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");// private
this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,// Protected
this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}// Getters
var t=n.prototype;
// Public
return t.enable=function t(){this._isEnabled=!0},t.disable=function t(){this._isEnabled=!1},t.toggleEnabled=function t(){this._isEnabled=!this._isEnabled},t.toggle=function t(e){if(this._isEnabled)if(e){var i=this.constructor.DATA_KEY,n=Sn(e.currentTarget).data(i);n||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),Sn(e.currentTarget).data(i,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(Sn(this.getTipElement()).hasClass(Fn))return void this._leave(null,this);this._enter(null,this)}},t.dispose=function t(){clearTimeout(this._timeout),Sn.removeData(this.element,this.constructor.DATA_KEY),Sn(this.element).off(this.constructor.EVENT_KEY),Sn(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&Sn(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},t.show=function t(){var i=this;if("none"===Sn(this.element).css("display"))throw new Error("Please use show on visible elements");var e=Sn.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){Sn(this.element).trigger(e);var n=Sn.contains(this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!n)return;var o=this.getTipElement(),s=ft.getUID(this.constructor.NAME);o.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&Sn(o).addClass(Wn);var r="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,a=this._getAttachment(r);this.addAttachmentClass(a);var l=!1===this.config.container?document.body:Sn(this.config.container);Sn(o).data(this.constructor.DATA_KEY,this),Sn.contains(this.element.ownerDocument.documentElement,this.tip)||Sn(o).appendTo(l),Sn(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new pi(this.element,o,{placement:a,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:Un},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function t(e){e.originalPlacement!==e.placement&&i._handlePopperPlacementChange(e)},onUpdate:function t(e){i._handlePopperPlacementChange(e)}}),Sn(o).addClass(Fn),// If this is a touch-enabled device we add extra
// empty mouseover listeners to the body's immediate children;
// only needed because of broken event delegation on iOS
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
"ontouchstart"in document.documentElement&&Sn(document.body).children().on("mouseover",null,Sn.noop);var d=function t(){i.config.animation&&i._fixTransition();var e=i._hoverState;i._hoverState=null,Sn(i.element).trigger(i.constructor.Event.SHOWN),e===Ln&&i._leave(null,i)};if(Sn(this.tip).hasClass(Wn)){var c=ft.getTransitionDurationFromElement(this.tip);Sn(this.tip).one(ft.TRANSITION_END,d).emulateTransitionEnd(c)}else d()}},t.hide=function t(e){var i=this,n=this.getTipElement(),o=Sn.Event(this.constructor.Event.HIDE),s=function t(){i._hoverState!==Hn&&n.parentNode&&n.parentNode.removeChild(n),i._cleanTipClass(),i.element.removeAttribute("aria-describedby"),Sn(i.element).trigger(i.constructor.Event.HIDDEN),null!==i._popper&&i._popper.destroy(),e&&e()};if(Sn(this.element).trigger(o),!o.isDefaultPrevented()){if(Sn(n).removeClass(Fn),// If this is a touch-enabled device we remove the extra
// empty mouseover listeners we added for iOS support
"ontouchstart"in document.documentElement&&Sn(document.body).children().off("mouseover",null,Sn.noop),this._activeTrigger[qn]=!1,this._activeTrigger[Qn]=!1,this._activeTrigger[Bn]=!1,Sn(this.tip).hasClass(Wn)){var r=ft.getTransitionDurationFromElement(n);Sn(n).one(ft.TRANSITION_END,s).emulateTransitionEnd(r)}else s();this._hoverState=""}},t.update=function t(){null!==this._popper&&this._popper.scheduleUpdate()},// Protected
t.isWithContent=function t(){return Boolean(this.getTitle())},t.addAttachmentClass=function t(e){Sn(this.getTipElement()).addClass(On+"-"+e)},t.getTipElement=function t(){return this.tip=this.tip||Sn(this.config.template)[0],this.tip},t.setContent=function t(){var e=Sn(this.getTipElement());this.setElementContent(e.find(Rn),this.getTitle()),e.removeClass(Wn+" "+Fn)},t.setElementContent=function t(e,i){var n=this.config.html;"object"==typeof i&&(i.nodeType||i.jquery)?
// Content is a DOM node or a jQuery
n?Sn(i).parent().is(e)||e.empty().append(i):e.text(Sn(i).text()):e[n?"html":"text"](i)},t.getTitle=function t(){var e=this.element.getAttribute("data-original-title");return e||(e="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),e},// Private
t._getAttachment=function t(e){return jn[e.toUpperCase()]},t._setListeners=function t(){var n=this,e;this.config.trigger.split(" ").forEach(function(t){if("click"===t)Sn(n.element).on(n.constructor.Event.CLICK,n.config.selector,function(t){return n.toggle(t)});else if(t!==Kn){var e=t===Bn?n.constructor.Event.MOUSEENTER:n.constructor.Event.FOCUSIN,i=t===Bn?n.constructor.Event.MOUSELEAVE:n.constructor.Event.FOCUSOUT;Sn(n.element).on(e,n.config.selector,function(t){return n._enter(t)}).on(i,n.config.selector,function(t){return n._leave(t)})}Sn(n.element).closest(".modal").on("hide.bs.modal",function(){return n.hide()})}),this.config.selector?this.config=a({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},t._fixTitle=function t(){var e=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==e)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},t._enter=function t(e,i){var n=this.constructor.DATA_KEY;(i=i||Sn(e.currentTarget).data(n))||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),Sn(e.currentTarget).data(n,i)),e&&(i._activeTrigger["focusin"===e.type?Qn:Bn]=!0),Sn(i.getTipElement()).hasClass(Fn)||i._hoverState===Hn?i._hoverState=Hn:(clearTimeout(i._timeout),i._hoverState=Hn,i.config.delay&&i.config.delay.show?i._timeout=setTimeout(function(){i._hoverState===Hn&&i.show()},i.config.delay.show):i.show())},t._leave=function t(e,i){var n=this.constructor.DATA_KEY;(i=i||Sn(e.currentTarget).data(n))||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),Sn(e.currentTarget).data(n,i)),e&&(i._activeTrigger["focusout"===e.type?Qn:Bn]=!1),i._isWithActiveTrigger()||(clearTimeout(i._timeout),i._hoverState=Ln,i.config.delay&&i.config.delay.hide?i._timeout=setTimeout(function(){i._hoverState===Ln&&i.hide()},i.config.delay.hide):i.hide())},t._isWithActiveTrigger=function t(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},t._getConfig=function t(e){return"number"==typeof(e=a({},this.constructor.Default,Sn(this.element).data(),"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),ft.typeCheckConfig(En,e,this.constructor.DefaultType),e},t._getDelegateConfig=function t(){var e={};if(this.config)for(var i in this.config)this.constructor.Default[i]!==this.config[i]&&(e[i]=this.config[i]);return e},t._cleanTipClass=function t(){var e=Sn(this.getTipElement()),i=e.attr("class").match($n);null!==i&&0<i.length&&e.removeClass(i.join(""))},t._handlePopperPlacementChange=function t(e){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))},t._fixTransition=function t(){var e=this.getTipElement(),i=this.config.animation;null===e.getAttribute("x-placement")&&(Sn(e).removeClass(Wn),this.config.animation=!1,this.hide(),this.show(),this.config.animation=i)},// Static
n._jQueryInterface=function t(i){return this.each(function(){var t=Sn(this).data(xn),e="object"==typeof i&&i;if((t||!/dispose|hide/.test(i))&&(t||(t=new n(this,e),Sn(this).data(xn,t)),"string"==typeof i)){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},s(n,null,[{key:"VERSION",get:function t(){return An}},{key:"Default",get:function t(){return Pn}},{key:"NAME",get:function t(){return En}},{key:"DATA_KEY",get:function t(){return xn}},{key:"Event",get:function t(){return Mn}},{key:"EVENT_KEY",get:function t(){return Dn}},{key:"DefaultType",get:function t(){return Nn}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Sn.fn[En]=Yn._jQueryInterface,Sn.fn[En].Constructor=Yn,Sn.fn[En].noConflict=function(){return Sn.fn[En]=In,Yn._jQueryInterface},Yn),Sn,En,An,xn,Dn,In,On,$n,Nn,jn,Pn,Hn,Ln,Mn,Wn,Fn,zn,Rn,Un,Bn,Qn,qn,Kn,Yn,Vn=(Gn="popover",Zn="4.1.1",to="."+(Jn="bs.popover"),eo=(Xn=e).fn[Gn],io="bs-popover",no=new RegExp("(^|\\s)"+io+"\\S+","g"),oo=a({},Cn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),so=a({},Cn.DefaultType,{content:"(string|element|function)"}),ro="fade",lo=".popover-header",co=".popover-body",uo={HIDE:"hide"+to,HIDDEN:"hidden"+to,SHOW:(ao="show")+to,SHOWN:"shown"+to,INSERTED:"inserted"+to,CLICK:"click"+to,FOCUSIN:"focusin"+to,FOCUSOUT:"focusout"+to,MOUSEENTER:"mouseenter"+to,MOUSELEAVE:"mouseleave"+to
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */},po=
/* */
function(t){function n(){return t.apply(this,arguments)||this}i(n,t);var e=n.prototype;
// Overrides
return e.isWithContent=function t(){return this.getTitle()||this._getContent()},e.addAttachmentClass=function t(e){Xn(this.getTipElement()).addClass(io+"-"+e)},e.getTipElement=function t(){return this.tip=this.tip||Xn(this.config.template)[0],this.tip},e.setContent=function t(){var e=Xn(this.getTipElement());// We use append for html objects to maintain js events
this.setElementContent(e.find(lo),this.getTitle());var i=this._getContent();"function"==typeof i&&(i=i.call(this.element)),this.setElementContent(e.find(co),i),e.removeClass(ro+" "+ao)},// Private
e._getContent=function t(){return this.element.getAttribute("data-content")||this.config.content},e._cleanTipClass=function t(){var e=Xn(this.getTipElement()),i=e.attr("class").match(no);null!==i&&0<i.length&&e.removeClass(i.join(""))},// Static
n._jQueryInterface=function t(i){return this.each(function(){var t=Xn(this).data(Jn),e="object"==typeof i?i:null;if((t||!/destroy|hide/.test(i))&&(t||(t=new n(this,e),Xn(this).data(Jn,t)),"string"==typeof i)){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},s(n,null,[{key:"VERSION",
// Getters
get:function t(){return Zn}},{key:"Default",get:function t(){return oo}},{key:"NAME",get:function t(){return Gn}},{key:"DATA_KEY",get:function t(){return Jn}},{key:"Event",get:function t(){return uo}},{key:"EVENT_KEY",get:function t(){return to}},{key:"DefaultType",get:function t(){return so}}]),n}(Cn),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Xn.fn[Gn]=po._jQueryInterface,Xn.fn[Gn].Constructor=po,Xn.fn[Gn].noConflict=function(){return Xn.fn[Gn]=eo,po._jQueryInterface},po),Xn,Gn,Zn,Jn,to,eo,io,no,oo,so,ro,ao,lo,co,uo,po,ho=(go="scrollspy",mo="4.1.1",yo="."+(vo="bs.scrollspy"),_o=".data-api",wo=(fo=e).fn[go],bo={offset:10,method:"auto",target:""},To={offset:"number",method:"string",target:"(string|element)"},ko={ACTIVATE:"activate"+yo,SCROLL:"scroll"+yo,LOAD_DATA_API:"load"+yo+_o},Co="dropdown-item",So="dropdown-menu",Eo="active",Ao='[data-spy="scroll"]',xo=".active",Do=".nav, .list-group",Io=".nav-link",Oo=".nav-item",$o=".list-group-item",No=".dropdown",jo=".dropdown-item",Po=".dropdown-toggle",Ho="offset",Lo="position"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,Mo=
/* */
function(){function n(t,e){var i=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" "+Io+","+this._config.target+" "+$o+","+this._config.target+" "+jo,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,fo(this._scrollElement).on(ko.SCROLL,function(t){return i._process(t)}),this.refresh(),this._process()}// Getters
var t=n.prototype;
// Public
return t.refresh=function t(){var e=this,i=this._scrollElement===this._scrollElement.window?Ho:Lo,o="auto"===this._config.method?i:this._config.method,s=o===Lo?this._getScrollTop():0,n;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),fo.makeArray(fo(this._selector)).map(function(t){var e,i=ft.getSelectorFromElement(t);if(i&&(e=fo(i)[0]),e){var n=e.getBoundingClientRect();if(n.width||n.height)
// TODO (fat): remove sketch reliance on jQuery position/offset
return[fo(e)[o]().top+s,i]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},t.dispose=function t(){fo.removeData(this._element,vo),fo(this._scrollElement).off(yo),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},// Private
t._getConfig=function t(e){if("string"!=typeof(e=a({},bo,"object"==typeof e&&e?e:{})).target){var i=fo(e.target).attr("id");i||(i=ft.getUID(go),fo(e.target).attr("id",i)),e.target="#"+i}return ft.typeCheckConfig(go,e,To),e},t._getScrollTop=function t(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},t._getScrollHeight=function t(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},t._getOffsetHeight=function t(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},t._process=function t(){var e=this._getScrollTop()+this._config.offset,i=this._getScrollHeight(),n=this._config.offset+i-this._getOffsetHeight();if(this._scrollHeight!==i&&this.refresh(),n<=e){var o=this._targets[this._targets.length-1];this._activeTarget!==o&&this._activate(o)}else{if(this._activeTarget&&e<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var s=this._offsets.length;s--;){var r;this._activeTarget!==this._targets[s]&&e>=this._offsets[s]&&(void 0===this._offsets[s+1]||e<this._offsets[s+1])&&this._activate(this._targets[s])}}},t._activate=function t(e){this._activeTarget=e,this._clear();var i=this._selector.split(",");// eslint-disable-next-line arrow-body-style
i=i.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var n=fo(i.join(","));n.hasClass(Co)?(n.closest(No).find(Po).addClass(Eo),n.addClass(Eo)):(
// Set triggered link as active
n.addClass(Eo),// Set triggered links parents as active
// With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
n.parents(Do).prev(Io+", "+$o).addClass(Eo),// Handle special case when .nav-link is inside .nav-item
n.parents(Do).prev(Oo).children(Io).addClass(Eo)),fo(this._scrollElement).trigger(ko.ACTIVATE,{relatedTarget:e})},t._clear=function t(){fo(this._selector).filter(xo).removeClass(Eo)},// Static
n._jQueryInterface=function t(i){return this.each(function(){var t=fo(this).data(vo),e;if(t||(t=new n(this,"object"==typeof i&&i),fo(this).data(vo,t)),"string"==typeof i){if(void 0===t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},s(n,null,[{key:"VERSION",get:function t(){return mo}},{key:"Default",get:function t(){return bo}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
fo(window).on(ko.LOAD_DATA_API,function(){for(var t=fo.makeArray(fo(Ao)),e=t.length;e--;){var i=fo(t[e]);Mo._jQueryInterface.call(i,i.data())}}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
fo.fn[go]=Mo._jQueryInterface,fo.fn[go].Constructor=Mo,fo.fn[go].noConflict=function(){return fo.fn[go]=wo,Mo._jQueryInterface},Mo),fo,go,mo,vo,yo,_o,wo,bo,To,ko,Co,So,Eo,Ao,xo,Do,Io,Oo,$o,No,jo,Po,Ho,Lo,Mo,Wo=(zo="tab",Ro="4.1.1",Bo="."+(Uo="bs.tab"),Qo=".data-api",qo=(Fo=e).fn.tab,Ko={HIDE:"hide"+Bo,HIDDEN:"hidden"+Bo,SHOW:"show"+Bo,SHOWN:"shown"+Bo,CLICK_DATA_API:"click"+Bo+Qo},Yo="dropdown-menu",Vo="active",Xo="disabled",Go="fade",Zo="show",Jo=".dropdown",ts=".nav, .list-group",es=".active",is="> li > .active",ns='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',os=".dropdown-toggle",ss="> .dropdown-menu .active"
/**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */,rs=
/* */
function(){function n(t){this._element=t}// Getters
var t=n.prototype;
// Public
return t.show=function t(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&Fo(this._element).hasClass(Vo)||Fo(this._element).hasClass(Xo))){var e,o,i=Fo(this._element).closest(ts)[0],s=ft.getSelectorFromElement(this._element);if(i){var r="UL"===i.nodeName?is:es;o=(o=Fo.makeArray(Fo(i).find(r)))[o.length-1]}var a=Fo.Event(Ko.HIDE,{relatedTarget:this._element}),l=Fo.Event(Ko.SHOW,{relatedTarget:o});if(o&&Fo(o).trigger(a),Fo(this._element).trigger(l),!l.isDefaultPrevented()&&!a.isDefaultPrevented()){s&&(e=Fo(s)[0]),this._activate(this._element,i);var d=function t(){var e=Fo.Event(Ko.HIDDEN,{relatedTarget:n._element}),i=Fo.Event(Ko.SHOWN,{relatedTarget:o});Fo(o).trigger(e),Fo(n._element).trigger(i)};e?this._activate(e,e.parentNode,d):d()}}},t.dispose=function t(){Fo.removeData(this._element,Uo),this._element=null},// Private
t._activate=function t(e,i,n){var o=this,s,r=(s="UL"===i.nodeName?Fo(i).find(is):Fo(i).children(es))[0],a=n&&r&&Fo(r).hasClass(Go),l=function t(){return o._transitionComplete(e,r,n)};if(r&&a){var d=ft.getTransitionDurationFromElement(r);Fo(r).one(ft.TRANSITION_END,l).emulateTransitionEnd(d)}else l()},t._transitionComplete=function t(e,i,n){if(i){Fo(i).removeClass(Zo+" "+Vo);var o=Fo(i.parentNode).find(ss)[0];o&&Fo(o).removeClass(Vo),"tab"===i.getAttribute("role")&&i.setAttribute("aria-selected",!1)}if(Fo(e).addClass(Vo),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),ft.reflow(e),Fo(e).addClass(Zo),e.parentNode&&Fo(e.parentNode).hasClass(Yo)){var s=Fo(e).closest(Jo)[0];s&&Fo(s).find(os).addClass(Vo),e.setAttribute("aria-expanded",!0)}n&&n()},// Static
n._jQueryInterface=function t(i){return this.each(function(){var t=Fo(this),e=t.data(Uo);if(e||(e=new n(this),t.data(Uo,e)),"string"==typeof i){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(n,null,[{key:"VERSION",get:function t(){return Ro}}]),n}(),
/**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
Fo(document).on(Ko.CLICK_DATA_API,ns,function(t){t.preventDefault(),rs._jQueryInterface.call(Fo(this),"show")}),
/**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
Fo.fn.tab=rs._jQueryInterface,Fo.fn.tab.Constructor=rs,Fo.fn.tab.noConflict=function(){return Fo.fn.tab=qo,rs._jQueryInterface},rs),Fo,zo,Ro,Uo,Bo,Qo,qo,Ko,Yo,Vo,Xo,Go,Zo,Jo,ts,es,is,ns,os,ss,rs;
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
/**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
!function(t){if(void 0===t)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split("."),i=1,n=2,o=9,s=1,r=4;if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||4<=e[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(e),t.Util=ft,t.Alert=gt,t.Button=Dt,t.Carousel=Kt,t.Collapse=Ae,t.Dropdown=hi,t.Modal=Ji,t.Popover=Vn,t.Scrollspy=ho,t.Tab=Wo,t.Tooltip=Cn,Object.defineProperty(t,"__esModule",{value:!0})}),
/*! Lity - v2.3.1 - 2018-04-20
* http://sorgalla.com/lity/
* Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
function(e,i){"function"==typeof define&&define.amd?define(["jquery"],function(t){return i(e,t)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=i(e,require("jquery")):e.lity=i(e,e.jQuery||e.Zepto)}("undefined"!=typeof window?window:this,function(t,u){"use strict";function p(t){var e=A();return W&&t.length?(t.one(W,e.resolve),setTimeout(e.resolve,500)):e.resolve(),e.promise()}function h(t,e,i){if(1===arguments.length)return u.extend({},t);if("string"==typeof e){if(void 0===i)return void 0===t[e]?null:t[e];t[e]=i}else u.extend(t,e);return this}function i(t){for(var e=decodeURI(t.split("#")[0]).split("&"),i={},n,o=0,s=e.length;o<s;o++)e[o]&&(i[(n=e[o].split("="))[0]]=n[1]);return i}function n(t,e){return t+(-1<t.indexOf("?")?"&":"?")+u.param(e)}function o(t,e){var i=t.indexOf("#");return-1===i?e:(0<i&&(t=t.substr(i)),e+t)}function r(t){return u('<span class="lity-error"/>').append(t)}function e(t,e){var i=e.opener()&&e.opener().data("lity-desc")||"Image with no description",n=u('<img src="'+t+'" alt="'+i+'"/>'),o=A(),s=function(){o.reject(r("Failed loading image"))};return n.on("load",function(){if(0===this.naturalWidth)return s();o.resolve(n)}).on("error",s),o.promise()}function s(t,e){var i,n,o;try{i=u(t)}catch(t){return!1}return!!i.length&&(n=u('<i style="display:none !important"/>'),o=i.hasClass("lity-hide"),e.element().one("lity:remove",function(){n.before(i).remove(),o&&!i.closest(".lity-content").length&&i.addClass("lity-hide")}),i.removeClass("lity-hide").after(n))}function a(t){var e=P.exec(t);return!!e&&f(o(t,n("https://www.youtube"+(e[2]||"")+".com/embed/"+e[4],u.extend({autoplay:1},i(e[5]||"")))))}function l(t){var e=H.exec(t);return!!e&&f(o(t,n("https://player.vimeo.com/video/"+e[3],u.extend({autoplay:1},i(e[4]||"")))))}function d(t){var e=M.exec(t);return!!e&&(0!==t.indexOf("http")&&(t="https:"+t),f(o(t,n("https://www.facebook.com/plugins/video.php?href="+t,u.extend({autoplay:1},i(e[4]||""))))))}function c(t){var e=L.exec(t);return!!e&&f(o(t,n("https://www.google."+e[3]+"/maps?"+e[6],{output:0<e[6].indexOf("layer=c")?"svembed":"embed"})))}function f(t){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+t+'"/></div>'}function g(){return S.documentElement.clientHeight?S.documentElement.clientHeight:Math.round(E.height())}function m(t){var e=b();e&&(
// ESC key
27===t.keyCode&&e.options("esc")&&e.close(),
// TAB key
9===t.keyCode&&v(t,e))}function v(t,e){var i=e.element().find($),n=i.index(S.activeElement);t.shiftKey&&n<=0?(i.get(i.length-1).focus(),t.preventDefault()):t.shiftKey||n!==i.length-1||(i.get(0).focus(),t.preventDefault())}function y(){u.each(D,function(t,e){e.resize()})}function _(t){1===D.unshift(t)&&(x.addClass("lity-active"),E.on({resize:y,keydown:m})),u("body > *").not(t.element()).addClass("lity-hidden").each(function(){var t=u(this);void 0===t.data(O)&&t.data(O,t.attr(I)||null)}).attr(I,"true")}function w(e){var t;e.element().attr(I,"true"),1===D.length&&(x.removeClass("lity-active"),E.off({resize:y,keydown:m})),(t=(D=u.grep(D,function(t){return e!==t})).length?D[0].element():u(".lity-hidden")).removeClass("lity-hidden").each(function(){var t=u(this),e=t.data(O);e?t.attr(I,e):t.removeAttr(I),t.removeData(O)})}function b(){return 0===D.length?null:D[0]}function T(i,n,o,t){var s="inline",r,a=u.extend({},o);return t&&a[t]?(r=a[t](i,n),s=t):(
// Run inline and iframe handlers after all other handlers
u.each(["inline","iframe"],function(t,e){delete a[e],a[e]=o[e]}),u.each(a,function(t,e){
// Handler might be "removed" by setting callback to null
return!e||(!(!e.test||e.test(i,n))||(!1!==(r=e(i,n))?(s=t,!1):void 0))})),{handler:s,content:r||""}}function k(t,e,i,n){function o(t){c=u(t).css("max-height",g()+"px"),d.find(".lity-loader").each(function(){var t=u(this);p(t).always(function(){t.remove()})}),d.removeClass("lity-loading").find(".lity-content").empty().append(c),a=!0,c.trigger("lity:ready",[s])}var s=this,r,a=!1,l=!1,d,c;e=u.extend({},N,e),d=u(e.template),
// -- API --
s.element=function(){return d},s.opener=function(){return i},s.options=u.proxy(h,s,e),s.handlers=u.proxy(h,s,e.handlers),s.resize=function(){a&&!l&&c.css("max-height",g()+"px").trigger("lity:resize",[s])},s.close=function(){if(a&&!l){l=!0,w(s);var t=A();
// We return focus only if the current focus is inside this instance
if(n&&(S.activeElement===d[0]||u.contains(d[0],S.activeElement)))try{n.focus()}catch(t){
// Ignore exceptions, eg. for SVG elements which can't be
// focused in IE11
}return c.trigger("lity:close",[s]),d.removeClass("lity-opened").addClass("lity-closed"),p(c.add(d)).always(function(){c.trigger("lity:remove",[s]),d.remove(),d=void 0,t.resolve()}),t.promise()}},
// -- Initialization --
r=T(t,s,e.handlers,e.handler),d.attr(I,"false").addClass("lity-loading lity-opened lity-"+r.handler).appendTo("body").focus().on("click","[data-lity-close]",function(t){u(t.target).is("[data-lity-close]")&&s.close()}).trigger("lity:open",[s]),_(s),u.when(r.content).always(o)}function C(t,e,i){t.preventDefault?(t.preventDefault(),t=(i=u(this)).data("lity-target")||i.attr("href")||i.attr("src")):i=u(i);var n=new k(t,u.extend({},i.data("lity-options")||i.data("lity"),e),i,S.activeElement);if(!t.preventDefault)return n}var S=t.document,E=u(t),A=u.Deferred,x=u("html"),D=[],I="aria-hidden",O="lity-"+I,$='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',N={esc:!0,handler:null,handlers:{image:e,inline:s,youtube:a,vimeo:l,googlemaps:c,facebookvideo:d,iframe:f},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},j=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,P=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,H=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,L=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,M=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,W=function(){var t=S.createElement("div"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return e[i];return!1}();return e.test=function(t){return j.test(t)},C.version="2.3.1",C.options=u.proxy(h,C,N),C.handlers=u.proxy(h,C,N.handlers),C.current=b,u(S).on("click.lity","[data-lity]",C),C}),// Generated by CoffeeScript 1.9.2
/**
@license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */
function(){var I,O;I=this.jQuery||window.jQuery,O=I(window),I.fn.stick_in_parent=function(t){var k,e,C,i,n,S,o,E,A,s,x,D;for(null==t&&(t={}),D=t.sticky_class,S=t.inner_scrolling,x=t.recalc_every,s=t.parent,A=t.offset_top,E=t.spacer,C=t.bottoming,null==A&&(A=0),null==s&&(s=void 0),null==S&&(S=!0),null==D&&(D="is_stuck"),k=I(document),null==C&&(C=!0),i=function(r,a,l,d,c,u,p,h){var f,t,g,m,v,y,_,w,e,b,T,n;if(!r.data("sticky_kit")){if(r.data("sticky_kit",!0),v=k.height(),_=r.parent(),null!=s&&(_=_.closest(s)),!_.length)throw"failed to find stick parent";if(f=g=!1,(T=null!=E?E&&r.closest(E):I("<div />"))&&T.css("position",r.css("position")),(w=function(){var t,e,i;if(!h)return v=k.height(),t=parseInt(_.css("border-top-width"),10),e=parseInt(_.css("padding-top"),10),a=parseInt(_.css("padding-bottom"),10),l=_.offset().top+t+e,d=_.height(),g&&(f=g=!1,null==E&&(r.insertAfter(T),T.detach()),r.css({position:"",top:"",width:"",bottom:""}).removeClass(D),i=!0),c=r.offset().top-(parseInt(r.css("margin-top"),10)||0)-A,u=r.outerHeight(!0),p=r.css("float"),T&&T.css({width:r.outerWidth(!0),height:u,display:r.css("display"),"vertical-align":r.css("vertical-align"),float:p}),i?n():void 0})(),u!==d)return m=void 0,y=A,b=x,n=function(){var t,e,i,n,o,s;if(!h)return i=!1,null!=b&&(b-=1)<=0&&(b=x,w(),i=!0),i||k.height()===v||(w(),i=!0),n=O.scrollTop(),null!=m&&(e=n-m),m=n,g?(C&&(o=d+l<n+u+y,f&&!o&&(f=!1,r.css({position:"fixed",bottom:"",top:y}).trigger("sticky_kit:unbottom"))),n<c&&(g=!1,y=A,null==E&&("left"!==p&&"right"!==p||r.insertAfter(T),T.detach()),t={position:"",width:"",top:""},r.css(t).removeClass(D).trigger("sticky_kit:unstick")),S&&(s=O.height())<u+A&&(f||(y-=e,y=Math.max(s-u,y),y=Math.min(A,y),g&&r.css({top:y+"px"})))):c<n&&(g=!0,(t={position:"fixed",top:y}).width="border-box"===r.css("box-sizing")?r.outerWidth()+"px":r.width()+"px",r.css(t).addClass(D),null==E&&(r.after(T),"left"!==p&&"right"!==p||T.append(r)),r.trigger("sticky_kit:stick")),g&&C&&(null==o&&(o=d+l<n+u+y),!f&&o)?(f=!0,"static"===_.css("position")&&_.css({position:"relative"}),r.css({position:"absolute",bottom:a,top:"auto"}).trigger("sticky_kit:bottom")):void 0},e=function(){return w(),n()},t=function(){if(h=!0,O.off("touchmove",n),O.off("scroll",n),O.off("resize",e),I(document.body).off("sticky_kit:recalc",e),r.off("sticky_kit:detach",t),r.removeData("sticky_kit"),r.css({position:"",bottom:"",top:"",width:""}),_.position("position",""),g)return null==E&&("left"!==p&&"right"!==p||r.insertAfter(T),T.remove()),r.removeClass(D)},O.on("touchmove",n),O.on("scroll",n),O.on("resize",e),I(document.body).on("sticky_kit:recalc",e),r.on("sticky_kit:detach",t),setTimeout(n,0)}},n=0,o=this.length;n<o;n++)e=this[n],i(I(e));return this}}.call(this),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(c){"use strict";var a=window.Slick||{};(a=function(){function t(t,e){var i=this,n;i.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:c(t),appendDots:c(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(t,e){return c('<button type="button" />').text(e+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},i.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},c.extend(i,i.initials),i.activeBreakpoint=null,i.animType=null,i.animProp=null,i.breakpoints=[],i.breakpointSettings=[],i.cssTransitions=!1,i.focussed=!1,i.interrupted=!1,i.hidden="hidden",i.paused=!0,i.positionProp=null,i.respondTo=null,i.rowCount=1,i.shouldClick=!0,i.$slider=c(t),i.$slidesCache=null,i.transformType=null,i.transitionType=null,i.visibilityChange="visibilitychange",i.windowWidth=0,i.windowTimer=null,n=c(t).data("slick")||{},i.options=c.extend({},i.defaults,e,n),i.currentSlide=i.options.initialSlide,i.originalSettings=i.options,void 0!==document.mozHidden?(i.hidden="mozHidden",i.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(i.hidden="webkitHidden",i.visibilityChange="webkitvisibilitychange"),i.autoPlay=c.proxy(i.autoPlay,i),i.autoPlayClear=c.proxy(i.autoPlayClear,i),i.autoPlayIterator=c.proxy(i.autoPlayIterator,i),i.changeSlide=c.proxy(i.changeSlide,i),i.clickHandler=c.proxy(i.clickHandler,i),i.selectHandler=c.proxy(i.selectHandler,i),i.setPosition=c.proxy(i.setPosition,i),i.swipeHandler=c.proxy(i.swipeHandler,i),i.dragHandler=c.proxy(i.dragHandler,i),i.keyHandler=c.proxy(i.keyHandler,i),i.instanceUid=o++,
// A simple way to check for HTML strings
// Strict HTML recognition (must start with <)
// Extracted from jQuery v1.11 source
i.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,i.registerBreakpoints(),i.init(!0)}var o=0;return t}()).prototype.activateADA=function(){var t;this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},a.prototype.addSlide=a.prototype.slickAdd=function(t,e,i){var n=this;if("boolean"==typeof e)i=e,e=null;else if(e<0||e>=n.slideCount)return!1;n.unload(),"number"==typeof e?0===e&&0===n.$slides.length?c(t).appendTo(n.$slideTrack):i?c(t).insertBefore(n.$slides.eq(e)):c(t).insertAfter(n.$slides.eq(e)):!0===i?c(t).prependTo(n.$slideTrack):c(t).appendTo(n.$slideTrack),n.$slides=n.$slideTrack.children(this.options.slide),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.append(n.$slides),n.$slides.each(function(t,e){c(e).attr("data-slick-index",t)}),n.$slidesCache=n.$slides,n.reinit()},a.prototype.animateHeight=function(){var t=this;if(1===t.options.slidesToShow&&!0===t.options.adaptiveHeight&&!1===t.options.vertical){var e=t.$slides.eq(t.currentSlide).outerHeight(!0);t.$list.animate({height:e},t.options.speed)}},a.prototype.animateSlide=function(t,e){var i={},n=this;n.animateHeight(),!0===n.options.rtl&&!1===n.options.vertical&&(t=-t),!1===n.transformsEnabled?!1===n.options.vertical?n.$slideTrack.animate({left:t},n.options.speed,n.options.easing,e):n.$slideTrack.animate({top:t},n.options.speed,n.options.easing,e):!1===n.cssTransitions?(!0===n.options.rtl&&(n.currentLeft=-n.currentLeft),c({animStart:n.currentLeft}).animate({animStart:t},{duration:n.options.speed,easing:n.options.easing,step:function(t){t=Math.ceil(t),!1===n.options.vertical?i[n.animType]="translate("+t+"px, 0px)":i[n.animType]="translate(0px,"+t+"px)",n.$slideTrack.css(i)},complete:function(){e&&e.call()}})):(n.applyTransition(),t=Math.ceil(t),!1===n.options.vertical?i[n.animType]="translate3d("+t+"px, 0px, 0px)":i[n.animType]="translate3d(0px,"+t+"px, 0px)",n.$slideTrack.css(i),e&&setTimeout(function(){n.disableTransition(),e.call()},n.options.speed))},a.prototype.getNavTarget=function(){var t=this,e=t.options.asNavFor;return e&&null!==e&&(e=c(e).not(t.$slider)),e},a.prototype.asNavFor=function(e){var t,i=this.getNavTarget();null!==i&&"object"==typeof i&&i.each(function(){var t=c(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},a.prototype.applyTransition=function(t){var e=this,i={};!1===e.options.fade?i[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:i[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(i):e.$slides.eq(t).css(i)},a.prototype.autoPlay=function(){var t=this;t.autoPlayClear(),t.slideCount>t.options.slidesToShow&&(t.autoPlayTimer=setInterval(t.autoPlayIterator,t.options.autoplaySpeed))},a.prototype.autoPlayClear=function(){var t=this;t.autoPlayTimer&&clearInterval(t.autoPlayTimer)},a.prototype.autoPlayIterator=function(){var t=this,e=t.currentSlide+t.options.slidesToScroll;t.paused||t.interrupted||t.focussed||(!1===t.options.infinite&&(1===t.direction&&t.currentSlide+1===t.slideCount-1?t.direction=0:0===t.direction&&(e=t.currentSlide-t.options.slidesToScroll,t.currentSlide-1==0&&(t.direction=1))),t.slideHandler(e))},a.prototype.buildArrows=function(){var t=this;!0===t.options.arrows&&(t.$prevArrow=c(t.options.prevArrow).addClass("slick-arrow"),t.$nextArrow=c(t.options.nextArrow).addClass("slick-arrow"),t.slideCount>t.options.slidesToShow?(t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.prependTo(t.options.appendArrows),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.appendTo(t.options.appendArrows),!0!==t.options.infinite&&t.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},a.prototype.buildDots=function(){var t=this,e,i;if(!0===t.options.dots&&t.slideCount>t.options.slidesToShow){for(t.$slider.addClass("slick-dotted"),i=c("<ul />").addClass(t.options.dotsClass),e=0;e<=t.getDotCount();e+=1)i.append(c("<li />").append(t.options.customPaging.call(this,t,e)));t.$dots=i.appendTo(t.options.appendDots),t.$dots.find("li").first().addClass("slick-active")}},a.prototype.buildOut=function(){var t=this;t.$slides=t.$slider.children(t.options.slide+":not(.slick-cloned)").addClass("slick-slide"),t.slideCount=t.$slides.length,t.$slides.each(function(t,e){c(e).attr("data-slick-index",t).data("originalStyling",c(e).attr("style")||"")}),t.$slider.addClass("slick-slider"),t.$slideTrack=0===t.slideCount?c('<div class="slick-track"/>').appendTo(t.$slider):t.$slides.wrapAll('<div class="slick-track"/>').parent(),t.$list=t.$slideTrack.wrap('<div class="slick-list"/>').parent(),t.$slideTrack.css("opacity",0),!0!==t.options.centerMode&&!0!==t.options.swipeToSlide||(t.options.slidesToScroll=1),c("img[data-lazy]",t.$slider).not("[src]").addClass("slick-loading"),t.setupInfinite(),t.buildArrows(),t.buildDots(),t.updateDots(),t.setSlideClasses("number"==typeof t.currentSlide?t.currentSlide:0),!0===t.options.draggable&&t.$list.addClass("draggable")},a.prototype.buildRows=function(){var t=this,e,i,n,o,s,r,a;if(o=document.createDocumentFragment(),r=t.$slider.children(),0<t.options.rows){for(a=t.options.slidesPerRow*t.options.rows,s=Math.ceil(r.length/a),e=0;e<s;e++){var l=document.createElement("div");for(i=0;i<t.options.rows;i++){var d=document.createElement("div");for(n=0;n<t.options.slidesPerRow;n++){var c=e*a+(i*t.options.slidesPerRow+n);r.get(c)&&d.appendChild(r.get(c))}l.appendChild(d)}o.appendChild(l)}t.$slider.empty().append(o),t.$slider.children().children().children().css({width:100/t.options.slidesPerRow+"%",display:"inline-block"})}},a.prototype.checkResponsive=function(t,e){var i=this,n,o,s,r=!1,a=i.$slider.width(),l=window.innerWidth||c(window).width();if("window"===i.respondTo?s=l:"slider"===i.respondTo?s=a:"min"===i.respondTo&&(s=Math.min(l,a)),i.options.responsive&&i.options.responsive.length&&null!==i.options.responsive){for(n in o=null,i.breakpoints)i.breakpoints.hasOwnProperty(n)&&(!1===i.originalSettings.mobileFirst?s<i.breakpoints[n]&&(o=i.breakpoints[n]):s>i.breakpoints[n]&&(o=i.breakpoints[n]));null!==o?null!==i.activeBreakpoint?(o!==i.activeBreakpoint||e)&&(i.activeBreakpoint=o,"unslick"===i.breakpointSettings[o]?i.unslick(o):(i.options=c.extend({},i.originalSettings,i.breakpointSettings[o]),!0===t&&(i.currentSlide=i.options.initialSlide),i.refresh(t)),r=o):(i.activeBreakpoint=o,"unslick"===i.breakpointSettings[o]?i.unslick(o):(i.options=c.extend({},i.originalSettings,i.breakpointSettings[o]),!0===t&&(i.currentSlide=i.options.initialSlide),i.refresh(t)),r=o):null!==i.activeBreakpoint&&(i.activeBreakpoint=null,i.options=i.originalSettings,!0===t&&(i.currentSlide=i.options.initialSlide),i.refresh(t),r=o),
// only trigger breakpoints during an actual break. not on initialize.
t||!1===r||i.$slider.trigger("breakpoint",[i,r])}},a.prototype.changeSlide=function(t,e){var i=this,n=c(t.currentTarget),o,s,r;
// If target is a link, prevent default action.
switch(n.is("a")&&t.preventDefault(),
// If target is not the <li> element (ie: a child), find the <li>.
n.is("li")||(n=n.closest("li")),o=(r=i.slideCount%i.options.slidesToScroll!=0)?0:(i.slideCount-i.currentSlide)%i.options.slidesToScroll,t.data.message){case"previous":s=0===o?i.options.slidesToScroll:i.options.slidesToShow-o,i.slideCount>i.options.slidesToShow&&i.slideHandler(i.currentSlide-s,!1,e);break;case"next":s=0===o?i.options.slidesToScroll:o,i.slideCount>i.options.slidesToShow&&i.slideHandler(i.currentSlide+s,!1,e);break;case"index":var a=0===t.data.index?0:t.data.index||n.index()*i.options.slidesToScroll;i.slideHandler(i.checkNavigable(a),!1,e),n.children().trigger("focus");break;default:return}},a.prototype.checkNavigable=function(t){var e,i,n;if(n=0,t>(i=this.getNavigableIndexes())[i.length-1])t=i[i.length-1];else for(var o in i){if(t<i[o]){t=n;break}n=i[o]}return t},a.prototype.cleanUpEvents=function(){var t=this;t.options.dots&&null!==t.$dots&&(c("li",t.$dots).off("click.slick",t.changeSlide).off("mouseenter.slick",c.proxy(t.interrupt,t,!0)).off("mouseleave.slick",c.proxy(t.interrupt,t,!1)),!0===t.options.accessibility&&t.$dots.off("keydown.slick",t.keyHandler)),t.$slider.off("focus.slick blur.slick"),!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow&&t.$prevArrow.off("click.slick",t.changeSlide),t.$nextArrow&&t.$nextArrow.off("click.slick",t.changeSlide),!0===t.options.accessibility&&(t.$prevArrow&&t.$prevArrow.off("keydown.slick",t.keyHandler),t.$nextArrow&&t.$nextArrow.off("keydown.slick",t.keyHandler))),t.$list.off("touchstart.slick mousedown.slick",t.swipeHandler),t.$list.off("touchmove.slick mousemove.slick",t.swipeHandler),t.$list.off("touchend.slick mouseup.slick",t.swipeHandler),t.$list.off("touchcancel.slick mouseleave.slick",t.swipeHandler),t.$list.off("click.slick",t.clickHandler),c(document).off(t.visibilityChange,t.visibility),t.cleanUpSlideEvents(),!0===t.options.accessibility&&t.$list.off("keydown.slick",t.keyHandler),!0===t.options.focusOnSelect&&c(t.$slideTrack).children().off("click.slick",t.selectHandler),c(window).off("orientationchange.slick.slick-"+t.instanceUid,t.orientationChange),c(window).off("resize.slick.slick-"+t.instanceUid,t.resize),c("[draggable!=true]",t.$slideTrack).off("dragstart",t.preventDefault),c(window).off("load.slick.slick-"+t.instanceUid,t.setPosition)},a.prototype.cleanUpSlideEvents=function(){var t=this;t.$list.off("mouseenter.slick",c.proxy(t.interrupt,t,!0)),t.$list.off("mouseleave.slick",c.proxy(t.interrupt,t,!1))},a.prototype.cleanUpRows=function(){var t=this,e;0<t.options.rows&&((e=t.$slides.children().children()).removeAttr("style"),t.$slider.empty().append(e))},a.prototype.clickHandler=function(t){var e;!1===this.shouldClick&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault())},a.prototype.destroy=function(t){var e=this;e.autoPlayClear(),e.touchObject={},e.cleanUpEvents(),c(".slick-cloned",e.$slider).detach(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.$prevArrow.length&&(e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove()),e.$nextArrow&&e.$nextArrow.length&&(e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove()),e.$slides&&(e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){c(this).attr("style",c(this).data("originalStyling"))}),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.detach(),e.$list.detach(),e.$slider.append(e.$slides)),e.cleanUpRows(),e.$slider.removeClass("slick-slider"),e.$slider.removeClass("slick-initialized"),e.$slider.removeClass("slick-dotted"),e.unslicked=!0,t||e.$slider.trigger("destroy",[e])},a.prototype.disableTransition=function(t){var e=this,i={};i[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(i):e.$slides.eq(t).css(i)},a.prototype.fadeSlide=function(t,e){var i=this;!1===i.cssTransitions?(i.$slides.eq(t).css({zIndex:i.options.zIndex}),i.$slides.eq(t).animate({opacity:1},i.options.speed,i.options.easing,e)):(i.applyTransition(t),i.$slides.eq(t).css({opacity:1,zIndex:i.options.zIndex}),e&&setTimeout(function(){i.disableTransition(t),e.call()},i.options.speed))},a.prototype.fadeSlideOut=function(t){var e=this;!1===e.cssTransitions?e.$slides.eq(t).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(t),e.$slides.eq(t).css({opacity:0,zIndex:e.options.zIndex-2}))},a.prototype.filterSlides=a.prototype.slickFilter=function(t){var e=this;null!==t&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(t).appendTo(e.$slideTrack),e.reinit())},a.prototype.focusHandler=function(){var i=this;i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var e=c(this);setTimeout(function(){i.options.pauseOnFocus&&(i.focussed=e.is(":focus"),i.autoPlay())},0)})},a.prototype.getCurrent=a.prototype.slickCurrentSlide=function(){var t;return this.currentSlide},a.prototype.getDotCount=function(){var t=this,e=0,i=0,n=0;if(!0===t.options.infinite)if(t.slideCount<=t.options.slidesToShow)++n;else for(;e<t.slideCount;)++n,e=i+t.options.slidesToScroll,i+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow;else if(!0===t.options.centerMode)n=t.slideCount;else if(t.options.asNavFor)for(;e<t.slideCount;)++n,e=i+t.options.slidesToScroll,i+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow;else n=1+Math.ceil((t.slideCount-t.options.slidesToShow)/t.options.slidesToScroll);return n-1},a.prototype.getLeft=function(t){var e=this,i,n,o=0,s,r;return e.slideOffset=0,n=e.$slides.first().outerHeight(!0),!0===e.options.infinite?(e.slideCount>e.options.slidesToShow&&(e.slideOffset=e.slideWidth*e.options.slidesToShow*-1,r=-1,!0===e.options.vertical&&!0===e.options.centerMode&&(2===e.options.slidesToShow?r=-1.5:1===e.options.slidesToShow&&(r=-2)),o=n*e.options.slidesToShow*r),e.slideCount%e.options.slidesToScroll!=0&&t+e.options.slidesToScroll>e.slideCount&&e.slideCount>e.options.slidesToShow&&(o=t>e.slideCount?(e.slideOffset=(e.options.slidesToShow-(t-e.slideCount))*e.slideWidth*-1,(e.options.slidesToShow-(t-e.slideCount))*n*-1):(e.slideOffset=e.slideCount%e.options.slidesToScroll*e.slideWidth*-1,e.slideCount%e.options.slidesToScroll*n*-1))):t+e.options.slidesToShow>e.slideCount&&(e.slideOffset=(t+e.options.slidesToShow-e.slideCount)*e.slideWidth,o=(t+e.options.slidesToShow-e.slideCount)*n),e.slideCount<=e.options.slidesToShow&&(o=e.slideOffset=0),!0===e.options.centerMode&&e.slideCount<=e.options.slidesToShow?e.slideOffset=e.slideWidth*Math.floor(e.options.slidesToShow)/2-e.slideWidth*e.slideCount/2:!0===e.options.centerMode&&!0===e.options.infinite?e.slideOffset+=e.slideWidth*Math.floor(e.options.slidesToShow/2)-e.slideWidth:!0===e.options.centerMode&&(e.slideOffset=0,e.slideOffset+=e.slideWidth*Math.floor(e.options.slidesToShow/2)),i=!1===e.options.vertical?t*e.slideWidth*-1+e.slideOffset:t*n*-1+o,!0===e.options.variableWidth&&(s=e.slideCount<=e.options.slidesToShow||!1===e.options.infinite?e.$slideTrack.children(".slick-slide").eq(t):e.$slideTrack.children(".slick-slide").eq(t+e.options.slidesToShow),i=!0===e.options.rtl?s[0]?-1*(e.$slideTrack.width()-s[0].offsetLeft-s.width()):0:s[0]?-1*s[0].offsetLeft:0,!0===e.options.centerMode&&(s=e.slideCount<=e.options.slidesToShow||!1===e.options.infinite?e.$slideTrack.children(".slick-slide").eq(t):e.$slideTrack.children(".slick-slide").eq(t+e.options.slidesToShow+1),i=!0===e.options.rtl?s[0]?-1*(e.$slideTrack.width()-s[0].offsetLeft-s.width()):0:s[0]?-1*s[0].offsetLeft:0,i+=(e.$list.width()-s.outerWidth())/2)),i},a.prototype.getOption=a.prototype.slickGetOption=function(t){var e;return this.options[t]},a.prototype.getNavigableIndexes=function(){var t=this,e=0,i=0,n=[],o;for(o=!1===t.options.infinite?t.slideCount:(e=-1*t.options.slidesToScroll,i=-1*t.options.slidesToScroll,2*t.slideCount);e<o;)n.push(e),e=i+t.options.slidesToScroll,i+=t.options.slidesToScroll<=t.options.slidesToShow?t.options.slidesToScroll:t.options.slidesToShow;return n},a.prototype.getSlick=function(){return this},a.prototype.getSlideCount=function(){var i=this,t,n,o;return o=!0===i.options.centerMode?i.slideWidth*Math.floor(i.options.slidesToShow/2):0,!0===i.options.swipeToSlide?(i.$slideTrack.find(".slick-slide").each(function(t,e){if(e.offsetLeft-o+c(e).outerWidth()/2>-1*i.swipeLeft)return n=e,!1}),t=Math.abs(c(n).attr("data-slick-index")-i.currentSlide)||1):i.options.slidesToScroll},a.prototype.goTo=a.prototype.slickGoTo=function(t,e){var i;this.changeSlide({data:{message:"index",index:parseInt(t)}},e)},a.prototype.init=function(t){var e=this;c(e.$slider).hasClass("slick-initialized")||(c(e.$slider).addClass("slick-initialized"),e.buildRows(),e.buildOut(),e.setProps(),e.startLoad(),e.loadSlider(),e.initializeEvents(),e.updateArrows(),e.updateDots(),e.checkResponsive(!0),e.focusHandler()),t&&e.$slider.trigger("init",[e]),!0===e.options.accessibility&&e.initADA(),e.options.autoplay&&(e.paused=!1,e.autoPlay())},a.prototype.initADA=function(){var n=this,i=Math.ceil(n.slideCount/n.options.slidesToShow),o=n.getNavigableIndexes().filter(function(t){return 0<=t&&t<n.slideCount});n.$slides.add(n.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==n.$dots&&(n.$slides.not(n.$slideTrack.find(".slick-cloned")).each(function(t){var e=o.indexOf(t);if(c(this).attr({role:"tabpanel",id:"slick-slide"+n.instanceUid+t,tabindex:-1}),-1!==e){var i="slick-slide-control"+n.instanceUid+e;c("#"+i).length&&c(this).attr({"aria-describedby":i})}}),n.$dots.attr("role","tablist").find("li").each(function(t){var e=o[t];c(this).attr({role:"presentation"}),c(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+n.instanceUid+t,"aria-controls":"slick-slide"+n.instanceUid+e,"aria-label":t+1+" of "+i,"aria-selected":null,tabindex:"-1"})}).eq(n.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var t=n.currentSlide,e=t+n.options.slidesToShow;t<e;t++)n.options.focusOnChange?n.$slides.eq(t).attr({tabindex:"0"}):n.$slides.eq(t).removeAttr("tabindex");n.activateADA()},a.prototype.initArrowEvents=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},t.changeSlide),t.$nextArrow.off("click.slick").on("click.slick",{message:"next"},t.changeSlide),!0===t.options.accessibility&&(t.$prevArrow.on("keydown.slick",t.keyHandler),t.$nextArrow.on("keydown.slick",t.keyHandler)))},a.prototype.initDotEvents=function(){var t=this;!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&(c("li",t.$dots).on("click.slick",{message:"index"},t.changeSlide),!0===t.options.accessibility&&t.$dots.on("keydown.slick",t.keyHandler)),!0===t.options.dots&&!0===t.options.pauseOnDotsHover&&t.slideCount>t.options.slidesToShow&&c("li",t.$dots).on("mouseenter.slick",c.proxy(t.interrupt,t,!0)).on("mouseleave.slick",c.proxy(t.interrupt,t,!1))},a.prototype.initSlideEvents=function(){var t=this;t.options.pauseOnHover&&(t.$list.on("mouseenter.slick",c.proxy(t.interrupt,t,!0)),t.$list.on("mouseleave.slick",c.proxy(t.interrupt,t,!1)))},a.prototype.initializeEvents=function(){var t=this;t.initArrowEvents(),t.initDotEvents(),t.initSlideEvents(),t.$list.on("touchstart.slick mousedown.slick",{action:"start"},t.swipeHandler),t.$list.on("touchmove.slick mousemove.slick",{action:"move"},t.swipeHandler),t.$list.on("touchend.slick mouseup.slick",{action:"end"},t.swipeHandler),t.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},t.swipeHandler),t.$list.on("click.slick",t.clickHandler),c(document).on(t.visibilityChange,c.proxy(t.visibility,t)),!0===t.options.accessibility&&t.$list.on("keydown.slick",t.keyHandler),!0===t.options.focusOnSelect&&c(t.$slideTrack).children().on("click.slick",t.selectHandler),c(window).on("orientationchange.slick.slick-"+t.instanceUid,c.proxy(t.orientationChange,t)),c(window).on("resize.slick.slick-"+t.instanceUid,c.proxy(t.resize,t)),c("[draggable!=true]",t.$slideTrack).on("dragstart",t.preventDefault),c(window).on("load.slick.slick-"+t.instanceUid,t.setPosition),c(t.setPosition)},a.prototype.initUI=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.show(),t.$nextArrow.show()),!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&t.$dots.show()},a.prototype.keyHandler=function(t){var e=this;
//Dont slide if the cursor is inside the form fields and arrow keys are pressed
t.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===t.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===t.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},a.prototype.lazyLoad=function(){function t(t){c("img[data-lazy]",t).each(function(){var t=c(this),e=c(this).attr("data-lazy"),i=c(this).attr("data-srcset"),n=c(this).attr("data-sizes")||s.$slider.attr("data-sizes"),o=document.createElement("img");o.onload=function(){t.animate({opacity:0},100,function(){i&&(t.attr("srcset",i),n&&t.attr("sizes",n)),t.attr("src",e).animate({opacity:1},200,function(){t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),s.$slider.trigger("lazyLoaded",[s,t,e])})},o.onerror=function(){t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),s.$slider.trigger("lazyLoadError",[s,t,e])},o.src=e})}var s=this,e,i,n,o;if(!0===s.options.centerMode?o=!0===s.options.infinite?(n=s.currentSlide+(s.options.slidesToShow/2+1))+s.options.slidesToShow+2:(n=Math.max(0,s.currentSlide-(s.options.slidesToShow/2+1)),s.options.slidesToShow/2+1+2+s.currentSlide):(n=s.options.infinite?s.options.slidesToShow+s.currentSlide:s.currentSlide,o=Math.ceil(n+s.options.slidesToShow),!0===s.options.fade&&(0<n&&n--,o<=s.slideCount&&o++)),e=s.$slider.find(".slick-slide").slice(n,o),"anticipated"===s.options.lazyLoad)for(var r=n-1,a=o,l=s.$slider.find(".slick-slide"),d=0;d<s.options.slidesToScroll;d++)r<0&&(r=s.slideCount-1),e=(e=e.add(l.eq(r))).add(l.eq(a)),r--,a++;t(e),s.slideCount<=s.options.slidesToShow?t(i=s.$slider.find(".slick-slide")):s.currentSlide>=s.slideCount-s.options.slidesToShow?t(i=s.$slider.find(".slick-cloned").slice(0,s.options.slidesToShow)):0===s.currentSlide&&t(i=s.$slider.find(".slick-cloned").slice(-1*s.options.slidesToShow))},a.prototype.loadSlider=function(){var t=this;t.setPosition(),t.$slideTrack.css({opacity:1}),t.$slider.removeClass("slick-loading"),t.initUI(),"progressive"===t.options.lazyLoad&&t.progressiveLazyLoad()},a.prototype.next=a.prototype.slickNext=function(){var t;this.changeSlide({data:{message:"next"}})},a.prototype.orientationChange=function(){var t=this;t.checkResponsive(),t.setPosition()},a.prototype.pause=a.prototype.slickPause=function(){var t=this;t.autoPlayClear(),t.paused=!0},a.prototype.play=a.prototype.slickPlay=function(){var t=this;t.autoPlay(),t.options.autoplay=!0,t.paused=!1,t.focussed=!1,t.interrupted=!1},a.prototype.postSlide=function(t){var e=this,i;e.unslicked||(e.$slider.trigger("afterChange",[e,t]),e.animating=!1,e.slideCount>e.options.slidesToShow&&e.setPosition(),e.swipeLeft=null,e.options.autoplay&&e.autoPlay(),!0===e.options.accessibility&&(e.initADA(),e.options.focusOnChange&&c(e.$slides.get(e.currentSlide)).attr("tabindex",0).focus()))},a.prototype.prev=a.prototype.slickPrev=function(){var t;this.changeSlide({data:{message:"previous"}})},a.prototype.preventDefault=function(t){t.preventDefault()},a.prototype.progressiveLazyLoad=function(t){t=t||1;var e=this,i=c("img[data-lazy]",e.$slider),n,o,s,r,a;i.length?(n=i.first(),o=n.attr("data-lazy"),s=n.attr("data-srcset"),r=n.attr("data-sizes")||e.$slider.attr("data-sizes"),(a=document.createElement("img")).onload=function(){s&&(n.attr("srcset",s),r&&n.attr("sizes",r)),n.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===e.options.adaptiveHeight&&e.setPosition(),e.$slider.trigger("lazyLoaded",[e,n,o]),e.progressiveLazyLoad()},a.onerror=function(){t<3?
/**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
setTimeout(function(){e.progressiveLazyLoad(t+1)},500):(n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),e.$slider.trigger("lazyLoadError",[e,n,o]),e.progressiveLazyLoad())},a.src=o):e.$slider.trigger("allImagesLoaded",[e])},a.prototype.refresh=function(t){var e=this,i,n;n=e.slideCount-e.options.slidesToShow,
// in non-infinite sliders, we don't want to go past the
// last visible index.
!e.options.infinite&&e.currentSlide>n&&(e.currentSlide=n),
// if less slides than to show, go to start.
e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),i=e.currentSlide,e.destroy(!0),c.extend(e,e.initials,{currentSlide:i}),e.init(),t||e.changeSlide({data:{message:"index",index:i}},!1)},a.prototype.registerBreakpoints=function(){var i=this,t,e,n,o=i.options.responsive||null;if("array"===c.type(o)&&o.length){for(t in i.respondTo=i.options.respondTo||"window",o)if(n=i.breakpoints.length-1,o.hasOwnProperty(t)){
// loop through the breakpoints and cut out any existing
// ones with the same breakpoint number, we don't want dupes.
for(e=o[t].breakpoint;0<=n;)i.breakpoints[n]&&i.breakpoints[n]===e&&i.breakpoints.splice(n,1),n--;i.breakpoints.push(e),i.breakpointSettings[e]=o[t].settings}i.breakpoints.sort(function(t,e){return i.options.mobileFirst?t-e:e-t})}},a.prototype.reinit=function(){var t=this;t.$slides=t.$slideTrack.children(t.options.slide).addClass("slick-slide"),t.slideCount=t.$slides.length,t.currentSlide>=t.slideCount&&0!==t.currentSlide&&(t.currentSlide=t.currentSlide-t.options.slidesToScroll),t.slideCount<=t.options.slidesToShow&&(t.currentSlide=0),t.registerBreakpoints(),t.setProps(),t.setupInfinite(),t.buildArrows(),t.updateArrows(),t.initArrowEvents(),t.buildDots(),t.updateDots(),t.initDotEvents(),t.cleanUpSlideEvents(),t.initSlideEvents(),t.checkResponsive(!1,!0),!0===t.options.focusOnSelect&&c(t.$slideTrack).children().on("click.slick",t.selectHandler),t.setSlideClasses("number"==typeof t.currentSlide?t.currentSlide:0),t.setPosition(),t.focusHandler(),t.paused=!t.options.autoplay,t.autoPlay(),t.$slider.trigger("reInit",[t])},a.prototype.resize=function(){var t=this;c(window).width()!==t.windowWidth&&(clearTimeout(t.windowDelay),t.windowDelay=window.setTimeout(function(){t.windowWidth=c(window).width(),t.checkResponsive(),t.unslicked||t.setPosition()},50))},a.prototype.removeSlide=a.prototype.slickRemove=function(t,e,i){var n=this;if(t="boolean"==typeof t?!0===(e=t)?0:n.slideCount-1:!0===e?--t:t,n.slideCount<1||t<0||t>n.slideCount-1)return!1;n.unload(),!0===i?n.$slideTrack.children().remove():n.$slideTrack.children(this.options.slide).eq(t).remove(),n.$slides=n.$slideTrack.children(this.options.slide),n.$slideTrack.children(this.options.slide).detach(),n.$slideTrack.append(n.$slides),n.$slidesCache=n.$slides,n.reinit()},a.prototype.setCSS=function(t){var e=this,i={},n,o;!0===e.options.rtl&&(t=-t),n="left"==e.positionProp?Math.ceil(t)+"px":"0px",o="top"==e.positionProp?Math.ceil(t)+"px":"0px",i[e.positionProp]=t,!1===e.transformsEnabled||(!(i={})===e.cssTransitions?i[e.animType]="translate("+n+", "+o+")":i[e.animType]="translate3d("+n+", "+o+", 0px)"),e.$slideTrack.css(i)},a.prototype.setDimensions=function(){var t=this;!1===t.options.vertical?!0===t.options.centerMode&&t.$list.css({padding:"0px "+t.options.centerPadding}):(t.$list.height(t.$slides.first().outerHeight(!0)*t.options.slidesToShow),!0===t.options.centerMode&&t.$list.css({padding:t.options.centerPadding+" 0px"})),t.listWidth=t.$list.width(),t.listHeight=t.$list.height(),!1===t.options.vertical&&!1===t.options.variableWidth?(t.slideWidth=Math.ceil(t.listWidth/t.options.slidesToShow),t.$slideTrack.width(Math.ceil(t.slideWidth*t.$slideTrack.children(".slick-slide").length))):!0===t.options.variableWidth?t.$slideTrack.width(5e3*t.slideCount):(t.slideWidth=Math.ceil(t.listWidth),t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0)*t.$slideTrack.children(".slick-slide").length)));var e=t.$slides.first().outerWidth(!0)-t.$slides.first().width();!1===t.options.variableWidth&&t.$slideTrack.children(".slick-slide").width(t.slideWidth-e)},a.prototype.setFade=function(){var i=this,n;i.$slides.each(function(t,e){n=i.slideWidth*t*-1,!0===i.options.rtl?c(e).css({position:"relative",right:n,top:0,zIndex:i.options.zIndex-2,opacity:0}):c(e).css({position:"relative",left:n,top:0,zIndex:i.options.zIndex-2,opacity:0})}),i.$slides.eq(i.currentSlide).css({zIndex:i.options.zIndex-1,opacity:1})},a.prototype.setHeight=function(){var t=this;if(1===t.options.slidesToShow&&!0===t.options.adaptiveHeight&&!1===t.options.vertical){var e=t.$slides.eq(t.currentSlide).outerHeight(!0);t.$list.css("height",e)}},a.prototype.setOption=a.prototype.slickSetOption=function(t,e,i){
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
var n=this,o,s,r,a,l=!1,d;if("object"===c.type(t)?(r=t,l=e,d="multiple"):"string"===c.type(t)&&(a=e,l=i,"responsive"===(r=t)&&"array"===c.type(e)?d="responsive":void 0!==e&&(d="single")),"single"===d)n.options[r]=a;else if("multiple"===d)c.each(r,function(t,e){n.options[t]=e});else if("responsive"===d)for(s in a)if("array"!==c.type(n.options.responsive))n.options.responsive=[a[s]];else{
// loop through the responsive object and splice out duplicates.
for(o=n.options.responsive.length-1;0<=o;)n.options.responsive[o].breakpoint===a[s].breakpoint&&n.options.responsive.splice(o,1),o--;n.options.responsive.push(a[s])}l&&(n.unload(),n.reinit())},a.prototype.setPosition=function(){var t=this;t.setDimensions(),t.setHeight(),!1===t.options.fade?t.setCSS(t.getLeft(t.currentSlide)):t.setFade(),t.$slider.trigger("setPosition",[t])},a.prototype.setProps=function(){var t=this,e=document.body.style;t.positionProp=!0===t.options.vertical?"top":"left","top"===t.positionProp?t.$slider.addClass("slick-vertical"):t.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===t.options.useCSS&&(t.cssTransitions=!0),t.options.fade&&("number"==typeof t.options.zIndex?t.options.zIndex<3&&(t.options.zIndex=3):t.options.zIndex=t.defaults.zIndex),void 0!==e.OTransform&&(t.animType="OTransform",t.transformType="-o-transform",t.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(t.animType=!1)),void 0!==e.MozTransform&&(t.animType="MozTransform",t.transformType="-moz-transform",t.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(t.animType=!1)),void 0!==e.webkitTransform&&(t.animType="webkitTransform",t.transformType="-webkit-transform",t.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(t.animType=!1)),void 0!==e.msTransform&&(t.animType="msTransform",t.transformType="-ms-transform",t.transitionType="msTransition",void 0===e.msTransform&&(t.animType=!1)),void 0!==e.transform&&!1!==t.animType&&(t.animType="transform",t.transformType="transform",t.transitionType="transition"),t.transformsEnabled=t.options.useTransform&&null!==t.animType&&!1!==t.animType},a.prototype.setSlideClasses=function(t){var e=this,i,n,o,s;if(n=e.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),e.$slides.eq(t).addClass("slick-current"),!0===e.options.centerMode){var r=e.options.slidesToShow%2==0?1:0;i=Math.floor(e.options.slidesToShow/2),!0===e.options.infinite&&(i<=t&&t<=e.slideCount-1-i?e.$slides.slice(t-i+r,t+i+1).addClass("slick-active").attr("aria-hidden","false"):(o=e.options.slidesToShow+t,n.slice(o-i+1+r,o+i+2).addClass("slick-active").attr("aria-hidden","false")),0===t?n.eq(n.length-1-e.options.slidesToShow).addClass("slick-center"):t===e.slideCount-1&&n.eq(e.options.slidesToShow).addClass("slick-center")),e.$slides.eq(t).addClass("slick-center")}else 0<=t&&t<=e.slideCount-e.options.slidesToShow?e.$slides.slice(t,t+e.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):n.length<=e.options.slidesToShow?n.addClass("slick-active").attr("aria-hidden","false"):(s=e.slideCount%e.options.slidesToShow,o=!0===e.options.infinite?e.options.slidesToShow+t:t,e.options.slidesToShow==e.options.slidesToScroll&&e.slideCount-t<e.options.slidesToShow?n.slice(o-(e.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):n.slice(o,o+e.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==e.options.lazyLoad&&"anticipated"!==e.options.lazyLoad||e.lazyLoad()},a.prototype.setupInfinite=function(){var t=this,e,i,n;if(!0===t.options.fade&&(t.options.centerMode=!1),!0===t.options.infinite&&!1===t.options.fade&&(i=null,t.slideCount>t.options.slidesToShow)){for(n=!0===t.options.centerMode?t.options.slidesToShow+1:t.options.slidesToShow,e=t.slideCount;e>t.slideCount-n;e-=1)i=e-1,c(t.$slides[i]).clone(!0).attr("id","").attr("data-slick-index",i-t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");for(e=0;e<n+t.slideCount;e+=1)i=e,c(t.$slides[i]).clone(!0).attr("id","").attr("data-slick-index",i+t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");t.$slideTrack.find(".slick-cloned").find("[id]").each(function(){c(this).attr("id","")})}},a.prototype.interrupt=function(t){var e=this;t||e.autoPlay(),e.interrupted=t},a.prototype.selectHandler=function(t){var e=this,i=c(t.target).is(".slick-slide")?c(t.target):c(t.target).parents(".slick-slide"),n=parseInt(i.attr("data-slick-index"));n||(n=0),e.slideCount<=e.options.slidesToShow?e.slideHandler(n,!1,!0):e.slideHandler(n)},a.prototype.slideHandler=function(t,e,i){var n,o,s,r,a=null,l=this,d;if(e=e||!1,!(!0===l.animating&&!0===l.options.waitForAnimate||!0===l.options.fade&&l.currentSlide===t))if(!1===e&&l.asNavFor(t),n=t,a=l.getLeft(n),r=l.getLeft(l.currentSlide),l.currentLeft=null===l.swipeLeft?r:l.swipeLeft,!1===l.options.infinite&&!1===l.options.centerMode&&(t<0||t>l.getDotCount()*l.options.slidesToScroll))!1===l.options.fade&&(n=l.currentSlide,!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(r,function(){l.postSlide(n)}):l.postSlide(n));else if(!1===l.options.infinite&&!0===l.options.centerMode&&(t<0||t>l.slideCount-l.options.slidesToScroll))!1===l.options.fade&&(n=l.currentSlide,!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(r,function(){l.postSlide(n)}):l.postSlide(n));else{if(l.options.autoplay&&clearInterval(l.autoPlayTimer),o=n<0?l.slideCount%l.options.slidesToScroll!=0?l.slideCount-l.slideCount%l.options.slidesToScroll:l.slideCount+n:n>=l.slideCount?l.slideCount%l.options.slidesToScroll!=0?0:n-l.slideCount:n,l.animating=!0,l.$slider.trigger("beforeChange",[l,l.currentSlide,o]),s=l.currentSlide,l.currentSlide=o,l.setSlideClasses(l.currentSlide),l.options.asNavFor&&(d=(d=l.getNavTarget()).slick("getSlick")).slideCount<=d.options.slidesToShow&&d.setSlideClasses(l.currentSlide),l.updateDots(),l.updateArrows(),!0===l.options.fade)return!0!==i?(l.fadeSlideOut(s),l.fadeSlide(o,function(){l.postSlide(o)})):l.postSlide(o),void l.animateHeight();!0!==i&&l.slideCount>l.options.slidesToShow?l.animateSlide(a,function(){l.postSlide(o)}):l.postSlide(o)}},a.prototype.startLoad=function(){var t=this;!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&(t.$prevArrow.hide(),t.$nextArrow.hide()),!0===t.options.dots&&t.slideCount>t.options.slidesToShow&&t.$dots.hide(),t.$slider.addClass("slick-loading")},a.prototype.swipeDirection=function(){var t,e,i,n,o=this;return t=o.touchObject.startX-o.touchObject.curX,e=o.touchObject.startY-o.touchObject.curY,i=Math.atan2(e,t),(n=Math.round(180*i/Math.PI))<0&&(n=360-Math.abs(n)),n<=45&&0<=n?!1===o.options.rtl?"left":"right":n<=360&&315<=n?!1===o.options.rtl?"left":"right":135<=n&&n<=225?!1===o.options.rtl?"right":"left":!0===o.options.verticalSwiping?35<=n&&n<=135?"down":"up":"vertical"},a.prototype.swipeEnd=function(t){var e=this,i,n;if(e.dragging=!1,e.swiping=!1,e.scrolling)return e.scrolling=!1;if(e.interrupted=!1,e.shouldClick=!(10<e.touchObject.swipeLength),void 0===e.touchObject.curX)return!1;if(!0===e.touchObject.edgeHit&&e.$slider.trigger("edge",[e,e.swipeDirection()]),e.touchObject.swipeLength>=e.touchObject.minSwipe){switch(n=e.swipeDirection()){case"left":case"down":i=e.options.swipeToSlide?e.checkNavigable(e.currentSlide+e.getSlideCount()):e.currentSlide+e.getSlideCount(),e.currentDirection=0;break;case"right":case"up":i=e.options.swipeToSlide?e.checkNavigable(e.currentSlide-e.getSlideCount()):e.currentSlide-e.getSlideCount(),e.currentDirection=1;break;default:}"vertical"!=n&&(e.slideHandler(i),e.touchObject={},e.$slider.trigger("swipe",[e,n]))}else e.touchObject.startX!==e.touchObject.curX&&(e.slideHandler(e.currentSlide),e.touchObject={})},a.prototype.swipeHandler=function(t){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==t.type.indexOf("mouse")))switch(e.touchObject.fingerCount=t.originalEvent&&void 0!==t.originalEvent.touches?t.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),t.data.action){case"start":e.swipeStart(t);break;case"move":e.swipeMove(t);break;case"end":e.swipeEnd(t);break}},a.prototype.swipeMove=function(t){var e=this,i=!1,n,o,s,r,a,l;return a=void 0!==t.originalEvent?t.originalEvent.touches:null,!(!e.dragging||e.scrolling||a&&1!==a.length)&&(n=e.getLeft(e.currentSlide),e.touchObject.curX=void 0!==a?a[0].pageX:t.clientX,e.touchObject.curY=void 0!==a?a[0].pageY:t.clientY,e.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(e.touchObject.curX-e.touchObject.startX,2))),l=Math.round(Math.sqrt(Math.pow(e.touchObject.curY-e.touchObject.startY,2))),!e.options.verticalSwiping&&!e.swiping&&4<l?!(e.scrolling=!0):(!0===e.options.verticalSwiping&&(e.touchObject.swipeLength=l),o=e.swipeDirection(),void 0!==t.originalEvent&&4<e.touchObject.swipeLength&&(e.swiping=!0,t.preventDefault()),r=(!1===e.options.rtl?1:-1)*(e.touchObject.curX>e.touchObject.startX?1:-1),!0===e.options.verticalSwiping&&(r=e.touchObject.curY>e.touchObject.startY?1:-1),s=e.touchObject.swipeLength,(e.touchObject.edgeHit=!1)===e.options.infinite&&(0===e.currentSlide&&"right"===o||e.currentSlide>=e.getDotCount()&&"left"===o)&&(s=e.touchObject.swipeLength*e.options.edgeFriction,e.touchObject.edgeHit=!0),!1===e.options.vertical?e.swipeLeft=n+s*r:e.swipeLeft=n+s*(e.$list.height()/e.listWidth)*r,!0===e.options.verticalSwiping&&(e.swipeLeft=n+s*r),!0!==e.options.fade&&!1!==e.options.touchMove&&(!0===e.animating?(e.swipeLeft=null,!1):void e.setCSS(e.swipeLeft))))},a.prototype.swipeStart=function(t){var e=this,i;if(e.interrupted=!0,1!==e.touchObject.fingerCount||e.slideCount<=e.options.slidesToShow)return!(e.touchObject={});void 0!==t.originalEvent&&void 0!==t.originalEvent.touches&&(i=t.originalEvent.touches[0]),e.touchObject.startX=e.touchObject.curX=void 0!==i?i.pageX:t.clientX,e.touchObject.startY=e.touchObject.curY=void 0!==i?i.pageY:t.clientY,e.dragging=!0},a.prototype.unfilterSlides=a.prototype.slickUnfilter=function(){var t=this;null!==t.$slidesCache&&(t.unload(),t.$slideTrack.children(this.options.slide).detach(),t.$slidesCache.appendTo(t.$slideTrack),t.reinit())},a.prototype.unload=function(){var t=this;c(".slick-cloned",t.$slider).remove(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove(),t.$nextArrow&&t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove(),t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},a.prototype.unslick=function(t){var e=this;e.$slider.trigger("unslick",[e,t]),e.destroy()},a.prototype.updateArrows=function(){var t=this,e;e=Math.floor(t.options.slidesToShow/2),!0===t.options.arrows&&t.slideCount>t.options.slidesToShow&&!t.options.infinite&&(t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===t.currentSlide?(t.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):t.currentSlide>=t.slideCount-t.options.slidesToShow&&!1===t.options.centerMode?(t.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):t.currentSlide>=t.slideCount-1&&!0===t.options.centerMode&&(t.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},a.prototype.updateDots=function(){var t=this;null!==t.$dots&&(t.$dots.find("li").removeClass("slick-active").end(),t.$dots.find("li").eq(Math.floor(t.currentSlide/t.options.slidesToScroll)).addClass("slick-active"))},a.prototype.visibility=function(){var t=this;t.options.autoplay&&(document[t.hidden]?t.interrupted=!0:t.interrupted=!1)},c.fn.slick=function(t){var e=this,i=t,n=Array.prototype.slice.call(arguments,1),o=e.length,s,r;for(s=0;s<o;s++)if("object"==typeof i||void 0===i?e[s].slick=new a(e[s],i):r=e[s].slick[i].apply(e[s].slick,n),void 0!==r)return r;return e}}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(l){var n=-1,o=-1,d=function(t){return parseFloat(t)||0},c=function(t){var e=1,i=l(t),n=null,o=[];return i.each(function(){var t=l(this),e=t.offset().top-d(t.css("margin-top")),i=0<o.length?o[o.length-1]:null;null===i?o.push(t):Math.floor(Math.abs(n-e))<=1?o[o.length-1]=i.add(t):o.push(t),n=e}),o},u=function(t){var e={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof t?l.extend(e,t):("boolean"==typeof t?e.byRow=t:"remove"===t&&(e.remove=!0),e)},p=l.fn.matchHeight=function(t){var e=u(t);if(e.remove){var i=this;return this.css(e.property,""),l.each(p._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!e.target||(p._groups.push({elements:this,options:e}),p._apply(this,e)),this};p.version="0.7.2",p._groups=[],p._throttle=80,p._maintainScroll=!1,p._beforeUpdate=null,p._afterUpdate=null,p._rows=c,p._parse=d,p._parseOptions=u,p._apply=function(t,e){var s=u(e),i=l(t),n=[i],o=l(window).scrollTop(),r=l("html").outerHeight(!0),a=i.parents().filter(":hidden");return a.each(function(){var t=l(this);t.data("style-cache",t.attr("style"))}),a.css("display","block"),s.byRow&&!s.target&&(i.each(function(){var t=l(this),e=t.css("display");"inline-block"!==e&&"flex"!==e&&"inline-flex"!==e&&(e="block"),t.data("style-cache",t.attr("style")),t.css({display:e,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),n=c(i),i.each(function(){var t=l(this);t.attr("style",t.data("style-cache")||"")})),l.each(n,function(t,e){var i=l(e),o=0;if(s.target)o=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var t=l(this),e=t.attr("style"),i=t.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var n={display:i};n[s.property]="",t.css(n),t.outerHeight(!1)>o&&(o=t.outerHeight(!1)),e?t.attr("style",e):t.css("display","")})}i.each(function(){var t=l(this),e=0;s.target&&t.is(s.target)||("border-box"!==t.css("box-sizing")&&(e+=d(t.css("border-top-width"))+d(t.css("border-bottom-width")),e+=d(t.css("padding-top"))+d(t.css("padding-bottom"))),t.css(s.property,o-e+"px"))})}),a.each(function(){var t=l(this);t.attr("style",t.data("style-cache")||null)}),p._maintainScroll&&l(window).scrollTop(o/r*l("html").outerHeight(!0)),this},p._applyDataApi=function(){var i={};l("[data-match-height], [data-mh]").each(function(){var t=l(this),e=t.attr("data-mh")||t.attr("data-match-height");i[e]=e in i?i[e].add(t):t}),l.each(i,function(){this.matchHeight(!0)})};var s=function(t){p._beforeUpdate&&p._beforeUpdate(t,p._groups),l.each(p._groups,function(){p._apply(this.elements,this.options)}),p._afterUpdate&&p._afterUpdate(t,p._groups)};p._update=function(t,e){if(e&&"resize"===e.type){var i=l(window).width();if(i===n)return;n=i}t?-1===o&&(o=setTimeout(function(){s(e),o=-1},p._throttle)):s(e)},l(p._applyDataApi);var t=l.fn.on?"on":"bind";l(window)[t]("load",function(t){p._update(!1,t)}),l(window)[t]("resize orientationchange",function(t){p._update(!0,t)})}),function(t){t(document).ready(function(){
// Matchheight
function t(){var t=jQuery("footer").height(),e=jQuery("header").height(),i,n=jQuery(window).height()-t-e-35;jQuery("#content").css("min-height",n)}t(),jQuery(window).resize(function(){t()})})}(jQuery),function(t){t(document).ready(function(){t(".js-slick-events").slick({dots:!0,infinite:!1,speed:300,slidesToShow:3,slidesToScroll:3,responsive:[{breakpoint:1200,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})})}(jQuery),function(n){n(document).ready(function(){n(".mod-aanbodfilter a").mouseover(function(){var t=n(this).attr("data-aanbodfilter");n("a."+t).addClass("opacity1")}),n(".mod-aanbodfilter a").mouseleave(function(){n("a").removeClass("opacity1")}),n("a[data-aanbodfilter]").on("click",function(t){t.preventDefault(),n(".block").removeClass("active"),n(this).addClass("active"),n(".space .row").removeClass().addClass("row"),n(".space .row .block").closest(".row").addClass("aanbod");var e=n(this).attr("data-aanbodfilter"),i=n(".space ."+e);i.addClass("active"),n(".space .row").each(function(){n(this).addClass("active").addClass(e),n(this).find(".block").is(".links.active")&&n(this).addClass("links"),n(this).find(".block").is(".rechts.active")&&n(this).addClass("rechts")}),i.is(".detour.boven")&&n(".hbar.boven").closest(".row").addClass("rechts"),i.is(".detour.onder")&&n(".hbar.onder").closest(".row").addClass("rechts")})})}(jQuery),function(t){t(document).ready(function(){t(".card").matchHeight()})}(jQuery),function(t){t(document).ready(function(){t(".js-stickinparent").stick_in_parent()})}(jQuery),function(s){s(document).ready(function(){s("body").scrollspy({target:"#jarenmenu",offset:50});var t,n=100/s("#jarenmenu li").length,e,i,o=(s("#jarenmenu li:has(a.active)").index("#jarenmenu li")+1)*n;s(".js-jarenprogress").css("width",o+"%"),s(window).on("activate.bs.scrollspy",function(){var t,e,i=(s("#jarenmenu li:has(a.active)").index("#jarenmenu li")+1)*n;s(".js-jarenprogress").css("width",i+"%")})}),s(window).on("scroll",function(){s("#jarenmenu li a").hasClass("active")||s(".js-jarenprogress").css("width","0%")})}(jQuery),function(n){n(document).ready(function(){n(".collapse").on("shown.bs.collapse",function(){var t=n(this).find(".card");n("html,body").animate({scrollTop:t.offset().top-40},500)}),
// Scroll to link
n('a[href^="#"].js-scrollto').click(function(t){var e=n(this).attr("href"),i=n(e).offset();n("html, body").stop().animate({scrollTop:i.top-40},800),t.preventDefault()})})}(jQuery),function(t){t(document).ready(function(){t(".mod-filterbar label").hasClass("active")?t(".mod-filterbar").addClass("active"):t(".mod-filterbar").removeClass("active"),t(".mod-eventfilter-agenda").stick_in_parent(),t(".mod-filterbar label").click(function(){t(this).closest(".mod-filterbar").find("input").is(":checked")?t(this).closest(".mod-filterbar").addClass("active"):t(this).closest(".mod-filterbar").removeClass("active")})})}(jQuery),function(n){n(document).ready(function(){
// tablet "one touch (click)" X "hover" > link redirection
n("a[href]").on("touchmove touchend",function(t){
// if touchmove>touchend, set the data() for this element to true. then leave touchmove & let touchend fail(data=true) redirection
if("touchmove"!=t.type){
// if it's a simple touchend, data() for this element doesn't exist.
if("touchend"==t.type&&!n.data(this,"touchmove_cancel_redirection")){var e,i=n(this).attr("href");window.location=i}
// if touchmove>touchend, to be redirected on a future simple touchend for this element
n.data(this,"touchmove_cancel_redirection",!1)}else n.data(this,"touchmove_cancel_redirection",!0)})})}(jQuery),function(t){t(document).ready(function(){t(".js-menu").on("click",function(){t("body").toggleClass("menuopen"),t("body").toggleClass("opensidemenu"),t(".js-mobilemenu").toggleClass("open")}),jQuery(window).resize(function(){t("body").removeClass("menuopen").removeClass("opensidemenu")})})}(jQuery),function(e){e(document).ready(function(){e(window).scroll(function(){var t;100<=e(window).scrollTop()?e("header").addClass("scrolled"):e("header").removeClass("scrolled")})})}(jQuery),function(i){i(document).ready(function(){jQuery(".js-now").on("click",function(){var t=i(".datenow").text(),e=i(".timenow").text();i(".js-datepicker").attr("value",t),i(".js-timepicker").attr("value",e)})})}(jQuery);