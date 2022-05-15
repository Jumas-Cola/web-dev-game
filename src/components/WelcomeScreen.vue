<script setup>
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div class="screen tac" id="screenWelcome">
    <div class="box-wrapper" :class="{ active: isActive }">
      <div class="box white">
        <img src="/src/assets/img/logo.svg" alt="Logo" class="logo" />
        <h1>LifeSaver</h1>
        <p>
          A game about the doctor who saves lives of ill people after a
          earthquake by collecting hearts in dangerous caves
        </p>

        <div id="welcomeForm">
          <div class="hint">Please, enter your username here</div>
          <input
            type="text"
            placeholder="Username"
            required
            autofocus
            v-model="name"
            v-on:keyup.enter="start"
          />
          <button type="button" :disabled="!name" @click="start">Start</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.game = useGameStore();
  },
  data() {
    return {
      name: null,
      isActive: true,
    };
  },
  methods: {
    start() {
      if (!this.isActive || !this.name) {
        return;
      }
      this.game.name = this.name;
      this.game.started = true;
      this.isActive = false;
    },
  },
};
</script>
