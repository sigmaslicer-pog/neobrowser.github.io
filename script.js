let score = 0;
let expr = "";
let history = [];

/* PANELS */
function openApp(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* TAB SYSTEM */
function newTab(){
  const tab = document.createElement("div");
  tab.className="tab";
  tab.innerText="TAB";
  document.getElementById("tabBar").appendChild(tab);
}

/* SEARCH ENGINE (IN PAGE) */
async function search(){
  const q = document.getElementById("search").value;
  const box = document.getElementById("results");

  if(!q) return;

  history.push(q);
  updateHistory();

  box.innerHTML="Searching...";

  try {
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`);
    const data = await res.json();

    let html="";

    if(data.AbstractText){
      html += `<div class="result">
        <h3>${data.Heading}</h3>
        <p>${data.AbstractText}</p>
      </div>`;
    }

    data.RelatedTopics?.slice(0,10).forEach(r=>{
      if(r.Text){
        html += `<div class="result">${r.Text}</div>`;
      }
    });

    box.innerHTML = html || "No results";
  } catch {
    box.innerHTML="Search failed";
  }
}

/* AI CORE (plug API later) */
async function askAI(){
  const input = document.getElementById("aiInput").value;
  document.getElementById("aiOut").innerText="Processing...";

  setTimeout(()=>{
    document.getElementById("aiOut").innerText =
      "AI Response: " + input + " (connect API for real intelligence)";
  },500);
}

/* APPS (200+ AUTO SYSTEM) */
const apps = Array.from({length: 220}, (_,i)=>"App "+(i+1));

const grid = document.getElementById("appsGrid");

apps.forEach(a=>{
  const d=document.createElement("div");
  d.className="app";
  d.innerText=a;
  d.onclick=()=>alert(a+" launched");
  grid.appendChild(d);
});

/* CALCULATOR */
function buildCalc(){
  const pad = document.getElementById("calcPad");
  const keys = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
  ];

  keys.forEach(k=>{
    const b=document.createElement("button");
    b.innerText=k;
    b.onclick=()=>handleCalc(k);
    pad.appendChild(b);
  });
}
buildCalc();

function handleCalc(k){
  if(k==="="){
    try{
      expr=eval(expr).toString();
      document.getElementById("calcDisplay").value=expr;
    }catch{}
    return;
  }
  expr+=k;
  document.getElementById("calcDisplay").value=expr;
}

/* GAME */
function clickGame(){
  score++;
  document.getElementById("score").innerText=score;
}

/* HISTORY */
function updateHistory(){
  document.getElementById("historyBox").innerHTML =
    history.map(h=>`<div class="result">${h}</div>`).join("");
}

/* OFFLINE MODE */
window.addEventListener("offline",()=>{
  openApp("game");
});
