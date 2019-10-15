<template>
  <div class="Message">
    <div class="Message-mask" v-if="mask"></div>
    <div class="Message-container">
      <i class="iconfont Message-icon" :class="renderIcon" v-if="icon"></i>
      <div class="Message-text" v-html="msg" v-if="msg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String,
    icon: String,
    timeout: Number,
    mask: {
      type: Boolean,
      default: false
    },
    callback: Function
  },
  computed: {
    renderIcon() {
      let data = `icon-${this.icon}`;

      if (this.icon == "loading") {
        data = `icon-${this.icon} animate-rotate`;
      }

      return data;
    }
  }
};
</script>

<style lang="scss" scope>
@import url("../fonts/iconfont.css");
.Message {
  // position: fixed;
  // z-index: 2000;
  // bottom: 0;
  // right: 0;
  // left: 0;
  // top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  font-size: 30px;
  &-mask {
    position: fixed;
    z-index: 2000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
  &-container {
    position: fixed;
    z-index: 2000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 6.5em;
    max-width: 80%;
    background: rgba(40, 40, 40, 0.85);
    text-align: center;
    border-radius: 0.3em;
    color: #fff;
    animation: yd-kf-zoom-in 0.06s ease forwards;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  &-icon {
    font-size: 2.4em;
    display: inline-block;
    & + .Message-text {
      padding-top: 0.8em;
    }
  }
  &-text {
    font-size: 1em;
    padding: 0 0.681em;
    margin: 0;
    word-break: break-all;
  }
}

.animate-rotate {
  animation: rotate 1s ease-in-out forwards infinite;
  position: relative;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>