// ==UserScript==
// @name         weread-typesetting
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书排版优化
// @author       Ryan
// @match        https://weread.qq.com/web/reader/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 页宽 */
    GM_addStyle(".readerContent .app_content {max-width: 70%;}");
    GM_addStyle(".readerContent .readerTopBar {width: 70%; max-width: none;}");
    GM_addStyle(".readerContent .readerControls {left: 60%;}");
    GM_addStyle(".readerContent .readerCatalog {left: 60%;}");
    GM_addStyle(".readerContent .readerNotePanel {left: 60%;}");

})();
