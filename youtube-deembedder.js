javascript:(function() {
    $("iframe[src^='https://www.youtube']").each(function(a) {
        var link = $(this).attr("src");

        if(link) {
            link = link.replace(/^.*embed\/(.*)/gm, "https://www.youtube.com/watch?v=$1");

            window.open(link);
        }
    });
})();
