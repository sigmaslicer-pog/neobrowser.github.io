// Simple plugin loader system
window.plugins = [];

function registerPlugin(plugin){
  window.plugins.push(plugin);
  if(plugin.init) plugin.init();
}
