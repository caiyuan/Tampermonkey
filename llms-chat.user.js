// ==UserScript==
// @name         llms-chat
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  LLMs Chat
// @author       Ryan
// @match        https://www.doubao.com/*
// @match        https://yuanbao.tencent.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // doubao-chat
    GM_addStyle("div.message-content {font-family: 'LXGW WenKai GB';}");
    // doubao-thread
    GM_addStyle("div[data-testid='receive_message'] {font-family: 'LXGW WenKai GB';}");


    // yuanbao
    GM_addStyle("div[data-conv-speaker='ai'] * {font-family: 'LXGW WenKai GB';}");

})();
