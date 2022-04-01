// ==UserScript==
// @name         video-player
// @namespace    https://github.com/caiyuan
// @version      0.1
// @description  视频播放器, 测试页 https://hls-js.netlify.app/demo/basic-usage.html
// @author       Ryan
// @include      *
// @exclude      https://github.com/*
// @grant        none
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.0.11/hls.min.js
// ==/UserScript==

(function() {
    'use strict';

    var html = document.querySelector("html");
    var head = document.querySelector("head");

    var videoDivision = document.createElement("div");
    html.insertBefore(videoDivision,html.firstChild);
    videoDivision.setAttribute("id","videoDivision");
    videoDivision.style = `
        position: fixed;
        top: 50px;
        right: 50px;
        text-align: center;
        z-index: 9999;
        cursor: pointer;
      `;

    (function(){
        if(typeof(Hls) != "function") {
            console.error('@require hls.min.js');
            return;
        }

        var videoStreams = document.createElement("video");
        videoDivision.appendChild(videoStreams);
        videoStreams.setAttribute("id","videoStreams");
        videoStreams.setAttribute("controls","controls");
        videoStreams.setAttribute("width","250");
        videoStreams.innerText = "nonsupport video";

        var assetURL = 'https://test-streams.mux.dev/pts_shift/master.m3u8';
        var hls = new Hls();
        hls.loadSource(assetURL);
        hls.attachMedia(videoStreams);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            videoStreams.muted = true;
            videoStreams.play();
        });

    })();

    (function() {
        var videoControls = document.createElement("video");
        videoDivision.appendChild(videoControls);
        videoControls.setAttribute("id","videoControls");
        videoControls.setAttribute("controls","controls");
        videoControls.setAttribute("preload","auto");
        videoControls.setAttribute("crossorigin","anonymous");
        videoControls.setAttribute("width","250");
        videoControls.innerText = "nonsupport video";

        var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

        if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
            var mediaSource = new MediaSource;
            videoControls.src = URL.createObjectURL(mediaSource);
            mediaSource.addEventListener('sourceopen', sourceOpen);
        } else {
            console.error('Unsupported MIME type or codec: ', mimeCodec);
        }

        function sourceOpen (_) {
            var mediaSource = this;
            var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
            fetchAB(function (buf) {
                sourceBuffer.addEventListener('updateend', function (_) {
                    mediaSource.endOfStream();
                    videoControls.muted = true;
                    videoControls.play();
                });
                sourceBuffer.appendBuffer(buf);
            });
        };

        var assetURL = 'https://nickdesaulniers.github.io/netfix/demo/frag_bunny.mp4';
        function fetchAB (cb) {
            var xhr = new XMLHttpRequest;
            xhr.open('get', assetURL);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                cb(xhr.response);
            };
            xhr.send();
        };

    })();
})();
