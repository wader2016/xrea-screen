<template>
  <div class="bg">
    <div v-if="leftTop" :style="style" class="left-top"></div>
    <div v-if="leftBottom" :style="style" class="left-bottom"></div>
    <div v-if="rightTop" :style="style" class="right-top"></div>
    <div v-if="rightBottom" :style="style" class="right-bottom"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'bg',
  props: {
    borderColor: {
      type: String,
      default: '#54cefe'
    },
    borderW: {
      type: String,
      default: '4px'
    },
    borderH: {
      type: String
    },
    borderSize: {
      type: String,
      default: '1px'
    },
    leftTop: {
      type: Boolean,
      default: true
    },
    leftBottom: {
      type: Boolean,
      default: true
    },
    rightTop: {
      type: Boolean,
      default: true
    },
    rightBottom: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style () {
      return {
        width: this.borderW,
        height: this.borderH ? this.borderH : this.borderW,
        borderWidth: this.borderSize,
        borderColor: this.borderColor
      }
    }
  }
}
</script>

<style lang="less">
.bg{
  position: relative;
  .left-top, .left-bottom, .right-top, .right-bottom{
    position: absolute;
    z-index: 100;
  }
  .left-top{
    top: 0;
    left: 0;
    border-left: 1px solid #54cefe;
    border-top: 1px solid #54cefe;
  }
  .right-top{
    top: 0;
    right: 0;
    border-right: 1px solid #54cefe;
    border-top: 1px solid #54cefe;
  }
  .left-bottom{
    left: 0;
    bottom: 0;
    border-left: 1px solid #54cefe;
    border-bottom: 1px solid #54cefe;
  }
  .right-bottom{
    right: 0;
    bottom: 0;
    border-right: 1px solid #54cefe;
    border-bottom: 1px solid #54cefe;
  }
}
</style>
