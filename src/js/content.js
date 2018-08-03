"use strict";

chrome.runtime.onMessage.addListener(request => {
  return Promise.resolve(document.all[0].outerHTML);
});
