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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  get: function get(fn) {
    chrome.storage.sync.get("options", fn);
  },
  set: function set(object) {
    chrome.storage.sync.set({
      "options": object
    }, function () {
      if (chrome.runtime.lastError) {
        console.log("Runtime error.");
      }
    });
  },
  update: function update(fn) {
    chrome.storage.sync.get("options", function (opts) {
      if (!chrome.runtime.lastError) {
        var settings = {
          width: opts.options.width,
          height: opts.options.height,
          isWide: opts.options.isWide
        };
        fn(settings);
      } else {
        console.error(chrome.runtime.lastError);
      }
    });
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _functions = __webpack_require__(5);

chrome.contextMenus.create({
  title: "Open in Panel",
  contexts: ["link"],
  onclick: _functions.openPanel
});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({
    "active": true,
    "currentWindow": true,
    "status": "complete",
    "windowType": "normal"
  }, function (tabs) {
    for (var tab in tabs) {
      (0, _functions.openPanel)(tabs[tab]);
    }
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _sync = __webpack_require__(0);

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sync2.default.get(function (options) {
  if (typeof options.length === "undefined") {
    _sync2.default.set({
      width: 500,
      height: 281,
      isWide: true
    });
  }
});

chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openPanel = openPanel;

var _sync = __webpack_require__(0);

var _sync2 = _interopRequireDefault(_sync);

var _parse = __webpack_require__(7);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openPanel(panel) {
  var tabInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var url = typeof panel.url === 'string' ? panel.url : panel.linkUrl;
  var tabId = typeof tabInfo.id === 'number' ? tabInfo.id : panel.id;
  var defaults = {
    options: {
      width: 300,
      height: 300,
      isWide: false,
      experimental: false
    }
  };

  browser.tabs.sendMessage(tabId, { get: "source" }).then(function (response) {
    var embedUrl = "";

    for (var i in _parse2.default.pats) {
      var pat = url.match(_parse2.default.pats[i]);
      if (pat) {
        embedUrl = _parse2.default.embed[i](url, pat, response);
      }
    }

    if (!embedUrl.length) {
      embedUrl = url;
    }

    _sync2.default.get(function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;

      chrome.windows.create({
        url: embedUrl,
        type: 'panel',
        width: data.options.width,
        height: data.options.height
      });
    });
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iframe = iframe;
function iframe(element) {
  var correct_url = '';
  element.querySelectorAll('iframe').forEach(function (e) {
    if (e.src.length && !e.src.match(/google.com|twitter.com|addthis.com/)) {
      correct_url = e.src;
    }
  });

  return correct_url;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iframe = __webpack_require__(6);

exports.default = {
  /* regex patterns */
  pats: {
    dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
    gist: /gist\.github\.com\/([-0-9a-zA-Z]+\/)?([0-9a-fA-f]+)/,
    instagram: /instagr(?:\.am|am\.com)\/p\/([a-zA-Z0-9]+)/,
    allucee: /alluc\.ee\/(.+)/,
    pastebin: /pastebin\.com\/(.+)/,
    reddit: /redd(?:\.it|it\.com)\/(.+)?/,
    soundcloud: /soundcloud\.com\//,
    tedtalks: /ted\.com\/talks\/(.*)/,
    twitch: /twitch\.tv\/([a-zA-z0-9]+)\/?(?:v\/|b\/|c\/)?(\d+)?(?:\?)?(\w+)?(?:\=)?(.+)?/,
    vimeo: /vimeo\.com\/(?:[a-z]+\/)?(?:[a-z]+\/)?(?:[a-z]+\/)?(\w+)/,
    vine: /vine\.co\/v\/(.+)/,
    youtube: /youtu(?:\.)?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\_\-]+)(?:&list=)?([a-zA-Z0-9\_\-]+)?/
  },
  /* embed links */
  embed: {
    dailymotion: function dailymotion(url, match) {
      return 'http://www.dailymotion.com/embed/video/' + match[1] + '?api=postMessage&html=1';
    },
    gist: function gist(url, match) {
      return 'data:text/html, <title>' + url + '</title><script  src="https://gist.github.com/' + match[1] + '/' + match[2] + '.js"></script>';
    },
    instagram: function instagram(url, match) {
      return 'https://www.instagram.com/p/' + match[1] + '/embed/';
    },
    allucee: function allucee(url, match, response) {
      var el = document.createElement('html');
      el.innerHTML = response;

      return (0, _iframe.iframe)(el);
    },
    pastebin: function pastebin(url, match) {
      return 'https://pastebin.com/embed_iframe.php?i=' + match[1];
    },
    reddit: function reddit(url, match) {
      var permalink = match[1] === undefined ? '' : match[1];
      return 'https://m.reddit.com/' + permalink;
    },
    soundcloud: function soundcloud(url, match) {
      return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true';
    },
    tedtalks: function tedtalks(url, match) {
      return 'https://embed-ssl.ted.com/talks/' + match[1] + ".html";
    },
    twitch: function twitch(url, match) {
      var param = match[2] === undefined ? '?channel=' : '?video=v',
          which = match[2] === undefined ? 1 : 2,
          collection = match[3] === undefined ? '' : '&' + match[3] + '=' + match[4];
      return 'https://player.twitch.tv/' + param + match[which] + collection;
    },
    vimeo: function vimeo(url, match) {
      return 'https://player.vimeo.com/video/' + match[1];
    },
    vine: function vine(url, match) {
      return 'https://vine.co/v/' + match[1] + '/embed/simple';
    },
    youtube: function youtube(url, match) {
      var tail =  true ? '' : '&list=' + match[2];
      return 'https://www.youtube.com/embed/' + match[1] + tail;
    }
  }
};

/***/ })
/******/ ]);