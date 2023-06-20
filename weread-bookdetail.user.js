// ==UserScript==
// @name         weread-bookdetail
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  微信读书排版优化
// @author       Ryan
// @match        https://weread.qq.com/web/bookDetail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".readerBookInfo_head .bookInfo_cover {width: auto; height: 380px;}");
    GM_addStyle(".readerBookInfo_head .bookInfo_intro {height: 300px;}");
})();
