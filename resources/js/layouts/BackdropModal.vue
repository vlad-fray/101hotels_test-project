<template>
    <div class="backdrop-modal" @click="$emit('close-modal')">
        <slot></slot>
    </div>
</template>

<style scoped>
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