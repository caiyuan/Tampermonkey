// ==UserScript==
// @name         font-smoothing
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  平滑字体
// @author       Ryan
// @match        ://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("* {-webkit-font-smoothing: antialiased;}");
    GM_addStyle("* {-moz-osx-font-smoothing: grayscale;}");

})();
