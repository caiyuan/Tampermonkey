// ==UserScript==
// @name         weread-typesetting
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书排版优化
// @author       Ryan
// @match        https://weread.qq.com/web/shelf*
// @match        https://weread.qq.com/web/reader/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 页宽 */
    GM_addStyle(".readerContent .readerTopBar {max-width: 1400px; height: 45px;}");
    GM_addStyle(".readerContent .app_content {max-width: 1400px;}");

    /* 控制 */
    GM_addStyle(".readerContent .readerControls {left: 60%;}");
    GM_addStyle(".readerContent .readerCatalog {left: 60%;}");
    GM_addStyle(".readerContent .readerNotePanel {left: 60%;}");

    /* 字体 */
    GM_addStyle(".readerContent * {font-family: 'HarmonyOS Sans SC'; font-weight: unset;}");
    GM_addStyle(".readerContent .readerTopBar * {font-family: sans-serif; font-weight: 500;}");
    GM_addStyle(".readerContent .readerTopBar .readerTopBar_title_chapter {font-style: italic; font-weight: 400;}");


    /***** 浅色主题 *****/

    /* 阅读 */
    GM_addStyle("html body.wr_whiteTheme {background-color: #94b399;}");
    GM_addStyle("html body.wr_whiteTheme .readerTopBar {background-color: #ffffff;}");
    GM_addStyle("html body.wr_whiteTheme .readerContent .app_content {background-color: #a6c9ab;}");
    GM_addStyle("html body.wr_whiteTheme .readerHeaderButton {color: #14801d;}");
    GM_addStyle("html body.wr_whiteTheme .readerFooter_button {color: #14801d;}");
    GM_addStyle("html body.wr_whiteTheme .readerChapterContent {color: #222222;}");
    /* 书架 */
    GM_addStyle("html body.wr_whiteTheme .app_fullHeight {background-color: #94b399;}");
    GM_addStyle("html body.wr_whiteTheme .navBar {background-color: #94b399;}");
    GM_addStyle("html body.wr_whiteTheme .navBar_border {border: none;}");

})();
