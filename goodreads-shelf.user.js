// ==UserScript==
// @name         goodreads-shelf
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  Goodreads 书架定制
// @author       Ryan
// @match        https://www.goodreads.com/shelf/show/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(".elementList").forEach(function(el) {
        try {

            // 书籍粗筛
            var info = el.querySelector(".smallText").textContent.trim().replace(/(\n)|(,)|(   )/g, "").replace(/  /g, " ").split(" ");
            var avgRating = info[2];
            var ratings = info[4];
            var published = info[8];
            if (avgRating < 3.7 || ratings < 3000 || published < 2010) {
                el.setAttribute("style", "display:none");
            }


            // 豆瓣搜索
            var search = "https://search.douban.com/book/subject_search?search_text=";
            var cover = el.querySelector(".leftAlignedImage");
            var title = cover.getAttribute("title");
            cover.setAttribute("target", "_blank");
            cover.setAttribute("href", search + title);

        } catch (error) {}
    });

})();
