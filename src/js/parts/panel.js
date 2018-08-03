import {openPanel} from './functions.js';
const browser = browser || chrome;

browser.contextMenus.create({
  title: "Open in Panel",
  contexts: ["link"],
  onclick: openPanel
});

browser.browserAction.onClicked.addListener(function() {
  browser.tabs.query({
    "active": true,
    "currentWindow": true,
    "status": "complete",
    "windowType": "normal"
  }, function(tabs) {
    for (var tab in tabs) {
      openPanel(tabs[tab]);
    }
  });
});
