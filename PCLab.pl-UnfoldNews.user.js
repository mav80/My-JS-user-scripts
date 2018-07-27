// ==UserScript==
// @name         PCLab.pl-UnfoldNews.user.js
// @version      1.1
// @description  This script loads contents of all the news on the "aktualnosci" (news) page - no need to click "wiecej" (more) anymore.
// @author       Mav
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-UnfoldNews.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-UnfoldNews.user.js
// @include      https://pclab.pl/news.html
// @include      https://pclab.pl/news-*.html
// @include      https://pclab.pl/news--100.html
// @include      https://pclab.pl/news-*-100.html
// @include      https://pclab.pl/news--50.html
// @include      https://pclab.pl/news-*-50.html
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        none
//last update:   2018-08-24

// ==/UserScript==

(function() {
    'use strict';

    var elements = $('.element');

    if(elements.length > 0) {
        for(var i = 0; i < elements.length; i++) {

            //if news has a head image, we remove because it will be load again - prevents element doubling
            var elementImgToRemove = $(elements[i]).find('img');
            if(elementImgToRemove != null) {
                $(elementImgToRemove[0]).remove();
            }



            //searches for a text element and attempts to set text align to "justify"
            //$(elements[i]).find('.text').find('p')[0].style.textAlign = "justify";
            var elementTextToJustify = $(elements[i]).find('.text').find('p');
            if(elementTextToJustify.length > 0) {
                elementTextToJustify[0].style.textAlign = "justify";
            }



            //main part - looks for a "wiêcej (more)" element, extracts link and loads it
            //$($(elements[i]).find('.text').find('p')[0]).load($(elements[i]).find('.more')[0].firstElementChild.href + ' #main > .content.news > .main > div.substance > div.data');
            var textElementToExtend = $(elements[i]).find('.text').find('p')[0];
            if(textElementToExtend != null) {
                var elementWithLink =  $($(elements[i]).find('.more')[0]).find('a')[0];
                if(elementWithLink != null) {
                    var linkToLoad = $($(elements[i]).find('.more')[0]).find('a')[0].href;
                    if(linkToLoad != null) {
                        $(textElementToExtend).load(linkToLoad + ' #main > .content.news > .main > div.substance > div.data');
                    }
                }
            }



            //deletes unnecessary 'wiecej' button
            var elementMoreToRemove = $(elements[i]).find('.more');
            if(elementMoreToRemove.length > 0) {
                elementMoreToRemove[0].remove();
            }

        }
    } else {
        console.log('PCLab - unfold news - no news found, aborting.');
    }

})();