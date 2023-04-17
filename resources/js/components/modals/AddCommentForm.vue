<template>
    <form
        action="#"
        class="add-comment"
        @click.stop
        @submit.prevent="addComment"
    >
        <input 
            v-model="newComment" 
            type="text" 
            class="add-comment__input" 
            maxlength="300"
        />

        <button 
            type="submit" 
            class="add-comment__submit" 
            :disabled="isPending"
        >
            Add comment
        </button>
    </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            isPending: false,
            newComment: '',
        }
    },
    computed: {
        ...mapMutations({
            CLOSE_MODAL: 'modals/CLOSE_MODAL',
        }),
    },
    methods: {
        ...mapActions({
            createNewComment: 'comments/createNewComment',
        }),
        async addComment() {
            this.isPending = true;
            await this.createNewComment(this.newComment);
            this.isPending = false;

            this.CLOSE_MODAL();
        },
    },
}
</script>

<style scoped>
.add-comment {
    display: flex;
}

.add-comment__input {
    width: 100%;
    max-width: 200px;
}

.add-comment__submit {
    flex-shrink: 0;
}
</style>