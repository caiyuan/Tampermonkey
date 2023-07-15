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

    GM_addStyle("#book-read-aloud-overlay {margin-left: 20px; margin-right: 20px;}");
    GM_addStyle("#book-read-aloud-overlay {width: -webkit-fill-available !important;}");

})();
