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
            if (avgRating < 3.7 || ratings < 3000 || published < 2015) {
                el.setAttribute("style", "display:none");
            }


            // 图书检索
            var douban = "https://search.douban.com/book/subject_search?search_text={q}";
            var books = "https://search.books.com.tw/search/query/key/{q}/cat/BKA";
            var kobo = "https://www.kobo.com/tw/zh/search?query={q}";

            var cover = el.querySelector(".leftAlignedImage");
            var title = cover.getAttribute("title");
            cover.setAttribute("href", "javascript:;");
            cover.setAttribute("data-douban", douban.replace("{q}", title));
            cover.setAttribute("data-books", books.replace("{q}", title));
            cover.setAttribute("data-kobo", kobo.replace("{q}", title));

            cover.addEventListener("click", function(event) {
                const { douban, books, kobo } = this.dataset;

                window.open(douban, '_blank');
                window.open(books, '_blank');
                window.open(kobo, '_blank');
            });

        } catch (error) {}
    });

})();
