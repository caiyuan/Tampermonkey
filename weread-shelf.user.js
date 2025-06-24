// ==UserScript==
// @name         weread-shelf
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信阅读 书架 深色模式
// @author       Ryan
// @match        https://weread.qq.com/web/shelf/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==


(function() {
    'use strict';

    GM_addStyle("html {filter: invert(1) hue-rotate(180deg);}");

    GM_addStyle("video, img {filter: invert(1) hue-rotate(180deg);}");

})();
