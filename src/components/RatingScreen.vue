<script setup>
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div class="screen tac" id="screenRating">
    <div class="box-wrapper" :class="{ active: game.hearts == 10 }">
      <div class="box">
        <img src="/src/assets/img/logo.svg" alt="LifeSaver" class="logo" />
        <h1>Good job!</h1>
        <p>You finished this game!</p>
        <table>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          <tr v-for="score in game.highScores">
            <td>{{ score.name }}</td>
            <td>{{ score.score }}</td>
          </tr>
        </table>

        <button class="start-over" @click="restartGame">Start over</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.game = useGameStore();
  },
  methods: {
    restartGame() {
      this.game.restart();
    },
  },
};
</script>
