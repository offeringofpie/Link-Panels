var p = {
    /* regex patterns */
    pats: {
        dailymotion: /dailymotion.com[\w\/#]+video[\/=]([a-z0-9]+)/,
        soundcloud: /soundcloud\.com\//,
        vimeo: /vimeo\.com\/(?:[a-z]+\/)?(?:[a-z]+\/)?(?:[a-z]+\/)?(\w+)/,
        youtube: /youtu(?:\.)?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\_\-]+)/
    },
    /* embed links */
    embed: {
        dailymotion: function(url, match) {
            return 'http://www.dailymotion.com/embed/video/' + match[1] + '?api=postMessage&html=1';
        },
        soundcloud: function(url, match) {
            return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) + '&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true';
        },
        vimeo: function(url, match) {
            return 'https://player.vimeo.com/video/' + match[1];
        },
        youtube: function(url, match) {
            return 'http://www.youtube.com/embed/' + match[1];
        }
    },
    /* general options */
    options: {
        width: 350
    }
};

var openPanel = function(panel) {
    var typeOfUrl = (typeof panel === 'string') ? panel : panel.linkUrl;
    embedUrl = linker(typeOfUrl);
    chrome.windows.create({
        url: embedUrl,
        type: 'panel',
        width: p.options.width,
        height: Math.floor(p.options.width * 9 / 16)
    });
};

var linker = function(url) {
    var match = 0;
    for (var i in p.pats) {
        var pat = url.match(p.pats[i]);
        if (pat) {
            match = 1;
            return p.embed[i](url, pat);
        }
    }
    if (!match) {
        return url;
    }
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
