/* eslint-disable */
const pkg = require('../package.json');

let $vue;
function getChatRoomItemMenu(ev, component) {
  let userElement = ev.target.closest('.user-card');
  if (!userElement) return;
  let whiteList = ["adlered","csfwff","gooohlan","iwpz","wuang","Yui","imlinhanchao","admin","9116", "xiaoIce", "摸鱼派官方巡逻机器人", "sevenSummer","chatgpt"]
  if (whiteList.includes(userElement.dataset.user)) return;
  return [
    {
      label: `合议禅定 ${userElement.dataset.user}`,
      click: () => {
        $vue.$fishpi.chatroom.send(`合议禅定 ${userElement.dataset.user} `);
      }
    }
  ]
}

function activate(vueapp) {
  $vue = vueapp;
  $vue.setCustomMenu(pkg.name, (ev, component) => {
    console.log('customMenu', ev, component)
    if (component.name == 'chatroom-item' || component.name == 'chatroom') return getChatRoomItemMenu(ev, component);
  })
}

module.exports =  { activate }