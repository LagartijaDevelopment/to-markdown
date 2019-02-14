<template>
	<div class="preview-container">
		<div v-html="fileOnHtml"></div>
	</div>
</template>

<script>
	export default {
		props: ['fileOnHtml'],
		data() {
			return {};
		}
	};
</script>

<style scoped>
	.preview-container {
		padding: 25px;
		background: black;
		height: 400px;
		color: white;
		overflow-y: scroll;
		text-align: justify;
	}
</style>
