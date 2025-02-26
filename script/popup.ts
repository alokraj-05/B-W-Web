document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("switch1");
	const switch1 = document.getElementById("base_switch");
  if (toggleButton && switch1) {
    chrome.storage.local.get("bwMode",(data)=>{
      const isEnabled:boolean = data.bwMode || false;
      switch1.classList.toggle("fa-toggle-on",isEnabled);
      switch1.classList.toggle("fa-toggle-off",!isEnabled);
    })
      toggleButton.addEventListener("click", () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0].id) {
                  chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_bw" });
              }
          });
					switch1?.classList.toggle("fa-toggle-on");
					switch1?.classList.toggle("fa-toggle-off");
      });
  }
  const summariseBtn = document.getElementById("sum-btn");
  if(summariseBtn){
    summariseBtn.addEventListener("click",async ()=>{
      const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
      if(tab.id!== undefined){
        try {
          await chrome.sidePanel.open({tabId:tab.id});
          console.log("side panel opend successfully.")
        } catch (error) {
          console.error("error opening side panel:",error)
        }
      }else{
        console.error("no active tab found.")
      }
    })
  }
});
