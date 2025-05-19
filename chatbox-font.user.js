// ==UserScript==
// @name         chatbox-font
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  LLMs Chat Font
// @author       Ryan

// @match        https://www.doubao.com/*
// @match        https://yuanbao.tencent.com/*

// @match        https://chatgpt.com/*
// @match        https://gemini.google.com/*
// @match        https://grok.com/*

// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle("body * { font-family: 'LXGW WenKai GB' }");

})();
