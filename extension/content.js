// Content script: injects "Haggle this" buttons on supported OTA hotel listings
// This is a prototype — real selectors would vary per site.

(function () {
  "use strict";

  const BUTTON_CLASS = "hagglestay-btn";
  let selectedCount = 0;
  const MAX_SELECT = 5;

  function createHaggleButton() {
    const btn = document.createElement("button");
    btn.className = BUTTON_CLASS;
    btn.textContent = "Haggle this";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (selectedCount >= MAX_SELECT) {
        btn.textContent = "Max 5 reached";
        btn.style.background = "#9ca3af";
        setTimeout(() => { btn.textContent = "Haggle this"; btn.style.background = ""; }, 1500);
        return;
      }
      selectedCount++;
      btn.textContent = "✓ Added";
      btn.classList.add("hagglestay-btn--selected");
      btn.disabled = true;

      // Notify popup via storage
      chrome.storage.local.get(["hagglestay_selected"], (data) => {
        const list = data.hagglestay_selected || [];
        const card = btn.closest("[data-haggle-hotel]");
        list.push({
          id: Date.now(),
          name: card?.dataset.haggleHotel || `Hotel ${selectedCount}`,
          site: window.location.hostname,
        });
        chrome.storage.local.set({ hagglestay_selected: list });
      });
    });
    return btn;
  }

  // Observe DOM for dynamically loaded hotel cards
  // In production, site-specific selectors would target actual hotel cards
  console.log("[HaggleStay] Content script loaded on", window.location.hostname);
})();
