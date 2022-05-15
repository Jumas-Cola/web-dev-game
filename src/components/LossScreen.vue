<script setup>
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div class="screen tac" id="screenLoss">
    <div class="box-wrapper" :class="{ active: game.gameOver }">
      <div class="box">
        <img src="/src/assets/img/skull.png" alt="Skull" class="logo" />
        <h1>Game over!</h1>
        <p>You squished under the stone and lost all your hearts.</p>

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
