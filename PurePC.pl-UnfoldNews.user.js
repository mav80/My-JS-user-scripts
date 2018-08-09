// ==UserScript==
// @name         PurePC.pl-UnfoldNews.user.js
// @version      1.0
// @description  This script loads contents of all the news on the "aktualnosci" (news) page - no need to click news title anymore.
// @author       Mav
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-UnfoldNews.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-UnfoldNews.user.js
// @match        https://www.purepc.pl/newsy*
// last update:   2018-09-03

// ==/UserScript==

(function() {
    'use strict';

	console.log('PurePC.pl - unfold news script works.');

    var elements = $('.nl_item');
    //console.log(elements.length);

    if(elements.length > 0) {
        for(var i = 0; i < elements.length; i++) {

            //main part - looks for a title element, extracts link and loads it
            var textElementToExtend = $(elements[i]).find('.ni_body')[0];
            if(textElementToExtend != null) {
                var elementWithLink =  $($(elements[i]).find('h2')[0]).find('a');
                if(elementWithLink != null) {
                    var linkToLoad = $($(elements[i]).find('h2')[0]).find('a')[0].href;
                    if(linkToLoad != null) {
                        $(textElementToExtend).load(linkToLoad + ' .content.clear-block');
                    }
                }
            }



            //deletes unnecessary tags
            var elementMoreToRemove = $(elements[i]).find('.tags');
            if(elementMoreToRemove.length > 0) {
                elementMoreToRemove[0].remove();
            }

        }




        //searches for a text elements and attempts to set text align to "justify"
        setTimeout(function() {
            var elementTextToJustify = $(elements).find('p');
            if(elementTextToJustify.length > 0) {
                $(elementTextToJustify).css('text-align', 'justify');
            }
        }, 3000);




    } else {
        console.log('PurePC - unfold news - no news found, aborting.');
    }
})();