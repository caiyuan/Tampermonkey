// ==UserScript==
// @name         cctv-live
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  CCTV 直播大屏
// @author       Ryan
// @match        https://tv.cctv.com/live/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".playingVideo {width: 1600px !important; height: 770px !important;}");

    GM_addStyle(".playingVideo .video_left {width: 1330px !important; height: 740px !important;}");
    GM_addStyle(".playingVideo .video_left #player {width: 100% !important; height: 100% !important;}");

    GM_addStyle(".playingVideo .video_right {height: 740px !important;}");
    GM_addStyle(".playingVideo .video_right #scrollbar {height: 100% !important;}");
    GM_addStyle(".playingVideo .video_right #scrollbar .scrollbar {height: 100% !important;}");
    GM_addStyle(".playingVideo .video_right #scrollbar .viewport {height: 100% !important;}");

})();
