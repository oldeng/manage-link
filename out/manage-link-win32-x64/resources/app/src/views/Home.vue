<template>
  <cube-page type="scroll-view" title="Scroll" class="option-demo">
    <div slot="content" class="scroll-wrapper">
      <div class="demo">
        <div class="title">{{ title }}</div>
        <cube-scroll
          ref="scroll"
          :data="items"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
        >
          <ul class="list-wrapper">
            <li v-for="item in items" class="list-item" @click="gotoLink(item)">
              <span class="item-span item-title">{{item.name}}</span>
              <img class="item-span" :src="item.icon"></img>
            </li>
          </ul>
        </cube-scroll>
        <div class="btns">
          <cube-button :primary="true" @click="addLink">添加快捷方式</cube-button>
        </div>
      </div>
    </div>
  </cube-page>
</template>
<script>
import CubePage from "../components/cube-page.vue";
import Add from './Add';
// const { ipcRenderer } = require("electron");

export default {
  data() {
    return {
      title: '',
      items: []
    };
  },
  beforeCreate () {
    ipcRenderer.on("open-window-reply", (event, arg) => {
      console.log(arg); // prints "pong"
    });
    ipcRenderer.on("get-links", (event, arg) => {
      console.log('收到链接列表', arg);
      this.title = arg.title;
      this.items = arg.links;
    });
    ipcRenderer.send('get-links');
  },
  created() {

  },
  methods: {
    addLink() {
      let _this = this;
      this.dialog = this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: '保存',
          active: true
        },
        onConfirm: function (e) {
          console.log(e);
          console.log(_this);
          console.log(_this.dialog)
          //获取图片上传组件的图片
          let name = _this.dialog.$slots.content[0].context.$refs.uploader.name;
          let link = _this.dialog.$slots.content[0].context.$refs.uploader.link;
          let icon = _this.dialog.$slots.content[0].context.$refs.uploader.icon;
          window.ipcRenderer.send("save-link", {
            name: name,
            link: link,
            icon: icon
          });
        }
      }, (createElement) => {
        return [
          //标题插槽类容
          createElement('div', {
            style: {
            },
            ref:'title',
            'class': {
              'my-title': true
            },
            slot: 'title'
          }),
          //主要内容插槽
          this.addcomp = createElement(Add, {
            slot: 'content',
            ref: 'uploader'
          })
        ]
      });
      this.dialog.show();
    },
    gotoLink (item) {
      window.ipcRenderer.send("open-window", item);
    }
  },
  components: {
    CubePage,
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../stylus/variable.styl"

.title {
  color: $color-font;
}

.scroll-wrapper {
    background: rgba(58,58,58, 1);
    border-radius: 10px;
    width: 1000px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -250px;
    margin-left: -500px;
    .btns {
      margin: 30px auto;
      height: 50px;
      width: 50%;
  }
}
.horizontal-scroll-list-wrap {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  .cube-scroll-content {
    display: inline-block;
  }

  .list-wrapper {
    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
  }

  .list-item {
    width: 300px;
    height: 300px;
    border: 1px solid rgb(128,128,128);
    display: inline-block;
    cursor : pointer;
    padding 5px;
    // box-sizing: border-box;

     .item-span {
      // border: 1px solid red;
      background: rgb(231,53,51);
      display: block;
      width: 300px;
      height: 250px
    }

    .item-title {
      width: 300px;
      height: 50px
      color: $color-font;
    }
  }


}
</style>

