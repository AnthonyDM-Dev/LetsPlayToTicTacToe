<template>
    <div class="game-container">
        <StartBanner 
            :isVisible="isStartVisible"
            @click:play="toggleStartBanner"
        />
        <SetupBanner
            :isVisible="isSetupVisible"
            @click:start="setUpGame"
        />
        <EndBanner 
            :isVisible="isEndVisible"
            :hasWinner="hasWinner"
            :playerName="winner ? players.find(player => { return player.id == winner }).name : ''"
            :hasBotWon="winner ? players.find(player => { return player.id == winner }).isBot : false"
            @click:replay="toggleEndBanner"
        />
        <PlayerMonitoring
            :player1Name="players[0].name"
            :player2Name="players[1].name"
            :activePlayer="activePlayer"
        />
        <div class="tictactoe-container">
            <Cell v-for="(cell, i) in cells" :key="i"
                @click:action="play(i)"
                :sign=cells[i]
                :isHighlighted="winningCombo.includes(i)"
                :gridSize="gridLength"
            />
        </div>
    </div>
</template>

<script>
// Importing components
import Cell from './Cell.vue';
import StartBanner from './StartBanner.vue'
import SetupBanner from './SetupBanner.vue'
import EndBanner from './EndBanner.vue'
import PlayerMonitoring from './PlayerMonitoring.vue'

// Importing libraries
import * as game from '../assets/tictactoe-library/game.js'

export default {
    components: {
        Cell,
        StartBanner,
        SetupBanner,
        EndBanner,
        PlayerMonitoring,
    },
    data() {
        return {
            isStartVisible: true,
            isSetupVisible: false,
            isEndVisible: false,
            isGameActive: false,
            history: [],
            hasWinner: false,
            winner: '',
            winningCombo: [],
            gridLength: 3,
            cells: [0,1,2,3,4,5,6,7,8],
            activePlayer: 'player1',
            players: [
                {
                    id: 'player1',
                    name: 'player1',
                    isPlaying: true,
                    symbol: 'o',
                },
                {
                    id: 'player2',
                    name: 'player2',
                    isPlaying: false,
                    symbol: 'x',
                    isBot: false,
                }
            ],
        }
    },
    methods: {
        /* toggleStartBanner: toggle the presentation banner & call the setup banner */
        toggleStartBanner() {
            this.isStartVisible = !this.isStartVisible
            this.toggleSetupBanner()
        },
        /* toggleSetupBanner: toggle the game setup banner */
        toggleSetupBanner() {
            this.isSetupVisible = !this.isSetupVisible
        },
        /* toggleEndBanner: toggle the end game banner & call the setup banner */
        toggleEndBanner() {
            this.isEndVisible = !this.isEndVisible
            this.isSetupVisible = true
        },
        /* setUpGame: game initialization */
        setUpGame($event) {
            // resetting the game
            this.hasWinner = false
            this.winningCombo = []
            this.cells = []

            // setting up the game
            for (let i = 0; i < ($event.gridSize**2); i++) {
                this.cells.push(i)
            }
            this.gridLength = $event.gridSize
            
            const player1 = this.players.find( player => { return player.id == 'player1' })
            const player2 = this.players.find( player => { return player.id == 'player2' })
            player1.name = $event.player1Name
            player2.name = $event.player2Name
            if ($event.player2Type == 'bot') {
                player2.isBot = true
            } else {
                player2.isBot = false
            }

            // Game start
            this.isGameActive = true
            this.history = []
            this.activePlayer = $event.startingPlayer

            // Close the banner
            this.toggleSetupBanner()
        },
        /* play: real player move */
        play(i) {
            if (!this.isGameActive) return;

            const playerData = this.players.find(player => { return player.id === this.activePlayer })

            // Getting player moves
            if (playerData.isBot || typeof(this.cells[i]) !== 'number') return
            this.cells[i] = playerData.symbol

            // Updating game data
            this.history.push(playerData.symbol)
        },
        /* playBot: bot player move */
        playBot() {
            if (!this.isGameActive) return;

            const botChoice = game.botAction(this.cells)
            const botSymbol = this.players.find(player => { return player.id == 'player2' }).symbol
            this.cells[botChoice] = botSymbol

            // Updating data
            this.history.push(botSymbol)
        },
        /* changePlayer: change actual player */
        changePlayer(actualPlayer) {
            this.activePlayer = this.players.find(player => { return player.id != actualPlayer }).id
        },
    },
    watch: {
        /* history.length: check the game after each move. */
        'history.length' () {
            if (this.history.length < 1) return;

            let lastPlay = this.history[this.history.length - 1]
            let player = this.players.find(player => { return player.symbol === lastPlay })

            let allWinningCombos = game.calculateCombos(this.gridLength)
            let gameStatus = game.checkWinningCombos(allWinningCombos, this.cells, player.symbol)
            
            console.log('game status: ', gameStatus)

            if (gameStatus.hasWinner) {
                this.hasWinner = true
                this.winner = player.id
                this.winningCombo = gameStatus.winningCombo
                this.isGameActive = false
                this.isEndVisible = true
                this.activePlayer = ''
                return
            }
            if (this.cells.every(cell => { return typeof(cell) != 'number' })) {
                this.isGameActive = false
                this.isEndVisible = true
                this.activePlayer = ''
                return
            }
            this.changePlayer(player.id)
        },
        /* activePlayer: define the player that have to move */
        'activePlayer' () {
            if (!this.isGameActive) return;
            if (this.activePlayer == 'player1') return;
            const player2 = this.players.find(player => { return player.id == 'player2' })
            console.log('player2: ', player2)
            if (!player2.isBot) return;
            this.playBot()
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/tictactoe-library/styles.scss';
</style>