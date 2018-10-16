// ==UserScript==
// @name         ArsTechnica-BetterQualityPictures.user.js
// @version      1.2.2
// @description  This script changes all pictures in articles and pictures from feature stories on main page of ArsTechnica.com to their better resolution versions where available. Mobile version of site only.
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
// @match        https://arstechnica.com/*
// @grant        none
// ==/UserScript==

/*

Changelog:
1.2.2 - part 3 - change handle to refresh galleries  from 'document' to every gallery (for... galleryImages[k].parentElement.parentElement.parentElement) - 'document' didn't work properly anymore

*/

(function() {
    'use strict';

    console.log('works!');

    /////////////////////////////////////////////////////////////////////////////////////////////////////////// - part 1 - feature story images on main page

    var mainPageFeatureStoryPictureElements = document.getElementsByClassName('img-holder');
    console.log('Main page feature story images: ' + mainPageFeatureStoryPictureElements.length);

    if(mainPageFeatureStoryPictureElements.length > 0) {
        for(var m = 0; m < mainPageFeatureStoryPictureElements.length ; m++) {
            if(mainPageFeatureStoryPictureElements[m].style.backgroundImage != null) {

                console.log("Trying to get better quality for main page feature story picture number " + (m+1) + " using regex method.");

                var linkToChange = mainPageFeatureStoryPictureElements[m].style.backgroundImage;

                console.log("Original image address: " + linkToChange);

                var modifiedLink = linkToChange.replace(/(\w+)(-\d+x\d+)(\.\w+"\)$)/, "$1$3"); //we're looking for three groups of text, second one is resolution in format "NUMBERSxNUMBERS". Then we discard second group and use only group 1 and 3

                console.log("Modified image address: " + modifiedLink);
                console.log("Checking if image from modified link exists...");

                var http = new XMLHttpRequest();
                http.open('HEAD', modifiedLink, false);
                http.send();

                if(http.status == "200"){
                    console.log("...it does. Replacing original picture with better quality version.");
                    mainPageFeatureStoryPictureElements[m].style.backgroundImage = modifiedLink;
                } else {
                    console.log("...it doesn't, aborting.");
                }
            }
        }
    }

    console.log("Done replacing feature story images on main page.");

///////////////////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////////////////////////////////////////////////////////////////////////////////////// - part 2 - single images in article page

    var pictureElements = document.getElementsByClassName('full-width');
    console.log('pictureElements: ' + pictureElements.length);

    if(pictureElements.length > 0) {
        for(var i = 0; i < pictureElements.length ; i++) {
            if(pictureElements[i].firstElementChild.href != null) {
                console.log("Picture number " + (i+1) + " of better quality found, replacing.");
                console.log("Replacing this: " + pictureElements[i].firstElementChild.firstElementChild.src);
                console.log("with this: " + pictureElements[i].firstElementChild.href);
                pictureElements[i].firstElementChild.firstElementChild.src = pictureElements[i].firstElementChild.href;
                pictureElements[i].firstElementChild.firstElementChild.srcset = ""; //remove srcset content (lower res image address) so that browser won't load it
            } else {
                console.log("No better quality found for picture number " + (i+1) + " using basic method, now trying different method.");

                linkToChange = pictureElements[i].firstElementChild.src;

                console.log("Original image address: " + linkToChange);

                 modifiedLink = linkToChange.replace(/(\w+)(-\d+x\d+)(\.\w+$)/, "$1$3"); //we're looking for three groups of text, second one is resolution in format "NUMBERSxNUMBERS". Then we discard second group and use only group 1 and 3

                console.log("Modified image address: " + modifiedLink);
                console.log("Checking if image from modified link exists...");

                http = new XMLHttpRequest();
                http.open('HEAD', modifiedLink, false);
                http.send();

                if(http.status == "200"){
                    console.log("...it does. Replacing original picture with better quality version.");
                    pictureElements[i].firstElementChild.src = modifiedLink;
                } else {
                    console.log("...it doesn't, aborting.");
                }
            }
        }
    }

    console.log("Done replacing single images in article.");

///////////////////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////////////////////////////////////////////////////////////////////////////////////// - part 3 - mobile version galleries

    //here we change first picture in every gallery found right after first page loads
    var galleryImages = document.getElementsByClassName('gallery-image-wrap');
    console.log('Number of mobile galleries found: ' + galleryImages.length);


    if(galleryImages.length > 0) {

        for(var j = 0; j < galleryImages.length ; j++) {
            if(galleryImages[j].firstElementChild.href != null) {
                console.log('Replacing first picture in gallery number ' + (j+1));
                galleryImages[j].firstElementChild.firstElementChild.src = galleryImages[j].firstElementChild.href;
            }
        }

        //here we replace current picture in every gallery found after every click and after short pause (to allow gallery to change pictures)

        for (var k = 0 ; k < galleryImages.length ; k++) {
            galleryImages[k].parentElement.parentElement.parentElement.addEventListener('click', function () {
                setTimeout(function() {
                    if(galleryImages.length > 0) {
                        for(var k = 0; k < galleryImages.length ; k++) {
                            if(galleryImages[k].firstElementChild.href != null) {
                                console.log('Replacing picture in gallery number ' + (k+1));
                                galleryImages[k].firstElementChild.firstElementChild.src = galleryImages[k].firstElementChild.href;
                            }
                        }
                    }
                }, 300); //0,3 second delay
            });
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////////////////////////////////////////////////////////////////////////////////////// - full version galleries - not functional now, TBD later if at all


    var fullVersionGalleries = document.getElementsByClassName('lightSlider');

    if(fullVersionGalleries.length > 0){


        console.log('Number of full version galleries founds: ' + fullVersionGalleries.length);
        console.log(fullVersionGalleries);

        console.log(fullVersionGalleries[0].firstElementChild);
        console.log(fullVersionGalleries[0].firstElementChild.dataset.thumb);
        console.log(fullVersionGalleries[0].firstElementChild.dataset.src);

        fullVersionGalleries[0].firstElementChild.dataset.thumb = fullVersionGalleries[0].firstElementChild.dataset.src;
        fullVersionGalleries[0].firstElementChild.dataset.responsive = "";

        fullVersionGalleries[0].lastElementChild.dataset.thumb = fullVersionGalleries[0].lastElementChild.dataset.src;
        fullVersionGalleries[0].lastElementChild.dataset.responsive = "";

        //images are replaced correctly, but slider does not refresh them. So it's necessery to somehow either replace them earlier, force refresh after replacing or change slider to the one from mobile version.

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

})();