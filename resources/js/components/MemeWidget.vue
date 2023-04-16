<template>
    <aside class="meme-wrapper">
        <div
            v-if="isMemeModalShown"
            class="meme-modal"
            @click="isMemeModalShown = false"
        >
            <div class="meme-content">
                <button
                    type="button"
                    class="meme-button"
                    @click.stop="isMemeModalShown = false"
                >
                    Close Dialog
                </button>    
            </div>   
        </div>

        <button
            type="button"
            class="meme-button"
            @click="isMemeModalShown = !isMemeModalShown"
        >
            Open Dialog
        </button>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            isMemeModalShown: false,
        };
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

.meme-modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    background-color: #00000011;
}

.meme-button {
    color: #ffffff;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary);
    border: none;
    box-shadow: inset 0 0 1px 0 var(--color-primary-hover);
    cursor: pointer;
}

.meme-button:hover {
    background-color: var(--color-primary-hover);
}
</style>