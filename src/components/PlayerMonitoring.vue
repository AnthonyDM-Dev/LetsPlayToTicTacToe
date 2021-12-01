<template>
    <div class="player-monitor">
        <div :class="`moving-box ${ activePlayer == 'player1' ? 'to-the-left': 'to-the-right' }`"></div>
        <div :class="`static-box ${ activePlayer == 'player1' ? 'highlight-player': '' }`">
            <p class="text__setup">{{ player1Name }}</p>
        </div>
        <div :class="`static-box ${ activePlayer == 'player1' ? '': 'highlight-player' }`">
            <p class="text__setup">{{ player2Name }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        player1Name: {
            type: String,
            default: 'Player1',
        },
        player2Name: {
            type: String,
            default: 'Player2',
        },
        activePlayer: {
            type: String,
            default: 'player1',
        },
    },
    methods: {
        toggleMovingBox() {

        }
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/tictactoe-library/styles.scss';
.text__setup {
    margin: 17px 20px;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    @media screen and (max-width: 576px) {
        margin: 11px 20px;
        font-size: 16px;
    }
}
</style>