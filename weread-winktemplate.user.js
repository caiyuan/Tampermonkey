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

    GM_addStyle("#multi-turn-stream-container * {font-family: 'LXGW WenKai Screen'; -webkit-font-smoothing: subpixel-antialiased;}");

    GM_addStyle("@media (max-width: 767px) {.readerAIChatPanel {width: 100%; margin-left: -50%; z-index: 999;}}");

})();
