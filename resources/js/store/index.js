import Vue from 'vue'
import Vuex from 'vuex'

import comments from './comments';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        comments,
    },
});

export { store };