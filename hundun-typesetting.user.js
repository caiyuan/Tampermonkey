// ==UserScript==
// @name              hundun-typesetting
// @namespace         https://github.com/caiyuan/Tampermonkey
// @version           0.1
// @description       混沌学园版面重排
// @author            Ryan
// @include           https://www.hundun.cn/course/*
// @grant             none
// @run-at            document-end
// ==/UserScript==

(function() {
    'use strict';

    let navigationDisplay = document.createElement("div");
    navigationDisplay.setAttribute("id", "navigationDisplay");
    document.body.append(navigationDisplay);

    navigationDisplay.style = `
        z-index: 1001 !important;
        position: fixed !important;
        visibility: visible !important;
        top: 0%;
        right: 30px;
        width: auto;
        margin: 0;
        padding: 0;
        text-align: center;
        cursor: pointer;
        border-radius: 0px;
        background-color: rgba(0, 0, 0, 0.3);
        `;

    let displayButtionStyle = `
        margin: 3px;
        padding: 1px 3px;
        vertical-align: middle;
        font-size: 18px;
        font-family: serif;
        font-weight: lighter;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0);
        color: rgba(255, 255, 255, 0.3);
        border: solid 0px rgba(255, 255, 255, 0.3);
        `;

    let displayButtionHighlight = `
        ${displayButtionStyle};
        color: rgba(255, 255, 255, 0.9);
        border: solid 0px rgba(255, 255, 255, 0.9);
        `;

    navigationDisplay.innerHTML = `
        <div value="1" style="${displayButtionStyle}">◒</div>
        `;


    let displayButtionList = navigationDisplay.querySelectorAll("div");
    displayButtionList.forEach(displayButtion => {
        displayButtion.addEventListener("click", function(event){
            let target = event.target;
            let value = target.getAttribute("value");
            target.setAttribute("value", value==1?0: 1);

            let navigationContainerList = document.body.querySelectorAll("div.navigation-container");
            navigationContainerList.forEach(navigationContainer => {
                if(value==1) {
                    navigationContainer.setAttribute("style","display: none;");
                } else {
                    navigationContainer.setAttribute("style", "display: display;");
                }
            });
        });

        displayButtion.addEventListener("mousemove", function(event){
            let btn = event.target;
            btn.style = displayButtionHighlight;
        });
        displayButtion.addEventListener("mouseout", function(event){
            let btn = event.target;
            btn.style = displayButtionStyle;
        });
    });

})();
