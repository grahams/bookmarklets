
/*
 * youtube-deembedder.js
 *
 * Finds all of the embedded youtube videos in the current page and opens
 * them in new tabs.
 */
javascript:(function() {
    var embedToWatch = function(url) {
        if(url) {
            // convert the embed URL into a watch URL
            link = url.replace(/^.*embed\/(.*)/gm, 
                    "https://www.youtube.com/watch?v=$1");

            return link;
        }
    };

    var url;
    var loc = window.location.href;

    if(loc && loc.match(/^http(s)?:\/\/(www.)?youtube.com\/embed\/.*/m)) {
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

            if(link && link.match(/^(http(s)?:\/\/)?(\/\/)?(www.)?youtube(-nocookie)?.com\/embed\/.*/m)) {
                url = embedToWatch(link);

                if(url) {
                    // open the URL in a new tab/window
                    window.open(url);
                }
            }
        }
    }
})();
