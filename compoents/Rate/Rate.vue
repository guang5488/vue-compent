<template>
  <div class="Rate" :class="size">
    <div class="Rate-radio-group">
      <template v-if="disable">
        <div class="Rate-radio" v-for="(item, index) in list" :key="index">
          <img :src="check(item.checked)" mode="scaleToFill" class="Rate-icon" />
          <!-- <div class="Rate-icon" :class="item.checked ? 'active' : ''"></div> -->
        </div>
      </template>
      <template v-else>
        <div
          class="Rate-radio"
          v-for="(item, index) in list"
          :key="index"
          @click="handleSelect(item)"
        >
          <img :src="check(item.checked)" mode="scaleToFill" class="Rate-icon" />
          <!-- <div class="Rate-icon" :class="item.checked ? 'active' : ''"></div> -->
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rate",
  props: {
    value: {
      type: Number
    },
    count: {
      type: Number,
      default: 5
    },
    size: {
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    handleSelect(item) {
      let id = item.id;
      for (let i = 0, len = this.list.length; i < len; i++) {
        if (i < id) {
          this.list[i].checked = true;
        } else {
          this.list[i].checked = false;
        }
      }
      this.$emit("change", id);
    },
    check(checked) {
      return checked
        ? require("./icon/icon-xingxing-on.png")
        : require("./icon/icon-xingxing.png");
    }
  },
  created() {
    for (let i = 1; i <= this.count; i++) {
      let obj = {
        checked: i <= this.value,
        id: i
      };
      this.list.push(obj);
    }
  }
};
</script>
<style lang="scss" scoped>
.Rate-radio-group {
  //display: block;
}

.Rate-radio {
  display: inline-block;

  & + & {
    margin-left: 26px;
  }

  //& .Rate-icon{
  //  font-size: .38rem;
  //}
}
.Rate-icon {
  display: inline-block;
  width: 40px;
  height: 38px;
  // background: url("./images/icon-xingxing.png") no-repeat 0 0 / 40px 86px;

  &.active {
    background-position: 0 -48px;
  }
}
.Rate.mini {
  & .Rate-icon {
    width: 20px;
    height: 18px;
  }
  .Rate-radio + .Rate-radio {
    margin-left: 7px;
  }
}
</style>
