<template>
  <div class="preview-container">
	<div id="preview"></div>
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
      };
    }
  };
</script>

<style scoped>
  .preview-container {
    padding: 25px;
    background:black;
    height: 400px;
    color: white;
    overflow-y: scroll;
  }
</style>
