/*global jQuery, document, setInterval*/
(function () {
    "use strict";
    jQuery.getJSON("files.json", function (data) {
        var imgs = jQuery("img");
        data.forEach(function (file) {
            jQuery("#imagesTrack").append('<img src="' + file + '">');
        });
        setInterval(function () {
            jQuery("#imagesTrack").append('<img src="' + imgs[0].src + '">');
            imgs.eq(0).remove();
            imgs.eq(2).css("border", "14px solid #333");
            imgs.eq(1).css("border", "");
        }, 500);
    });
}());