// ==UserScript==
// @name         weread-winktemplate
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信阅读 AI 问书
// @author       Ryan
// @match        https://weread.qq.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==


(function() {
    'use strict';

    GM_addStyle(".readerTopBar {font-family: 'LXGW WenKai GB Screen'; height: 35px; filter: invert(10%);}");
    GM_addStyle("#multi-turn-stream-container * {font-family: 'LXGW WenKai GB Screen';}");

    GM_addStyle("@media (max-width: 1023px) {.readerContent .app_content, .app_content>div {max-width: 670px;}}");
    GM_addStyle("@media (max-width: 1023px) {.readerControls {left: 55%;}}");

})();
