// ==UserScript==
// @name         kindle-dl
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  kindle 电子书下载
// @author       Ryan
// @match        https://www.amazon.cn/hz/mycd/digital-console/contentlist/booksAll/dateDsc/*
// @grant        GM_addStyle
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

    const ebookInputStyle = `
        width: 35px;
        text-align: center;
        line-height: 15px;
        font-family: monospace;
        color: darkred;
    `;

    const ebookBlockStyle = `
        display: inline-block;
        cursor: pointer;
        padding: 11px 13px 13px;
        border-radius: 5px;
        margin: 0px;
        vertical-align: middle;
        text-align: center;
        margin-inline-start: 10px;
        border: 1px solid;
        color: white;
        background: linear-gradient(rgb(90, 0, 0), rgb(0, 0, 0));
        min-height: 12px;
        line-height: 12px;
        min-width: 10px;
    `;

    ebookControlPanel.innerHTML = `
        <div>
            <div style="${ebookBlockStyle} padding: 9px;">
                <input id="ebook:page" style="${ebookInputStyle} margin: 0;" value="頁碼"/>
                <span style="margin: 0;">::</span>
                <input id="ebook:index" style="${ebookInputStyle} margin: 0;" value="下標"/>
            </div>
            <button id="ebook:dl" style="${ebookBlockStyle}">自動下載</button>
            <div style="position: fixed; right: 25px; font-size: 12px; color: darkred;">
                <text id="ebook:log">::</text>
            </div>
        </div>
    `;

    document.body.appendChild(ebookControlPanel);

    // 操作下载功能

    let dlChangeState = false;

    const dl = document.getElementById("ebook:dl");
    const dl_page = document.getElementById("ebook:page");
    const dl_index = document.getElementById("ebook:index");
    const dl_log = document.getElementById("ebook:log");

    dl.addEventListener("click", function () {
        console.log('下載中···');
        dl.textContent = '下載中·';
        dl.style.color = 'gray';
        dl.disabled = true;

        if (dlChangeState) {
            const page = parseInt(dl_page.value);
            const index = parseInt(dl_index.value);
            dlAction(page, index);
        } else {
            dlAction(1, 0);
        }
    });

    function dlChange() {
        dl.textContent = '自動下載';
        dl.style.color = 'white';
        dl.disabled = false;

        dlChangeState = true;
    }

    dl_page.addEventListener("change", dlChange);
    dl_index.addEventListener("change", dlChange);

    // 执行下载过程

    let ids = [];

    /**
     * page  当前的页码
     * index 书籍的下标，从 0 开始
     * first 首次执行时，为 true 值
     */
    function processBook(page, index, first) {

        if (index == 0 || first) {
            const books = Array.from(document.querySelectorAll("#CONTENT_LIST input[id$=':KindleEBook']"));
            ids = books.map(book => book.id);
        }

        const eid = ids[index];
        const bid = eid.substring(0, eid.indexOf(':'));
        const title = document.querySelector('#content-title-' + bid).textContent;

        const log = page + "::" + index + "::" + bid + "::" + title;

        dl_log.textContent = log;

        console.log(log);

        let dlSucc = true;
        try {
            document.querySelector('#DOWNLOAD_AND_TRANSFER_ACTION_' + bid).click();
            document.querySelector('#download_and_transfer_list_' + bid + '_0').click();
            document.querySelector('#DOWNLOAD_AND_TRANSFER_ACTION_' + bid + '_CONFIRM').click();
        } catch (error) {
            dlSucc = false;
            console.error("ERROR::" + log);
        }

        if (index < ids.length - 1) {
            setTimeout(function () {
                if(dlSucc) { document.querySelector('#notification-close').click(); }
                processBook(page, index + 1);
            }, 3000);
        } else {
            setTimeout(function () {
                ++page;
                if(dlSucc) { document.querySelector('#notification-close').click(); }
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
            }, 5000);
        }, 0);
    }

})();
