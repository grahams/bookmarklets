
/*
 * vid-controlifier.js
 *
 * Adds browser native video controls to all video files
 */
javascript:(function() {
    var smgVidList = document.querySelectorAll("video");

    for(x in smgVidList) {
        smgVidList[x].controls = "controls";
        smgVidList[x].controlslist = null;
    }
})();
