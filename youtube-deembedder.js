
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
            else if(url.match(embedlyEmbedRegex)) {
                var queryString = {};

                url.replace(
                    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                    function($0, $1, $2, $3) { queryString[$1] = $3; }
                );

                var eLink = decodeURIComponent(queryString['src']);

                link = embedToWatch(eLink);
            }

            return link;
        }
    };

    var urlFilter = function(url) {
        if(url && (url.match(ytEmbedRegex) || 
                    url.match(vimeoEmbedRegex) ||
                    url.match(embedlyEmbedRegex)
                    ) ) {
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
    var embedlyEmbedRegex = 
        /^(http(s)?:\/\/)?(\/\/)?.*embedly.com\/widgets\/media.html.*/m;

    if(urlFilter(loc)) {
        // we are directly on a youtube embed page, so just pop it out
        url = embedToWatch(loc);

        window.open(url);
    }
    else {
        // Find all of the embedded videos in the document
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
