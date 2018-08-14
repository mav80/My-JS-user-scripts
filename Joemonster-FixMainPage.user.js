// ==UserScript==
// @name         Joemonster-FixMainPage.user.js
// @version      1.1
// @description  Leaves only fresh articles on main page of the site, removes all unnecessary/old articles and stuff. Affects only first page, pages 2 and higher are unaffected
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/Joemonster-FixMainPage.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/Joemonster-FixMainPage.user.js
// @match        http://joemonster.org/
// @include      https://joemonster.org/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //alert('works!');

    //This part hides about five 'articles' on main page - two movies, sponsored, photo from gallery, short joke

    var toHide = document.getElementsByClassName("pb4");
    console.log(toHide);

    for(var i = 0; i<toHide.length; i++) {
        console.log('Hiding element no. ' + i);
        toHide[i].parentElement.style.display="none";

    }







    //This part hides article named "Ciekawe w¹tki na forach JM"

    var textProp = 'textContent' in document ? 'textContent' : 'innerText';

    // directly converting the found 'a' elements into an Array,
    // then iterating over that array with Array.prototype.forEach():
    [].slice.call(document.querySelectorAll('a'), 0).forEach(function(aEl) {
        // if the text of the aEl Node contains the text 'Ciekawe w¹tki na forach JM':
        if (aEl[textProp].indexOf('Ciekawe w¹tki na forach JM') > -1) {
            // we update its style:
            console.log('Hiding element ' + aEl);
            aEl.parentElement.style.display="none";
        }
    });





    //This part hides old articles

    // first attempt - works, but only for hardcoded id value
    //var oldArticles = document.getElementsByClassName('indexart');

    //    for(i = 0; i<oldArticles.length; i++) {
    //        if(oldArticles[i].id < 40000) {
    //            console.log('Hiding element id no. = ' + oldArticles[i].id);
    //            oldArticles[i].style.display="none";
    //           }

    //}


    // This one checks current year, and then disable all articles that are up to 100 years older

    var currentYear = (new Date()).getFullYear();
    console.log('Current year: ' + currentYear);

    //code below is based on: https://stackoverflow.com/a/26595625/8783698

    textProp = 'textContent' in document ? 'textContent' : 'innerText';

    for(var previousYear = currentYear-1; previousYear>currentYear-100; previousYear--) {
        [].slice.call(document.querySelectorAll('span.art-author-date'), 0).forEach(function(aEl) {
            if (aEl[textProp].indexOf(previousYear) > -1) {
                //console.log(aEl);
                console.log('Hiding element from year ' + previousYear);
                aEl.parentElement.parentElement.style.display="none";
            }
        });

    }



    //here we remove all articles without author - movies, pewex ads etc

    var articleDivs = $('#main').find('.indexart');
    console.log(articleDivs.length);

    for(var j = 0; j < articleDivs.length ; j++) {

        console.log($(articleDivs[j]).attr('data-author'));

        if($(articleDivs[j]).attr('data-author') == null) {
            console.log("Hiding element " + j);
            $(articleDivs[j]).hide();
        }




    }























})();