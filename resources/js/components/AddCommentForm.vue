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
export default {
    data() {
        return {
            newComment: '',
        }
    },
    methods: {
        addComment() {
            this.$emit('add-new-comment', this.newComment);
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