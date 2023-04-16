<template>
    <main class="app-wrapper">
        <section class="comments-wrapper">
            <comments-wrapper />
        </section>
        
        <meme-widget />
    </main>
</template>

<script>
import CommentsWrapper from '../components/CommentsWrapper.vue';
import MemeWidget from '../components/MemeWidget.vue';

export default {
    components: {
        MemeWidget,
        CommentsWrapper,
    },    
};
</script>

<style scoped>
.app-wrapper {
    font-family: sans-serif;
    position: relative;
    width: 100%;
    min-height: 100vh;
}

.comments-wrapper {
    width: 100%;
    max-width: 1200px;
    min-width: 320px;
    margin: 0 auto;
    padding: 32px 16px;
}

@media screen and (max-width: 600px) {
    .comments-wrapper {
        padding: 16px 8px;
    }
}
</style>