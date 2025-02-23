// content script can run scripts that read and modify the content of the page.

function toggleBlackAndWhite() {
  const body = document.body;
  if (body.style.filter === "grayscale(100%)") {
      body.style.filter = "";
  } else {
      body.style.filter = "grayscale(100%)";
  }
}

// Listen for messages from popup.ts
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle_bw") {
      toggleBlackAndWhite();
  }
});
