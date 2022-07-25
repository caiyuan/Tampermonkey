// ==UserScript==
// @name         media-playbackrate
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  倍速播放器
// @author       Ryan
// @include      *
// @exclude      *.qq.com/*
// @exclude      *.hundun.cn/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 构建控制器面板

    let mediaPlaybackRate = document.createElement("div");
    mediaPlaybackRate.setAttribute("id","mediaPlaybackRate");
    document.body.append(mediaPlaybackRate);

    mediaPlaybackRate.style = `
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
        border-radius: 3px;
        background-color: rgba(0,0,0,0.3);
        `;

    let rateButtionStyle = `
        margin: 3px;
        padding: 1px 3px;
        vertical-align: middle;
        font-size: 12px;
        font-family: serif;
        font-weight: lighter;
        border-radius: 3px;
        background-color: rgba(0,0,0,0);
        color: rgba(255,255,255,0.3);
        border: solid 1px rgba(255,255,255,0.3);
        `;

    let rateButtionHighlight = `
        ${rateButtionStyle};
        color: rgba(255,255,255,0.9);
        border: solid 1px rgba(255,255,255,0.9);
        `;

    mediaPlaybackRate.innerHTML = `
        <div volume="0" style="${rateButtionStyle}">Sound</div>
        <div id="rate-display" rate="1" style="${rateButtionStyle}">Speed</div>

        <div class="rate-fast" rate="3" style="${rateButtionStyle}">3x</div>
        <div class="rate-fast" rate="5" style="${rateButtionStyle}">5x</div>
        <div class="rate-fast" rate="7" style="${rateButtionStyle}">7x</div>

        <div class="rate-slow" rate="1.3" style="${rateButtionStyle}">1.3x</div>
        <div class="rate-slow" rate="1.5" style="${rateButtionStyle}">1.5x</div>
        <div class="rate-slow" rate="1.7" style="${rateButtionStyle}">1.7x</div>
        `;

    // 控制器切换功能

    let rateDisplay = mediaPlaybackRate.querySelector("#rate-display");
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
            mediaPlaybackRate.querySelectorAll(i.class).forEach(rateButtion => {
                rateButtion.style.display = i.display;
            });
        });
    });
    rateDisplay.dispatchEvent(new MouseEvent("dblclick"));

    // 控制器功能实现

    let rateButtionList = mediaPlaybackRate.querySelectorAll("div");
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

    function mediaSelector(){
        var videoList = document.querySelectorAll("video");
        var audioList = document.querySelectorAll("audio");

        if(videoList.length != 0) {
            return videoList;
        }
        if(audioList.length != 0) {
            return audioList;
        }
        return [];
    }

    function playbackRate(rate) {
        var mediaList = mediaSelector();

        mediaList.forEach(media => {
            media.playbackRate = rate;
            media.play();

            optMedia(media);
        });
    }

    function volumeChange(volume) {
        var mediaList = mediaSelector();
        mediaList.forEach(media => {
            if (volume != 0) {
                media.volume = volume;
            }
            else if (media.volume > 1 || media.volume <= 0) {
                media.volume = 1;
            } else {
                let v = media.volume - 0.15;
                media.volume = v < 0 ? 0 : v;
            }
            media.play();

            optMedia(media);
        });
    }

    function optMedia(media) {
        media.setAttribute("preload","auto");
    }

    // 控制器是否显示

    mediaPlaybackRate.style.display = "none";
    setInterval(function(){
        var mediaList = mediaSelector();
        if (mediaList.length == 0) {
            mediaPlaybackRate.style.display = "none";
        } else {
            mediaPlaybackRate.style.display = "block";
        }
    }, 3000);

})();
