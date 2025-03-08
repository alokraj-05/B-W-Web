"use strict";
var _a;
// content script can run scripts that read and modify the content of the page.
function toggleBlackAndWhite(isEnabled) {
    document.body.style.filter = isEnabled ? "grayscale(100%)" : "";
}
chrome.storage.local.get("bwMode", (data) => {
    const isEnabled = data.bwMode || false;
    toggleBlackAndWhite(isEnabled);
});
const startTimer = () => {
    let elaspedTime, startTime, timeInterval;
    startTime = Date.now();
    timeInterval = setInterval(() => {
        var currentTime = Date.now();
        elaspedTime = currentTime - startTime;
    }, 10);
};
function toggleDark(isEnabled) {
    const elements = document.querySelectorAll("*");
    elements.forEach(el => {
        const element = el;
        if (element.tagName === "IMG" || element.tagName === "VIDEO")
            return;
        const computedStyle = window.getComputedStyle(element);
        if (isEnabled) {
            if (isDark(computedStyle.color)) {
                element.style.color = '#ffffff';
            }
            if (isLight(computedStyle.backgroundColor)) {
                element.style.backgroundColor = '#121212';
            }
        }
        else {
            element.style.color = "";
            element.style.backgroundColor = "";
        }
    });
}
function isDark(color) {
    return getBrightness(color) < 128;
}
function isLight(color) {
    return getBrightness(color) >= 128;
}
function getBrightness(color) {
    var _a;
    const rgb = (_a = color.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map(Number);
    if (!rgb || rgb.length < 3)
        return 255;
    return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);
}
chrome.storage.local.get("darkMode", data => {
    const isEnabled = data.darkMode || false;
    toggleDark(isEnabled);
});
let formatPara = (_a = document.getElementById("paragraph")) === null || _a === void 0 ? void 0 : _a.innerText;
// // Listen for messages from popup.ts
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggle_bw") {
        chrome.storage.local.get("bwMode", (data) => {
            const newState = !data.bwMode;
            chrome.storage.local.set({ bwMode: newState }, () => {
                toggleBlackAndWhite(newState);
            });
        });
    }
    if (message.action === "summarise") { }
    if (message.action === "toggle_dark") {
        chrome.storage.local.get("darkMode", data => {
            const newState = !data.darkMode;
            chrome.storage.local.set({ darkMode: newState }, () => {
                toggleDark(newState);
            });
        });
    }
});
