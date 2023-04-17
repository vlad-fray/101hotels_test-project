const MODAL_TYPES = {
    ADD_COMMENT_FORM: 'ADD_COMMENT_FORM',
    MEME_WIDGET: 'MEME_WIDGET',
}

const state = {
    shownModal: null,
}

const mutations = {
    OPEN_MODAL(state, payload) {
        state.shownModal = payload;
    },
    CLOSE_MODAL(state) {
        state.shownModal = null
    },
}

export { MODAL_TYPES };

export default {
    namespaced: true,
    state: () => state,
    mutations,
}