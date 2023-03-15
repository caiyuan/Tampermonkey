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
    GM_addStyle(".readerContent .readerTopBar {max-width: 1200px;}");
    GM_addStyle(".readerContent .app_content {max-width: 1200px;}");

    /* 控制 */
    GM_addStyle(".readerContent .readerControls {left: 55%;}");
    GM_addStyle(".readerContent .readerCatalog {left: 55%;}");
    GM_addStyle(".readerContent .readerNotePanel {left: 55%;}");

    /* 字体 */
    GM_addStyle(".readerContent * {font-family: 'Noto Sans SC';}");
})();
