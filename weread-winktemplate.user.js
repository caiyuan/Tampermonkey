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

    GM_addStyle(".readerAIChatPanel {width: 860px !important; margin-left: -360px !important;}");

    GM_addStyle("#multi-turn-stream-container * {font-family: 'LXGW WenKai GB'; -webkit-font-smoothing: subpixel-antialiased;}");
    GM_addStyle("#multi-turn-stream-container * {font-size: 1rem !important;}");

})();
