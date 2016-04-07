var p = {
  /* regex patterns */
  pats: {
    dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
    instagram: /instagr(?:\.am|am\.com)\/p\/([a-zA-Z0-9]+)/,
    soundcloud: /soundcloud\.com\//,
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
    soundcloud: function(url, match) {
      return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true';
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
