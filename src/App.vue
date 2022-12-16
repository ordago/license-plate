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

        </template>
        <LicensePlate />
        <div class="mt-5">
            <a href="https://tichit.com">
                <div class="flex space-x-2 items-center justify-center">
                    <div class="text-gray-200 text-sm">
                        {{ $t('messages.made_by') }}:
                    </div>
                    <div>
                        <img class="h-10 w-auto" src="/logo.svg" alt="logo">
                    </div>
                </div>
            </a>
        </div>
    </GameShell>
</template>