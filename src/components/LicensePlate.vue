<template>
    <div>
        <div>
            <div>
                <ProgressBar height="default" :percent="(time / maxTime) * 100" :show-text="false" color="blue" />
            </div>
            <div class="flex justify-center mt-3">
                <div class="inline-block rounded-lg border-8 border-gray-900 bg-gray-100">
                    <span class="text-7xl text-gray-800 p-2 font-mono">
                        {{ `${context.plate}`.padStart(4, '0') }}
                    </span>
                </div>
            </div>
            <div class="flex justify-center">
                <span class="text-7xl text-white p-2 font-mono">
                    <template v-if="context.currentGuess === null"> _ </template>
                    <template v-else>
                        <span
                            :class="{
                                'text-red-400': current.matches('playing.miss'),
                                'text-green-400': current.matches('playing.hit'),
                            }"
                        >
                            {{ context.currentGuess }}
                        </span>
                    </template>
                </span>
            </div>
            <div class="flex justify-center mt-3">
                <div class="w-1/2 lg:w-1/3 h-2.5" >
                    <div class="flex space-x-1">
                        <div v-for="(guess, index ) in context.history" :class="{'pr-2': (index+1) % 5 === 0}">
                            <div  class="flex-shrink-0 w-2.5 h-2.5 rounded-full" :class="{'bg-green-500':guess,'bg-red-500':!guess}" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-3">
                <div class="w-1/2 lg:w-1/3" :class="{ 'opacity-80': !current.matches('playing.idle') }" >
                    <LicensePlateKeyboard @guess="handleGuess" />
                </div>
            </div>
            <div class="flex justify-center mt-3 space-x-2">
                    <AppButton
                        @click="startGame()"
                        type="button"
                        element="button"
                        :class="{ invisible: !current.matches('ready') }"
                    >
                        {{ $t('messages.start') }}
                    </AppButton>
                    <AppButton v-show="false"
                        @click="newGuess()"
                        type="button"
                        element="button"
                        :disabled="![{ playing: 'hit' }, { playing: 'miss' }].some(current.matches)"
                    >
                        <span class="sr-only">
                            {{ $tc('messages.other', 2) }}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
                        </svg>
                    </AppButton>
                    <AppButton
                        @click="restartGame()"
                        type="button"
                        element="button"
                        :class="{ invisible: !current.matches('finished') }"
                    >
                        {{ $t('messages.restart') }}
                    </AppButton>
                </div>
            <template v-show="debug">
                <div class="text-white">correctGuesses: {{ context.correctGuesses }}</div>
                <div class="text-white">state: {{ current.value }}</div>
                <pre class="text-white" v-show="false">context: {{ context }}</pre>
            </template>
        </div>
        <div v-if="scoresHistory.length > 2 && history.bestScore">
            <div class="text-gray-300 text-sm" >
                {{ $t('messages.best_score') }}:
            </div>
            <div class="flex space-x-2 items-center">
                <BadgePill color="green">
                    {{ history.bestScore.hits }}
                </BadgePill>
                <BadgePill color="red">
                    {{ history.bestScore.misses }}
                </BadgePill>
                <div class="text-gray-400 text-xs">
                    <div>{{ history.bestScore.localeDate }}</div>
                    <div>{{ history.bestScore.localeTime }}</div>
                </div>
            </div>
        </div>
        <div>
            <div class="text-gray-300 text-sm">
                {{ $t('messages.latest_scores') }}:
            </div>
            <div class="flex space-x-2 items-center" v-for="score in scoresHistory">
                <BadgePill color="green">
                    {{ score.hits }}
                </BadgePill>
                <BadgePill color="red">
                    {{ score.misses }}
                </BadgePill>
                <div class="text-gray-400 text-xs">
                    <div>{{ score.localeDate }}</div>
                    <div>{{ score.localeTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LicensePlateKeyboard from './LicensePlateKeyboard.vue'
import AppButton from './AppButton.vue'
import ProgressBar from './ProgressBar.vue';
import {licensePlateMachine} from './LicensePlateMachine.js';
import {interpret} from 'xstate';
import BadgePill from './BadgePill.vue';

export default {
    name: 'LicensePlate',
    components: {
        BadgePill,
        LicensePlateKeyboard,
        AppButton,
        ProgressBar,
    },
    data() {
        return {
            keyboard: null,
            time: 30,
            maxTime: 30,
            debug: false,
            timer: null,
            history: {
                latestScores: [],
                bestScore: null,
            },
            // Interpret the machine and store it in data
            gameService: interpret(licensePlateMachine),
            // Start with the machine's initial state
            current: licensePlateMachine.initialState,
            // Start with the machine's initial context
            context: licensePlateMachine.context,
        };
    },
    created() {
        // Start service on component creation
        this.gameService
            .onTransition((state) => {
                // Update the current state component data property with the next state
                this.current = state;
                // Update the context component data property with the updated context
                this.context = state.context;
            })
            .start();
    },
    computed: {
        // plateDisplay: function () {
        //     return this.context.plate;
        //     return String(this.context.plate).padStart(4, '0');
        // },
        scoresHistory: function () {
            return this.history.latestScores.map(s => {
                    let date = new Date(s.timestamp);
                    return {
                        ...s,
                        localeTime: date.toLocaleTimeString(),
                        localeDate: date.toLocaleDateString(),
                    }
                }
            )
        },
    },
    watch: {
        'current.value': function (state) {
            if (state === 'finished') {
                this.saveScores();
            }
        },
        time: function (seconds) {
            if (seconds === 0) {
                this.gameService.send('END');
                clearInterval(this.timer);
            }
        },

    },
    methods: {
        handleGuess(button) {
            this.gameService.send('GUESS', { value: button });
        },
        newGuess() {
            this.gameService.send('CONTINUE');
        },
        startGame() {
            this.gameService.send('START');
            this.timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                }
            }, 1000);
        },
        restartGame() {
            this.time = 30;
            this.gameService.send('RESTART');
        },
        saveScores() {
            this.history.latestScores.unshift({
                score: this.context.correctGuesses,
                hits: this.context.correctGuesses,
                misses: this.context.incorrectGuesses,
                timestamp: Date.now(),
            });
            const bestScore = [...this.history.latestScores].sort((a, b) => -(a.hits - b.hits))[0];
            let date = new Date(bestScore.timestamp);
            this.history.bestScore = {
                ...bestScore,
                localeTime: date.toLocaleTimeString(),
                localeDate: date.toLocaleDateString(),
            }

            this.history.latestScores = this.history.latestScores.slice(0, 9);
            localStorage.setItem('license_plate_game_scores', JSON.stringify(this.history));
        }
    },
    mounted() {
        let value = localStorage.getItem('license_plate_game_scores');
        if (value) {
            this.history = JSON.parse(value);
        }
    }
};
</script>