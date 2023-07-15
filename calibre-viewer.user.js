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

    GM_addStyle("#book-read-aloud-overlay {margin-left: 30px; margin-right: 30px;}");
    GM_addStyle("#book-read-aloud-overlay {width: -webkit-fill-available !important;}");

    GM_addStyle(".book-side-margin {width: 50px !important;}");

    GM_addStyle("#book-read-aloud-overlay>div {opacity: 0.15 !important;}");
    GM_addStyle("#book-read-aloud-overlay>div:hover {opacity: 1 !important;}");

})();
