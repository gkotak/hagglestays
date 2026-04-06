// Background service worker
chrome.runtime.onInstalled.addListener(() => {
  console.log("[HaggleStay] Extension installed");
  chrome.storage.local.set({ hagglestay_selected: [] });
});
