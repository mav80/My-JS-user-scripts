// ==UserScript==
// @name         PCLab.pl-UnfoldNews.user.js
// @version      1.0
// @description  This script loads contents of all the news on the "aktualnoœci" (news) page - no need to click "wiêcej" anymore.
// @author       Witcher
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
// ==/UserScript==

(function() {
    'use strict';

    var elements = $('.element');

    for(var i = 0; i < elements.length; i++) {
        elements[i].children[2].firstElementChild.remove(); //removes doubled head image
        elements[i].children[2].lastElementChild.style.textAlign="justify";
        $(elements[i].children[2].lastElementChild).load(elements[i].children[4].firstElementChild.href + ' #main > .content.news > .main > div.substance > div.data');
        elements[i].children[4].remove(); //deletes unnecessary 'wiêcej' button
    }



})();