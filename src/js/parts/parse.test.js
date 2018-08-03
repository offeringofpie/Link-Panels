import p from './parse.js';

const pats = p.pats;
const url_tests = {
  "dailymotion": [
    "http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music",
    "http://www.dailymotion.com/video/x44lvd",
    "http://www.dailymotion.com/hub/x9q_Galatasaray#video=xjw21s",
    "http://www.dailymotion.com/video/xn1bi0_hakan-yukur-klip_sport"
  ],
  "gist": [
    "https://gist.github.com/shakked/f56894535c7292c4d6c6",
    "https://gist.github.com/shakked/f56894535c7292c4d6c6/a7c5fa1065bca1ab4790fd06ba0f84ade4c263b2/"
  ],
  "instagram": [
    "https://www.instagram.com/p/mviLwdpzek/"
  ],
  "pastebin": [
    "https://pastebin.com/n1qTeikM"
  ],
  "reddit": [
    "https://www.reddit.com/r/videos/comments/2dnbbz/a_sad_day_indeed_the_original_rick_roll_video_has/",
    "https://www.reddit.com/r/videos/comments/2dnbbz/a_sad_day_indeed_the_original_rick_roll_video_has/cjr8ex4/",
    "https://www.redd.it/2dnbbz",
  ],
  "soundcloud": [
    "https://soundcloud.com/aviciiofficial/avicii-you-make-me-diplo-remix", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29395900&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
  ],
  "tedtalks": [
    "https://www.ted.com/talks/amy_green_a_video_game_to_cope_with_grief"
  ],
  "twitch": [
    "https://www.twitch.tv/backlogathon/",
    "https://www.twitch.tv/backlogathon/b/512356452",
    "https://www.twitch.tv/backlogathon/c/3915617",
    "https://www.twitch.tv/videos/96412727",
    "https://www.twitch.tv/videos/163638919?collection=nhS5vbvG1hTjmg"
  ],
  "vimeo": [
    "http://vimeo.com/25451551",
    "http://player.vimeo.com/video/25451551"
  ],
  "vine": [
    "https://vine.co/v/hKQ9TnXVDJB"
  ],
  "youtube": [
    'https://www.youtube.com/watch?v=foFKXS6Nyho',
    'http://www.youtube.com/v/foFKXS6Nyho?version=3&autohide=1',
    'http://youtu.be/foFKXS6Nyho',
    'https://www.youtube.com/watch?v=foFKXS6Nyho&list=PLwajuo20-obt-q17htzRWaiQImrDYcE7e'
  ]
}

for (const site in url_tests) {
  describe(site, () => {
    for (const url of url_tests[site]) {
      test("Testing parsing of "+site+" link: "+url, () => {
        expect(url).toMatch(pats[site]);
      });
    }
  });
}
