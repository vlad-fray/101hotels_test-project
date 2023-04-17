<template>
    <form
        action="#"
        class="add-comment"
        @click.stop
        @submit.prevent="addComment"
    >
        <label class="add-comment__label">
            <span>Your name: </span>

            <input 
                v-model="userName" 
                type="text" 
                class="add-comment__input"
                required
                maxlength="50"
                @focus="hasError = false"
            />
        </label>

        <label class="add-comment__label">
            <span>Text: </span>

            <input 
                v-model="newComment" 
                type="text" 
                class="add-comment__input"
                required
                maxlength="300"
                @focus="hasError = false"
            />
        </label>

        <p class="add-comment__label">
            <span>Publish date: </span>

            <date-picker v-model="date" @focus="hasError = false" />
        </p>

        <p v-if="hasError" class="add-comment__error">
            Some fields are invalid. Please, fulfill them correctly.
        </p>

        <button 
            type="submit" 
            class="add-comment__submit" 
            :disabled="isPending"
        >
            Create
        </button>
    </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: {
        DatePicker
    },
    data() {
        return {
            isPending: false,
            newComment: '',
            userName: '',
            date: null,
            hasError: null,
        }
    },
    methods: {
        ...mapActions({
            createNewComment: 'comments/createNewComment',
        }),
        ...mapMutations({
            CLOSE_MODAL: 'modals/CLOSE_MODAL',
        }),
        prepareFields() {
            this.newComment = this.newComment.trim();
            this.userName = this.userName.trim();
            this.date = this.date ? new Date(this.date) : null;
        },
        validateFields() {
            return (
                this.newComment.length
                && this.userName.length
                && this.date
            );
        },
        async addComment() {
            this.prepareFields();

            const areValid = this.validateFields();

            if (!areValid) {
                this.hasError = true;
                return;
            }

            this.isPending = true;
            await this.createNewComment({
                name: this.userName,
                text: this.newComment,
                date: this.date,
            });
            this.isPending = false;

            this.CLOSE_MODAL();
        },
    },
}
</script>

<style scoped>
.add-comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 24px;
    border-radius: 24px;
    background-color: #ffffff;
}

.add-comment__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add-comment__label:not(:last-of-type) {
    margin-bottom: 16px;
}

.add-comment__input {
    width: 100%;
    max-width: 200px;
}

.add-comment__submit {
    margin-top: 24px;
}

.add-comment__error {
    color: red;
}
</style>