!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},r={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,t){for(var n,r=[],i=(o.test(t)?e+"/"+t:t).split("/"),a=0,f=i.length;a<f;a++)n=i[a],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},f=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var r=a(f(t),n);return e.require(r,t)}},l=function(e,t){var r=null;r=p&&p.createHot(e);var i={id:e,exports:{},hot:r};return n[e]=i,t(i.exports,u(e),i),i.exports},s=function(e){return r[e]?s(r[e]):e},c=function(e,t){return s(a(f(e),t))},d=function(e,r){null==r&&(r="/");var o=s(e);if(i.call(n,o))return n[o].exports;if(i.call(t,o))return l(o,t[o]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var h=/\.[^.\/]+$/,y=/\/index(\.[^\/]+)?$/,_=function(e){if(h.test(e)){var t=e.replace(h,"");i.call(r,t)&&r[t].replace(h,"")!==t+"/index"||(r[t]=e)}if(y.test(e)){var n=e.replace(y,"");i.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if("object"==typeof e)for(var o in e)i.call(e,o)&&d.register(o,e[o]);else t[e]=r,delete n[e],_(e)},d.list=function(){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e};var p=e._hmr&&new e._hmr(c,d,t,n);d._cache=n,d.hmr=p&&p.wrap,d.brunch=!0,e.require=d}}(),function(){window;require.register("js/utils.js",function(e,t,n){!function(t,r){"object"==typeof e&&"undefined"!=typeof n?r():"function"==typeof define&&define.amd?define(r):r()}(this,function(){"use strict";function t(e,t){if(isNaN(e))throw"Invalid date before "+t;if(isNaN(t))throw"Invalid date after "+t;var n=new Date(t.getTime()-e.getTime()),r=n.getMonth()+1,i=n.getFullYear()-1970;return 12===r&&(i+=1,r=0),{year:i,month:r}}function n(e,t){var n={en:{month:"month",months:"months",year:"year",years:"years"},ru:{month:"месяц",months:"месяцев",year:"год",years:"года"}},r="";return e.year>0&&(r+=e.year+" ",r+=e.year>1?n[t].years:n[t].years),e.month>0&&(r+=" "+e.month+" ",r+=e.month>1?n[t].months:n[t].month),""===r?"":"("+r+")"}function r(){for(var e=0;e<arguments.length;e++){var t=document.getElementById(arguments[e]);"none"===t.style.display?t.style.display="":t.style.display="none"}}Object.defineProperty(e,"__esModule",{value:!0}),e.get_date_diff=t,e.get_diff_string=n,e.toggle_element=r,e["default"]={get_date_diff:t,get_diff_string:n,toggle_element:r}})}),require.register("___globals___",function(e,t,n){})}(),require("___globals___");