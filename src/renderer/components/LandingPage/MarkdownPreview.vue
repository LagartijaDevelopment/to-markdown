<template>
  <div id="preview" class="preview-container">
    <h4>Aquí va el preview</h4>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
  .preview-container {
    padding: 15px;
    background:black;
    height: 400px;
    color: white;
  }
</style>
