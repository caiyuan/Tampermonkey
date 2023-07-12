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

    document.querySelectorAll(".elementList").forEach(function(e){
        try {

            // 书籍粗筛

            var ss = e.querySelector(".smallText").textContent.trim().replace(/(\n)|(,)|(   )/g,"").replace(/  /g," ").split(" ");
            var avgRating = ss[2];
            var ratings = ss[4];
            var published = ss[8];
            if(avgRating<3.5 || ratings<3000 || published<2013){ e.setAttribute("style","display:none"); };


            // 豆瓣搜索

            var i = e.querySelector(".leftAlignedImage");
            var t = i.getAttribute("title");
            i.setAttribute("target","_blank");
            i.setAttribute("href","https://search.douban.com/book/subject_search?search_text="+t);

        } catch(error) {}
    });

})();
