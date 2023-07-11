// ==UserScript==
// @name         goodreads-shelf
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  定制 goodreads 书架
// @author       Ryan
// @match        https://www.goodreads.com/shelf/show/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(".elementList").forEach(function(e){
        try {

            // 滤掉2013年前书籍

            var s = e.querySelector(".smallText").textContent.trim();
            var y = s.substring(s.length-4);
            if(y<2013){e.setAttribute("style","display:none")};


            // 添加豆瓣快捷搜索

            var i = e.querySelector(".leftAlignedImage");
            var t = i.getAttribute("title");
            i.setAttribute("target","_blank");
            i.setAttribute("href","https://search.douban.com/book/subject_search?search_text="+t);

        } catch(error){}

    });

})();
