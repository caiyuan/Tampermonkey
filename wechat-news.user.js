// ==UserScript==
// @name         wechat-news
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  fonts
// @author       Ryan
// @match        https://mp.weixin.qq.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("* {font-family: 'LXGW WenKai GB';}");

    GM_addStyle("div#page-content {background-color: #262628; padding: unset;}");
    GM_addStyle("div#page-content>div {background-color: var(--weui-BG-2); padding: 20px 60px 0 60px; max-width: 720px;}");
    GM_addStyle("div#unlogin_bottom_bar {display: none !important;}");
    GM_addStyle("body#activity-detail {padding-bottom: 0 !important;}");

})();
