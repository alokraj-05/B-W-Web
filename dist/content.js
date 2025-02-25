"use strict";
// content script can run scripts that read and modify the content of the page.
function toggleBlackAndWhite() {
    const body = document.body;
    if (body.style.filter === "grayscale(100%)") {
        body.style.filter = "";
    }
    else {
        body.style.filter = "grayscale(100%)";
    }
}
const startTimer = () => {
    let elaspedTime, startTime, timeInterval;
    startTime = Date.now();
    timeInterval = setInterval(() => {
        var currentTime = Date.now();
        elaspedTime = currentTime - startTime;
    }, 10);
};
// // Listen for messages from popup.ts
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggle_bw") {
        toggleBlackAndWhite();
    }
    if (message.action === "toggle_timer") {
        startTimer();
    }
});
