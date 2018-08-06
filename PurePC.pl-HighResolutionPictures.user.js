// ==UserScript==
// @name         PurePC.pl-HighResolutionPictures.user.js
// @version      1.0
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-HighResolutionPictures.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-HighResolutionPictures.user.js
// @namespace    http://tampermonkey.net/
// @description  Attempts to load high resolution pictures instead of original ones, when possible.
// @author       Witcher
// @match        https://www.purepc.pl/*
// last update:   2018-09-03
// ==/UserScript==

(function() {
    'use strict';

    var delay = 5; // time in seconds - allows for other scripts to finish before this one starts, for example news unfolding script

    console.log("PurePC - image enhancement script works. Waiting " + delay + " seconds before proceeding...");

    setTimeout(function() {

        var switchedPicturesCounter = 0;
        var imgElements = $('.main img');

        console.log("PurePC - image enhancement - found " + imgElements.length + " picture(s).");

        if(imgElements != null && imgElements.length > 0) {

            for(var i = 0; i < imgElements.length ; i++) {
                if($(imgElements[i]).parent().is('a')){
                    //console.log("PurePC - image enhancement - picture no. " + i + " has a parent tag <a>.");

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
            console.log("PurePC - image enhancement - no better quality pictures found, aborting.");
        } else {
            console.log("PurePC - image enhancement - " +switchedPicturesCounter + " picture(s) replaced.");
        }


    }, delay * 1000);

})();