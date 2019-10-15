<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop="hidden">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click.stop="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click.stop="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    confirmBtnText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      showFlag: false,
      text: "请确认此操作"
    };
  },
  methods: {
    show(text) {
      this.text = text;
      this.showFlag = true;
    },
    hidden() {
      this.text = "";
      this.showFlag = false;
    },
    cancel() {
      //点击取消
      this.hidden();
      this.$emit("cancel");
    },
    confirm() {
      //点击确定
      this.hidden();
      this.$emit("confirm");
    }
  }
};
</script>

<style scoped lang="scss">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-content {
      animation: confirm-zoom 0.3s;
    }
  }
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: #333;
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: 25px;
        color: rgba(255, 255, 255, 0.5);
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 25px;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          color: rgba(255, 255, 255, 0.3);
          &.left {
            border-right: 1px solid rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>