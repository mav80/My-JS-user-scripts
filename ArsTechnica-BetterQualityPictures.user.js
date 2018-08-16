
Tampermonkey®
v4.7 by Jan Biniok
Edit - ArsTechnica-BetterQualityPictures.user.js
Installed userscripts
Settings
Utilities
Help
	
ArsTechnica-BetterQualityPictures.user.js
by Witcher
Editor
Settings
File
Edit
Selection
Find
GoTo
Developer

1
// ==UserScript==
2
// @name         ArsTechnica-BetterQualityPictures.user.js
3
// @version      1.2.1
4
// @description  This script changes all pictures in articles and pictures from feature stories on main page of ArsTechnica.com to their better resolution versions where available. Mobile version of site only.
5
// @author       Witcher
6
// @updateURL    https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
7
// @downloadURL  https://mav.matcom.com.pl/MyJSUserScripts/ArsTechnica-BetterQualityPictures.user.js
8
// @match        https://arstechnica.com/*
9
// @grant        none
10
// ==/UserScript==
11
?
12
(function() {
13
    'use strict';
14
?
15
    //console.log('works!');
16
?
17
    /////////////////////////////////////////////////////////////////////////////////////////////////////////// - feature story images on main page
18
?
19
    var mainPageFeatureStoryPictureElements = document.getElementsByClassName('img-holder');
20
    console.log('Main page feature story images: ' + mainPageFeatureStoryPictureElements.length);
21
?
22
    if(mainPageFeatureStoryPictureElements.length > 0) {
23
        for(var m = 0; m < mainPageFeatureStoryPictureElements.length ; m++) {
24
            if(mainPageFeatureStoryPictureElements[m].style.backgroundImage != null) {
25
?
26
                console.log("Trying to get better quality for main page feature story picture number " + (m+1) + " using regex method.");
27
?
28
                var linkToChange = mainPageFeatureStoryPictureElements[m].style.backgroundImage;
29
?
30
                console.log("Original image address: " + linkToChange);
31
?
32
                var modifiedLink = linkToChange.replace(/(\w+)(-\d+x\d+)(\.\w+"\)$)/, "$1$3"); //we're looking for three groups of text, second one is resolution in format "NUMBERSxNUMBERS". Then we discard second group and use only group 1 and 3
33
?
34
                console.log("Modified image address: " + modifiedLink);
35
                console.log("Checking if image from modified link exists...");
36
?
37
                var http = new XMLHttpRequest();
38
                http.open('HEAD', modifiedLink, false);
39
                http.send();
40
?
41
                if(http.status == "200"){
42
                    console.log("...it does. Replacing original picture with better quality version.");
43
                    mainPageFeatureStoryPictureElements[m].style.backgroundImage = modifiedLink;
44
                } else {
45
                    console.log("...it doesn't, aborting.");
46
                }
47
            }
48
        }
49
    }
50
?
51
    console.log("Done replacing feature story images on main page.");
52
?
