// ==UserScript==
// @name         page-zoom
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  网页缩放
// @author       Ryan
// @match        https://mp.weixin.qq.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("body {zoom: 1.2;}");

})();
