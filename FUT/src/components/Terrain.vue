<template>
    <div class="terrain">
        <div class="field">
            <div class="line center-line"></div>
            <div class="circle center-circle"></div>
            <div class="dot penalty-dot top"></div>
            <div class="dot penalty-dot bottom"></div>
            <div class="box penalty-box top"></div>
            <div class="box penalty-box bottom"></div>
            <div class="line goal-line top"></div>
            <div class="line goal-line bottom"></div>
            <div class="goal-box top"></div>
            <div class="goal-box bottom"></div>

            <div v-for="(player, index) in team" :key="player.player.id" class="player"
                :style="getPositionStyle(player.position)"
                @click="selecting = (selecting === player.player.id ? null : player.player.id)">
                <img :src="player.player.photo" alt="photo" class="avatar" />
                <div class="name">{{ player.player.name }}</div>
                <div class="role">{{ player.position }}</div>

                <div v-if="selecting === player.player.id" class="position-menu">
                    <button v-for="pos in availablePositions" :key="pos"
                        @click.stop="setPosition(player.player.id, pos)" :disabled="isPositionTaken(pos)">
                        {{ pos }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    team: Array
})

const selecting = ref(null)

const positionsList = [
    'G', 'DCG', 'DCD', 'DG', 'DD', 'MC', 'MCG', 'MCD', 'AD', 'AG', 'BU'
]

const availablePositions = computed(() => positionsList)

const isPositionTaken = (position) => {
    return props.team.some(p => p.position === position)
}

const setPosition = (playerId, pos) => {
    const player = props.team.find(p => p.player.id === playerId)
    if (player) {
        player.position = pos
    }
    selecting.value = null
}

const getPositionStyle = (role) => {
    const map = {
        G: { top: '5%', left: '50%' },
        DCG: { top: '15%', left: '60%' },
        DCD: { top: '15%', left: '40%' },
        DD: { top: '15%', left: '20%' },
        DG: { top: '15%', left: '80%' },
        MC: { top: '40%', left: '50%' },
        MCD: { top: '40%', left: '30%' },
        MCG: { top: '40%', left: '70%' },
        AD: { top: '70%', left: '20%' },
        AG: { top: '70%', left: '80%' },
        BU: { top: '85%', left: '50%' }
    }
    return {
        position: 'absolute',
        top: map[role]?.top || '0%',
        left: map[role]?.left || '0%',
        transform: 'translate(-50%, -50%)'
    }
}
</script>

<style scoped>
.terrain {
    max-width: 600px;
    margin: 2rem auto;
}

.field {
    position: relative;
    background: #3caa3c;
    width: 100%;
    padding-top: 120%;
    border: 4px solid white;
    border-radius: 12px;
    overflow: visible;
}

.player {
    text-align: center;
    cursor: pointer;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    background: white;
}

.name {
    font-size: 0.7rem;
    color: white;
    text-shadow: 1px 1px 2px black;
}

.position-menu {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    margin-top: -50px;
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    z-index: 10;
    position: relative;
}

.position-menu button {
    font-size: 0.65rem;
    padding: 2px 5px;
    cursor: pointer;
}

.line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: white;
}

.center-line {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.line.goal-line.top {
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
}

.line.goal-line.bottom {
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
}

.circle.center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15%;
    height: 0;
    padding-bottom: 15%;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.dot.penalty-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.dot.penalty-dot.top {
    top: 12%;
    left: 50%;
}

.dot.penalty-dot.bottom {
    bottom: 12%;
    left: 50%;
}

.box.penalty-box {
    position: absolute;
    width: 50%;
    height: 20%;
    border: 2px solid white;
    box-sizing: border-box;
    left: 25%;
}

.box.penalty-box.top {
    top: 0;
}

.box.penalty-box.bottom {
    bottom: 0;
}

.goal-box {
    position: absolute;
    width: 20%;
    height: 4%;
    border: 2px solid white;
    left: 40%;
}

.goal-box.top {
    top: 0%;
}

.goal-box.bottom {
    bottom: 0%;
}

.role {
    font-size: 0.6rem;
    color: yellow;
    text-shadow: 1px 1px 2px black;
}
</style>
