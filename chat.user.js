// ==UserScript==
// @name         chat
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  fonts
// @author       Ryan
// @match        https://yuanbao.tencent.com/*
// @match        https://www.doubao.com/chat/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("* {font-family: 'LXGW WenKai GB Screen' !important;}");

})();
