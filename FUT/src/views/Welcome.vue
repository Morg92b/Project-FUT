<template>
    <div class="page-wrapper">
        <div class="container">
            <h1>Créer ton équipe maintenant !</h1>
            <Button to="/Home" class="big-button">GO</Button>
        </div>
    </div>
</template>


<script setup>
import Button from '@/components/Button.vue';
</script>

<style>
.page-wrapper {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/foot.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0rem;
}

.container h1 {
    font-size: 6rem;
    font-weight: 900;
    color: #ff4081;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    opacity: 0;
    animation: fadeIn 2s ease forwards, floatUpDown 3s ease-in-out infinite;
}

.big-button {
    transform: scale(1.4) !important;
}


@keyframes fadeIn {
    to {
        opacity: 1;
    }
}


@keyframes floatUpDown {

    0%,
    100% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-5px);
    }

    50% {
        transform: translateY(5px);
    }

    75% {
        transform: translateY(-5px);
    }
}
</style>
