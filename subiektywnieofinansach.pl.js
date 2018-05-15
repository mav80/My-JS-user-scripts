// ==UserScript==
// @name         subiektywnieofinansach.pl.js
// @namespace    http://tampermonkey.net/
// @version      1.0
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/subiektywnieofinansach.pl.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/subiektywnieofinansach.pl.js
// @description  This script clears the text a little by removing unnecessary paragraphs with videos, links to other articles, related articles etc. It also removes the floating menu element (it's now static at the top of the page). Paragraphs fades out slowly so user can still click them.
// @author       Witcher
// @match        https://subiektywnieofinansach.pl/*
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $( "p > strong:contains('Czytaj te¿')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Czytaj tez')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Czytaj')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Przeczytaj te¿')" ).parent().fadeOut(5000);
    $( "p:contains('Czytaj te¿')" ).fadeOut(5000);
    $( "p > strong:contains('A to ciekawe:')" ).parent().fadeOut(5000);
    $( "p > strong:contains('A mo¿e by tak…')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Zerknij tutaj:')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Zerknij te¿:')" ).parent().fadeOut(5000);

    $( "p > strong:contains('Nie przegap nowych tekstów')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Jak p³aciæ kart¹ i oszczêdzaæ?')" ).parent().fadeOut(5000);
    $( "p > strong:contains('Samcikowe przygody z kartami:')" ).parent().fadeOut(5000);
    $( "p > strong:contains('OdwiedŸ te¿ stronê akcji')" ).parent().fadeOut(5000);
    $( "p > strong:contains('P³aæ w sieci bezpiecznie i wygodnie!')" ).parent().fadeOut(5000);

    $( ".videoWrapper" ).fadeOut(5000);
    $( ".related-posts" ).fadeOut(5000);
    $( ".top-fixed-wrapper" ).css('position', 'static');


})();