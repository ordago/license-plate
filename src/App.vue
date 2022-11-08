<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import LicensePlate from './components/LicensePlate.vue'
import GameShell from './components/GameShell.vue'
</script>

<template>
    <GameShell style="background-image: url(/emoji_tile_compressed.jpg)">
        <template v-slot:title>
            <span class="text-lime-300 mr-2"> {{ $t('messages.license_plate') }} </span>

            <LicensePlate />
        </template>
    </GameShell>
</template>