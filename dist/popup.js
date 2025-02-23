"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-bw");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_bw" });
                }
            });
        });
    }
});
