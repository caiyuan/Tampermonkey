// ==UserScript==
// @name         weread-eyetheme
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书 护眼主题
// @author       Ryan
// @match        https://weread.qq.com/web/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    var url = window.location.href;
    var segments = url.split('/');
    var playingVideoStyles = "";

    // 书架
    if (segments[4] == 'shelf'){

        /* 颜色 */
        GM_addStyle("html body.wr_whiteTheme .app_fullHeight {background-color: #94b399;}");
        GM_addStyle("html body.wr_whiteTheme .app_fullHeight .navBar {background-color: #94b399;}");
        GM_addStyle("html body.wr_whiteTheme .app_fullHeight .navBar .navBar_border {border-bottom: solid 1px rgba(238,240,244,.1);}");
    }

    // 阅读
    if(segments[4] == 'reader') {

        /* 页宽 */
        GM_addStyle(".routerView .readerTopBar {max-width: 1200px; height: 48px;}");
        GM_addStyle(".routerView .app_content {max-width: 1200px;}");

        /* 控制 */
        GM_addStyle(".routerView .readerControls {margin-left: 648px;}");
        GM_addStyle(".routerView .readerCatalog {margin-left: 80px;}");
        GM_addStyle(".routerView .readerNotePanel {margin-left: 80px;}");

        /* 字体 */
        GM_addStyle(".routerView * {font-family: 'HarmonyOS Sans SC';}");
        GM_addStyle(".routerView .readerTopBar * {font-family: sans-serif; font-weight: 500;}");
        GM_addStyle(".routerView .readerTopBar .readerTopBar_title_chapter {font-style: italic; font-weight: 400;}");

        /* 颜色 */
        GM_addStyle("html body.wr_whiteTheme {background-color: #94b399;}");
        GM_addStyle("html body.wr_whiteTheme .routerView .app_content {background-color: #a6c9ab;}");
        GM_addStyle("html body.wr_whiteTheme .routerView .app_content .readerTopBar {background-color: #ffffff;}");
        GM_addStyle("html body.wr_whiteTheme .routerView .app_content .readerChapterContent {color: #222222;}");
        GM_addStyle("html body.wr_whiteTheme .routerView .app_content .readerHeaderButton {color: #14801d;}");
        GM_addStyle("html body.wr_whiteTheme .routerView .app_content .readerFooter_button {color: #14801d;}");
    }

    // 书评
    if(segments[4] == 'bookDetail' || segments[4] == 'bookReview' || segments[4] == 'review') {
        GM_addStyle(".routerView .app_content {max-width: 1200px !important;}");
    }

})();
