// ==UserScript==
// @name         calibre-viewer
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  calibre 阅读页面优化
// @author       Ryan
// @include      *://*:8080/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';


    /* 内容置于屏幕中央 */

    GM_addStyle("#book-left-margin {padding-left: 12%; margin-right: 3%; filter: invert(5%);}");
    GM_addStyle("#book-right-margin {padding-right: 12%; margin-left: 3%; filter: invert(5%);}");


    /* 朗读时能手动翻页 */

    GM_addStyle("#book-read-aloud-overlay {margin-left: 12%; margin-right: 12%; width: 76% !important;}");
    GM_addStyle("#book-read-aloud-overlay > div {position: fixed; right: 0;}");


    /* 仅展示指定语音项 */

    const languages = ["zh-", "en-US"];
    setInterval(() => {
        const select = document.querySelector('select[id^="auto-id-"]');
        if (!select) return;

        Array.from(select.options).forEach(option => {
            option.style.display = "none";

            languages.forEach(lang => {
                if(option.text.includes(lang)) {
                    option.style.display = "block";
                }
            });
        });
    }, 1000);

})();
