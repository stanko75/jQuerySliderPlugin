/*global jQuery, document, setInterval*/
(function () {
    "use strict";
    jQuery.getJSON("files.json", function (data) {
        var myQ = jQuery,
            firstHalfRight = 0,
            secondHalfRight = 0,
            px,
            firstHalf = "first-half",
            secondHalf = "second-half",
            firstHalfId = "#" + firstHalf,
            secondHalfId = "#" + secondHalf,
            widthOfFirstHalf = 0,
            widthOfSecondHalf = 0;

        myQ("<span class='imagesTrack' id='" + firstHalf + "'/>").appendTo("#container");
        myQ("<span class='imagesTrack' id='" + secondHalf + "'/>").appendTo("#container");

        data.forEach(function (file, index, array) {
            var imgSrc = '<img src="' + file + '">';

            if (index < array.length / 2) {
                myQ(imgSrc).appendTo(firstHalfId);
            } else {
                myQ(imgSrc).appendTo(secondHalfId);
            }
        });

        widthOfFirstHalf = myQ("img").eq(0).width() * myQ(firstHalfId).children().length;
        widthOfSecondHalf = myQ("img").eq(0).width() * myQ(secondHalfId).children().length;
        secondHalfRight = -10;

        setInterval(function () {
            px = firstHalfRight + "px";
            myQ(firstHalfId).css("right", px);
            firstHalfRight = firstHalfRight + 1;

            px = secondHalfRight + "px";
            myQ(secondHalfId).css("right", px);
            secondHalfRight = secondHalfRight + 1;

            myQ(firstHalfId).children().eq(2).css("border", "14px solid #333");
            myQ(firstHalfId).children().eq(1).css("border", "");

            if (firstHalfRight > widthOfFirstHalf + myQ(window).width()) {
                firstHalfRight = widthOfSecondHalf + myQ(window).width() - 20;
            }

            if (secondHalfRight > widthOfSecondHalf + widthOfFirstHalf + myQ(window).width() + 10) {
                secondHalfRight = firstHalfRight - 10;
            }

        }, 1);

    });
}());