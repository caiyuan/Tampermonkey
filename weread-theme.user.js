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
        const greenStyles = `
            html body.wr_whiteTheme .app_fullHeight {background-color: #94b399;}
            html body.wr_whiteTheme .app_fullHeight .navBar {background-color: #94b399;}
            html body.wr_whiteTheme .app_fullHeight .navBar .navBar_border {border-bottom: solid 1px rgba(238,240,244,.1);}
        `;

        GM_addStyle(greenStyles);
    }

    // 阅读
    if(segments[4] == 'reader') {

        // 通用配置
        const commonStyles = `
            /* 页面宽度 */
            #routerView .app_content {max-width: 1200px;}
            #routerView .app_content .readerTopBar {max-width: 1200px; height: 45px;}
            /* 选项位置 */
            #routerView .readerControls {margin-left: 648px;}
            #routerView .readerCatalog {margin-left: 80px;}
            #routerView .readerNotePanel {margin-left: 80px;}

            /* 标题文字 */
            #routerView .app_content .readerTopBar {font-family: '汉仪旗黑 45S';}
            #routerView .app_content .readerTopBar .readerTopBar_title_chapter {font-style: italic; font-weight: 400;}
            /* 内容文字 */
            #routerView .app_content .readerChapterContent {color: #b2b2b2;}
            #routerView .app_content .readerChapterContent [class] {font-family: '汉仪书仿 55W';}
            #routerView .app_content .readerChapterContent [class*='Title'] {font-family: '汉仪尚巍手书';}
            #routerView .app_content .readerChapterContent [class*='content'] {font-family: '汉仪书仿 55W';}
            #routerView .app_content .readerChapterContent [class*='quotation'] {font-family: '汉仪有楷 45W';}
            /* 翻页文字 */
            #routerView .app_content .readerHeaderButton {font-family: '汉仪尚巍手书';}
            #routerView .app_content .readerFooter_button {font-family: '汉仪尚巍手书';}
        `;

        // 护眼绿色
        const greenStyles = `
            html body.wr_whiteTheme, html:has(body.wr_whiteTheme) {background-color: #94b399 !important;}
            html body.wr_whiteTheme #routerView .app_content {background-color: #a6c9ab;}
            html body.wr_whiteTheme #routerView .app_content .readerTopBar {background-color: #ffffff;}
            html body.wr_whiteTheme #routerView .app_content .readerChapterContent {color: #333333;}
            html body.wr_whiteTheme #routerView .app_content .readerHeaderButton {color: #14801d;}
            html body.wr_whiteTheme #routerView .app_content .readerFooter_button {color: #14801d;}
        `;

        GM_addStyle(commonStyles);
        GM_addStyle(greenStyles);
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
