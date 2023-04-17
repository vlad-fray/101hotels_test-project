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
    async createNewComment({ dispatch }, newComment) {
        const trimmedComment = newComment.trim();

        if (!trimmedComment) return;

        const success = await API.createComment({
            name: 'Vladislav',
            text: trimmedComment, 
            date: String(new Date()),
        });

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

const getters = {

}

export default {
    namespaced: true,
    state: () => state,
    mutations,
    actions,
    getters,
}