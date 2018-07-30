// ==UserScript==
// @name         PCLab.pl-ArticleOnSinglePage.user.js
// @version      1.0
// @description  This script loads contents of all the news on the "aktualnosci" (news) page - no need to click "wiecej" (more) anymore. It also set text align parameter to "justify".
// @author       Mav
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-ArticleOnSinglePage.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PCLab.pl-ArticleOnSinglePage.user.js
// @include      https://pclab.pl/art*.html
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        none
// last update:  2018-08-24
// ==/UserScript==

(function() {
    'use strict';

    console.log("PCLab - article on single page works.");

    var mainContentDiv = $('.data.whitelistPremium');
    var toc = $('.toc.first .center').find('a');

    if(toc.length > 0 && mainContentDiv.length > 0) {

        console.log('PCLab - article on single page - ' + toc.length + ' pages found. Now creating button and a function.');

        var navigationDiv = $('.navigation');
        $(navigationDiv[0]).prepend($('<div class="previous"><div class="link"><a style="color: red">DRUKUJ ARTYKUŁ</a></div><div class="name"><a>Załaduj wszystkie strony artykułu</a></div>'));

        var printButton = $('.previous');

        $(printButton[0]).on('click', function() {

            navigationDiv.remove();
            $('.chapters').remove();

            for(var i = 1; i < toc.length ; i++) { //starts with 1 as we want to create elements for remaining pages only, not first which is already loaded

                //create numbers from lowest to highest, otherwise order after appending would be whitelistPremium5, whitelistPremium4, whitelistPremium3 etc.
                var pageNumber = (toc.length - i) + 1;
                var newClass = "whitelistPremiumDivPage" + pageNumber;
                var newElementString = '<div class="' + newClass + '"></div>';
                var newElement = $(newElementString);
                $(mainContentDiv[0]).after(newElement);

                //here we load the content of the page
                $('.' + newClass).load($(toc[pageNumber-1]).attr('href') + ' div .whitelistPremium');

                //page divider, page can be scrolled to it upon clicking TOC link, and after clicking this element page will be scrolled up to TOC
                $($('.' + newClass)[0]).before($('<span id="strona' + pageNumber + 'p" class="elementToScrollUpFrom" style="font-size: 20em; font-style: italic;">strona ' + pageNumber + '</span><span class="elementToScrollUpFrom" style="font-size: 10em; font-style: italic; padding-left: 0.5em;" >(klik - powrót do spisu treści)</p>'));


                //make table of contents links jump to a page
                $(toc[i]).attr('id', ('strona' + (i+1)));

                $(toc[i]).on('click',function(event) {
                    event.preventDefault();
                    var pageIdToJumpTo = $('#'+this.id+'p');

                    $('html, body').animate({
                        scrollTop: ($(pageIdToJumpTo.next()).offset().top)
                    }, 500);
                });



                //last round of the loop - do stuff that should only be done only once
                if(i == toc.length -1 ) {
                    console.log('PCLab - article on single page - button was clicked, pages were stitched succesfully.');



                    //prevents default behavior of first link in TOC, missed above because we started counting from 1
                    $(toc[0]).on('click',function(event) {
                        event.preventDefault();
                    });



                    //adds scrolling to top after clicking on page number divider
                    $('.elementToScrollUpFrom').on('click', function() {
                        $('html, body').animate({
                            scrollTop: ($(toc).offset().top)
                        }, 500);
                    });



                    //justifies text, allows for some time after page stitching
                    setTimeout(function() {
                        $('.whitelistPremium').find('p').css('text-align', 'justify');
                    }, 3000);
                }
            }

        });

    } else {
        console.log('PCLab - article on single page - no pages to load found, aborting.');
    }

})();