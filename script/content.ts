// content script can run scripts that read and modify the content of the page.
function toggleBlackAndWhite(isEnabled: boolean) {
  document.body.style.filter = isEnabled ? "grayscale(100%)": "";
}
chrome.storage.local.get("bwMode",(data)=>{
  const isEnabled = data.bwMode || false;
  toggleBlackAndWhite(isEnabled);
})
const startTimer = ()=>{
  let elaspedTime, startTime,timeInterval;
  startTime = Date.now();
  timeInterval = setInterval(()=>{
    var currentTime = Date.now()
    elaspedTime = currentTime - startTime;
  },10)
}


let formatPara = document.getElementById("paragraph")?.innerText;
// // Listen for messages from popup.ts
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle_bw") {
    chrome.storage.local.get("bwMode",(data)=>{
      const newState = !data.bwMode;
      chrome.storage.local.set({ bwMode: newState},()=>{
        toggleBlackAndWhite(newState);
      })
    })
  }
  if (message.action === "summarise") {}
});