// ==UserScript==
// @name         cctv-video
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  CCTV 大屏播放
// @author       Ryan
// @match        https://tv.cctv.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var url = window.location.href;
    var segments = url.split('/');
    var playingVideoStyles = "";

    if (segments[3] == 'live') {
        playingVideoStyles += `
        .playingVideo {width: 1600px !important; height: 770px !important;}
        .playingVideo .video_left {width: 1330px !important; height: 740px !important;}
        .playingVideo .video_left #player {width: 100% !important; height: 100% !important;}
        .playingVideo .video_right {height: 740px !important;}
        .playingVideo .video_right #scrollbar {height: 100% !important;}
        .playingVideo .video_right #scrollbar .scrollbar {height: 100% !important;}
        .playingVideo .video_right #scrollbar .viewport {height: 100% !important;}
    `;
    } else if (segments[3].length == 4 && segments[4].length == 2 && segments[5].length == 2) {
        playingVideoStyles += `
        .playingVideo .video_left {width: 1330px !important;}
        .playingVideo .video_left #_video {width: 100% !important; height: 740px !important;}
        .playingVideo .video_right {width: 0 !important;}
    `;
    }

    GM_addStyle(playingVideoStyles);

})();
