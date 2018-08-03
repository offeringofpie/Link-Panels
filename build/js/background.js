/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./parts/panel.js */ \"./src/js/parts/panel.js\");\n\nvar _sync = _interopRequireDefault(__webpack_require__(/*! ./parts/sync */ \"./src/js/parts/sync.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar browser = browser || chrome;\n\n_sync.default.get(function (options) {\n  if (typeof options.length === \"undefined\") {\n    _sync.default.set({\n      width: 500,\n      height: 281,\n      isWide: true\n    });\n  }\n});\n\nbrowser.commands.onCommand.addListener(function (command) {\n  console.log('Command:', command);\n});\n\n//# sourceURL=webpack:///./src/js/background.js?");

/***/ }),

/***/ "./src/js/parts/functions.js":
/*!***********************************!*\
  !*** ./src/js/parts/functions.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.openPanel = openPanel;\n\nvar _sync = _interopRequireDefault(__webpack_require__(/*! ./sync */ \"./src/js/parts/sync.js\"));\n\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./src/js/parts/parse.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar browser = browser || chrome;\n\nfunction openPanel(panel) {\n  var tabInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var url = typeof panel.url === 'string' ? panel.url : panel.linkUrl;\n  var tabId = typeof tabInfo.id === 'number' ? tabInfo.id : panel.id;\n  var embedUrl = '';\n  var defaults = {\n    options: {\n      width: 300,\n      height: 300,\n      isWide: false,\n      experimental: false\n    }\n  };\n\n  for (var i in _parse.default.pats) {\n    var pat = url.match(_parse.default.pats[i]);\n\n    if (pat) {\n      embedUrl = _parse.default.embed[i](url, pat);\n    }\n  }\n\n  if (!embedUrl.length) {\n    embedUrl = url;\n  }\n\n  _sync.default.get(function () {\n    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;\n    browser.windows.create({\n      url: embedUrl,\n      type: 'panel',\n      width: data.options.width,\n      height: data.options.height\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/js/parts/functions.js?");

/***/ }),

/***/ "./src/js/parts/iframe.js":
/*!********************************!*\
  !*** ./src/js/parts/iframe.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.iframe = iframe;\n\nfunction iframe(element) {\n  var correct_url = '';\n  element.querySelectorAll('iframe').forEach(function (e) {\n    if (e.src.length && !e.src.match(/google.com|twitter.com|addthis.com/)) {\n      correct_url = e.src;\n    }\n  });\n  return correct_url;\n}\n\n//# sourceURL=webpack:///./src/js/parts/iframe.js?");

/***/ }),

/***/ "./src/js/parts/panel.js":
/*!*******************************!*\
  !*** ./src/js/parts/panel.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _functions = __webpack_require__(/*! ./functions.js */ \"./src/js/parts/functions.js\");\n\nvar browser = browser || chrome;\nbrowser.contextMenus.create({\n  title: \"Open in Panel\",\n  contexts: [\"link\"],\n  onclick: _functions.openPanel\n});\nbrowser.browserAction.onClicked.addListener(function () {\n  browser.tabs.query({\n    \"active\": true,\n    \"currentWindow\": true,\n    \"status\": \"complete\",\n    \"windowType\": \"normal\"\n  }, function (tabs) {\n    for (var tab in tabs) {\n      (0, _functions.openPanel)(tabs[tab]);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/js/parts/panel.js?");

/***/ }),

/***/ "./src/js/parts/parse.js":
/*!*******************************!*\
  !*** ./src/js/parts/parse.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _iframe = __webpack_require__(/*! ./iframe */ \"./src/js/parts/iframe.js\");\n\nvar _default = {\n  /* regex patterns */\n  pats: {\n    dailymotion: /dailymotion.com[\\w\\/#]+video[\\/=]([a-z0-9]+)/,\n    gist: /gist\\.github\\.com\\/([-0-9a-zA-Z]+\\/)?([0-9a-fA-f]+)/,\n    instagram: /instagr(?:\\.am|am\\.com)\\/p\\/([a-zA-Z0-9]+)/,\n    allucee: /alluc\\.ee\\/(.+)/,\n    pastebin: /pastebin\\.com\\/(.+)/,\n    reddit: /redd(?:\\.it|it\\.com)\\/(.+)?/,\n    soundcloud: /soundcloud\\.com\\//,\n    tedtalks: /ted\\.com\\/talks\\/(.*)/,\n    twitch: /twitch\\.tv\\/([a-zA-z0-9]+)\\/?(?:v\\/|b\\/|c\\/)?(\\d+)?(?:\\?)?(\\w+)?(?:\\=)?(.+)?/,\n    vimeo: /vimeo\\.com\\/(?:[a-z]+\\/)?(?:[a-z]+\\/)?(?:[a-z]+\\/)?(\\w+)/,\n    vine: /vine\\.co\\/v\\/(.+)/,\n    youtube: /youtu(?:\\.)?be(?:\\.com)?\\/(?:watch\\?v=|embed\\/|v\\/)?([a-zA-Z0-9\\_\\-]+)(?:&list=)?([a-zA-Z0-9\\_\\-]+)?/\n  },\n\n  /* embed links */\n  embed: {\n    dailymotion: function dailymotion(url, match) {\n      return 'http://www.dailymotion.com/embed/video/' + match[1] + '?api=postMessage&html=1';\n    },\n    gist: function gist(url, match) {\n      return 'data:text/html, <title>' + url + '</title><script  src=\"https://gist.github.com/' + match[1] + '/' + match[2] + '.js\"></script>';\n    },\n    instagram: function instagram(url, match) {\n      return 'https://www.instagram.com/p/' + match[1] + '/embed/';\n    },\n    pastebin: function pastebin(url, match) {\n      return 'https://pastebin.com/embed_iframe.php?i=' + match[1];\n    },\n    reddit: function reddit(url, match) {\n      var permalink = match[1] === undefined ? '' : match[1];\n      return 'https://m.reddit.com/' + permalink;\n    },\n    soundcloud: function soundcloud(url, match) {\n      return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true';\n    },\n    tedtalks: function tedtalks(url, match) {\n      return 'https://embed-ssl.ted.com/talks/' + match[1] + \".html\";\n    },\n    twitch: function twitch(url, match) {\n      var param = match[2] === undefined ? '?channel=' : '?video=v',\n          which = match[2] === undefined ? 1 : 2,\n          collection = match[3] === undefined ? '' : '&' + match[3] + '=' + match[4];\n      return 'https://player.twitch.tv/' + param + match[which] + collection;\n    },\n    vimeo: function vimeo(url, match) {\n      return 'https://player.vimeo.com/video/' + match[1];\n    },\n    vine: function vine(url, match) {\n      return 'https://vine.co/v/' + match[1] + '/embed/simple';\n    },\n    youtube: function youtube(url, match) {\n      var tail =  true ? '' : undefined;\n      return 'https://www.youtube.com/embed/' + match[1] + tail;\n    }\n  }\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/js/parts/parse.js?");

/***/ }),

/***/ "./src/js/parts/sync.js":
/*!******************************!*\
  !*** ./src/js/parts/sync.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar browser = browser || chrome;\nvar _default = {\n  get: function get(fn) {\n    browser.storage.sync.get(\"options\", fn);\n  },\n  set: function set(object) {\n    browser.storage.sync.set({\n      \"options\": object\n    }, function () {\n      if (browser.runtime.lastError) {\n        console.log(\"Runtime error.\");\n      }\n    });\n  },\n  update: function update(fn) {\n    browser.storage.sync.get(\"options\", function (opts) {\n      if (!browser.runtime.lastError) {\n        var settings = {\n          width: opts.options.width,\n          height: opts.options.height,\n          isWide: opts.options.isWide\n        };\n        fn(settings);\n      } else {\n        console.error(browser.runtime.lastError);\n      }\n    });\n  }\n};\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/js/parts/sync.js?");

/***/ })

/******/ });