<template>
    <div class="pagination">
        <button
            v-for="page in pagesCount"
            :key="page"
            type="button"
            class="pagination__button"
            @click="$emit('set-page', page)"
        >
            {{ page }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        pagesCount: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 16px;
}

.pagination__button {
    margin-top: 8px;
}

.pagination__button:not(:last-of-type) {
    margin-right: 8px;
}
</style>