!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={get:function(e){chrome.storage.sync.get("options",e)},set:function(e){chrome.storage.sync.set({options:e},function(){chrome.runtime.error&&console.log("Runtime error.")})},update:function(e){chrome.storage.sync.get("options",function(t){if(chrome.runtime.error)console.error(chrome.runtime.error);else{var n={width:t.options.width,height:t.options.height,isWide:t.options.isWide};e(n)}})}}},,,function(e,t,n){"use strict";var o=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(o),r={data:document.getElementById("data"),wide:document.getElementById("wide"),width:document.getElementById("width"),height:document.getElementById("height"),set:document.getElementById("set")};r.width.onchange=function(){r.wide.checked&&(r.height.value=Math.floor(9*r.width.value/16))},r.wide.onchange=function(){r.wide.checked?r.height.disabled=!0:(r.height.disabled=!1,r.height.value=Math.floor(9*r.width.value/16))},document.body.onload=function(){i.default.update(function(e){r.wide.checked=e.isWide,r.width.value=e.width,r.height.value=e.height})},r.set.onclick=function(){i.default.set({width:parseInt(r.width.value),height:parseInt(r.height.value),isWide:r.wide.checked}),window.close()}}]);