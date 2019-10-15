<template>
  <div class="RadioGroup">
    <slot></slot>
  </div>
</template>

<script>
import { log } from "util";
export default {
  props: {
    value: {},
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tempName: ""
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },
  created() {
    if (typeof this.name !== "string") throw "RadioGroup: name必须是字符串";
    if (this.name) {
      this.tempName = this.name;
    } else {
      let random = "";
      for (let i = 0; i < 10; i++) {
        random += this.randomInt(0, 9);
      }

      console.log(random);

      this.tempName = `radio${random}`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>