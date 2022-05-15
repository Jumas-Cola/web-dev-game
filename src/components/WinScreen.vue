<script setup>
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div class="screen tac" id="screenLoss">
    <div class="box-wrapper" :class="{ active: game.hearts == 10 }">
      <div class="box">
        <img src="/src/assets/img/heart.png" alt="Skull" class="logo" />
        <h1>You win!</h1>
        <p>You collect all hearts.</p>

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
