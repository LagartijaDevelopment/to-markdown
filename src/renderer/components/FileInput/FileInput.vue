<template>
	<div id="file-upload">
		<v-icon x-large>backup</v-icon>
		<h3>Drop file here or click to upload</h3>
		<input type="file" class="file-input" @change="onFileChange">
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onFileChange(event) {
				const file = event.target.files[0];
				this.$emit('file-uploaded', file);
			}
		}
	};
</script>

<style scoped>
	#file-upload {
		padding: 10px;
		text-align: center;
		border-style: dashed;
		border-width: 2px;
		max-width: 300px;
		height: 170px;
		max-height: 170px;
		cursor: pointer;
		overflow: hidden;
		position: relative;
	}
	
	#file-upload>i {
		font-size: 80px !important;
	}
	
	.file-input {
		opacity: 0.0;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
</style>
