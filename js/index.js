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
            widthOfSecondHalf = 0,
            spaceBetweenTwoHalfs = 10,
            loadedImgIndex = 0,
            numberOfImages = 0;

        myQ("<span class='imagesTrack' id='" + firstHalf + "'/>").appendTo("#container");
        myQ("<span class='imagesTrack' id='" + secondHalf + "'/>").appendTo("#container");

        data.forEach(function (file, index, array) {
            var imgSrc = '<img src="' + file + '" id="' + index + '">';
            numberOfImages = numberOfImages + 1;

            if (index < array.length / 2) {
                myQ(imgSrc).appendTo(firstHalfId);
            } else {
                myQ(imgSrc).appendTo(secondHalfId);
            }

            myQ('#' + index).on("load", function () {
                loadedImgIndex = loadedImgIndex + 1;
            });
        });

        secondHalfRightPosition = -spaceBetweenTwoHalfs;

        setInterval(function () {
            if (loadedImgIndex === numberOfImages) {
                widthOfFirstHalf = myQ("#first-half").width();
                widthOfSecondHalf = myQ("#second-half").width();

                px = firstHalfRightPosition + "px";
                myQ(firstHalfId).css("right", px);
                firstHalfRightPosition = firstHalfRightPosition + 1;

                px = secondHalfRightPosition + "px";
                myQ(secondHalfId).css("right", px);
                secondHalfRightPosition = secondHalfRightPosition + 1;

                if (firstHalfRightPosition === widthOfFirstHalf + spaceBetweenTwoHalfs) {
                    firstHalfRightPosition = -1 * secondHalfRightPosition - spaceBetweenTwoHalfs;
                }

                if (secondHalfRightPosition === widthOfFirstHalf + widthOfSecondHalf + spaceBetweenTwoHalfs) {
                    secondHalfRightPosition = -1 * firstHalfRightPosition - spaceBetweenTwoHalfs;
                }
            }
        }, 1);

    });
}());