import Vue from 'vue';
import Vuetify from 'vuetify';
import LandingPage from '@/components/LandingPage';

Vue.use(Vuetify);

describe('LandingPage.vue', () => {
	it('should render correct contents', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: h => h(LandingPage)
		}).$mount();

		expect(vm.$el.querySelector('.select-title').textContent).to.contain('Select file');
	});
});