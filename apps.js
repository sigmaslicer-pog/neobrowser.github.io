const apps = Array.from({length: 300}, (_,i)=>({
  name: "App " + (i+1),
  run: () => alert("Launching App " + (i+1))
}));

window.apps = apps;
