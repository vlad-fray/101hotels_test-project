<template>
    <aside class="meme-wrapper">
        <button
            type="button"
            :class="[
                'meme-button',
                !someModalShown && 'meme-button_ring',
            ]"
            @click="openMemeWidgetModal"
        >
            Click me
        </button>
    </aside>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import { MODAL_TYPES } from '../store/modals';

export default {
    computed: {
        ...mapState({
            someModalShown: (state) => state.modals.shownModal,
        }),
    },
    methods: {
        ...mapMutations({
            OPEN_MODAL: 'modals/OPEN_MODAL',
        }),
        openMemeWidgetModal() {
            this.OPEN_MODAL(MODAL_TYPES.MEME_WIDGET);
        }
    },
};
</script>

<style scoped>
.meme-wrapper {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    z-index: 10;
}
</style>