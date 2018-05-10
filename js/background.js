class Panel {
  constructor(pats, embed) {
    this.pats = pats;
    this.embed = embed;
  }

  openPanel(panel, tabInfo = {}) {
    const pats = {
      dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
      gist: /gist\.github\.com\/([-0-9a-zA-Z]+\/)?([0-9a-fA-f]+)/,
      instagram: /instagr(?:\.am|am\.com)\/p\/([a-zA-Z0-9]+)/,
      pastebin: /pastebin\.com\/(.+)/,
      reddit: /redd(?:\.it|it\.com)\/(.+)?/,
      soundcloud: /soundcloud\.com\//,
      tedtalks: /ted\.com\/talks\/(.*)/,
      twitch: /twitch\.tv\/([a-zA-z0-9]+)\/?(?:v\/|b\/|c\/)?(\d+)?(?:\?)?(\w+)?(?:\=)?(.+)?/,
      vimeo: /vimeo\.com\/(?:[a-z]+\/)?(?:[a-z]+\/)?(?:[a-z]+\/)?(\w+)/,
      vine: /vine\.co\/v\/(.+)/,
      youtube: /youtu(?:\.)?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\_\-]+)(?:&list=)?([a-zA-Z0-9\_\-]+)?/
    };
    const embed = {
      dailymotion: (url, match) => {
        return (
          'http://www.dailymotion.com/embed/video/' +
          match[1] +
          '?api=postMessage&html=1'
        );
      },
      gist: (url, match) => {
        return (
          'data:text/html, <title>' +
          url +
          '</title><script  src="https://gist.github.com/' +
          match[1] +
          '/' +
          match[2] +
          '.js"></script>'
        );
      },
      instagram: (url, match) => {
        return 'https://www.instagram.com/p/' + match[1] + '/embed/';
      },
      pastebin: (url, match) => {
        return 'https://pastebin.com/embed_iframe.php?i=' + match[1];
      },
      reddit: (url, match) => {
        var permalink = match[1] === undefined ? '' : match[1];
        return 'https://m.reddit.com/' + permalink;
      },
      soundcloud: (url, match) => {
        return (
          'https://w.soundcloud.com/player/?url=' +
          encodeURIComponent(url) +
          '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true'
        );
      },
      tedtalks: (url, match) => {
        return 'https://embed-ssl.ted.com/talks/' + match[1] + '.html';
      },
      twitch: (url, match) => {
        var param = match[2] === undefined ? '?channel=' : '?video=v',
          which = match[2] === undefined ? 1 : 2,
          collection =
            match[3] === undefined ? '' : '&' + match[3] + '=' + match[4];
        return 'https://player.twitch.tv/' + param + match[which] + collection;
      },
      vimeo: (url, match) => {
        return 'https://player.vimeo.com/video/' + match[1];
      },
      vine: (url, match) => {
        return 'https://vine.co/v/' + match[1] + '/embed/simple';
      },
      youtube: (url, match) => {
        var tail =
          '?version=3&rel=0' + (match[2] === undefined)
            ? ''
            : '&list=' + match[2];
        return 'https://www.youtube.com/embed/' + match[1] + tail;
      }
    };
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

    for (let i in pats) {
      var pat = url.match(pats[i]);
      if (pat) {
        embedUrl = embed[i](url, pat);
      }
    }

    if (!embedUrl.length) {
      embedUrl = url;
    }

    chrome.storage.sync.get('options',(data = defaults) => {
      chrome.windows.create({
        url: embedUrl,
        type: 'panel',
        width: data.options.width,
        height: data.options.height
      });
    });
  }

  get(fn) {
    chrome.storage.sync.get('options', fn);
  }

  set(object) {
    chrome.storage.sync.set(
      {
        options: object
      },
      () => {
        if (chrome.runtime.lastError) {
          console.log('Runtime error.');
        }
      }
    );
  }

  update(fn) {
    chrome.storage.sync.get('options', opts => {
      if (!chrome.runtime.lastError) {
        let settings = {
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

  init() {
    chrome.contextMenus.create({
      title: 'Open in Panel',
      contexts: ['link'],
      onclick: this.openPanel
    });

    chrome.browserAction.onClicked.addListener(() => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
          status: 'complete',
          windowType: 'normal'
        },
        tabs => {
          for (var tab in tabs) {
            panel.openPanel(tabs[tab]);
          }
        }
      );
    });

    this.get(options => {
      if (typeof options.length === 'undefined') {
        this.set({
          width: 500,
          height: 281,
          isWide: true
        });
      }
    });
  }
}

const panel = new Panel();

panel.init();
