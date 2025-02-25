document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("switch1");
	const switch1 = document.getElementById("base_switch");
  var isEnabled = false;
  if (toggleButton) {
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
});
