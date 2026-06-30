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

    GM_addStyle(".readerTopBar {font-family: 'LXGW WenKai GB Screen'; height: 35px; filter: invert(7%);}");
    GM_addStyle(".readerTopBar * {font-size: 0.75rem;}");


    GM_addStyle(".readerAIChatPanel {margin-left: -50%; width: stretch;}");
    GM_addStyle(".wr_mask_Show:has(+ .readerAIChatPanel) {z-index: 999; height: 56px; opacity: 0 !important;}");
    GM_addStyle("#multi-turn-stream-container * {font-family: 'LXGW WenKai GB Screen';}");


    GM_addStyle("html body.wr_whiteTheme {background-color: #e5e4db;}");
    GM_addStyle(".wr_whiteTheme .readerContent .app_content {background-color: #f7f4ec;}");
    GM_addStyle(".wr_whiteTheme button[class*='button'] {background-color: #f7f4ec;}");
    GM_addStyle(".wr_whiteTheme button[class*='button']:hover {background-color: #f7f4ec;}");

})();
