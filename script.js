let expr = "";
let score = 0;

/* PANELS */
function openPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* REAL IN-PAGE SEARCH (DuckDuckGo API) */
async function searchWeb() {
  const q = document.getElementById("searchInput").value;
  const box = document.getElementById("results");

  if (!q) return;

  box.innerHTML = "Searching...";

  try {
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`);
    const data = await res.json();

    let html = "";

    if (data.AbstractText) {
      html += `<div class="result">
        <h3>${data.Heading}</h3>
        <p>${data.AbstractText}</p>
      </div>`;
    }

    data.RelatedTopics?.slice(0, 10).forEach(r => {
      if (r.Text) {
        html += `<div class="result">${r.Text}</div>`;
      }
    });

    box.innerHTML = html || "No results.";

  } catch {
    box.innerHTML = "Search error.";
  }
}

/* AI (upgrade later with API) */
async function runAI() {
  const input = document.getElementById("aiInput").value;
  const out = document.getElementById("aiOutput");

  out.innerText = "Thinking...";

  setTimeout(() => {
    out.innerText = "AI: " + input + " (connect OpenAI API for real intelligence)";
  }, 600);
}

/* CALCULATOR */
function press(v) {
  expr += v;
  document.getElementById("calcDisplay").value = expr;
}

function calc() {
  try {
    expr = eval(expr).toString();
    document.getElementById("calcDisplay").value = expr;
  } catch {
    alert("Error");
  }
}

function clearCalc() {
  expr = "";
  document.getElementById("calcDisplay").value = "";
}

/* GAME */
function gameClick() {
  score++;
  document.getElementById("score").innerText = score;
}

/* TABS (BROWSER STYLE) */
let tabCount = 1;

function newTab() {
  const tabs = document.getElementById("tabs");
  const tab = document.createElement("div");
  tab.className = "tab";
  tab.innerText = "Tab " + tabCount++;
  tabs.appendChild(tab);
}

/* APPS GENERATOR (200+ READY) */
const apps = Array.from({length: 200}, (_, i) => "App " + (i + 1));

const grid = document.getElementById("appsGrid");

apps.forEach(name => {
  const div = document.createElement("div");
  div.className = "app";
  div.innerText = name;
  div.onclick = () => alert(name + " opened");
  grid.appendChild(div);
});
