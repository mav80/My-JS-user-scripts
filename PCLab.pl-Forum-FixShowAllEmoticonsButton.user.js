// ==UserScript==
// @name         PCLabPl-Forum-FixShowAllEmoticonsButton.user.js
// @version      1.1
// @description  Workaround for the "Show all emoticons" button that is invisible on Cethin skin.
// @author       Witcher
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/PCLabPl-Forum-FixShowAllEmoticonsButton.user.js
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/PCLabPl-Forum-FixShowAllEmoticonsButton.user.js
// @include      http://forum.pclab.pl/*
//last update:  2018-08-24
// ==/UserScript==

(function() {
    'use strict';





    /////This is the part for the button in full editor page

    console.log("Skrypt do pokazywania guzika od wszystkich ikonek na Cethinie działa.");

    var optionTags = document.getElementsByTagName("option");
    //console.log(optionTags);
    var searchText = "Cethin";
    var found;

    for (var i = 0; i < optionTags.length; i++) {
        if (optionTags[i].textContent == searchText) {
            console.log("Znalazłem skórkę Cethin.");
            found = optionTags[i];
            //console.log(found);
            break;
        }
    }

    if(found != null && found.selected == true) {
        console.log("Cethin jest aktywny, zmieniamy przycisk w pełnym edytorze.");

        var button = document.getElementById('ed-0_showall_emoticons');

        if(button != null) {
            //console.log(button);
            button.value = "Wszystkie";
            button.style.position = "relative";
            button.style.color = "white";
        } else {
            console.log("Przycisk do zmiany w pełnym edytorze nie został znaleziony, nic nie robimy.");
        }











        /////This is the part for the button in fast reply field under the thread

        console.log("Zmieniamy przycisk w polu szybkiej odpowiedzi pod wątkiem.");


        var quickReplyButton = document.getElementById('fast-reply_showall_emoticons');

        if(quickReplyButton != null) {
            //console.log(quickReplyButton);
            quickReplyButton.value = "Wszystkie";
            quickReplyButton.style.position = "relative";
            quickReplyButton.style.color = "white";
        } else {
            console.log("Przycisk szybkiej odpowiedzi do zmiany nie został znaleziony, nic nie robimy.");
        }












        /////This is the part for the all the edit buttons on the page in quick editor mode

        console.log("Zmieniamy przyciski w polach szybkiej odpowiedzi w wątku po naciśnięciu przycisku Edytuj.");

        var editButtons = document.querySelectorAll('.edit_post');
        //console.log(editButtons);

        if(editButtons != null && editButtons.length > 0) {
            for (var j = 0; j < editButtons.length; j++) {
                editButtons[j].addEventListener("click", buttonChecker);
            }
        } else {
            console.log("Przyciski w polach szybkiej odpowiedzi w wątku po naciśnięciu przycisku Edytuj nie znalezione, nic nie robimy.");
        }








    } else {
        console.log("Skórki Cethin nie znaleziono lub jest ona nieaktywna, nic nie robimy.");
    }













//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////This is the function used for changing buttons in quick reply fields all over the thread

    function buttonChecker() {

        setTimeout(function(){        //allow time for the button to be created by main site script

            console.log("Skrypt do pokazywania guzika od wszystkich ikonek na Cethinie działa.");

            var optionTags = document.getElementsByTagName("option");
            //console.log(optionTags);
            var searchText = "Cethin";
            var found;

            for (var i = 0; i < optionTags.length; i++) {
                if (optionTags[i].textContent == searchText) {
                    console.log("Znalazłem skórkę Cethin.");
                    found = optionTags[i];
                    //console.log(found);
                    break;
                }
            }

            if(found != null && found.selected == true) {
                console.log("Cethin jest aktywny, zmieniamy przycisk");

                var buttons = document.getElementsByClassName('input_submit emoticons');
                console.log("Znalezione przyciski:");
                console.log(buttons.length);
                //console.log(buttons);

                if(buttons != null) {

                    for (var k = 0; k < buttons.length; k++) {
                        buttons[k].value = "Wszystkie";
                        buttons[k].style.position = "relative";
                        buttons[k].style.color = "white";
                    }


                } else {
                    console.log("Przycisk do zmiany nie został znaleziony, nic nie robimy.");
                }

            } else {
                console.log("Skórki Cethin nie znaleziono lub jest ona nieaktywna, nic nie robimy.");
            }


        }, 2000);

    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


})();