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

    // 书架
    if (segments[4] == 'shelf'){

        // 护眼绿色
        const whiteStyles = `
            html body.wr_whiteTheme .app_fullHeight {background-color: #94b399;}
            html body.wr_whiteTheme .app_fullHeight .navBar {background-color: #94b399;}
            html body.wr_whiteTheme .app_fullHeight .navBar .navBar_border {border-bottom: solid 1px rgba(238,240,244,.1);}
        `;

        GM_addStyle(whiteStyles);
    }

    // 阅读
    if(segments[4] == 'reader') {

        // 通用配置
        const commonStyles = `
            /* 页面宽度 */
            #routerView .app_content {max-width: 1050px;}
            #routerView .app_content .readerTopBar {max-width: 1050px; height: 45px;}
            /* 选项位置 */
            #routerView .readerControls {margin-left: 550px;}
            #routerView .readerCatalog {margin-left: 5px;}
            #routerView .readerNotePanel {margin-left: 5px;}

            /* 标题文字 */
            #routerView .app_content .readerTopBar {font-family: 'HYHuaGuan_65W';}
            #routerView .app_content .readerTopBar .readerTopBar_title_chapter {font-style: italic; font-weight: 400;}
            /* 内容文字 */
            #routerView .app_content .readerChapterContent [class*='content'] {font-family: 'HYQiHei_55S';}
            #routerView .app_content .readerChapterContent [class*='Title'] {font-family: 'HYShangWeiShouShuW';}
            #routerView .app_content .readerChapterContent [class*='quotation'] {font-family: 'HYYouKai-45W';}
            /* 翻页文字 */
            #routerView .app_content .readerHeaderButton {font-family: 'HYShuFang-55W';}
            #routerView .app_content .readerFooter_button {font-family: 'HYShuFang-55W';}
        `;

        // 护眼绿色
        const whiteStyles = `
            html body.wr_whiteTheme, html:has(body.wr_whiteTheme) {background-color: #94b399 !important;}
            html body.wr_whiteTheme #routerView .app_content {background-color: #a6c9ab;}
            html body.wr_whiteTheme #routerView .app_content .readerTopBar {background-color: #ffffff;}
            html body.wr_whiteTheme #routerView .app_content .readerChapterContent {color: #333333;}
            html body.wr_whiteTheme #routerView .app_content .readerHeaderButton {color: #14801d;}
            html body.wr_whiteTheme #routerView .app_content .readerFooter_button {color: #14801d;}
        `;

        // 默认黑色
        const darkStyles = `
            #routerView .app_content .readerChapterContent {color: #d0d0d0;}
        `;

        GM_addStyle(commonStyles);
        GM_addStyle(whiteStyles);
        GM_addStyle(darkStyles);


        // 动态位置
        GM_addStyle("@media screen and (min-width: 1200px) { #routerView .readerControls {margin-left: 550px;} }");

        GM_addStyle("@media screen and (max-width: 1200px) { #routerView .readerControls {margin-left: 500px;} }");
        GM_addStyle("@media screen and (max-width: 1200px) { #routerView .readerControls {opacity: 0;} }");
        GM_addStyle("@media screen and (max-width: 1200px) { #routerView .readerControls:hover {opacity: 1; transition: opacity 0.3s ease;} }");
    }

    // 书评
    if(segments[4] == 'bookDetail' || segments[4] == 'bookReview' || segments[4] == 'review') {

        // 通用配置
        const commonStyles = `
            .app_content {max-width: 1200px !important;}
        `;

        GM_addStyle(commonStyles);
    }

})();
