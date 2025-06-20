<template>
    <div class="wrapper">
        <button @click="handleClick">
            <slot>Rechercher</slot>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    to: String
})

const emit = defineEmits(['click'])
const router = useRouter()

function handleClick() {
    if (props.to) {
        router.push(props.to)
    } else {
        emit('click')
    }
}
</script>

<style scoped>
.wrapper {
    perspective: 500px;
    transform: rotatex(10deg);
    animation: rotateAngle 6s linear infinite;
    margin: auto;
    width: auto;
}

button {
    display: block;
    position: relative;
    margin: 0.5em 0;
    padding: 0.8em 2.2em;
    cursor: pointer;
    background: #ff4081;
    border: none;
    border-radius: 0.4em;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 500;
    mix-blend-mode: color-dodge;
    perspective: 500px;
    transform-style: preserve-3d;
}

button:before,
button:after {
    --z: 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
    mix-blend-mode: inherit;
    border-radius: inherit;
    transform-style: preserve-3d;
    transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
}

button span {
    mix-blend-mode: none;
    display: block;
}

button:after {
    background-color: #5D00FF;
}

button:before {
    background-color: #FF1731;
}

button:hover {
    background-color: #FFF65B;
    transition: background 0.3s 0.1s;
}

button:hover:before {
    --z: 0.04;
    animation: translateWobble 2.2s ease forwards;
}

button:hover:after {
    --z: -0.06;
    animation: translateWobble 2.2s ease forwards;
}

@keyframes rotateAngle {
    0% {
        transform: rotateY(0deg) rotateX(10deg);
        -webkit-animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
        animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }

    25% {
        transform: rotateY(20deg) rotateX(10deg);
    }

    50% {
        transform: rotateY(0deg) rotateX(10deg);
        -webkit-animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
        animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }

    75% {
        transform: rotateY(-20deg) rotateX(10deg);
    }

    100% {
        transform: rotateY(0deg) rotateX(10deg);
    }
}

@keyframes translateWobble {
    0% {
        opacity: 0;
        transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
    }

    16% {
        transform: translate3d(calc(var(--z) * 160px), calc(var(--z) * 160px), calc(var(--z) * 160px));
    }

    28% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 70px), calc(var(--z) * 70px), calc(var(--z) * 70px));
    }

    44% {
        transform: translate3d(calc(var(--z) * 130px), calc(var(--z) * 130px), calc(var(--z) * 130px));
    }

    59% {
        transform: translate3d(calc(var(--z) * 85px), calc(var(--z) * 85px), calc(var(--z) * 85px));
    }

    73% {
        transform: translate3d(calc(var(--z) * 110px), calc(var(--z) * 110px), calc(var(--z) * 110px));
    }

    88% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 90px), calc(var(--z) * 90px), calc(var(--z) * 90px));
    }

    100% {
        opacity: 1;
        transform: translate3d(calc(var(--z) * 100px), calc(var(--z) * 100px), calc(var(--z) * 100px));
    }
}
</style>
