/* eslint-disable */
const pkg = require('../package.json');

let $vue;
let wall = []
function getThinkingWall() {
  return fetch('https://fishpi.cn/chat-room/si-guo-list').then(res => res.json()).then(res => {
    wall = res.data
  })
}

function isInChatRoom(component) {
  return component.name == 'chatroom-item';
}

function isAdmin() {
  return ['纪律委员', 'OP', '管理员'].includes($vue.$root.current.userRole)
}

function isWhiteList(user) {
  let whiteList = ["adlered","csfwff","gooohlan","iwpz","wuang","Yui","imlinhanchao","admin","9116", "xiaoIce", "摸鱼派官方巡逻机器人", "sevenSummer","chatgpt"]
  return whiteList.includes(user)
}

function ifMenu(theif, menu) {
  if (theif) return menu;
  return [];
}

function isInWall(user) {
  return wall.some(w => w.userName == user)
}

function getMenu(ev, component) {
  let userElement = ev.target.closest('.user-card');
  if (!userElement) return isAdmin() ? [{
    label: `执法维护`,
    click: () => {
      $vue.$fishpi.chatroom.send(`zf wh`);
    }
  }]: [];
  let whiteList = ["adlered","csfwff","gooohlan","iwpz","wuang","Yui","imlinhanchao","admin","9116", "xiaoIce", "摸鱼派官方巡逻机器人", "sevenSummer","chatgpt"]
  return [
    ...ifMenu(!isWhiteList(userElement.dataset.user), [{
      label: `合议禅定 ${userElement.dataset.user}`,
      click: () => {
        $vue.$fishpi.chatroom.send(`合议禅定 ${userElement.dataset.user} `);
      }
    }]),
    ...ifMenu(isInWall(userElement.dataset.user), [{
      label: `为他求情`,
      click: () => {
        $vue.$fishpi.chatroom.send(`合议破解 ${userElement.dataset.user} `);
      }
    }]),
    ...ifMenu(isAdmin() && !isInChatRoom(component) && isInWall(userElement.dataset.user), [{
      label: `解除禁言`,
      click: () => {
        $vue.$fishpi.chatroom.send(`zf jy ${userElement.dataset.user} 0`);
      }
    }]),
    ...ifMenu(isAdmin() && isInChatRoom(component), [{
      label: `执法禁言`,
      click: () => {
        component.instance.$emit('msg', `zf jy ${userElement.dataset.user} `);
      }
    }, {
      label: `执法风控`,
      click: () => {
        component.instance.$emit('msg', `zf fk ${userElement.dataset.user} `);
      }
    }, 
      ...ifMenu(isInWall(userElement.dataset.user), [{
        label: `解除禁言`,
        click: () => {
          $vue.$fishpi.chatroom.send(`zf jy ${userElement.dataset.user} 0`);
        }
      }]),
    ]),
  ]
}


function loop(call, time=5000) {
  setTimeout(async() => {
    await call();
    loop(call)
  }, time);
}

loop(getThinkingWall);

function activate(vueapp) {
  $vue = vueapp;
  $vue.setCustomMenu(pkg.name, (ev, component) => {
    console.log('customMenu', ev, component)
    return getMenu(ev, component);
  })
}

module.exports =  { activate }