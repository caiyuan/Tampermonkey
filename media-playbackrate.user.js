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

/*

核心示例

(function mediaSelector() {
    const mediaElements = new Set([
        ...document.querySelectorAll("video, audio")
    ]);
    return mediaElements.size ? [...mediaElements] : [];
})()[0].playbackRate = 2.5;

*/


(function() {
    'use strict';

    // 构建控制器面板

    const mediaControlPanel = document.createElement("div");
    mediaControlPanel.id = "mediaControlPanel";
    mediaControlPanel.style.cssText = `
      z-index: 10001 !important;
      position: fixed !important;
      visibility: visible !important;
      top: 20%;
      right: 15px;
      width: 45px;
      margin: 0;
      padding: 0;
      border-radius: 3px;
      background-color: rgba(150, 150, 150, 0.3);
      line-height: normal;
      text-align: center;
      font-size: 9px;
      font-family: Menlo, ui-monospace;
      font-weight: normal;
      cursor: pointer;
    `;

    const buttonStyle = `
      margin: 3px;
      padding: 3px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.3);
    `;

    const mediaControlButton = `
      <div id="volume-gain" data-gain="3" style="${buttonStyle}">♪</div>
      <div>
        <div id="volume-increase" data-volume="1" style="${buttonStyle} float: left; width: 18px; border-radius: 3px 0 0 3px; margin: 0 0 0 3px; padding: 3px 0;">+</div>
        <div id="volume-decrease" data-volume="0" style="${buttonStyle} float: right; width: 18px; border-radius: 0 3px 3px 0; margin: 0 3px 0 0; padding: 3px 0;">-</div>
      </div>
      <div style="clear: both;"></div>

      <div id="rate-switch" data-rate="1" style="${buttonStyle}">➟</div>

      <div class="rate-fast" data-rate="3" style="${buttonStyle}">3x</div>
      <div class="rate-fast" data-rate="5" style="${buttonStyle}">5x</div>
      <div class="rate-fast" data-rate="7" style="${buttonStyle}">7x</div>

      <div class="rate-slow" data-rate="1.5" style="${buttonStyle}">1.5x</div>
      <div class="rate-slow" data-rate="2.0" style="${buttonStyle}">2.0x</div>
      <div class="rate-slow" data-rate="2.5" style="${buttonStyle}">2.5x</div>
    `;

    mediaControlPanel.innerHTML = mediaControlButton;
    document.body.appendChild(mediaControlPanel);

    // 播放器倍速轮换

    const rateDisplayMaps = {
        ".rate-fast": "block",
        ".rate-slow": "none"
    };

    const rateSwitch = mediaControlPanel.querySelector("#rate-switch");
    rateSwitch.addEventListener("dblclick", function(event) {
        Object.entries(rateDisplayMaps).forEach(([selector, display]) => {
            rateDisplayMaps[selector] = display === "block" ? "none" : "block";
        });
        Object.entries(rateDisplayMaps).forEach(([selector, display]) => {
            mediaControlPanel.querySelectorAll(selector).forEach(control => {
                control.style.display = display;
            });
        });
    });

    rateSwitch.dispatchEvent(new MouseEvent("dblclick"));

    // 控制器功能实现

    const mediaControls = mediaControlPanel.querySelectorAll("div");
    mediaControls.forEach(control => {
        control.addEventListener("click", function(event) {
            const { rate, volume, gain } = event.target.dataset;
            if (rate) {
                setPlaybackRate(parseFloat(rate));
            }
            if (volume) {
                setVolume(parseFloat(volume));
            }
            if (gain) {
                setGain(parseFloat(gain));
            }
        });
    });

    function mediaSelector() {
        const mediaElements = new Set([
            ...document.querySelectorAll("video, audio")
        ]);
        return mediaElements.size ? [...mediaElements] : [];
    }

    function setPlaybackRate(rate) {
        const mediaElements = mediaSelector();

        for (const media of mediaElements) {
            media.playbackRate = rate;
            media.play();

            optimizeMedia(media);
        }
    }

    function setVolume(signal) {
        const mediaElements = mediaSelector();

        for (const media of mediaElements) {
            let volume = media.volume;
            if (signal == 1) {
                volume += 0.1;
                volume = Math.min(1, volume);
            }
            if (signal == 0) {
                volume -= 0.1;
                volume = Math.max(0, volume);
            }
            media.volume = volume;
            media.play();

            optimizeMedia(media);
        }
    }

    function setGain(volumeLevel) {
        const mediaElements = mediaSelector();

        const audioController = AudioController.instance;
        const isBlob = media => media.src.startsWith('blob:');

        for (const media of mediaElements) {
            if (isBlob(media)) {
                audioController.connect(media).setVolumeLevel(volumeLevel);
            } else {
                audioController.loadVideo(media, volumeLevel);
            }
        }
    }

    function optimizeMedia(media) {
        media.setAttribute("preload", "auto");
    }

    // 控制器是否显示

    mediaControlPanel.style.display = "none";
    setInterval(function() {
        const mediaElements = mediaSelector();
        mediaControlPanel.style.display = mediaElements.length ? "block" : "none";
    }, 3000);

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

        setVolumeLevel(volumeLevel) {
            const validVolumeLevel = Math.max(0, Math.min(6, volumeLevel));
            AudioController.gainNode.gain.value = validVolumeLevel;
            return AudioController.instance;
        }

        async loadVideo(video, volumeLevel) {
            const src = video.currentSrc || video.src;
            const response = await fetch(src);
            if (!response.ok) {
                throw new Error(`Failed to load video: ${response.status} ${response.statusText}`);
            }
            const videoBlob = await response.blob();
            const videoURL = URL.createObjectURL(videoBlob);
            video.src = videoURL;
            AudioController.instance.connect(video).setVolumeLevel(volumeLevel);
        }
    }


    // 控制器浮窗微调

    GM_addStyle("#mediaControlPanel {opacity: 0.3;}");
    GM_addStyle("#mediaControlPanel:hover {opacity: 1;}");

    GM_addStyle("[class|='volume']:hover,[id|='volume']:hover {color: rgba(255,255,255,1) !important}");
    GM_addStyle("[class|='rate']:hover,[id|='rate']:hover {color: rgba(255,255,255,1) !important}");

})();
