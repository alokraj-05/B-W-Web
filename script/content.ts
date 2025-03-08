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

function toggleDark(isEnabled: boolean){
  const elements = document.querySelectorAll("*")

  elements.forEach(el =>{
    const element = el as HTMLElement;
    if (element.tagName ==="IMG" || element.tagName === "VIDEO") return;

    const computedStyle = window.getComputedStyle(element);
    if(isEnabled){
      if(isDark(computedStyle.color)){
        element.style.color = '#ffffff';
      }
      if(isLight(computedStyle.backgroundColor)){
        element.style.backgroundColor = '#121212';
      }
    }else{
     element.style.color = "";
     element.style.backgroundColor = "";
    }
  })
}

function isDark(color:string){
  return getBrightness(color) < 128;
}
function isLight(color:string){
  return getBrightness(color) >= 128;
}
function getBrightness(color :string):number{
  const rgb = color.match(/\d+/g)?.map(Number);
  if(!rgb || rgb.length<3) return 255;
  return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114)
}
chrome.storage.local.get("darkMode", data =>{
  const isEnabled = data.darkMode || false;
  toggleDark(isEnabled);
})

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

  if(message.action === "toggle_dark"){
    chrome.storage.local.get("darkMode", data =>{
      const newState = !data.darkMode;
      chrome.storage.local.set({darkMode : newState},()=>{
        toggleDark(newState)
      })
    })
  }
});



