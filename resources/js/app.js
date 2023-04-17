import Vue from 'vue'

import App from './views/app.vue'

import { store } from './store';

const app = new Vue({
    el: '#app',
    components: { App },
    store,
});