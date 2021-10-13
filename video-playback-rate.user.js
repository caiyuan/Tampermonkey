// ==UserScript==
// @name         video-playback-rate
// @namespace    https://github.com/caiyuan
// @version      0.1
// @description  倍速播放器
// @author       Ryan
// @include      *
// @exclude      https://github.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let videoPlaybackRate = document.createElement("div");
    videoPlaybackRate.setAttribute("id","videoPlaybackRate");
    document.body.append(videoPlaybackRate);

    videoPlaybackRate.style = `
        position: fixed;
        top: 30%;
        right: 30px;
        width: 60px;
        text-align: center;
        z-index: 9999;
        cursor: pointer;
        background-color: rgba(110,114,133,0.5);
        border-radius: 5px;
        `;

    let rateButtionStyle = `
        margin: 5px;
        padding: 7px 5px 5px 5px;
        background-color: rgba(110,114,133,0);
        border-radius: 5px;
        border: solid 1px rgba(255,255,255,0.6);
        color: rgba(255,255,255,0.6);
        `;

    videoPlaybackRate.innerHTML = `
        <div rate="1" style="${rateButtionStyle}">原始</div>
        <div rate="3" style="${rateButtionStyle}">3x</div>
        <div rate="5" style="${rateButtionStyle}">5x</div>
        <div rate="10" style="${rateButtionStyle}">10x</div>
        <div rate="16" style="${rateButtionStyle}">16x</div>
        `;

    let rateButtionCollection = videoPlaybackRate.getElementsByTagName("div");
    for(let i=0; i<rateButtionCollection.length; i++) {
        let rateButtion = rateButtionCollection[i];
        rateButtion.addEventListener("click", function(o){
            let rate = o.target.getAttribute("rate");
            playbackRate(rate);
        });
    }

    function playbackRate(rate) {
        var videoCollection = document.getElementsByTagName("video");
        for(let i=0; i<videoCollection.length; i++) {
            let video = videoCollection[i];
            video.playbackRate = rate;
            video.play();
        }
    }

})();
