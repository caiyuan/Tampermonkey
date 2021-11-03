// ==UserScript==
// @name         video-playback-rate
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  倍速播放器
// @author       Ryan
// @include      *
// @exclude      *.qq.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 构建控制器面板

    let videoPlaybackRate = document.createElement("div");
    videoPlaybackRate.setAttribute("id","videoPlaybackRate");
    document.body.append(videoPlaybackRate);

    videoPlaybackRate.style = `
        z-index: 1001 !important;
        position: fixed !important;
        visibility: visible !important;
        top: 30%;
        right: 30px;
        width: 55px;
        margin: 0;
        padding: 0;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.3);
        `;

    let rateButtionStyle = `
        margin: 3px;
        padding: 3px;
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
        <div volume="0" style="${rateButtionStyle}">Sound</div>
        <div id="rate-display" rate="1" style="${rateButtionStyle}">Speed</div>

        <div class="rate-fast" rate="5" style="${rateButtionStyle}">5x</div>
        <div class="rate-fast" rate="10" style="${rateButtionStyle}">10x</div>
        <div class="rate-fast" rate="16" style="${rateButtionStyle}">16x</div>

        <div class="rate-slow" rate="1.3" style="${rateButtionStyle}">1.3x</div>
        <div class="rate-slow" rate="1.5" style="${rateButtionStyle}">1.5x</div>
        <div class="rate-slow" rate="1.7" style="${rateButtionStyle}">1.7x</div>
        `;

    // 控制器切换功能

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

    // 控制器功能实现

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

            optVideo(video);
        });
    }

    function volumeChange(volume) {
        var videoList = document.querySelectorAll("video");
        videoList.forEach(video => {
            if (volume != 0) {
                video.volume = volume;
            }
            else if (video.volume > 0.3 || video.volume <= 0) {
                video.volume = 0.3;
            } else {
                let v = video.volume - 0.05;
                video.volume = v < 0.05 ? 0 : v;
            }
            video.play();

            optVideo(video);
        });
    }

    function optVideo(video) {
        video.setAttribute("preload","auto");
    }

    // 控制器是否显示

    videoPlaybackRate.style.display = "none";
    setInterval(function(){
        if (document.querySelector("video") == null) {
            videoPlaybackRate.style.display = "none";
        } else {
            videoPlaybackRate.style.display = "block";
        }
    }, 3000);

})();
