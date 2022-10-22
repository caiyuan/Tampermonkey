// ==UserScript==
// @name         weread-typesetting
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书排版优化
// @author       Ryan
// @include      https://weread.qq.com/web/reader/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 字体 */
    GM_addStyle(".readerChapterContent * {font-family: 'MiSans' !important;}");

    /* 页宽 */
    GM_addStyle(".readerContent .app_content {max-width: 70%;}");
    GM_addStyle(".readerContent .readerTopBar {width: 70%; max-width: none;}");
    GM_addStyle(".readerContent .readerControls {left: 60%;}");
    GM_addStyle(".readerContent .readerCatalog {left: 60%;}");
    GM_addStyle(".readerContent .readerNotePanel {left: 60%;}");

    /* 浅色 */
    GM_addStyle("html body.wr_whiteTheme {background-color: #323232;}");
    GM_addStyle(".wr_whiteTheme .readerContent * {color: #000 !important;}");
    GM_addStyle(".wr_whiteTheme .readerContent .app_content {background-color: #7E8E9E;}");
    GM_addStyle(".wr_whiteTheme .readerContent .readerTopBar {background-color: #7E8E9E;}");
    GM_addStyle(".wr_whiteTheme .readerContent .readerFooter button {background-color: #708090;}");

})();
