
/*
 * youtube-deembedder.js
 *
 * Finds all of the embedded youtube videos in the current page and opens
 * them in new tabs.
 */
javascript:(function() {
    var embedToWatch = function(url) {
        var link;

        if(url) {
            if(url.match(ytEmbedRegex)) {
                // convert the embed URL into a watch URL
                link = url.replace(/^.*embed\/(.*)/gm, 
                        "https://www.youtube.com/watch?v=$1");
            }
            else if(url.match(vimeoEmbedRegex)) {
                link = url.replace(/^.*video\/(.*)/gm,
                        "https://vimeo.com/$1");
            }

            return link;
        }
    };

    var urlFilter = function(url) {
        if(url && (url.match(ytEmbedRegex) || url.match(vimeoEmbedRegex)) ) {
            return true;
        }
        else {
            return false;
        }
    };

    var url;
    var loc = window.location.href;
    var ytEmbedRegex = 
        /^(http(s)?:\/\/)?(\/\/)?(www.)?youtube(-nocookie)?.com\/embed\/.*/m;
    var vimeoEmbedRegex = 
        /^(http(s)?:\/\/)?(\/\/)?player.vimeo.com\/video\/.*/m;

    if(urlFilter(loc)) {
        // we are directly on a youtube embed page, so just pop it out
        url = embedToWatch(loc);

        window.open(url);
    }
    else {
        // Find all of the embedded videos in the document
        // var links = document.querySelectorAll("iframe[src*='youtube.com'][src*='embed']");
        var links = document.querySelectorAll("iframe");
            
        for(var x = 0; x < links.length; x += 1) {
            // Get the embed URL
            link = links[x].src;

            if(urlFilter(link)) {
                url = embedToWatch(link);

                if(url) {
                    // open the URL in a new tab/window
                    window.open(url);
                }
            }
        }
    }
})();
