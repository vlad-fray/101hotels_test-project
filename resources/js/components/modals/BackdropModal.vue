<template>
    <div class="modal-wrapper">
        <div
            v-if="currentComponent"
            class="backdrop-modal"
            @click="CLOSE_MODAL"
        >
            <component :is="currentComponent" />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import AddCommentForm from "./AddCommentForm.vue";
import MemeWidgetContent from './MemeWidgetContent.vue';

import { MODAL_TYPES } from "../../store/modals";

export default {
    components: {
        AddCommentForm,
        MemeWidgetContent,
    },
    computed: {
        ...mapState({
            shownModal: (state) => state.modals.shownModal,
        }),
        currentComponent() {
            switch (this.shownModal) {
                case MODAL_TYPES.ADD_COMMENT_FORM:
                    return "AddCommentForm";
                case MODAL_TYPES.MEME_WIDGET:
                    return "MemeWidgetContent";
                default:
                    return null;
            }
        },
    },
    methods: {
        ...mapMutations({
            CLOSE_MODAL: "modals/CLOSE_MODAL",
        }),
    },
};
</script>

<style scoped>
.modal-wrapper {
    position: relative;
}

.backdrop-modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    height: 100vh;
    width: 100vw;
    background-color: #00000011;
}
</style>