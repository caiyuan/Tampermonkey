// ==UserScript==
// @name         llms-chat
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  LLMs Chat
// @author       Ryan
// @match        https://www.doubao.com/chat/*
// @match        https://yuanbao.tencent.com/chat/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // doubao
    GM_addStyle(".message-content {font-family: 'LXGW WenKai GB';}");

    // yuanbao
    GM_addStyle("div[data-conv-speaker='ai'] * {font-family: 'LXGW WenKai GB';}");

})();
