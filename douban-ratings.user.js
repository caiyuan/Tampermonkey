// ==UserScript==
// @name         douban-ratings
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  豆瓣电影评分扩展
// @author       Ryan
// @include      https://movie.douban.com/subject/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';


    let info = document.querySelector("div#info");
    info.childNodes.forEach(node=>{
        if (node.nodeType == 3) {
            let text = node.textContent;
            text = text.replaceAll(/ |:|\n|\t/ig, "");
            if (text.length > 0 && text.indexOf("tt") == 0) {
                let imdbNumber = text;
                let imdbText = node
                let href = "https://www.imdb.com/title/" + imdbNumber;

                // let imdbHref = document.createElement("a");
                // imdbHref.setAttribute("href", href);
                // imdbHref.setAttribute("target", "_blank");
                // imdbHref.innerText = " " + imdbNumber;
                // info.replaceChild(imdbHref, imdbText);

                let imdbSectl = document.createElement("div");
                imdbSectl.setAttribute("class", "rating_betterthan");
                imdbSectl.innerHTML = `<a href="` + href + `" target="_blank">查看 IMDb 评分</a><br>`;
                document.querySelector("div#interest_sectl").appendChild(imdbSectl);
            }
        }
    });

})();
