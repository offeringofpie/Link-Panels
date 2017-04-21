var sync = {
  get: function(func) {
    chrome.storage.sync.get("options", func);
  },
  set: function(object) {
    chrome.storage.sync.set({
      "options": object
    }, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  }
};

var openPanel = function(panel) {
  var typeOfUrl = (typeof panel === 'string') ? panel : panel.linkUrl,
    embedUrl = linker(typeOfUrl);
  sync.get(function(data) {
    var inData = {};
    if (!data.length) {
      inData.options = {
        width: 300,
        height: 300,
        isWide: false
      }
      sync.set({"options":inData.options});
    } else {
      inData = data;
    }
    chrome.windows.create({
      url: embedUrl,
      type: 'panel',
      width: inData.options.width,
      height: inData.options.height
    });
  });
};

var linker = function(url) {
  for (var i in p.pats) {
    var pat = url.match(p.pats[i]);
    if (pat) {
      return p.embed[i](url, pat);
    }
  }
  return url;
};

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
