<template>
  <div class="Upload">
    <input
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
      ref="file"
    />
    <slot v-if="isSlot"></slot>
    <div class="Upload-icon" v-else>
      <!-- <i class="iconfont icon-shumajiadian"></i> -->
      <div class="Upload-text">添加图片</div>
    </div>
    <div v-show="hasupload" class="loading-container">
      <Loading class="loading"></Loading>
    </div>
  </div>
</template>
<script>
import Loading from "@/components/Loading/Loading";
export default {
  name: "Upload",
  props: {
    name: {
      type: String,
      default: "file"
    },
    accept: {
      type: String,
      default: "image/*"
    },
    url: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    beforeUpload: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    }
  },
  data() {
    return {
      isSlot: false,
      isShowFile: true,
      hasupload: false
    };
  },
  methods: {
    upLoad() {
      this.$refs.file.click();
      this.isShowFile = false;
    },
    handleChange(e) {
      this.isShowFile = true;
      this.files = e.target.files;
      // console.log(e.target.files);
      let data = this.beforeUpload && this.beforeUpload(this.files);

      if (data === false) {
        throw "beforeUpload 返回false将不能再次执行change事件";
        this.$refs.file.value = null;
        return;
      }
      this.submit();
    },
    submit() {
      this.hasupload = true;
      // console.log(this.files);
      let len = this.files.length;
      if (len == 1) {
        this.upload();
      } else if (len > 1) {
        this.uploads();
      }
    },
    // 单图上传
    upload() {
      let formData = new FormData();
      formData.append(this.name, this.files[0]);
      let obj = {
        method: "POST",
        body: formData
      };

      fetch(this.url, obj)
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.uploadSuccess(res);
        })
        .catch(err => {
          this.uploadError(err);
        });
    },
    // 多图上传
    uploads() {
      let len = this.files.length;
      let index = 0;
      let data = [];
      for (let i = 0; i < len; i++) {
        let formData = new FormData();
        formData.append(this.name, this.files[i]);

        let obj = {
          method: "POST",
          body: formData
        };

        fetch(this.url, obj)
          .then(res => {
            return res.json();
          })
          .then(res => {
            index++;
            data.push(res);
            if (index >= len) {
              this.uploadSuccess(data);
            }
          })
          .catch(err => {
            index++;
            data.push(err);
            if (index >= len) {
              this.uploadSuccess(data);
            }
          });
      }
    },
    uploadSuccess(data) {
      this.hasupload = false;
      this.onSuccess && this.onSuccess(data);
      this.$refs.file.value = null;
    },
    uploadError(data) {
      this.hasupload = false;
      this.onError && this.onError(data);
    }
  },
  created() {
    if (this.$slots.default) {
      this.isSlot = true;
    } else {
      this.isSlot = false;
    }
  },
  components: {
    Loading
  }
};
</script>
<style scoped lang="scss">
.Upload {
  position: relative;
  input[type="file"] {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    z-index: 2;
    cursor: pointer;
  }
  &-icon {
    width: 149px;
    height: 149px;
    border: 2px dashed #e4e4e4;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    color: #bfbfbf;
    box-sizing: border-box;
    & .Upload-text {
      margin-top: 20px;
    }
    & i {
      font-size: 40px;
    }
  }
  .loading-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.1);
    z-index: 50;
    & .loading {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
  }
}
</style>