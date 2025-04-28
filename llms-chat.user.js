// ==UserScript==
// @name         llms-chat
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  LLMs Chat
// @author       Ryan
// @match        https://www.doubao.com/chat/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".message-content {font-family: 'LXGW WenKai GB';}");

})();
