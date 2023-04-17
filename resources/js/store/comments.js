import { API } from '../api';

const state = {
    comments: [],
}

const mutations = {
    SET_COMMENTS(state, payload) {
        state.comments = [...payload];
    },
}

const actions = {
    async getAllComments({ commit }) {
        const comments = await API.getAllComments();

        commit('SET_COMMENTS', comments ?? []);
    },
    async createNewComment({ dispatch }, payload) {
        const success = await API.createComment(payload);

        if (success) {
            await dispatch('getAllComments');
        }
    },
    async deleteCommentById({ dispatch }, id) {
        const success = await API.deleteCommentById(id);

        if (!success) return;
        
        await dispatch('getAllComments');
    },
}

export default {
    namespaced: true,
    state: () => state,
    mutations,
    actions,
}