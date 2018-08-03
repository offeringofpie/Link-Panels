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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/options.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _sync = _interopRequireDefault(__webpack_require__(/*! ./parts/sync.js */ \"./src/js/parts/sync.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar optionsElems = {\n  data: document.getElementById('data'),\n  wide: document.getElementById('wide'),\n  width: document.getElementById('width'),\n  height: document.getElementById('height'),\n  experimental: document.getElementById('experimental'),\n  set: document.getElementById('set')\n};\n\noptionsElems.width.onchange = function () {\n  if (optionsElems.wide.checked) {\n    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);\n  }\n}; //width.value = 450;\n\n\noptionsElems.wide.onchange = function () {\n  if (optionsElems.wide.checked) {\n    optionsElems.height.disabled = true;\n  } else {\n    optionsElems.height.disabled = false;\n    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);\n  }\n};\n\ndocument.body.onload = function () {\n  _sync.default.update(function (options) {\n    optionsElems.wide.checked = options.isWide;\n    optionsElems.experimental.checked = options.experimental;\n    optionsElems.width.value = options.width;\n    optionsElems.height.value = options.height;\n    optionsElems.height.value = options.height;\n  });\n};\n\noptionsElems.set.onclick = function () {\n  _sync.default.set({\n    width: parseInt(optionsElems.width.value),\n    height: parseInt(optionsElems.height.value),\n    isWide: optionsElems.wide.checked,\n    experimental: optionsElems.experimental.checked\n  });\n\n  window.close();\n};\n\n//# sourceURL=webpack:///./src/js/options.js?");

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