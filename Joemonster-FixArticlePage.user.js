// ==UserScript==
// @name         Joemonster-FixArticlePage.user.js
// @version      0.8
// @description  This script automatically expands all comments under the article - downvoted, unfolds all comments when more than 3, attempts to unfold single log comment - not fully working now
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/Joemonster-FixArticlePage.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/Joemonster-FixArticlePage.user.js
// @match        http://joemonster.org/art*
// @include      https://joemonster.org/art*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @include      file://
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    //alert('works!');

    // This part expands all comments

    var toExpand = document.getElementsByClassName("comment-more-replies-acc");
    console.log(toExpand);

    for(var i = 0; i<toExpand.length; i++) {
        console.log('Expanding element no. ' + i);
        toExpand[i].style.display="block";
    }


    // Here we delete unnecessary elements (buttons that expands all comments - we already expanded them above)

    var toDelete = document.getElementsByClassName("comment-more-replies");
    console.log(toDelete);

    for(i = toDelete.length - 1; i> -1; i--) {
        console.log(i);
        console.log('Deleting element no. ' + i);
        toDelete[i].remove();
    }



    // Here we expand the disabled (many downvotes) comments

    var disabledComments = document.getElementsByClassName("comDisabled");
    console.log(disabledComments);

    for(i = disabledComments.length - 1; i> -1; i--) {
        console.log(disabledComments);
        console.log('Enabling comment - element no. ' + i);
        disabledComments[i].classList.remove('comDisabled');
    }



    // Here we expand folded comments
    // Doesn't work (Ajax / jQuery ? element we try to find doesn't exist at the time of executing script), but link to jquery.min.js in this script's header seems to break the folding mechanism anyway - side
    // effect is other jQuery functions doesn't work, for example adding comment is broken - comment is added, but page doesn't refresh automatically


//    var foldedComments = document.getElementsByClassName('hiddenText');
//    console.log(foldedComments);
//    console.log(foldedComments.length);

//   for(i = 0; i < foldedComments.length; i++) {
//        console.log('Licznik wynosi ' + i);
//        console.log('Expanding comment - element no. ' + i);
//        foldedComments[i].classList.remove('hiddenText');
//    }





})();

