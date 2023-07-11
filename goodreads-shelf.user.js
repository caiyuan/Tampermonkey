// ==UserScript==
// @name         goodreads-shelf
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  滤掉 2010年前 出版书籍
// @author       Ryan
// @match        https://www.goodreads.com/shelf/show/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll(".elementList").forEach(function(e){
        try {
            var t = e.querySelector(".smallText").textContent.trim();
            var y = t.substring(t.length-4);

            if(y<2010){e.setAttribute("style","display:none")};

        } catch(e){}
    });

})();
