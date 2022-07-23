<template>
    <div class="simple-keyboard" />
</template>

<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

export default {
    name: 'LicensePlateKeyboard',
    emits: ['guess'],
    props: {
        keyboardClass: {
            default: 'simple-keyboard',
            type: String,
        },
        input: {
            type: String,
        },
        isCorrect: {
            required: false,
        },
    },
    data: () => ({
        keyboard: null,
        currentGuess: null,
    }),
    mounted() {
        this.keyboard = new Keyboard(this.keyboardClass, {
            layout: {
                default: ['1 2 3', '4 5 6', '7 8 9'],
            },
            buttonTheme: [
                {
                    class: 'error',
                    buttons: '4',
                },
                {
                    class: 'error',
                    buttons: '7',
                },
            ],
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
        });
    },
    methods: {
        onKeyPress(button) {
            this.$emit('guess', button);
        },
    },
};
</script>
