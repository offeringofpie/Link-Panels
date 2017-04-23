import sync from './sync';
import p from './parse.js';

export function openPanel (panel) {
  let typeOfUrl = (typeof panel === 'string') ? panel : panel.linkUrl;
  let embedUrl = linker(typeOfUrl);
  let defaults = {
    options: {
      width: 300,
      height: 300,
      isWide: false
    }
  };

  sync.get((data = defaults) => {
    chrome.windows.create({
      url: embedUrl,
      type: 'panel',
      width: data.options.width,
      height: data.options.height
    });
  });
};

export function linker (url) {
  for (var i in p.pats) {
    var pat = url.match(p.pats[i]);
    if (pat) {
      return p.embed[i](url, pat);
    }
  }
  return url;
};
