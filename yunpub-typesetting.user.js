// ==UserScript==
// @name         yunpub-typesetting
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  中信书院排版优化
// @author       Ryan
// @include      https://v.yunpub.cn/*/ebook/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 字体 */
    GM_addStyle("body {font-family: 'FZSHENGSKS_ZHUNJW--GB1-0','MicrosoftYaHei','PingFang SC' !important;}");
    GM_addStyle("body p {font-size: 20px !important;}");

    /* 背景 */
    GM_addStyle("body, .content-wrap {background-color: #f7f1e4 !important;}");

})();
