<script setup>
import WelcomeScreen from './components/WelcomeScreen.vue';
import RatingScreen from './components/RatingScreen.vue';
import GameField from './components/GameField.vue';
import LossScreen from './components/LossScreen.vue';
import { useGameStore } from '@/stores/game';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { firebaseApp } from './firebase-init.js';
</script>

<template>
  <main>
    <!-- Welcome screen -->
    <WelcomeScreen />

    <!-- Rating screen -->
    <RatingScreen />

    <!-- Loss (death) screen -->
    <LossScreen />

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
      if (mutation.payload === undefined) {
        return;
      }

      if (
        mutation.payload.started !== undefined &&
        mutation.payload.started === true
      ) {
        this.timer();
      } else if (
        mutation.payload.hearts !== undefined &&
        this.game.hearts === 10
      ) {
        this.gameWon();
      } else if (mutation.payload.timer !== undefined) {
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
                  this.game.$patch({ hearts: this.game.hearts + 1 });
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
                  this.gameOver();
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
        this.game.$patch({ timer: this.game.timer + 1 });
      }, 1000);
    },
    gameOver() {
      this.game.$patch({ gameOver: true });
      clearInterval(this.game.timerInterval);
      this.game.$patch({ started: false });
    },
    async gameWon() {
      const db = getFirestore(firebaseApp);

      clearInterval(this.game.timerInterval);
      this.game.$patch({ started: false });

      try {
        const docRef = await addDoc(collection(db, 'scores'), {
          name: this.game?.name,
          score: this.game?.timer,
        });
      } catch (e) {}

      const scoresRef = collection(db, 'scores');
      const q = query(scoresRef, orderBy('score'), limit(10));
      const querySnapshot = await getDocs(q);
      let scores = [];
      querySnapshot.forEach((item) => {
        scores.push({ name: item.data().name, score: item.data().score });
      });
      this.game.highScores = scores;
    },
  },
};
</script>
