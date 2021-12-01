<template>
    <div :class="`banner ${ isVisible ? 'visible': '' }`">
        <div class="banner__title">
            <div class="text__setup">
                <span>SETUP</span>
            </div>
            <div class="settings">
                <div class="attribute">
                    <p class="attribute__text">Your name: </p>
                    <input class="attribute__text-input" v-model="settings.player1Name" type="text"/>
                </div>
                <div class="attribute">
                    <p class="attribute__text">Opponent name: </p>
                    <input class="attribute__text-input" v-model="settings.player2Name" type="text"/>
                </div>
                <div class="attribute">
                    <p class="attribute__text">You vs: </p>
                    <div class="attribute__text-radio">
                        <input class="attribute__text-radio-input" v-model="settings.player2Type" type="radio" id="bot" name="player2-type" value="bot">
                        <label class="attribute__text-radio-label" for="bot">Dumb Bot</label>
                        <input class="attribute__text-radio-input" v-model="settings.player2Type" type="radio" id="human" name="player2-type" value="human">
                        <label class="attribute__text-radio-label" for="human">Human</label>
                    </div>
                </div>
                <div class="attribute">
                    <p class="attribute__text">Starting player: </p>
                    <div class="attribute__text-radio">
                        <input class="attribute__text-radio-input" v-model="settings.startingPlayer" type="radio" id="player1" name="starting-player" value="player1">
                        <label class="attribute__text-radio-label" for="player1">You</label>
                        <input class="attribute__text-radio-input" v-model="settings.startingPlayer" type="radio" id="player2" name="starting-player" value="player2">
                        <label class="attribute__text-radio-label" for="player2">Opponent</label>
                    </div>
                </div>
                <div class="attribute">
                    <p class="attribute__text">Grid size: </p>
                    <div class="attribute__text-radio">
                        <input class="attribute__text-radio-input" v-model="settings.gridSize" type="radio" id="3" name="grid-size" value="3">
                        <label class="attribute__text-radio-label" for="3">3x3</label>
                        <input class="attribute__text-radio-input" v-model="settings.gridSize" type="radio" id="4" name="grid-size" value="4">
                        <label class="attribute__text-radio-label" for="4">4x4</label>
                    </div>
                </div>

                <button class="attribute__button" @click="validateFields">START</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            settings: {
                player1Name: 'Quokka',
                player2Name: 'Potato',
                player2Type: '',
                startingPlayer: '',
                gridSize: '',
            },
        }
    },
    methods: {
        validateFields() {
            let validationPassed = true;
            for (let setting in this.settings) {
                if (this.settings[setting] == '') {
                    validationPassed = false;
                    break;
                }
            }
            if (!validationPassed) return;
            return this.$emit('click:start', this.settings);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/tictactoe-library/styles.scss';

.banner {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(243 198 35 / 70%);
    transition: top 1s;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
.visible {
    top: 0;
    transition: top 1s;
}
.settings {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>