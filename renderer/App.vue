<template>
  <div id="app">
    <router-view v-if="this.$root.info"/>
  </div>
</template>

<script>
import Fishpi from 'fishpi'
export default {
  async mounted() {
    // eslint-disable-next-line no-undef
    let key = await $ipc?.invoke('fishpi.info.token');
    this.$root.key = key || '';
    if  (this.$root.key) {
      this.$root.fishpi = new Fishpi(this.$root.key);
      this.$root.info = (await this.$root.fishpi.account.info()).data;
    }
    this.loaded = true;
  },
  data() {
    return {
      loaded: false
    }
  }
}
</script>

<style lang="less">
</style>
