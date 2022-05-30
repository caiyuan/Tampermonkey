// ==UserScript==
// @name              hundun-typesetting
// @namespace         https://github.com/caiyuan/Tampermonkey
// @version           0.1
// @description       混沌学园版面重排
// @author            Ryan
// @include           /^https://www.hundun.cn/course/\w+$/
// @grant             GM_addStyle
// @run-at            document-end
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".navigation-container {display: none;}");

})();
