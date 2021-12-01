<template>
    <div :class="`banner ${ isVisible ? 'visible': '' }`">
        <div v-if="hasWinner && !hasBotWon" class="wrapper">
            <span>C</span>
            <span>O</span>
            <span>N</span>
            <span>G</span>
            <span>R</span>
            <span>A</span>
            <span>T</span>
            <span>S</span>
            <span>!</span>
        </div>
        <div v-else-if="hasWinner && hasBotWon" class="wrapper">
            <span>Y</span>
            <span>O</span>
            <span>U</span>
            <span>&nbsp;</span>
            <span>L</span>
            <span>O</span>
            <span>S</span>
            <span>E</span>
            <span>!</span>
        </div>
        <div v-else class="wrapper">
            <span>I</span>
            <span>T</span>
            <span>'</span>
            <span>S</span>
            <span>&nbsp;</span>
            <span>A</span>
            <span>&nbsp;</span>
            <span>T</span>
            <span>I</span>
            <span>E</span>
            <span>!</span>
        </div>
        <div>
            <p v-if="hasWinner" class="text__endgame">{{ playerName }} won!</p>
            <p v-else class="text__endgame">Nobody won! Try again?</p>
        </div>
        <button class="attribute__button" @click="$emit('click:replay')">PLAY AGAIN</button>
    </div>
</template>
<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        hasWinner: {
            type: Boolean,
            default: false,
        },
        playerName: {
            type: String,
            default: '',
        },
        hasBotWon: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/tictactoe-library/styles.scss';

.banner {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(213 64 98 / 70%);
    transition: top 1s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.visible {
    animation-name: scrolling;
    animation-duration: 2s;
    top: 0;
    transition: top 1s;
}
.attribute {
    &__button {
        margin-top: 20px;
        animation: appear 3s ease-in-out;
    }
}
</style>