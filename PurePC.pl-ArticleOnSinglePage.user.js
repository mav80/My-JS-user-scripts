// ==UserScript==
// @name         PurePC.pl-ArticleOnSinglePage.user.js
// @version      1.0
// @description  Allows for showing  multi paged articles on single page.
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-ArticleOnSinglePage.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PurePC.pl-ArticleOnSinglePage.user.js
// @match        https://www.purepc.pl/*
// @grant        none
// last update:  2018-09-03
// ==/UserScript==

(function() {
    'use strict';

    //console.log('PurePC on single page works!');

    var cookiesInfo = $('.cookiesinfo');
    if(cookiesInfo.length > 0) {
        cookiesInfo.remove();
    }
    
    var mainContentDiv = $('.content.clear-block');
    var toc = $('#PageMenuList').find('a');

    if(toc.length > 0 && mainContentDiv.length > 0) {

        console.log('PurePC - article on single page - ' + toc.length + ' pages found. Now creating button and a function.');

        //creates "show all pages" button
        var navigationDiv = $('.pager');
        $(navigationDiv[0]).append($('<li class="pager-last last printButton"><a style="color: red; font-weight: bold;" title="Poka¿ wszystkie strony" class="active">poka¿ wszystkie</a></li>'));

        var printButton = $('.printButton');

        $(printButton[0]).on('click', function() {

            navigationDiv.remove();

            //remove second navigation menu from first page
            $('#PageMenuList2').remove();

            for(var i = 1; i < toc.length ; i++) { //starts with 1 as we want to create elements for remaining pages only, not first which is already loaded

                //create numbers from lowest to highest, otherwise order after appending would be whitelistPremium5, whitelistPremium4, whitelistPremium3 etc.
                var pageNumber = (toc.length - i) + 1;
                var newClass = "divPageNo" + pageNumber;
                var newElementString = '<div class="content clear-block stitchedPage ' + newClass + '"></div>';
                var newElement = $(newElementString);
                $(mainContentDiv[0]).after(newElement);

                //here we load the content of the page
                $('.' + newClass).load($(toc[pageNumber-1]).attr('href') + ' div .content.clear-block');

                //page divider, page can be scrolled to it upon clicking TOC link, and after clicking this element page will be scrolled up to TOC
                $($('.' + newClass)[0]).before($('<span id="strona' + pageNumber + 'p" class="elementToScrollUpFrom" style="font-size: 1em; font-style: italic; font-weight: bold;">strona ' + pageNumber + '</span><span class="elementToScrollUpFrom" style="font-size: 1em; font-style: italic; font-weight: bold;padding-left: 0.5em;" >(klik - powrót do spisu treœci)</p>'));

                //make table of contents links jump to a page
                $(toc[i]).attr('id', ('strona' + (i+1)));

                $(toc[i]).on('click',function(event) {
                    event.preventDefault();
                    var pageIdToJumpTo = $('#'+this.id+'p');

                    $('html, body').animate({
                        scrollTop: ($(pageIdToJumpTo).offset().top)
                    }, 500);

                    //prevents folding of TOC
                    setTimeout(function() {
                        $('#PageMenuList').find('ul').css('display', 'block');
                    }, 100);
                });



                //last round of the loop - do stuff that should only be done only once
                if(i == toc.length -1 ) {
                    console.log('PCLab - article on single page - button was clicked, pages were stitched succesfully.');


                    //delete unnecessary menus from loaded pages, tags fields and pagers from all the pages
                    setTimeout(function() {
                        var menusToDelete = $('.stitchedPage').find('.PageMenuList');
                        console.log(menusToDelete.length);
                        console.log(menusToDelete);

                        $(menusToDelete).remove();
                        $('.tags').remove();
                        $('.pager').remove();

                    }, 2000);


                    //expand menu on the first page
                    $('#PageMenuList').removeClass();
                    $('#PageMenuList').find('ul').css('display', 'block');



                    //prevents default behavior of first link in TOC, missed above because we started counting from 1, also keeps the menu unfolded
                    $(toc[0]).on('click',function(event) {
                        event.preventDefault();

                        setTimeout(function() {
                            $('#PageMenuList').find('ul').css('display', 'block');
                        }, 100);
                    });




                    //adds scrolling to top after clicking on page number divider
                    $('.elementToScrollUpFrom').on('click', function() {
                        $('html, body').animate({
                            scrollTop: ($(toc).parent().parent().parent().parent().parent().offset().top)
                        }, 500);
                    });



                    //justifies text, allows for some time after page stitching
                    setTimeout(function() {
                        $('.main').find('p').css('text-align', 'justify');
                    }, 3000);
                }
            }

        });

    } else {
        console.log('PurePC - article on single page - no pages to load found, aborting.');
    }

})();