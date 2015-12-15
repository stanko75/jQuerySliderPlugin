/*global jQuery, document, setInterval*/
(function () {
    "use strict";
    jQuery.getJSON("files.json", function (data) {
        var myQ = jQuery,
            firstHalfRightPosition = 0,
            secondHalfRightPosition = 0,
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
        secondHalfRightPosition = -10;

        setInterval(function () {
            px = firstHalfRightPosition + "px";
            myQ(firstHalfId).css("right", px);
            firstHalfRightPosition = firstHalfRightPosition + 1;

            px = secondHalfRightPosition + "px";
            myQ(secondHalfId).css("right", px);
            secondHalfRightPosition = secondHalfRightPosition + 1;

            if (firstHalfRightPosition === widthOfFirstHalf + 10) {
                firstHalfRightPosition = -1 * secondHalfRightPosition - 10;
            }

            if (secondHalfRightPosition === widthOfFirstHalf + widthOfSecondHalf + 10) {
                secondHalfRightPosition = -1 * firstHalfRightPosition - 10;
            }

        }, 1);

    });
}());