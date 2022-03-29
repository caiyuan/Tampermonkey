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
    GM_addStyle(".readerChapterContent * {font-family: 'FZSHENGSKS_ZHUNJW--GB1-0','MicrosoftYaHei','PingFang SC'; !important;}");

    /* 背景 */
    GM_addStyle("html body.wr_whiteTheme {background-color: #35363a;}");
    GM_addStyle(".wr_whiteTheme .readerContent .app_content {background-color: #f7f1e4;}");
    GM_addStyle(".wr_whiteTheme .readerContent .readerTopBar {background-color: #f7f1e4;}");
    GM_addStyle(".wr_whiteTheme .readerContent .readerFooter button {background-color: #f7f1e4;}");

})();
