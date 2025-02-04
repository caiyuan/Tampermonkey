// ==UserScript==
// @name         goodreads-most
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  Goodreads 阅读次数最多
// @author       Ryan
// @match        https://www.goodreads.com/genres/most_read/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(".bookBox").forEach(function(el) {
        try {

            var title = el.querySelector("img").getAttribute("alt");

            // 图书检索
            var douban = "https://search.douban.com/book/subject_search?search_text={q}";
            var books = "https://search.books.com.tw/search/query/key/{q}/cat/BKA";
            var kobo = "https://www.kobo.com/tw/zh/search?query={q}";

            var cover = el.querySelector("a");
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
