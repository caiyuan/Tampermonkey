// ==UserScript==
// @name         video-source-extract
// @namespace    https://github.com/caiyuan
// @version      0.1
// @description  视频下载器
// @author       Ryan
// @include      *
// @exclude      https://github.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let uint8ArrayMaps = [];

    /***
      为系统函数附加功能：媒体播放时保存音视频数据的副本。
    **/
    let _addSourceBuffer = window.MediaSource.prototype.addSourceBuffer;
    window.MediaSource.prototype.addSourceBuffer = function(mime) {
        let _mediaSource = this;
        let _sourceBuffer = _addSourceBuffer.call(this, mime);
        let _appendBuffer = _sourceBuffer.appendBuffer;

        let uint8Arrays = [];
        uint8ArrayMaps.push({mime, uint8Arrays});

        _sourceBuffer.appendBuffer = function(buffer) {
            _appendBuffer.call(this, buffer);

            uint8Arrays.push(buffer);
        }

        return _sourceBuffer;
    }

    /***
      为系统函数附加功能：当数据流的结束时保存音视频数据。
    **/
    let _endOfStream = window.MediaSource.prototype.endOfStream
    window.MediaSource.prototype.endOfStream = function() {
        _endOfStream.call(this);

        uint8ArrayMaps.forEach(e => {
            let mime = e.mime;
            let uint8Arrays = e.uint8Arrays;

            let type = mime.startsWith("video") ? "mp4" : (mime.startsWith("audio") ? "m4a" : "");
            let fileBlob = new Blob(uint8Arrays, {type: mime});
            let fileLink = document.createElement("a");

            fileLink.download = `${document.title}.${type}`;
            fileLink.href = URL.createObjectURL(fileBlob);
            fileLink.style.display = "none";

            document.body.appendChild(fileLink);

            fileLink.click();
            fileLink.remove();
        });
        uint8ArrayMaps.splice(0, uint8ArrayMaps.length);
    }

})();
