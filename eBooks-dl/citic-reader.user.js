// ==UserScript==
// @name         citic-reader
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  使内容滚动到尾部
// @author       Ryan
// @match        https://v.yunpub.cn/reader/ebook/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 创建一个 MutationObserver 实例
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // 检查每个新增的节点是否是 iframe
            if (mutation.type === 'childList') {
                Array.from(mutation.addedNodes)
                    .filter(node => node.tagName === 'IFRAME')
                    .forEach((node) => {
                    // 新增的节点是 iframe，为其添加加载事件监听器
                    node.addEventListener('load', () => {
                        // 使内容滚动到尾部可见
                        document.querySelectorAll('*').forEach((element) => {
                            element.scrollTop = element.scrollHeight - element.offsetHeight;
                        });
                    });
                });
            }
        });
    });

    // 配置 MutationObserver 监听的选项
    const config = {
        childList: true, // 监听子节点的变化
        subtree: true, // 监听所有后代节点的变化
    };

    // 开始监听指定节点及其后代节点的变化
    observer.observe(document.body, config);

})();
