
/*
 * youtube-deembedder.js
 *
 * Finds all of the embedded youtube videos in the current page and opens
 * them in new tabs.
 */
javascript:(function() {
    // Find all of the embedded videos in the document
    var links = document.querySelectorAll("iframe[src^='https://www.youtube']");
        
    for(var x = 0; x < links.length; x += 1) {
        if(links) {
            // Get the embed URL
            link = links[x].src;

            if(link) {
                // convert the embed URL into a watch URL
                link = link.replace(/^.*embed\/(.*)/gm, 
                        "https://www.youtube.com/watch?v=$1");

                // open the URL in a new tab/window
                window.open(link);
            }
        }
    }
})();
