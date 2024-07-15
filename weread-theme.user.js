// ==UserScript==
// @name         weread-theme
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书主题
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

    // 阅读页面样式
    if(segments[4] == 'reader') {

        // 通用配置
        const commonStyles = `
            /* 页面宽度 */
            #routerView .app_content {max-width: 990px;}
            #routerView .app_content .readerTopBar {max-width: 990px; height: 45px; opacity: 0;}
            #routerView .app_content .readerTopBar:hover {opacity: 1; transition: opacity 0.3s ease;}

            /* 选项位置 */
            #routerView .readerCatalog {margin-left: -25px;}
            #routerView .readerNotePanel {margin-left: -25px;}
            #routerView .readerControls {margin-left: 525px;}

            /* 标题文字 */
            #routerView .app_content .readerTopBar {font-family: 'HYHuaGuan_65W';}
            #routerView .app_content .readerTopBar .readerTopBar_title_chapter {font-style: italic; font-weight: 400;}

            /* 内容文字 */
            #routerView .app_content .readerChapterContent [class*='content'] {font-family: 'HYQiHei_55S';}
            #routerView .app_content .readerChapterContent [class*='Title'] {font-family: 'HYShangWeiShouShuW';}
            #routerView .app_content .readerChapterContent [class*='quotation'] {font-family: 'HYYouKai-45W';}

            /* 翻页按钮 */
            #routerView .app_content .readerHeaderButton {font-family: 'HYShuFang-55W';}
            #routerView .app_content .readerFooter_button {font-family: 'HYShuFang-55W';}
        `;

        // 护眼绿色
        const whiteStyles = `
            html body.wr_whiteTheme, html:has(body.wr_whiteTheme) {background-color: #94b399;}
            html body.wr_whiteTheme #routerView .app_content {background-color: #a6c9ab;}
            html body.wr_whiteTheme #routerView .app_content .readerTopBar {background-color: #fff;}
            html body.wr_whiteTheme #routerView .app_content .readerChapterContent {color: #2c2c2c;}
            html body.wr_whiteTheme #routerView .app_content .readerHeaderButton {color: #14801d;}
            html body.wr_whiteTheme #routerView .app_content .readerFooter_button {color: #14801d;}
        `;

        // 默认黑色
        const darkStyles = `
            #routerView .app_content .readerChapterContent {color: #000;}
        `;

        GM_addStyle(commonStyles);
        GM_addStyle(whiteStyles);
        GM_addStyle(darkStyles);

        // 选项位置
        GM_addStyle("@media screen and (min-width: 1100px) { #routerView .readerControls {margin-left: 525px;} }");
        GM_addStyle("@media screen and (max-width: 1100px) { #routerView .readerControls {margin-left: 475px;} }");
        GM_addStyle("@media screen and (max-width: 1100px) { #routerView .readerControls {opacity: 0;} }");
        GM_addStyle("@media screen and (max-width: 1100px) { #routerView .readerControls:hover {opacity: 1; transition: opacity 0.3s ease;} }");
    }

    // 非阅读页样式
    else {

        const commonStyles = `
            html .wr_whiteTheme .app {background-color: #f2eee9;}
            html .wr_whiteTheme .navBar {background-color: #fefbf6;}
            html .wr_whiteTheme .navBar input {border: 1px solid #cfc9c0;}
            html .wr_whiteTheme [class^=navBar] {border-color: #d2cdc4;}
            html .wr_whiteTheme [class*=navBar]:after {border-color: #d2cdc4;}
            html, img, [class$=logo] {filter: invert(100%);}
            html .wr_whiteTheme [class$=audioTag] {z-index: 1;}
        `;

        GM_addStyle(commonStyles);
    }

})();
