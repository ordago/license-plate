<template>
    <span
        v-bind="$attrs"
        :class="classObject"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    >
        <slot />
    </span>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'indigo',
        },
    },
    data() {
        return {
            classObject: {
                'bg-gray-100 text-gray-800': this.color === 'gray',
                'bg-red-100 text-red-800': this.color === 'red',
                'bg-yellow-100 text-yellow-800': this.color === 'yellow',
                'bg-green-100 text-green-800': this.color === 'green',
                'bg-blue-100 text-blue-800': this.color === 'blue',
                'bg-indigo-100 text-indigo-800': this.color === 'indigo',
                'bg-purple-100 text-purple-800': this.color === 'purple',
                'bg-pink-100 text-pink-800': this.color === 'pink',
                'bg-orange-100 text-orange-800': this.color === 'orange',
                'bg-lime-100 text-lime-800': this.color === 'lime',
                'bg-teal-100 text-teal-800': this.color === 'teal',
                'bg-fuchsia-100 text-fuchsia-800': this.color === 'fuchsia',
                'bg-rose-100 text-rose-800': this.color === 'rose',
            },
        };
    },
};
</script>
