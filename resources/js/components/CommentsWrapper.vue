<template>
    <div class="comments-wrapper">
        <div class="comments-actions">
            <div class="sorts">
                <h4 class="sorts__description">Sort By:</h4>

                <button 
                    type="button" 
                    class="sorts__toggle-by" 
                    @click="changeSort(SORTS_TYPES.BY_ID)"
                >
                    <span>id</span>
                    <span
                        :class="[
                            'sorts__direction',
                            sort?.value === SORTS_BY_ID.ASC && 'sorts__direction_asc',
                            sort?.value === SORTS_BY_ID.DESC && 'sorts__direction_desc',
                        ]"
                    ></span>
                </button>

                <button
                    type="button" 
                    class="sorts__toggle-by"
                    @click="changeSort(SORTS_TYPES.BY_DATE)"
                >
                    <span>date published</span>
                    <span
                        :class="[
                            'sorts__direction',
                            sort?.value === SORTS_BY_DATE.ASC && 'sorts__direction_asc',
                            sort?.value === SORTS_BY_DATE.DESC && 'sorts__direction_desc',
                        ]"
                    ></span>
                </button>
            </div>

            <date-picker 
                v-model="filterDateRange" 
                range 
                placeholder="Filter by publish date"
            ></date-picker>
        </div>

        <comments-list 
            :comments="currentPageComments" 
            @delete-comment="deleteComment" 
            @add-new-comment="createNewComment"
        />

        <pagination-list 
            :current-page="currentPage"
            :pages-count="pagesCount" 
            @set-page="(page) => currentPage = page" 
        />
    </div>
</template>

<script>
import { API } from '../api';


import CommentsList from './CommentsList.vue';
import PaginationList from './PaginationList.vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

const PAGE_SIZE = 3;

export default {
    components: {
        CommentsList,
        PaginationList,
        DatePicker,
    },
    data() {
        return {
            SORTS_TYPES: {
                BY_ID: 'by_id',
                BY_DATE: 'by_date',
            },
            SORTS_BY_ID: {
                ASC: 'id_asc',
                DESC: 'id_desc',
            },
            SORTS_BY_DATE: {
                ASC: 'date_asc',
                DESC: 'date_desc',
            },
            comments: [],
            sort: null,
            currentPage: 1,
            filterDateRange: [],
        };
    },
    computed: {
        filteredComments() {
            if (this.filterDateRange[0] && this.filterDateRange[1]) {
                return this.comments.filter((comment) => {
                    return new Date(comment.date).getTime() < this.filterDateRange[1].getTime()
                        && new Date(comment.date).getTime() > this.filterDateRange[0].getTime();
                })
            }
            
            return this.comments;
        },
        sortedComments() {
            if (this.sort?.type === this.SORTS_TYPES.BY_ID) {
                return [...this.filteredComments].sort((comA, comB) => this.sort.value === this.SORTS_BY_ID.ASC 
                    ? comA.id - comB.id
                    : comB.id - comA.id
                );
            }

            if (this.sort?.type === this.SORTS_TYPES.BY_DATE) {
                return [...this.filteredComments].sort((comA, comB) => this.sort.value === this.SORTS_BY_DATE.ASC 
                    ? new Date(comA.date).getTime() - new Date(comB.date).getTime()
                    : new Date(comB.date).getTime() - new Date(comA.date).getTime()
                );
            }

            return this.filteredComments;
        },
        currentPageComments() {
            return this.sortedComments
                .slice((this.currentPage - 1) * PAGE_SIZE, this.currentPage * PAGE_SIZE)
        },
        pagesCount() {
            return Math.ceil(this.sortedComments.length / PAGE_SIZE);
        },
    },
    mounted() {
        this.getAllComments();
    },
    methods: {
        async getAllComments() {
            const comments = await API.getAllComments();

            if (comments) {
                return this.comments = [...comments];
            }

            this.comments = [];
        },
        async createNewComment(newComment) {
            const trimmedComment = newComment.trim();

            if (!trimmedComment) return;

            const success = await API.createComment({
                name: 'Vladislav',
                text: trimmedComment, 
                date: String(new Date()),
            });

            if (success) {
                this.getAllComments();
            }
        },
        async deleteComment(id) {
            const success = await API.deleteCommentById(id);

            if (!success) return;
            
            await this.getAllComments();

            if (this.currentPage > this.pagesCount) {
                this.currentPage = this.pagesCount;
            } 
        },
        changeSort(type) {
            if (type === this.SORTS_TYPES.BY_ID) {
                this.updateSortById();
            }

            if (type === this.SORTS_TYPES.BY_DATE) {
                this.updateSortByDate();
            }
        },
        updateSortById() {
            const SORTS_BY_ID = [null, this.SORTS_BY_ID.ASC, this.SORTS_BY_ID.DESC];
    
            if (this.sort?.type === this.SORTS_TYPES.BY_ID) {
                const nextIndex = (SORTS_BY_ID.findIndex((sort) => sort == this.sort.value) + 1) % 3;
                this.sort = nextIndex !== 0 
                    ? { type: this.SORTS_TYPES.BY_ID, value: SORTS_BY_ID[nextIndex] } 
                    : null;
            } else {
                this.sort = { type: this.SORTS_TYPES.BY_ID, value: SORTS_BY_ID[1] };
            }
        },
        updateSortByDate() {
            const SORTS_BY_DATE = [null, this.SORTS_BY_DATE.ASC, this.SORTS_BY_DATE.DESC];

            if (this.sort?.type === this.SORTS_TYPES.BY_DATE) {
                const nextIndex = (SORTS_BY_DATE.findIndex((sort) => sort == this.sort.value) + 1) % 3;
                this.sort = nextIndex !== 0 
                    ? { type: this.SORTS_TYPES.BY_DATE, value: SORTS_BY_DATE[nextIndex] } 
                    : null;
            } else {
                this.sort = { type: this.SORTS_TYPES.BY_DATE, value: SORTS_BY_DATE[1] };
            }
        },
    },
};
</script>

<style scoped>
.comments-wrapper {
    container-type: inline-size;
    container-name: comments-wrapper;
}

.comments-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
}

.sorts {
    display: flex;
    align-items: center;
}

.sorts__description {
    margin: 0;
    margin-right: 16px;
}

.sorts__toggle-by {
    display: grid;
    grid-template-columns: 1fr 16px;
    align-content: center;
    gap: 16px;
}

.sorts__direction {
    display: block;
    content: "";
    width: 8px;
    height: 8px;
    border-left: 1px solid #00000044;
    border-bottom: 1px solid #00000044;
    transform: rotate(-45deg);
}

.sorts__direction_asc {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
}

.sorts__direction_desc {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    transform: rotate(135deg);
}

@container comments-wrapper (max-width: 768px) {
    .comments-actions {
        flex-direction: column;
    }
}
</style>