// Demo data for the prototype
const DEMO_HOTELS = [
  { id: 1, name: "The Ritz-Carlton, Bali", location: "Nusa Dua, Bali", stars: 5, price: "£342", emoji: "🏝️" },
  { id: 2, name: "Mandarin Oriental Hyde Park", location: "London, UK", stars: 5, price: "£489", emoji: "🏨" },
  { id: 3, name: "Four Seasons Resort Maldives", location: "Landaa Giraavaru", stars: 5, price: "£612", emoji: "🌊" },
  { id: 4, name: "Park Hyatt Tokyo", location: "Shinjuku, Tokyo", stars: 5, price: "£378", emoji: "🗼" },
  { id: 5, name: "Aman Venice", location: "Venice, Italy", stars: 5, price: "£520", emoji: "🏛️" },
];

const RESULTS = [
  { id: 1, status: "success", oldPrice: "£342", newPrice: "£279", saving: "18%" },
  { id: 2, status: "success", oldPrice: "£489", newPrice: "£415", saving: "15%" },
  { id: 3, status: "nodeal", oldPrice: "£612", newPrice: null, saving: null },
];

let selectedHotels = [];
let currentState = "empty"; // empty | selected | negotiating | results

// Detect current site
function detectSite() {
  const badge = document.getElementById("siteBadge");
  // In real extension, we'd use chrome.tabs.query
  // For demo, simulate detection
  chrome.tabs?.query?.({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.[0]) return;
    const url = tabs[0].url || "";
    const sites = {
      "booking.com": "Booking.com",
      "hotels.com": "Hotels.com",
      "expedia.com": "Expedia",
      "agoda.com": "Agoda",
      "kayak.com": "Kayak",
      "google.com": "Google",
    };
    for (const [domain, name] of Object.entries(sites)) {
      if (url.includes(domain)) {
        badge.textContent = name;
        badge.classList.add("active");
        return;
      }
    }
    badge.textContent = "Unsupported site";
  });
}

function showState(state) {
  currentState = state;
  document.getElementById("emptyState").style.display = state === "empty" ? "block" : "none";
  document.getElementById("selectedState").style.display = state === "selected" ? "block" : "none";
  document.getElementById("negotiatingState").style.display = state === "negotiating" ? "block" : "none";
  document.getElementById("resultsState").style.display = state === "results" ? "block" : "none";
}

function renderSelected() {
  const list = document.getElementById("hotelList");
  list.innerHTML = selectedHotels.map((h) => `
    <li class="hotel-item">
      <div class="hotel-thumb">${h.emoji}</div>
      <div class="hotel-info">
        <div class="hotel-name">${h.name}</div>
        <div class="hotel-meta">${h.location} · ${"★".repeat(h.stars)}</div>
      </div>
      <div class="hotel-price">${h.price}<small>/night</small></div>
      <button class="hotel-remove" data-id="${h.id}" title="Remove">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </li>
  `).join("");

  // Capacity dots
  const dots = document.getElementById("capacityDots");
  dots.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span class="dot${i < selectedHotels.length ? " filled" : ""}"></span>`
  ).join("");
  document.getElementById("capacityLabel").textContent = `${selectedHotels.length} / 5`;

  // Dates (demo)
  document.getElementById("checkIn").textContent = "12 Apr";
  document.getElementById("checkOut").textContent = "15 Apr";
  document.getElementById("guests").textContent = "2 adults";

  // Remove handlers
  list.querySelectorAll(".hotel-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      selectedHotels = selectedHotels.filter((h) => h.id !== id);
      if (selectedHotels.length === 0) showState("empty");
      else renderSelected();
    });
  });
}

function renderNegotiating() {
  const list = document.getElementById("negotiatingList");
  const hotels = selectedHotels.slice(0, 3); // demo uses first 3
  list.innerHTML = hotels.map((h, i) => `
    <li class="hotel-item">
      <div class="hotel-thumb">${h.emoji}</div>
      <div class="hotel-info">
        <div class="hotel-name">${h.name}</div>
        <div class="hotel-meta">${h.location}</div>
      </div>
      <span class="status-badge status-calling" id="status-${h.id}">Calling…</span>
    </li>
  `).join("");

  // Animate progress
  const bar = document.getElementById("progressBar");
  const label = document.getElementById("progressLabel");
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    bar.style.width = Math.min(progress, 100) + "%";

    if (progress >= 30) {
      const s1 = document.getElementById(`status-${hotels[0]?.id}`);
      if (s1) { s1.className = "status-badge status-success"; s1.textContent = "Deal found!"; }
    }
    if (progress >= 60) {
      const s2 = document.getElementById(`status-${hotels[1]?.id}`);
      if (s2) { s2.className = "status-badge status-success"; s2.textContent = "Deal found!"; }
    }
    if (progress >= 85) {
      const s3 = document.getElementById(`status-${hotels[2]?.id}`);
      if (s3) { s3.className = "status-badge status-nodeal"; s3.textContent = "No deal"; }
      label.textContent = "Finishing up…";
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => showState("results"), 500);
      renderResults();
    }
  }, 80);
}

function renderResults() {
  const list = document.getElementById("resultsList");
  const hotels = selectedHotels.slice(0, 3);
  list.innerHTML = hotels.map((h, i) => {
    const r = RESULTS[i];
    if (!r) return "";
    const isSuccess = r.status === "success";
    return `
      <li class="hotel-item">
        <div class="hotel-thumb">${h.emoji}</div>
        <div class="hotel-info">
          <div class="hotel-name">${h.name}</div>
          <div class="hotel-meta">${h.location}</div>
        </div>
        ${isSuccess ? `
          <div class="hotel-savings">
            <span class="old-price">${r.oldPrice}</span>
            <span class="new-price">${r.newPrice}</span>
            <span class="saving-pct">-${r.saving}</span>
          </div>
        ` : `
          <span class="status-badge status-nodeal">No deal</span>
        `}
      </li>
    `;
  }).join("");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  detectSite();
  showState("empty");

  // For demo: clicking empty state loads sample hotels
  document.getElementById("emptyState").addEventListener("click", () => {
    selectedHotels = DEMO_HOTELS.slice(0, 3);
    showState("selected");
    renderSelected();
  });

  document.getElementById("negotiateBtn").addEventListener("click", () => {
    showState("negotiating");
    renderNegotiating();
  });

  document.getElementById("backBtn")?.addEventListener("click", () => {
    showState("selected");
    renderSelected();
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    selectedHotels = [];
    showState("empty");
  });

  document.getElementById("viewDealsBtn")?.addEventListener("click", () => {
    // Would open HaggleStay results page
    window.open("https://hagglestays.lovable.app", "_blank");
  });
});
