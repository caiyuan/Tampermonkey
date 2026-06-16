// ==UserScript==
// @name         llm-chat
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  fonts
// @author       Ryan
// @match        https://www.doubao.com/*
// @match        https://gemini.google.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const fontFamily = 'LXGW WenKai GB Screen';
    const currentUrl = window.location.href;

    // Gemini
    if (currentUrl.startsWith('https://gemini.google.com/'))
    {
        GM_addStyle(`
            :not(:is(gem-icon, gem-icon *, mat-icon, mat-icon *))
            {font-family: '${fontFamily}' !important;}
        `);
    }
    // Other
    else
    {
        GM_addStyle(`* {font-family: '${fontFamily}' !important;}`);
    }

})();
