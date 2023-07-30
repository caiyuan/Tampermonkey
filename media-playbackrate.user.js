// ==UserScript==
// @name         media-playbackrate
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  倍速播放器
// @author       Ryan
// @match        ://*/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 构建控制器面板

    const mediaControlPanel = document.createElement("div");
    mediaControlPanel.id = "mediaControlPanel";
    mediaControlPanel.style.cssText = `
      z-index: 1001 !important;
      position: fixed !important;
      visibility: visible !important;
      top: 30%;
      right: 30px;
      width: 65px;
      margin: 0;
      padding: 0;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
    `;

    const buttonStyle = `
      margin: 5px;
      padding: 3px;
      vertical-align: middle;
      font-size: 12px;
      font-family: monospace;
      font-weight: lighter;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.3);
      border: solid 1px rgba(255, 255, 255, 0.3);
    `;

    mediaControlPanel.innerHTML = `
      <div>
        <div id="volume-increase" volume="1" style="${buttonStyle} float: left; width: 25px; border-radius: 5px 0 0 5px; margin: 5px 0 0 5px; padding: 3px 0;">+</div>
        <div id="volume-decrease" volume="0" style="${buttonStyle} float: right; width: 25px; border-radius: 0 5px 5px 0; margin: 5px 5px 0 0; padding: 3px 0;">-</div>
      </div>
      <div style="clear: both;"></div>

      <div id="rate-switch" rate="1" style="${buttonStyle}">Speed</div>

      <div class="rate-fast" rate="3" style="${buttonStyle}">3x</div>
      <div class="rate-fast" rate="5" style="${buttonStyle}">5x</div>
      <div class="rate-fast" rate="7" style="${buttonStyle}">7x</div>

      <div class="rate-slow" rate="1.3" style="${buttonStyle}">1.3x</div>
      <div class="rate-slow" rate="1.5" style="${buttonStyle}">1.5x</div>
      <div class="rate-slow" rate="1.7" style="${buttonStyle}">1.7x</div>
    `;

    document.body.appendChild(mediaControlPanel);

    // 播放器倍速切换

    const displayMaps = [
        {".rate-fast": "block"},
        {".rate-slow": "none"}
    ];

    const rateSwitch = mediaControlPanel.querySelector("#rate-switch");
    rateSwitch.addEventListener("dblclick", function(event) {
        window.displayMaps = window.displayMaps || displayMaps;
        window.displayMaps.forEach(map => {
            Object.entries(map).forEach(([selector, display]) => {
                map[selector] = display === "block" ? "none" : "block";
            });
        });
        window.displayMaps.forEach(map => {
            Object.entries(map).forEach(([selector, display]) => {
                mediaControlPanel.querySelectorAll(selector).forEach(control => {
                    control.style.display = display;
                });
            });
        });
    });

    rateSwitch.dispatchEvent(new MouseEvent("dblclick"));

    // 控制器功能实现

    const mediaControl = mediaControlPanel.querySelectorAll("div");
    mediaControl.forEach(control => {
        control.addEventListener("click", function(event){
            const target = event.target;

            const rate = target.getAttribute("rate");
            if(rate !== null) playbackRate(parseFloat(rate));

            const volume = target.getAttribute("volume");
            if(volume !== null) volumeChange(parseFloat(volume));
        });
    });

    function mediaSelector(){
        const videoList = document.querySelectorAll("video");
        const audioList = document.querySelectorAll("audio");

        if(videoList.length != 0) {
            return videoList;
        }
        if(audioList.length != 0) {
            return audioList;
        }
        return [];
    }

    function playbackRate(rate) {
        const mediaList = mediaSelector();

        mediaList.forEach(media => {
            media.playbackRate = rate;
            media.play();

            optMedia(media);
        });
    }

    function volumeChange(signal) {
        const mediaList = mediaSelector();
        mediaList.forEach(media => {
            if (signal == 1) {
                const v = media.volume + 0.1;
                media.volume = (v > 1 ? 1 : v);
            }
            if (signal == 0) {
                const v = media.volume - 0.1;
                media.volume = (v < 0 ? 0 : v);
            }
            media.play();

            optMedia(media);
        });
    }

    function optMedia(media) {
        media.setAttribute("preload","auto");
    }

    // 控制器是否显示

    mediaControlPanel.style.display = "none";
    setInterval(function(){
        const mediaList = mediaSelector();
        if (mediaList.length == 0) {
            mediaControlPanel.style.display = "none";
        } else {
            mediaControlPanel.style.display = "block";
        }
    }, 3000);


    // 控制器浮窗微调

    GM_addStyle("#mediaControlPanel {opacity: 0.5;}");
    GM_addStyle("#mediaControlPanel:hover {opacity: 1;}");

    GM_addStyle("[class|='volume']:hover,[id|='volume']:hover {color: rgba(255,255,255,1) !important}");
    GM_addStyle("[class|='volume']:hover,[id|='volume']:hover {border: solid 1px rgba(255,255,255,1) !important}");

    GM_addStyle("[class|='rate']:hover,[id|='rate']:hover {color: rgba(255,255,255,1) !important}");
    GM_addStyle("[class|='rate']:hover,[id|='rate']:hover {border: solid 1px rgba(255,255,255,1) !important}");


    // 音视频音量增益

    class AudioController {
        static audioContext = new (window.AudioContext || window.webkitAudioContext)();
        static gainNode = AudioController.audioContext.createGain();
        static instance = new AudioController();
        mediaElements = new Set();

        connect(mediaElement) {
            if (this.mediaElements.has(mediaElement)) {
                return AudioController.instance;
            }

            this.mediaElements.add(mediaElement);
            const sourceNode = AudioController.audioContext.createMediaElementSource(mediaElement);
            sourceNode.connect(AudioController.gainNode).connect(AudioController.audioContext.destination);
            return AudioController.instance;
        }

        setVolume(volumeLevel) {
            const validVolumeLevel = Math.max(0, Math.min(3, volumeLevel));
            AudioController.gainNode.gain.value = validVolumeLevel;
            return AudioController.instance;
        }
    }

    const videoElement = document.querySelector('video');
    AudioController.instance.connect(videoElement);
    AudioController.instance.setVolume(2);

})();
