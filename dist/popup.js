"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("switch1");
    const switch1 = document.getElementById("base_switch");
    if (toggleButton && switch1) {
        chrome.storage.local.get("bwMode", (data) => {
            const isEnabled = data.bwMode || false;
            switch1.classList.toggle("fa-toggle-on", isEnabled);
            switch1.classList.toggle("fa-toggle-off", !isEnabled);
        });
        toggleButton.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_bw" });
                }
            });
            switch1 === null || switch1 === void 0 ? void 0 : switch1.classList.toggle("fa-toggle-on");
            switch1 === null || switch1 === void 0 ? void 0 : switch1.classList.toggle("fa-toggle-off");
        });
    }
    const summariseBtn = document.getElementById("sum-btn");
    if (summariseBtn) {
        summariseBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            const [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.id !== undefined) {
                try {
                    yield chrome.sidePanel.open({ tabId: tab.id });
                    chrome.tabs.sendMessage(tab.id, { action: "summarise" });
                    console.log("side panel opend successfully.");
                }
                catch (error) {
                    console.error("error opening side panel:", error);
                }
            }
            else {
                console.error("no active tab found.");
            }
        }));
    }
    const dark_toggle = document.getElementById("toggle-dark");
    const switch2 = document.getElementById("switch2");
    if (dark_toggle && switch2) {
        chrome.storage.local.get("darkMode", data => {
            const isEnabled = data.darkMode || false;
            switch2.classList.toggle("fa-toggle-on", isEnabled);
            switch2.classList.toggle("fa-toggle-off", !isEnabled);
        });
        dark_toggle.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_dark" });
                }
            });
            switch2 === null || switch2 === void 0 ? void 0 : switch2.classList.toggle("fa-toggle-on");
            switch2 === null || switch2 === void 0 ? void 0 : switch2.classList.toggle("fa-toggle-off");
        });
    }
});
