// ==UserScript==
// @name         Anandtech.com-HighResolutionPictures.user.js
// @version      1.0
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/Anandtech.com-HighResolutionPictures.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/Anandtech.com-HighResolutionPictures.user.js
// @namespace    http://tampermonkey.net/
// @description  Attempts to load high resolution pictures instead of original ones in articles and news, when possible.
// @author       Witcher
// @match        https://www.anandtech.com/*
// last update:   2018-09-03
// ==/UserScript==

(function() {
    'use strict';

    var delay = 1; // time in seconds - allows for other scripts to finish before this one starts, for example news unfolding script

    console.log("Anandtech - image enhancement script works. Waiting " + delay + " second(s) before proceeding...");

    setTimeout(function() {

        var switchedPicturesCounter = 0;
        var imgElements = $('.articleContent img');
		//console.log(imgElements.length);

        console.log("Anandtech - image enhancement - found " + imgElements.length + " picture(s).");

        if(imgElements != null && imgElements.length > 0) {

            for(var i = 0; i < imgElements.length ; i++) {
                if($(imgElements[i]).parent().is('a')){
                    //console.log("Anandtech - image enhancement - picture no. " + i + " has a parent tag <a>.");

                    var aParent = $(imgElements[i]).parent();
                    //console.log(aParent.attr('href'));
                    var aParentHref = aParent.attr('href');

                    if (aParentHref != null) {
                        var match = aParentHref.match(/\.png$|\.jpg$|\.gif$|\.bmp$|$\.webp$/gi);

                        if(match != null && match.length > 0) {
                            //console.log("PCLab - image enhancement - parent tag of picture " + i + " contains picture link: " + aParentHref + " - switching picture.");
                            imgElements[i].src = aParent.attr('href');

                            $(imgElements[i]).css('width', '670px');
                            switchedPicturesCounter++;
                        }
                    }
                }
            }

        }

        if(switchedPicturesCounter == 0) {
            console.log("Anandtech - image enhancement - no better quality pictures found, aborting.");
        } else {
            console.log("Anandtech - image enhancement - " +switchedPicturesCounter + " picture(s) replaced.");
        }


    }, delay * 1000);

})();