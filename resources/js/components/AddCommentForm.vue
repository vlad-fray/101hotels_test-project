<template>
    <form 
        action="#"
        class="add-comment" 
        @submit.prevent="addComment"
    >
        <input 
            v-model="newComment" 
            type="text" 
            class="add-comment__input" 
            maxlength="300"
        />

        <button type="submit" class="add-comment__submit">
            Add comment
        </button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            newComment: '',
        }
    },
    methods: {
        ...mapActions({
            createNewComment: 'comments/createNewComment',
        }),
        async addComment() {
            await this.createNewComment(this.newComment);
            this.newComment = '';
        },
    },
};
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