<template>
  <div class="add-wraper">
    <div>
      <label class="name-label">名称</label>
      <div class="name-input">
        <cube-input v-model="name" :clearable="true"></cube-input>
      </div>
    </div>
    <div>
      <label class="name-label">链接</label>
      <div class="name-input">
        <cube-input v-model="link" :clearable="true"></cube-input>
      </div>
    </div>
    <div>
      <label class="name-label">图标</label>
      <div class="name-input icon-wrapper">
        <cube-upload
          ref="upload"
          v-model="files"
          :process-file="processFile"
          @files-added="addedHandler"
          @file-error="errHandler"
          @file-click="fileClickHandler"
          @input="inputHandler"
        >
          <div class="clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
              <div>
                <i>＋</i>
                <p>点击选择图片</p>
              </div>
            </cube-upload-btn>
          </div>
        </cube-upload>
      </div>
    </div>
  </div>
</template>
<script>
import compress from "../utils/image";
export default {
  name: "Add",
  data() {
    return {
      name: "",
      link: "",
      action: "//jsonplaceholder.typicode.com/photos/",
      files: []
    };
  },
  beforeCreate () {
      //初始化icon，保存图标
      this.icon;
  },
  methods: {
    processFile(file, next) {
      //定义图片压缩处理函数，处理成base64
      compress(
        file,
        {
          compress: {
            width: 1600,
            height: 1600,
            quality: 0.5
          }
        },
        next
      );
    },
    addedHandler() {
      const file = this.files[0];
      file && this.$refs.upload.removeFile(file);
    },
    errHandler(file) {
      // const msg = file.response.message
      this.$createToast({
        type: "warn",
        txt: "Upload fail",
        time: 1000
      }).show();
    },
    fileClickHandler() {
      debugger;
    },
    inputHandler() {
      let file = this.$refs.upload && this.$refs.upload.files[0];
      //file为cube-upload内部属性
      if (!!file && file.status === 'ready') {//文件处理完成
        console.log(file.base64);
        //将base64文件发送给主进程
        // window.ipcRenderer.send('save-icon', file.base64);
        this.icon = file.base64;
      }
    }
  }
};
</script>
<style lang="less" scopped>
.add-wraper {
  padding: 10px;
  box-sizing: border-box;
  .name-label {
    display: inline-block;
  }
  .name-input {
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
  }
  .icon-wrapper {
    //   text-align: center;
    width: 100%;
  }
}

.cube-upload .cube-upload-file,
.cube-upload .cube-upload-btn {
  margin: 0;
  height: 100px;
}
.cube-upload .cube-upload-file {
  margin: 0;
}
.cube-upload .cube-upload-file + .cube-upload-btn {
  margin-top: -200px;
  opacity: 0;
}
.cube-upload .cube-upload-file-def {
  width: 100%;
  height: 100%;
}
.cube-upload .cube-upload-file-def .cubeic-wrong {
  display: none;
}
.cube-upload .cube-upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cube-upload .cube-upload-btn > div {
  text-align: center;
}
.cube-upload .cube-upload-btn i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 32px;
  line-height: 1;
  font-style: normal;
  color: #fff;
  background-color: #333;
  border-radius: 50%;
}
</style>