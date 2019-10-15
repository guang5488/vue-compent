<template>
  <div class="Radio">
    <label>
      <input type="radio" :checked="value == label" :name="name" @change="handleChange"/>
      <i></i>
      <div class="text">
        <slot v-if="isSlot"></slot>
        <span v-else>{{label}}</span>
      </div>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        required: true
      }
    },
    data() {
      return {
        isSlot: false,
        value: this.$parent.value,
        name: this.$parent.tempName,  //获取父组件的name值
      }
    },
    methods: {
      handleChange(res) {
        this.$parent.handleChange(this.label);
      }
    },
    created() {
      if(this.$slots.default) {
        this.isSlot = true;
      }
    },
    mounted () {
    },
  }
</script>

<style lang="scss" scoped>
  .Radio{
    display: inline-block;
    line-height: 60px;
    & label{
      display: flex;
      align-items: center;
    }
    & input[type=radio] {
      display: none;
      &+i{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #b9b9b9;
        display: inline-block;
        position: relative;
        &:before{
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: transparent;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: all .1s;
        }
      }
      &~.text{
        font-size: 30px;
        color: #aaaaaa;
        margin-left: 10px;
        padding-right: 20px;
      }

      &:checked{
        &+i{
          &:before{
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #ff631e;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        &~.text{
          color: #333333;
        }
      }
    }
  }
</style>