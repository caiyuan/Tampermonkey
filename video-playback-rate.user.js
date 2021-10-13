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
        text-color: #333;
        z-index: 9999;
        cursor: pointer;
        background-color: rgba(110,114,133,0.3);
        border-radius: 5px;
        `;

    let rateButtionStyle = `
        margin: 5px;
        padding: 3px;
        background-color: rgba(110,114,133,0.5);
        border-radius: 5px;
        `;

    videoPlaybackRate.innerHTML = `
        <div rate="1" style="${rateButtionStyle}">原始</div>
        <div rate="5" style="${rateButtionStyle}">5x</div>
        <div rate="10" style="${rateButtionStyle}">10x</div>
        <div rate="15" style="${rateButtionStyle}">15x</div>
        <div rate="20" style="${rateButtionStyle}">20x</div>
        <div rate="25" style="${rateButtionStyle}">25x</div>
        <div rate="30" style="${rateButtionStyle}">30x</div>
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
