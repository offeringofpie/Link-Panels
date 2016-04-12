var p = {
  /* regex patterns */
  pats: {
    dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
    instagram: /instagr(?:\.am|am\.com)\/p\/([a-zA-Z0-9]+)/,
    pastebin: /pastebin\.com\/(.+)/,
    reddit: /reddit\.com\/(.+)?/,
    soundcloud: /soundcloud\.com\//,
    twitch: /twitch\.tv\/([a-zA-z0-9]+)(?:\/v\/)?(\d+)?/,
    vimeo: /vimeo\.com\/(?:[a-z]+\/)?(?:[a-z]+\/)?(?:[a-z]+\/)?(\w+)/,
    vine: /vine\.co\/v\/(.+)/,
    youtube: /youtu(?:\.)?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\_\-]+)/
  },
  /* embed links */
  embed: {
    dailymotion: function(url, match) {
      return 'http://www.dailymotion.com/embed/video/' + match[1] + '?api=postMessage&html=1';
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
    twitch: function(url, match) {
      var video = (match[2] === undefined) ? '&video=v' + match[2] : '';
      return 'https://player.twitch.tv/?channel=' + match[1] + video;
    },
    vimeo: function(url, match) {
      return 'https://player.vimeo.com/video/' + match[1];
    },
    vine: function(url, match) {
      return 'https://vine.co/v/' + match[1] + '/embed/simple';
    },
    youtube: function(url, match) {
      return 'http://www.youtube.com/embed/' + match[1];
    }
  }
};
