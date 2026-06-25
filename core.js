let score = 0;
let history = [];
let bookmarks = [];

/* OPEN PANEL */
function openApp(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* TAB SYSTEM (SIMULATED BROWSER TABS) */
function newTab(){
  const t=document.createElement("div");
  t.innerText="TAB";
  document.getElementById("tabs").appendChild(t);
}

/* REAL SEARCH (DuckDuckGo embedded results) */
async function go(){
  const q=document.getElementById("urlBar").value;
  const box=document.getElementById("results");

  history.push(q);
  updateHistory();

  box.innerHTML="Loading...";

  const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`);
  const data = await res.json();

  let html="";

  if(data.AbstractText){
    html += `<div class="result"><h3>${data.Heading}</h3><p>${data.AbstractText}</p></div>`;
  }

  data.RelatedTopics?.slice(0,12).forEach(r=>{
    if(r.Text){
      html += `<div class="result">${r.Text}</div>`;
    }
  });

  box.innerHTML = html || "No results";
}

/* AI BRAIN (API READY) */
async function askAI(){
  const input=document.getElementById("aiInput").value;
  document.getElementById("aiOut").innerText="Thinking...";

  // plug OpenAI / Groq here
  setTimeout(()=>{
    document.getElementById("aiOut").innerText =
      "AI: " + input + " (connect API for real intelligence)";
  },500);
}

/* APPS RENDER */
const grid=document.getElementById("appsGrid");

if(grid){
  apps.forEach(a=>{
    const d=document.createElement("div");
    d.className="app";
    d.innerText=a.name;
    d.onclick=a.run;
    grid.appendChild(d);
  });
}

/* GAME MODE */
function clicker(){
  score++;
  document.getElementById("score").innerText=score;
}

/* HISTORY */
function updateHistory(){
  const box=document.getElementById("historyList");
  if(!box) return;
  box.innerHTML = history.map(h=>`<div class="result">${h}</div>`).join("");
}

/* OFFLINE MODE */
window.addEventListener("offline",()=>{
  openApp("game");
});
