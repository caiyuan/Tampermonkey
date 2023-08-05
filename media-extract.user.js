// ==UserScript==
// @name         media-extract
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  视频下载器
// @author       Ryan
// @match        *.hundun.cn/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const uint8ArrayMaps = [];


    // 为系统函数附加功能：媒体播放时保存音视频数据的副本。

    const _addSourceBuffer = window.MediaSource.prototype.addSourceBuffer;
    window.MediaSource.prototype.addSourceBuffer = function(mime) {
        const _mediaSource = this;
        const _sourceBuffer = _addSourceBuffer.call(this, mime);
        const _appendBuffer = _sourceBuffer.appendBuffer;

        const uint8Arrays = [];
        uint8ArrayMaps.push({ mime, uint8Arrays });

        _sourceBuffer.appendBuffer = function(buffer) {
            _appendBuffer.call(this, buffer);
            uint8Arrays.push(buffer);
        };

        return _sourceBuffer;
    };


    // 为系统函数附加功能：当数据流的结束时保存音视频数据。

    const _endOfStream = window.MediaSource.prototype.endOfStream;
    window.MediaSource.prototype.endOfStream = function() {
        _endOfStream.call(this);

        uint8ArrayMaps.forEach(({ mime, uint8Arrays }) => {
            const type = mime.startsWith("video") ? "mp4" : mime.startsWith("audio") ? "m4a" : "";
            const fileBlob = new Blob(uint8Arrays, { type: mime });
            const fileLink = document.createElement("a");

            fileLink.download = `${document.title}.${type}`;
            fileLink.href = URL.createObjectURL(fileBlob);
            fileLink.target = "_blank";
            fileLink.style.display = "none";

            document.body.appendChild(fileLink);

            fileLink.click();
        });

        uint8ArrayMaps.length = 0;
    };

})();
