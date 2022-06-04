// ==UserScript==
// @name        yunpub-typesetting
// @namespace   https://github.com/caiyuan/Tampermonkey
// @version     0.1
// @description 中信书院排版优化
// @author      Ryan
// @include     https://v.yunpub.cn/*/ebook/*
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 字体 */
    GM_addStyle("body {font-family: 'FZSHENGSKS_ZHUNJW--GB1-0','MicrosoftYaHei','PingFang SC';}");
    GM_addStyle("body>p {font-size: 22px; color: #353535;}");

    /* 背景 */
    GM_addStyle("body {background-color: #f7f1e4 !important;}");
    GM_addStyle("#wrapper {background-color: #35363a !important;}");
    GM_addStyle(".content-wrap {background-color: #f7f1e4 !important;}");
    GM_addStyle(".content-wrap {width: 1000px !important; margin: auto; padding: 0 30px;}");

})();
