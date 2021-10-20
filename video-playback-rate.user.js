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
        margin: 0;
        padding: 0;
        text-align: center;
        z-index: 9999;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.3);
        `;

    let rateButtionStyle = `
        margin: 5px;
        padding: 5px;
        vertical-align: middle;
        font-size: 12px;
        border-radius: 5px;
        background-color: rgba(0,0,0,0);
        color: rgba(255,255,255,0.3);
        border: solid 1px rgba(255,255,255,0.3);
        `;

    let rateButtionHighlight = `
        ${rateButtionStyle};
        color: rgba(255,255,255,0.9);
        border: solid 1px rgba(255,255,255,0.9);
        `;

    videoPlaybackRate.innerHTML = `
        <div volume="0" style="${rateButtionStyle}">静音</div>
        <div id="rate-display" rate="1" style="${rateButtionStyle}">原始</div>

        <div class="rate-fast" rate="3" style="${rateButtionStyle}">3x</div>
        <div class="rate-fast" rate="5" style="${rateButtionStyle}">5x</div>
        <div class="rate-fast" rate="10" style="${rateButtionStyle}">10x</div>
        <div class="rate-fast" rate="16" style="${rateButtionStyle}">16x</div>

        <div class="rate-slow" rate="1.25" style="${rateButtionStyle}">1.25x</div>
        <div class="rate-slow" rate="1.5" style="${rateButtionStyle}">1.5x</div>
        <div class="rate-slow" rate="1.75" style="${rateButtionStyle}">1.75x</div>
        <div class="rate-slow" rate="2" style="${rateButtionStyle}">2x</div>
        `;


    let rateDisplay = videoPlaybackRate.querySelector("#rate-display");
    rateDisplay.addEventListener("dblclick", function(event){
        let displayMaps = [
            {class: ".rate-fast", display: "none"},
            {class: ".rate-slow", display: "block"}
        ];
        if (window.displayMaps != undefined) {
            displayMaps = window.displayMaps;
            displayMaps.forEach(i => {
                if (i.display != "block") {
                    i.display = "block";
                } else {
                    i.display = "none";
                }
            });
        }
        window.displayMaps = displayMaps;

        window.displayMaps.forEach(i => {
            videoPlaybackRate.querySelectorAll(i.class).forEach(rateButtion => {
                rateButtion.style.display = i.display;
            });
        });
    });
    rateDisplay.dispatchEvent(new MouseEvent("dblclick"));


    let rateButtionList = videoPlaybackRate.querySelectorAll("div");
    rateButtionList.forEach(rateButtion => {
        rateButtion.addEventListener("click", function(event){
            let target = event.target;

            let rate = target.getAttribute("rate");
            if(rate !== null) playbackRate(parseFloat(rate));

            let volume = target.getAttribute("volume");
            if(volume !== null) volumeChange(parseFloat(volume));
        });

        rateButtion.addEventListener("mousemove", function(event){
            let btn = event.target;
            btn.style = rateButtionHighlight;
        });
        rateButtion.addEventListener("mouseout", function(event){
            let btn = event.target;
            btn.style = rateButtionStyle;
        });
    });

    function playbackRate(rate) {
        var videoList = document.querySelectorAll("video");
        videoList.forEach(video => {
            video.playbackRate = rate;
            video.play();
        });
    }

    function volumeChange(volume) {
        var videoList = document.querySelectorAll("video");
        videoList.forEach(video => {
            video.volume = (video.volume == 0 ? 0.30 : volume);
            video.play();
        });
    }

})();
