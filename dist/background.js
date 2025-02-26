"use strict";
console.log("hello world!");
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'openSidePanel',
        title: 'Open side panel',
        contexts: ['all']
    });
});
chrome.runtime.onMessage.addListener((message, sender) => {
    var _a;
    if (message.action === "summarise" && ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id) !== undefined) {
        chrome.sidePanel.open({ tabId: sender.tab.id });
    }
});
