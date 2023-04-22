<template>
  <div v-if="wall" class="layout">
    <span>摸魚派倡導自由、友善的交流環境。<br>這裏收留了因不遵守摸魚法則而受到處罰的魚油。</span>
    <ul v-if="wall.length">
      <li v-for="w in wall" :key="w.userName">
        <section v-if="w.time - now > 0" class="thinking">
          <section class="user-info">
            <span class="avatar"><img :src="w.userAvatarURL" alt=""></span>
            <span class="flex flex-col">
              <span class="username">{{ w.userNickname || w.userName }}</span>
              <a class="link-btn" href="javascript:void(0)" @click="askGive(w)">為他求情</a>
            </span>
          </section>
          <section class="count-timer">
            <p>
              剩餘
            </p>
            <span class="count-timer-val">
              {{ getTimeLeft(w.time - now) }}
            </span>
          </section>
        </section>
      </li>
    </ul>
    <div v-else style="color: rgb(60, 175, 54); font-weight: bold;">
      目前沒有受到處罰的魚油，請繼續保持！
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      wall: null,
      now: new Date().getTime()
    }
  },
  computed: {
  },
  mounted() {
    setInterval(() => {
      this.now = new Date().getTime();
    }, 1000)
    this.getThinkingWall();
    this.loop();
  },
  methods: {
    async askGive(w) {
      await this.$root.fishpi.chatroom.send(`合议破戒 ${w.userName}`);
      this.$message.success(`已为${w.userNickname || w.userName}求情`, {
        duration: 3000
      })
    },
    loop() {
      setTimeout(() => {
        this.getThinkingWall().then(() => {
          this.loop();
        });
      }, 5000);
    },
    getThinkingWall() {
      return fetch('https://fishpi.cn/chat-room/si-guo-list').then(res => res.json()).then(res => {
        this.wall = res.data
      })
    },
    // 将时间戳的差值转为时间字符串，值为0的不显示
    getTimeLeft(left) {
      let days = Math.floor(left / (24 * 3600 * 1000));
      let hours = Math.floor((left % (24 * 3600 * 1000)) / (3600 * 1000));
      let minutes = Math.floor((left % (3600 * 1000)) / (60 * 1000));
      let seconds = Math.floor((left % (60 * 1000)) / 1000);
      let timeStr = '';
      if (days > 0) {
        timeStr += days + '天';
      }
      if (hours > 0) {
        timeStr += hours + '小时';
      }
      if (minutes > 0) {
        timeStr += minutes + '分钟';
      }
      if (seconds > 0) {
        timeStr += seconds + '秒';
      }
      return timeStr;      
    },
  }
}
</script>

<style lang="less" scoped>
.layout {
  text-align: center;
  ul {
    padding: 0;
    list-style: none;
  }
  .thinking {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .user-info {
      display: flex;
      .avatar {
        display: inline-block;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 5px 1px rgba(230, 230, 230, .5);
        img {
          object-fit: cover;
          width: 100%;
        }
      }
      .username {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
      }
      .link-btn {
        display: inline-block;
        margin-left: 10px;
        border-radius: 5px;
        font-size: 12px;
        text-decoration: none;
        color: royalblue;
        font-weight: bold;
      }
    }
    .count-timer {
      font-weight: bold;
      .count-timer-val {
        
        color: rgb(219, 148, 26);
      }
    }
  }
}
</style>

