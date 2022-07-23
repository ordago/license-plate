<template>
    <div class="w-40 px-5">
        <TransitionGroup name="list" tag="div" class="flex"
                         enter-active-class="transition ease-out duration-500 transform"
                         enter-from-class="opacity-0 scale-95"
                         enter-to-class="opacity-100 scale-100"
                         leave-active-class="transition ease-in duration-75 transform"
                         leave-from-class="opacity-100 scale-100"
                         leave-to-class="opacity-0 scale-95"
                         v-if="stars !== null"
        >
            <div v-for="star in starsShown" :class="{'animate-bounce': star <= stars}" class="transition ease-in-out" :key="star">
                <svg v-if="star <= stars" class="w-10 h-10 text-yellow-400" :style="`animation-delay: ${200*star}ms`" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg v-else class="w-10 h-10 text-yellow-400 opacity-50" :style="`animation-delay: ${200*star}ms`"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            </div>
        </TransitionGroup>
        &nbsp;
    </div>
</template>

<script>
export default {
    name: "StarsScore",
    props: ['stars'],
    data() {
        return {
            starsShown: 0,
        }
    },
    watch: {
        stars: function (value) {
            if (value === null) {
                this.starsShown = 0;
            } else {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        return this.starsShown++;
                    }, i*750)
                }
            }
        },
    },
}
</script>