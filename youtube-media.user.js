// ==UserScript==
// @name         youtube-media
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  在 Console 中列示可下载的媒体
// @author       Ryan
// @include      *youtube.com/watch?*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let formats = ytInitialPlayerResponse.streamingData.formats;
    let adaptiveFormats = ytInitialPlayerResponse.streamingData.adaptiveFormats;

    function Media(mimeType, qualityLabel, url) {
        this.type = mimeType;
        this.quality = qualityLabel;
        this.url = url;
    }

    let mediums = [];

    formats.forEach(source=>{
        let mimeType = source.mimeType;
        let qualityLabel = source.qualityLabel;
        let url = source.url;

        mediums.push(new Media(mimeType,qualityLabel,url));
    });

    /*
    adaptiveFormats.forEach(source=>{
        let mimeType = source.mimeType;
        let qualityLabel = source.qualityLabel;
        let url = source.url;

        if (mimeType.includes("mp4")) {
            mediums.push(new Media(mimeType,qualityLabel,url));
        }
    });
    */


    console.log("");
    console.log(ytInitialPlayerResponse.videoDetails.title);
    mediums.forEach(source=>{
        console.table({
            type: source.type,
            quality: source.quality
        });
        console.log(source.url);
    });
    console.log("");

})();
