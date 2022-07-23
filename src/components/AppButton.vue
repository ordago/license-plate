<template>
    <component
        :is="element"
        v-bind="$attrs"
        :class="classObject"
        class="inline-flex items-center border border-gray-300 shadow-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
        <slot />
    </component>
</template>

<script>
export default {
    props: {
        element: {
            type: String,
            default: 'a',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'md',
        },
    },
    data() {
        return {
            classObject: {
                'text-white bg-gray-500 hover:bg-gray-600': this.disabled,
                'text-gray-700 bg-white hover:bg-gray-50': !this.disabled,
                'px-2.5 py-1.5 text-xs': this.size === 'sm',
                'px-3 py-2 text-sm': this.size === 'md',
                'px-4 py-2 text-sm': this.size === 'lg',
                'px-4 py-2 text-base': this.size === 'xl',
                'px-6 py-3 text-base': this.size === 'xxl',
            },
        };
    },
};
</script>
