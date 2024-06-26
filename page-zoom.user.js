// ==UserScript==
// @name         page-zoom
// @namespace    https://github.com/caiyuan/Tampermonkey
// @version      0.1
// @description  网页缩放
// @author       Ryan
// @match        ://*/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 构建控制器面板

    const zoomControlPanel = document.createElement("div");
    zoomControlPanel.id = "zoomControlPanel";
    zoomControlPanel.style.cssText = `
      z-index: 10001 !important;
      position: fixed !important;
      visibility: visible !important;
      top: 15%;
      right: 15px;
      width: 60px;
      margin: 0;
      padding: 0;
      border-radius: 3px;
      background-color: rgba(150, 150, 150, 0.3);
      line-height: normal;
      text-align: center;
      font-size: 9px;
      font-family: ui-monospace;
      font-weight: normal;
      cursor: pointer;
    `;

    const buttonStyle = `
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.3);
      border: solid 1px rgba(255, 255, 255, 0.3);
    `;

    zoomControlPanel.innerHTML = `
      <div>
        <div zoom id="enlarge" style="${buttonStyle} float: left; width: 23px; border-radius: 3px 0 0 3px; margin: 5px 0 5px 5px; padding: 3px 0;">❉</div>
        <div zoom id="reduce" style="${buttonStyle} float: right; width: 23px; border-radius: 0 3px 3px 0; margin: 5px 5px 5px 0; padding: 3px 0;">❄</div>
      </div>
    `;

    document.body.appendChild(zoomControlPanel);

    // 操作页面缩放率

    let zoom = 1.0;

    document.getElementById("enlarge").addEventListener("click", function() {
        document.documentElement.style.zoom = ((zoom += 0.1) * 100) + "%";
    });

    document.getElementById("reduce").addEventListener("click", function() {
        document.documentElement.style.zoom = ((zoom -= 0.1) * 100) + "%";
    });

    // 控制器浮窗微调

    GM_addStyle("#zoomControlPanel {opacity: 0.3;}");
    GM_addStyle("#zoomControlPanel:hover {opacity: 1;}");

    GM_addStyle("#zoomControlPanel [zoom]:hover {color: rgba(255,255,255,1) !important}");
    GM_addStyle("#zoomControlPanel [zoom]:hover {border: solid 1px rgba(255,255,255,1) !important}");

})();
