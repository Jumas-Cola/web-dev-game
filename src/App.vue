<script setup>
import WelcomeScreen from './components/WelcomeScreen.vue';
import RatingScreen from './components/RatingScreen.vue';
import GameField from './components/GameField.vue';
import LossScreen from './components/LossScreen.vue';
import WinScreen from './components/WinScreen.vue';
import { useGameStore } from '@/stores/game';
</script>

<template>
  <main>
    <!-- Welcome screen -->
    <WelcomeScreen />

    <!-- Rating screen -->
    <RatingScreen />

    <!-- Loss (death) screen -->
    <LossScreen />

    <!-- Win screen -->
    <WinScreen />

    <!-- Main game container -->
    <div class="game">
      <!-- HUD (panel where you can find some stats) -->
      <div class="hud">
        <!-- The left part with logo, username and time -->
        <div class="left">
          <img src="/src/assets/img/logo.png" alt="LifeSaver" class="logo" />
          <div>
            <img
              src="/src/assets/img/user.png"
              alt="Username: "
              class="emoji"
            />
            <span id="hudUsername">{{ game.name }}</span>
          </div>
          <div>
            <img src="/src/assets/img/clock.png" alt="Time: " class="emoji" />
            <span id="hudTime">{{ game.time }}</span>
          </div>
        </div>
        <!-- The right part with hearts count -->
        <div class="right">
          <div class="heart-progress">
            <div class="filled"></div>
            <div class="text">
              <img src="/src/assets/img/heart.png" alt="Heart" class="emoji" />
              <span id="hudHearts">{{ game.hearts }}/10</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Game field (where all blocks, or cells, are contained) -->
      <GameField />
    </div>
  </main>
</template>

<script>
export default {
  created() {
    this.game = useGameStore();
    this.game.$subscribe((mutation, state) => {
      if (
        mutation.events.key === 'started' &&
        mutation.events.newValue === true
      ) {
        this.timer();
      } else if (mutation.events.key === 'type' && this.game.hearts === 10) {
        clearInterval(this.game.timerInterval);
        this.game.started = false;
      } else if (mutation.events.key === 'timer') {
        let newField = JSON.parse(JSON.stringify(this.game.field));
        for (let i = 0, len = this.game.field.length; i < len; i++) {
          for (let j = 0, len = this.game.field[0].length; j < len; j++) {
            if (this.game.field[i][j].type == 'heart') {
              if (i + 1 < this.game.field.length) {
                if (this.game.field[i + 1][j].type == 'empty') {
                  newField[i][j].type = 'empty';
                  newField[i + 1][j].type = 'heart';
                } else if (this.game.field[i + 1][j].type == 'player') {
                  newField[i][j].type = 'empty';
                  this.game.hearts++;
                }
              }
            } else if (this.game.field[i][j].type == 'stone') {
              if (i + 1 < this.game.field.length) {
                if (this.game.field[i + 1][j].type == 'empty') {
                  newField[i][j].type = 'empty';
                  newField[i + 1][j].type = 'stone';
                } else if (this.game.field[i + 1][j].type == 'player') {
                  newField[i][j].type = 'empty';
                  newField[i + 1][j].type = 'stone';
                  this.game.gameOver = true;
                  clearInterval(this.game.timerInterval);
                  this.game.started = false;
                }
              }
            }
          }
        }
        this.game.field = newField;
      }
    });
  },
  methods: {
    timer() {
      this.game.timerInterval = setInterval(() => {
        this.game.timer++;
      }, 1000);
    },
  },
};
</script>
