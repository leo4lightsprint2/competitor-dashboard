const revenueData = [42, 58, 65, 82, 74, 96];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const movementData = [
  { name: "Northstar", delta: "+14.3%", direction: "up", color: "#58a6ff" },
  { name: "Orbit Labs", delta: "+9.8%", direction: "up", color: "#4ade80" },
  { name: "SignalIQ", delta: "-2.1%", direction: "down", color: "#f472b6" },
  { name: "BluePeak", delta: "+6.7%", direction: "up", color: "#fbbf24" }
];

const competitors = [
  { brand: "Northstar", share: "26.4%", growth: "+18.2%", retention: "91%", sentiment: "4.8/5" },
  { brand: "Orbit Labs", share: "21.1%", growth: "+14.7%", retention: "88%", sentiment: "4.6/5" },
  { brand: "BluePeak", share: "18.9%", growth: "+12.4%", retention: "84%", sentiment: "4.5/5" },
  { brand: "SignalIQ", share: "15.8%", growth: "+7.1%", retention: "79%", sentiment: "4.0/5" },
  { brand: "Apex Forge", share: "12.6%", growth: "+5.9%", retention: "76%", sentiment: "3.9/5" }
];

const revenueContainer = document.getElementById("revenueBars");
const movementList = document.getElementById("movementList");
const leaderboardBody = document.getElementById("leaderboardBody");

function renderRevenueBars(container, withValues) {
  revenueData.forEach((value, index) => {
    const barGroup = document.createElement("div");
    barGroup.className = "bar-group";

    if (withValues) {
      const barValue = document.createElement("span");
      barValue.className = "bar-value";
      barValue.textContent = value;
      barGroup.appendChild(barValue);
    }

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}%`;

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = labels[index];

    barGroup.appendChild(bar);
    barGroup.appendChild(label);
    container.appendChild(barGroup);
  });
}

renderRevenueBars(revenueContainer, false);

movementData.forEach((item) => {
  const li = document.createElement("li");

  const company = document.createElement("div");
  company.className = "company";

  const dot = document.createElement("span");
  dot.className = "dot";
  dot.style.setProperty("--dot-color", item.color);

  const companyName = document.createElement("span");
  companyName.className = "company-name";
  companyName.textContent = item.name;

  company.appendChild(dot);
  company.appendChild(companyName);

  const delta = document.createElement("span");
  delta.className = `delta ${item.direction === "up" ? "up" : "down"}`;
  delta.textContent = item.delta;

  li.appendChild(company);
  li.appendChild(delta);
  movementList.appendChild(li);
});

const trendModal = document.getElementById("trendModal");
const expandedContainer = document.getElementById("revenueBarsExpanded");

document.getElementById("expandTrendBtn").addEventListener("click", () => {
  renderRevenueBars(expandedContainer, true);
  trendModal.hidden = false;
});

function closeTrendModal() {
  trendModal.hidden = true;
}

document.getElementById("closeTrendModal").addEventListener("click", closeTrendModal);

trendModal.addEventListener("click", (event) => {
  if (event.target === trendModal) closeTrendModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !trendModal.hidden) closeTrendModal();
});

competitors.forEach((competitor, index) => {
  const row = document.createElement("tr");

  const brand = document.createElement("td");
  brand.innerHTML = `
    <div class="brand-cell">
      <span class="badge">${index + 1}</span>
      <span>${competitor.brand}</span>
    </div>
  `;

  const share = document.createElement("td");
  share.textContent = competitor.share;

  const growth = document.createElement("td");
  growth.textContent = competitor.growth;

  const retention = document.createElement("td");
  retention.textContent = competitor.retention;

  const sentiment = document.createElement("td");
  sentiment.textContent = competitor.sentiment;

  row.appendChild(brand);
  row.appendChild(share);
  row.appendChild(growth);
  row.appendChild(retention);
  row.appendChild(sentiment);
  leaderboardBody.appendChild(row);
});
