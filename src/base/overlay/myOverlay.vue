<template>
  <bm-overlay ref="customOverlay" :class="{sample: true}" pane="labelPane" @draw="draw">
    <bg border-w="8px" border-size="2px">
      <div class="text-overlay">
        <div v-text="text" class="inner-text"></div>
      </div>
    </bg>

  </bm-overlay>
</template>

<script>
import Bg from './../../base/bg/bg'
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 63 + 'px'
      el.style.top = pixel.y - 19 + 'px'
    }
  },
  components: {
    Bg
  }
}
</script>

<style scoped lang="less">

  .sample {
    background: rgba(0,183,255,0.3);
    overflow: hidden;
    white-space: nowrap;
    color: #fff;
    position: absolute;
  }
  .text-overlay {
    padding: 4px;
    text-align: center;
    .inner-text {
      padding: 8px 16px;
      border: 1px solid rgba(153,183,255,0.3);
      background: rgba(0,183,255,0.3);
      &:before {
        content: ' ';
        display: block;
        border-top: 8px solid rgba(153,183,255,0.3);
        border-right: 8px solid transparent;
        width: 0;
        top: 4px;
        left: 4px;
        position: absolute;
      }
    }
  }
</style>
