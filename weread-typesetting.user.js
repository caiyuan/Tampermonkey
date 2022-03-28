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

    GM_addStyle(".readerChapterContent * {font-family: 'FZSHENGSKS_ZHUNJW--GB1-0','MicrosoftYaHei','PingFang SC'; !important;}");

})();
