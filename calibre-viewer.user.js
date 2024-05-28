// ==UserScript==
// @name         calibre-viewer
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  Calibre 阅读页优化
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

    GM_addStyle("#book-read-aloud-overlay {margin-left: 12%; margin-right: 12%; width: 88% !important;}");


    /* 忽略朗读中断提示 */

    GM_addStyle("#modal-container {position: unset !important; display: none !important;}");


    /* 仅展示中文语音项 */

    const lang = "zh-CN";

    function filterOptions() {
        const select = document.querySelector('select[id^="auto-id-"]');
        if (!select) return;

        const options = select.options;
        for (let i = 0, len = options.length; i < len; i++) {
            const isLangMatched = options[i].text.includes(lang);
            options[i].style.display = isLangMatched ? "block" : "none";
        }
    }

    setInterval(filterOptions, 3000);

})();
