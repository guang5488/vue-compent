<template>
  <div class="loading">
    <img width="36" height="36" src="./loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 30px;
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>

