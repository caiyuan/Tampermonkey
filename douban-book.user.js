// ==UserScript==
// @name         douban-book
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  豆瓣读书评分扩展
// @author       Ryan
// @include      https://book.douban.com/subject/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let flag = false;

    let info = document.querySelector("div#info");
    info.childNodes.forEach(node=>{

        if(node.nodeName == "SPAN" && node.innerText.includes("ISBN")) {
            flag = true;
        }
        if(flag && node.nodeName == "#text") {
            flag = false;

            let isbn = node.nodeValue.replaceAll(/ |:|\n|\t/ig, "");
            let href = "https://www.goodreads.com/search?q=" + isbn;

            let isbnSectl = document.createElement("div");
            isbnSectl.setAttribute("class", "rating_betterthan");
            isbnSectl.innerHTML = `<a href="` + href + `" target="_blank">查看 Goodreads 评分</a><br>`;
            document.querySelector("div#interest_sectl").appendChild(isbnSectl);
        }

    });

})();
