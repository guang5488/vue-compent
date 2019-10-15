<template>
  <div class="Tabbar">
    <div class="Tabbar-item" v-for="(item, index) in list" :key="index" @click="toPage(item)">
      <img
        :src="active == item.pagePath ? item.selectedIconPath : item.iconPath"
        class="Tabbar-item-img"
      />
      <div class="Tabbar-item-text" :class="active == item.pagePath ? 'active' : ''">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: "/",
      list: [
        {
          pagePath: "/",
          iconPath: require("@/assets/tabbar/home.png"),
          selectedIconPath: require("@/assets/tabbar/home_cur.png"),
          text: "首页"
        },
        {
          pagePath: "/house",
          iconPath: require("@/assets/tabbar/fangchan.png"),
          selectedIconPath: require("@/assets/tabbar/fangchan_cur.png"),
          text: "房产"
        },
        {
          pagePath: "/service",
          iconPath: require("@/assets/tabbar/order.png"),
          selectedIconPath: require("@/assets/tabbar/order_cur.png"),
          text: "服务单"
        },
        {
          pagePath: "/my",
          iconPath: require("@/assets/tabbar/my.png"),
          selectedIconPath: require("@/assets/tabbar/my_cur.png"),
          text: "我的"
        }
      ]
    };
  },
  methods: {
    toPage(res) {
      if (res.pagePath == this.active) return;

      this.$router.push({
        path: res.pagePath
      });
    },
    renderPath() {
      let path = this.$route.path;
      this.active = path;
    }
  },
  watch: {
    "$route.fullPath"(val) {
      this.renderPath();
    }
  },
  created() {
    this.renderPath();
  }
};
</script>

<style lang="scss" scoped>
.Tabbar {
  display: flex;
  background-color: #ffffff;
  &-item {
    height: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    &-img {
      width: 50px;
      height: 44px;
      display: block;
    }
    &-text {
      font-size: 24px;
      color: #83888c;
      margin-top: 8px;
      display: block;
      &.active {
        color: #333333;
      }
    }
  }
}
</style>