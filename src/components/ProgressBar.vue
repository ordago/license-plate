<template>
    <div
        :class="backgroundClassObject"
        class="rounded w-full relative"
        role="progressbar"
        :aria-valuenow="percent"
        aria-valuemin="0"
        aria-valuemax="100"
    >
        <div
            :class="foregroundClassObject"
            class="rounded text-center text-white text-sm transition flex flex-col justify-center"
            :style="`width: ${percent}%; transition: width 1s;`"
        ></div>
        <div class="text-white absolute top-0 left-0 w-full h-full flex justify-center align-center" v-if="showText">
            <slot>{{ percent }}</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        percent: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            default: 'green',
        },
        height: {
            type: String,
            default: 'default',
        },
        showText: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            backgroundClassObject: {
                'bg-gray-900': this.color === 'gray',
                'bg-red-900': this.color === 'red',
                'bg-yellow-900': this.color === 'yellow',
                'bg-green-900': this.color === 'green',
                'bg-blue-900': this.color === 'blue',
                'bg-indigo-900': this.color === 'indigo',
                'bg-purple-900': this.color === 'purple',
                'bg-pink-900': this.color === 'pink',
                'bg-orange-900': this.color === 'orange',
                'bg-lime-900': this.color === 'lime',
                'bg-teal-900': this.color === 'teal',
                'bg-fuchsia-900': this.color === 'fuchsia',
                'bg-rose-900': this.color === 'rose',
                'h-6': this.height === 'default',
                'h-1': this.height === 'xs',
                'h-2': this.height === 'sm',
            },
            foregroundClassObject: {
                'bg-gray-600': this.color === 'gray',
                'bg-red-600': this.color === 'red',
                'bg-yellow-600': this.color === 'yellow',
                'bg-green-600': this.color === 'green',
                'bg-blue-600': this.color === 'blue',
                'bg-indigo-600': this.color === 'indigo',
                'bg-purple-600': this.color === 'purple',
                'bg-pink-600': this.color === 'pink',
                'bg-orange-600': this.color === 'orange',
                'bg-lime-600': this.color === 'lime',
                'bg-teal-600': this.color === 'teal',
                'bg-fuchsia-600': this.color === 'fuchsia',
                'bg-rose-600': this.color === 'rose',
                'h-6': this.height === 'default',
                'h-1': this.height === 'xs',
                'h-2': this.height === 'sm',
            },
        };
    },
};
</script>
