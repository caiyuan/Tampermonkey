// ==UserScript==
// @name         wechat-news
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  fonts
// @author       Ryan
// @match        https://mp.weixin.qq.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("* {font-family: 'LXGW WenKai';}");

})();
