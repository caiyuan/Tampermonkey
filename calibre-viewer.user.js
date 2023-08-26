// ==UserScript==
// @name         calibre-viewer
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  Calibre 阅读页优化
// @author       Ryan
// @match        http://127.0.0.1:8080/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 朗读时能手动翻页 */

    GM_addStyle("#book-read-aloud-overlay {margin-left: 20px; margin-right: 20px;}");
    GM_addStyle("#book-read-aloud-overlay {width: -webkit-fill-available !important;}");


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
