// ==UserScript==
// @name         ArsTechnica-BetterQualityPictures.user.js
// @version      1.0
// @description  This script changes all picftures in articles on ArsTechnica.com to their better resolution versions where available
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
// @match        https://arstechnica.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //console.log('works!');

    var pictureElements = document.getElementsByClassName('full-width');
    console.log('pictureElements: ' + pictureElements.length);

    if(pictureElements.length > 0) {
        for(var i = 0; i < pictureElements.length ; i++) {
            if(pictureElements[i].firstElementChild.href != null) {
                pictureElements[i].firstElementChild.firstElementChild.src = pictureElements[i].firstElementChild.href;
            }
        }
    }




    //here we change first picture in every gallery found right after first page loads
    var galleryImages = document.getElementsByClassName('gallery-image-wrap');
    console.log('galleryImages: ' + galleryImages.length);


    if(galleryImages.length > 0) {
        for(var i = 0; i < galleryImages.length ; i++) {
            if(galleryImages[i].firstElementChild.href != null) {
                galleryImages[i].firstElementChild.firstElementChild.src = galleryImages[i].firstElementChild.href;
            }
        }
    }




     //here we replace current picture in the gallery after every click and after short pause (to allow gallery to change pictures)

    document.addEventListener('click', function () {
        setTimeout(function() {
            var galleryImages2 = document.getElementsByClassName('gallery-image-wrap');
            console.log('galleryImages2: ' + galleryImages2.length);

            if(galleryImages2.length > 0) {
                for(var i = 0; i < galleryImages2.length ; i++) {
                    if(galleryImages2[i].firstElementChild.href != null) {
                        galleryImages2[i].firstElementChild.firstElementChild.src = galleryImages2[i].firstElementChild.href;
                    }
                }
            }
        }, 300); //0,3 second delay
    });




   
})();