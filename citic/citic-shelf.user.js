// ==UserScript==
// @name         citic-shelf
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  使书架更简洁紧凑
// @author       Ryan
// @match        *.yunpub.cn/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".list-item-wrap .cover {width: auto !important; height: 18vw !important;}");
    GM_addStyle(".list-item-wrap .content {width: 75vw !important;}");

    GM_addStyle(".feedGeneral:not(:has(.vipTag)) {display: none;}");
    GM_addStyle(".adbannerbBack { display: none;}");

})();
