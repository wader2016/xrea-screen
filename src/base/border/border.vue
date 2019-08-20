<template>
  <div class="border" :style="{height:outerH + 'px'}">
    <div class="border-line">
      <div class="inner">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'border',
  props: {
    outerH: {
      type: String
    }
  },
  data () {
    return {
      innerH: 0
    }
  },
  mounted () {
    this.innerH = parseInt(this.outerH) - 10
  }
}
</script>

<style scoped lang="less">
  .border {
    margin-bottom: 24px;
    width: 100%;
    height: auto;
    background: -webkit-linear-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
    background: -ms-radial-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
    background: linear-gradient(to right,rgba(38,116,186,0.3),rgba(84,206,254,0.3),rgba(38,116,186,0.3));
    border: 1px solid rgba(0,133,255,0.7);
    .border-line {
      margin: 4px;
      border-left: 2px solid #2b81ae;
      border-right: 2px solid #2b81ae;
      .inner {
        padding: 12px 20px;
        color: #fff;
        font-size: 20px;
        .header {
          z-index: 1;
          position: relative;
          &:before {
            content: ' ';
            display: block;
            height: 8px;
            width: 100%;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            background: linear-gradient(right,rgba(83,192,238,0),rgba(0,183,255,0.5));
            background: -webkit-linear-gradient(right,rgba(83,192,238,0),rgba(0,183,255,0.5));
            filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#53c0ee00',endColorStr='#00b7ff8c',gradientType='1');
            z-index: -1;
          }
        }
      }
    }
  }
</style>
