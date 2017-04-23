import {openPanel} from './functions.js';

chrome.contextMenus.create({
  title: "Open in Panel",
  contexts: ["link"],
  onclick: openPanel
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({
    "active": true,
    "currentWindow": true,
    "status": "complete",
    "windowType": "normal"
  }, function(tabs) {
    for (var tab in tabs) {
      openPanel(tabs[tab].url);
    }
  });
});
