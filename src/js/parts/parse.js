export default {
  /* regex patterns */
  pats: {
    dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
    gist: /gist\.github\.com\/([-0-9a-zA-Z]+\/)?([0-9a-fA-f]+)/,
    instagram: /instagr(?:\.am|am\.com)\/p\/([a-zA-Z0-9]+)/,
    pastebin: /pastebin\.com\/(.+)/,
    reddit: /redd(?:\.it|it\.com)\/(.+)?/,
    soundcloud: /soundcloud\.com\//,
    tedtalks: /ted\.com\/talks\/(.*)/,
    twitch: /twitch\.tv\/([a-zA-z0-9]+)(?:\/v\/)?(\d+)?/,
    vimeo: /vimeo\.com\/(?:[a-z]+\/)?(?:[a-z]+\/)?(?:[a-z]+\/)?(\w+)/,
    vine: /vine\.co\/v\/(.+)/,
    youtube: /youtu(?:\.)?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\_\-]+)(?:&list=)?([a-zA-Z0-9\_\-]+)?/
  },
  /* embed links */
  embed: {
    dailymotion: function(url, match) {
      return 'http://www.dailymotion.com/embed/video/' + match[1] + '?api=postMessage&html=1';
    },
    gist: function(url, match) {
      return 'data:text/html, <title>' + url + '</title><script  src="https://gist.github.com/' + match[1] + '/' + match[2] + '.js"></script>';
    },
    instagram: function(url, match) {
      return 'https://www.instagram.com/p/' + match[1] + '/embed/';
    },
    pastebin: function(url, match) {
      return 'https://pastebin.com/embed_iframe.php?i=' + match[1];
    },
    reddit: function(url, match) {
      var permalink = (match[1] === undefined) ? '' : match[1];
      return 'https://m.reddit.com/' + permalink;
    },
    soundcloud: function(url, match) {
      return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true';
    },
    tedtalks: function(url, match) {
      return 'https://embed-ssl.ted.com/talks/' + match[1] + ".html";
    },
    twitch: function(url, match) {
      var param = (match[2] === undefined) ? '?channel=' : '?video=v',
          which = (match[2] === undefined) ? 1 : 2;
      return 'https://player.twitch.tv/' + param + match[which];
    },
    vimeo: function(url, match) {
      return 'https://player.vimeo.com/video/' + match[1];
    },
    vine: function(url, match) {
      return 'https://vine.co/v/' + match[1] + '/embed/simple';
    },
    youtube: function(url, match) {
      var playlist = (match[2] === undefined) ? '' : '?list=' + match[2];
      return 'http://www.youtube.com/embed/' + match[1] + playlist;
    }
  }
};
