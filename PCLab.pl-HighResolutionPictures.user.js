// ==UserScript==
// @name         PCLab.pl-HighResolutionPictures.user.js
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-HighResolutionPictures.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-HighResolutionPictures.user.js
// @version      1.0
// @description  Attempts to load high resolution pictures instead of original ones, when possible.
// @author       Mav
// @include      https://pclab.pl/*
// @require      https://code.jquery.com/jquery-latest.min.js
//last update:   2018-08-24
// ==/UserScript==

(function() {
    'use strict';

    var delay = 5; // time in seconds - allows for other scripts to finish before this one starts, for example news unfolding script

    console.log("PCLab - image enhancement script works. Waiting " + delay + " seconds before proceeding...");

    setTimeout(function() {

        var switchedPicturesCounter = 0;

        var imgElements = $('.whitelistPremium img');

        console.log("PCLab - image enhancement - found " + imgElements.length + " picture(s).");
        //console.log(imgElements);

        if(imgElements != null && imgElements.length > 0) {

            for(var i = 0; i < imgElements.length ; i++) {
                if($(imgElements[i]).parent().is('a')){
                    //console.log("PCLab - image enhancement - picture no. " + i + " has a parent tag <a>.");

                    var aParent = $(imgElements[i]).parent();
                    //console.log(aParent.attr('href'));
                    var aParentHref = aParent.attr('href');

                    if (aParentHref != null) {
                        var match = aParentHref.match(/\.png$|\.jpg$|\.gif$|\.bmp$|$\.webp$/gi);

                        if(match != null && match.length > 0) {
                            //console.log("PCLab - image enhancement - parent tag of picture " + i + " contains picture link: " + aParentHref + " - switching picture.");
                            imgElements[i].src = aParent.attr('href');
                            switchedPicturesCounter++;
                        }
                    }
                }
            }

        }

        if(switchedPicturesCounter == 0) {
            console.log("PCLab - image enhancement - no better quality pictures found, aborting.");
        } else {
            console.log("PCLab - image enhancement - " +switchedPicturesCounter + " picture(s) replaced.");
        }


    }, delay * 1000);

})();