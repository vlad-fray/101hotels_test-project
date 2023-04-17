import Vue from 'vue'
import Vuex from 'vuex'

import comments from './comments';
import modals from './modals';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        comments,
        modals,
    },
});

export { store };