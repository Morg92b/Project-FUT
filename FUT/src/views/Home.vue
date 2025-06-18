<template>
    <div class="home">
        <h1>
            Créer ton 11 de rêve (Saison 2023)
            <span class="ballon"></span>
        </h1>

        <div class="search-bar">
            <input v-model="search" type="text" placeholder="Rechercher un joueur..." />
            <Button label="Rechercher" @click="onSearch" />
        </div>

        <ul v-if="suggestions.length && search">
            <li v-for="(player, index) in suggestions" :key="index" @click="addPlayer(player)">
                {{ player.player.name }} ({{ player.statistics[0].team.name }})
            </li>
        </ul>

        <p v-else-if="search && !loading">Aucun joueur trouvé.</p>
        <p v-if="loading">Recherche en cours...</p>

        <h2>Mon Équipe {{ team.length }}/11</h2>
        <ul>
            <li v-for="(player, index) in team" :key="index">
                {{ player.player.name }} - {{ player.statistics[0].team.name }}
            </li>
            <Terrain :team="team" />
        </ul>
    </div>
</template>


<script setup>
import Button from '@/components/Button.vue'
import Terrain from '@/components/Terrain.vue'
import { ref } from 'vue'
import axios from 'axios'

const search = ref('')
const suggestions = ref([])
const team = ref([])
const loading = ref(false)

const onSearch = async () => {
    if (search.value.length < 3) return alert("Tape au moins 3 lettres.")

    loading.value = true
    suggestions.value = []

    try {
        const clean = search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log('Recherche :', clean)

        const res = await axios.get(`http://localhost:3001/api/search-player?name=${clean}`)
        suggestions.value = res.data.players
    } catch (err) {
        console.error('Erreur API', err)
        alert('Erreur lors de la recherche.')
    } finally {
        loading.value = false
    }
}

const addPlayer = (player) => {
    if (team.value.length >= 11) return alert("Tu as déjà 11 joueurs !")
    if (team.value.find(p => p.player.id === player.player.id))
        return alert("Ce joueur est déjà dans ton équipe.")

    team.value.push({ ...player, position: '' })
    search.value = ''
    suggestions.value = []
}
</script>

<style scoped>
.ballon {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-left: 2px;
    background-image: url('/ballon.ico');
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: middle;
}

.home {
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    color: #ff4081;
}

.search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
}

input {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
}

button {
    padding: 10px 16px;
    font-size: 1rem;
    cursor: pointer;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
}

li:hover {
    background-color: #f0f0f0;
}
</style>
