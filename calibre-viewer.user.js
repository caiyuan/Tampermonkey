// ==UserScript==
// @name         calibre-viewer
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  calibre fix
// @author       Ryan
// @match        http://mini.local:8080/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 朗读时能手动翻页 */
    GM_addStyle(".book-side-margin {z-index: 900;}");
    GM_addStyle("#book-overlay {z-index: 999;}");
    GM_addStyle(".speaking {z-index: 901;}");

})();
