<template>
	<v-app :dark="isDark">
		<div class="switch-container">
			<v-switch label="Toggle theme" v-model="isDark"></v-switch>
		</div>
		<landing-page :dark-theme="isDark"></landing-page>
		<!-- <router-view></router-view> -->
	</v-app>
</template>

<script>
	import LandingPage from './components/LandingPage';

	export default {
		name: 'app',
		components: {
			LandingPage
		},
		data() {
			return {
				isDark: true
			};
		}
	};
</script>

<style>
	/* CSS */
	.switch-container {
		overflow: hidden;
	}

	.switch-container > .v-input {
		float: right;
		margin-left: -50%;
		margin-right: 1em;
	}
</style>
