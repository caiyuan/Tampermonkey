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
    GM_addStyle("div[id$='overlay'] {z-index: 901;}");

    GM_addStyle("#book-read-aloud-overlay {z-index: 899;}");
    GM_addStyle("#book-read-aloud-overlay>div {margin: 2rem !important;}");
    GM_addStyle("#book-read-aloud-overlay>div {opacity: 0.15 !important;}");
    GM_addStyle("#book-read-aloud-overlay>div:hover {opacity: 1 !important;}");

})();
