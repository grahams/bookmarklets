
/*
 * atk-deembedder.js
 *
 * Finds all of the embedded youtube videos in the current page and opens
 * them in new tabs.
 */
javascript:(function() {
    var urlFilter = function(url) {
        if(url && 
            (url.match(ccEmbedRegex)) ||
            (url.match(atkEmbedRegex)) ) {
            return true;
        }
        else {
            return false;
        }
    };

    var url;
    var loc = window.location.href;
    var atkEmbedRegex = 
        /^(http(s)?:\/\/)?(\/\/)?(www.)?americastestkitchen.com\/.*/m;
    var ccEmbedRegex = 
        /^(http(s)?:\/\/)?(\/\/)?(www.)?cookscountry.com\/.*/m;

    if(urlFilter(loc)) {
        // Find all of the embedded videos in the document
        var frames = document.querySelectorAll("iframe[id$='_ifp']")
            
        for(var x = 0; x < frames.length; x += 1) {
            // Get the embed URL
            var iframe = frames[x];
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

            var vidSrc = innerDoc.querySelector("video").src;

            // open the URL in a new tab/window
            window.open(vidSrc);
        }
    }
})();
