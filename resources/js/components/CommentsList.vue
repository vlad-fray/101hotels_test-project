<template>
    <ul class="comments">
        <li class="comment comment_header">
            <span>Id</span>
            <span>Comment text</span>
            <span>Publish date</span>
        </li>

        <li
            v-for="comment in formattedComments"
            :key="comment.id"
            class="comment comment_item"
        >
            <p class="comment__id">
                <button
                    type="button"
                    class="comment__delete"
                    @click="deleteCommentById(comment.id)"
                ></button>

                <span>{{ comment.id }}</span>
            </p>
            <span>{{ comment.text }}</span>
            <span>{{ comment.date }}</span>
        </li>

        <p v-if="!formattedComments.length">
            No matches found
        </p>

        <button 
            type="button"
            class="comments__open-button"
            @click="openAddCommentModal"
        >
            Add comment +
        </button>
    </ul>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { MODAL_TYPES } from '../store/modals';

export default {
    props: {
        comments: {
            type: Array,
            required: true,
        },
    },
    computed: {
        formattedComments() {
            return this.comments.map((comment) => {
                const date = new Date(comment.date);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();

                return {
                    ...comment,
                    date: `${month}/${day}/${year}`,
                };
            });
        },
    },
    methods: {
        ...mapActions({
            deleteCommentById: 'comments/deleteCommentById',
        }),
        ...mapMutations({
            OPEN_MODAL: 'modals/OPEN_MODAL',
        }),
        openAddCommentModal() {
            this.OPEN_MODAL(MODAL_TYPES.ADD_COMMENT_FORM);
        },
    },
};
</script>

<style scoped>
.comments {
    container-type: inline-size;
    container-name: comments;
    margin: 0;
    padding: 0;
}

.comment {
    display: grid;
    grid-template-columns: 48px 1fr 150px;
}

.comment_header {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #000000;
}

.comment_item {
    gap: 16px;
    margin-bottom: 16px;
}

.comment__id {
    display: flex;
    margin: 0;
}

.comment__delete {
    display: block;
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    cursor: pointer;
}

.comment__delete::before,
.comment__delete::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 2px;
    height: 10px;
    background-color: #000000;
}

.comment__delete::before {
    left: 5px;
    top: 2px;
    transform: rotate(45deg);
}

.comment__delete::after {
    left: 5px;
    top: 2px;
    transform: rotate(-45deg);
}

.comment span {
    word-break: break-word;
}

@container comments (max-width: 600px) {
    .comment {
        grid-template-columns: 48px 1fr 90px;
    }
}
</style>