// ==UserScript==
// @name              hundun-typesetting
// @namespace         https://github.com/caiyuan/Tampermonkey
// @version           0.1
// @description       混沌学园版面重排
// @author            Ryan
// @include           https://www.hundun.cn/*
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
                    lightareOff(0);
                } else {
                    navigationContainer.setAttribute("style", "display: display;");
                    lightareOff(1);
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


    // 关灯效果

    function lightareOff1() {
        let stefanvdlightareoff = document.createElement("div");
        stefanvdlightareoff.setAttribute("id", "stefanvdlightareoff");
        stefanvdlightareoff.setAttribute("style", "width: 100%; height: 100%; left: 0px; top: 0px; position: fixed; background: rgb(0, 0, 0); opacity: 0.8; z-index: 999;");
        document.body.append(stefanvdlightareoff);
    }

    function lightareOff2() {
        let videoContainer = document.body.querySelector("#videoContainer");
        videoContainer.setAttribute("class", "stefanvdvideotop");
        videoContainer.setAttribute("style", "z-index: 1001 !important; position: relative !important; visibility: visible !important;");
    }

    function lightareOff3() {
        let stefanvdlightareoff = document.body.querySelector("#stefanvdlightareoff");
        stefanvdlightareoff.remove();
    }

    function lightareOff(lever) {
        if(0 == lever) {
            lightareOff1();
            lightareOff2();
        }
        if(1 == lever) {
            lightareOff3();
        }
    }

})();
