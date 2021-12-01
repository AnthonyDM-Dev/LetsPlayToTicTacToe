<template>
    <div :class="`banner ${ isVisible ? 'visible': '' }`">
            <div class="wrapper">
                <span><i class="fas fa-times sign sign__x"></i></span>
                <span>TIC</span>
                <span>TAC</span>
                <span>TOE</span>
                <span><i class="far fa-dot-circle sign sign__o"></i></span>
            </div>
            <div class="text__play" @click="$emit('click:play')">
                <span class="hover-pointer">PLAY</span>
            </div>
    </div>
</template>
<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: true,
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/tictactoe-library/styles.scss';

.banner {
    animation-name: scrolling;
    animation-duration: 2s;
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
    top: 0;
    transition: top 1s;
}
.wrapper {
    span {
        @media screen and (max-width: 576px) {
            font-size: 40px;
        }
    }
    .sign {
        font-size: 90px;
        @media screen and (max-width: 576px) {
            font-size: 40px;
        }
    }
}
</style>