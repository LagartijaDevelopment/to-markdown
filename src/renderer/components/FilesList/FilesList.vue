<template>
	<div>
		<h3>File History</h3>
		<v-list>
			<template v-for="(file, index) in files">
				<v-list-tile :key="index" @click="onFileSelected(file.path)">
					<v-list-tile-content>
						<v-list-tile-title>{{ file.name }}</v-list-tile-title>
						<v-list-tile-sub-title>{{ file.path }}</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-divider :key="file.name + index"></v-divider>
			</template>
		</v-list>
	</div>
</template>

<script>
	export default {
		props: {
			files: Array
		},
		data() {
			return {};
		},
		methods: {
			onFileSelected(filePath) {
				this.$emit('file-selected', filePath);
			}
		}
	};
</script>

<style scoped>
	
</style>
