var openPanel = function(panel) {
  var width = 350;
  var typeOfUrl = (typeof panel === 'string') ? panel : panel.linkUrl;
  embedUrl = linker(typeOfUrl);
  chrome.windows.create({
    url: embedUrl,
    type: 'panel',
    width: width,
    height: Math.floor(width * 9 / 16)
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
