// ==UserScript==
// @name         font-smoothing
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  平滑字体
// @author       Ryan
// @match        ://*/*
// @exclude      https://weread.qq.com/*
// @exclude      *://*:8080/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("* {-webkit-font-smoothing: subpixel-antialiased;}");

})();
