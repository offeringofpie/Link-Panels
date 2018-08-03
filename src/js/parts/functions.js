import sync from './sync';
import p from './parse.js';
const browser = browser || chrome;

export function openPanel(panel, tabInfo = {}) {
  let url = typeof panel.url === 'string' ? panel.url : panel.linkUrl;
  let tabId = typeof tabInfo.id === 'number' ? tabInfo.id : panel.id;
  let embedUrl = '';
  let defaults = {
    options: {
      width: 300,
      height: 300,
      isWide: false,
      experimental: false
    }
  };

  for (var i in p.pats) {
    var pat = url.match(p.pats[i]);
    if (pat) {
      embedUrl = p.embed[i](url, pat);
    }
  }

  if (!embedUrl.length) {
    embedUrl = url;
  }

  sync.get((data = defaults) => {
    browser.windows.create({
      url: embedUrl,
      type: 'panel',
      width: data.options.width,
      height: data.options.height
    });
  });
}
