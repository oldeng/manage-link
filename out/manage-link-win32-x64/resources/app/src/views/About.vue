<template>
  <cube-page type="scroll-view" title="Scroll" class="option-demo">
    <div slot="content" class="scroll-wrapper">
      <div class="demo">
        <div class="title">快捷方式</div>
        <cube-scroll
          ref="scroll"
          :data="items"
          direction="horizontal"
          class="horizontal-scroll-list-wrap">
          <ul class="list-wrapper">
            <li v-for="item in items" class="list-item">{{ item }}</li>
          </ul>
        </cube-scroll>
        <div class="btns">
          <cube-button :primary="true">添加快捷方式</cube-button>
        </div>
      </div>
    </div>
  </cube-page>
</template>

<script type="text/ecmascript-6">
import CubePage from '../components/cube-page.vue'
const _data = [
  '😀 😁 😂 🤣 😃 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '🙂 🤔 😄 🤨 😐 🙃 ',
  '👈🏻  scroll 👉🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ ',
  '👈🏻  scroll 👉🏻 ',
  '🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👈🏻  scroll 👉🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 ',
  '👈🏻  scroll 👉🏻 ',
  '🤓 🤓 🤓 🤓 🤓 🤓 ',
  '👈🏻  scroll 👉🏻 ',
  '🦔 🦔 🦔 🦔 🦔 🦔 ',
  '👈🏻  scroll 👉🏻 ',
  '🙈 🙈 🙈 🙈 🙈 🙈 ',
  '👈🏻  scroll 👉🏻 ',
  '🚖 🚖 🚖 🚖 🚖 🚖 ',
  '👈🏻  scroll 👉🏻 ',
  '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 '
]
export default {
  data() {
    return {
      items: _data
    }
  },
  components: {
    CubePage
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.horizontal-scroll-list-wrap
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  .cube-scroll-content
    display: inline-block
  .list-wrapper
    padding: 0 10px
    line-height: 60px
    white-space: nowrap
  .list-item
    width: 300px;
    height 300px;
    border 1px solid  red;
    display: inline-block

  .btns {
    height 50px;

  }
</style>