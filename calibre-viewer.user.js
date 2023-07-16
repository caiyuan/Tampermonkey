// ==UserScript==
// @name         calibre-viewer
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  calibre fix
// @author       Ryan
// @match        http://mini.local:8080/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* 朗读时能手动翻页 */

    GM_addStyle("#book-read-aloud-overlay {margin-left: 30px; margin-right: 30px;}");
    GM_addStyle("#book-read-aloud-overlay {width: -webkit-fill-available !important;}");


    /* 仅展示中文语音项 */

    var x = setInterval(function(){
        var select = document.getElementById("auto-id-8");
        if (select == null) return;
        var options = select.options;
        for (var i = 0; i < options.length; i++) {
            var text = options[i].text;
            var value = options[i].value;
            if(text.indexOf("zh-CN") == -1) {
                options[i].style.display = "none";
            }
        }
        clearInterval(x);
    }, 3000);

})();
