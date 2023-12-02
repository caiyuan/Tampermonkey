// ==UserScript==
// @name         kindle-dl
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  kindle 电子书下载
// @author       Ryan
// @match        https://www.amazon.cn/hz/mycd/digital-console/contentlist/booksAll/dateDsc/*
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // 构建下载面板

    const ebookControlPanel = document.createElement("div");
    ebookControlPanel.id = "ebookControlPanel";
    ebookControlPanel.style.cssText = `
    z-index: 10001 !important;
    position: fixed !important;
    top: 10%;
    right: 25px;
  `;

    ebookControlPanel.innerHTML = `
    <div>
      <button id="ebook:dl" style="display: inline-block; cursor: pointer; padding: 11px 13px 13px; border-radius: 5px; margin: 0px; vertical-align: middle; text-align: center; margin-inline-start: 10px; border: 1px solid; color: white; background: linear-gradient(rgb(90, 0, 0), rgb(0, 0, 0)); min-height: 12px; line-height: 12px; min-width: 10px;">自動下載</button>
    </div>
  `;

    document.body.appendChild(ebookControlPanel);

    // 操作下载功能

    var dl = document.getElementById("ebook:dl");
    dl.addEventListener("click", function () {
        console.log('下載中···');
        dl.textContent = '下載中·';
        dl.style.color = 'gray';
        dl.disabled = true;

        dlAction(1, 0);
    });

    // 执行下载过程

    var pages = 77; // 电子书列表总页数，根据实际修改
    var page = 1;
    var books = [];

    /**
    * page  当前的页码
    * index 书籍的下标，从 0 开始
    * first 首次执行时，为 true 值
    */
    function processBook(page, index, first) {
        if (index == 0 || first) {
            books = document.querySelectorAll("#CONTENT_LIST input[id$=':KindleEBook']");
        }

        var eid = books[index].id;
        var bid = eid.substring(0, eid.indexOf(':'));
        var title = document.querySelector('#content-title-' + bid).textContent;

        console.log(page + "::" + index + "::" + bid + "::" + title);

        document.querySelector('#DOWNLOAD_AND_TRANSFER_ACTION_' + bid).click();
        document.querySelector('#download_and_transfer_list_' + bid + '_0').click();
        document.querySelector('#DOWNLOAD_AND_TRANSFER_ACTION_' + bid + '_CONFIRM').click();

        if (index < books.length - 1) {
            setTimeout(function () {
                document.querySelector('#notification-close').click();
                processBook(page, index + 1);
            }, 3000);
        } else if (++page <= pages) {
            setTimeout(function () {
                document.querySelector('#notification-close').click();
                document.querySelector('#page-' + page).click();
                setTimeout(function () {
                    processBook(page, 0);
                }, 10000);
            }, 3000);
        }
    }

    function dlAction(page, index) {
        setTimeout(function () {
            document.querySelector('#page-' + page).click();
            setTimeout(function () {
                processBook(page, index, true);
            }, 10000);
        }, 0);
    }

})();
