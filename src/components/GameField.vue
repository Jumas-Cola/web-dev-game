<script setup>
import { useGameStore } from '@/stores/game';
</script>

<template>
  <div class="field">
    <!-- Cell is defined by a "cell" class and sprite modifier ("player", "ground", etc.) -->
    <div
      class="field-overlay"
      style="transform: translate(32px, 32px) scale(1); --fade-max: 1"
    ></div>

    <div v-for="(row, x) in game.field">
      <div v-for="(cell, y) in row">
        <div
          class="cell"
          :class="[cell.type]"
          :style="{ left: y * 64 + 'px', top: x * 64 + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.game = useGameStore();
    window.addEventListener('keydown', (e) => {
      if (this.game.started) {
        switch (e.key) {
          case 'd':
            this.walkRight();
            break;
          case 'a':
            this.walkLeft();
            break;
          case 's':
            this.walkDown();
            break;
          case 'w':
            this.walkUp();
            break;
        }
      }
    });
  },
  methods: {
    walkRight() {
      if (this.game.field[0].length == this.game.playerPos[1] + 1) {
        return;
      }
      let cellType =
        this.game.field[this.game.playerPos[0]][this.game.playerPos[1] + 1]
          .type;
      if (cellType == 'heart') {
        this.game.$patch({ hearts: this.game.hearts + 1 });
      } else if (cellType == 'stone') {
        return;
      }
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'empty';
      this.game.playerPos[1]++;
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'player';
    },
    walkLeft() {
      if (0 == this.game.playerPos[1]) {
        return;
      }
      let cellType =
        this.game.field[this.game.playerPos[0]][this.game.playerPos[1] - 1]
          .type;
      if (cellType == 'heart') {
        this.game.$patch({ hearts: this.game.hearts + 1 });
      } else if (cellType == 'stone') {
        return;
      }
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'empty';
      this.game.playerPos[1]--;
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'player';
    },
    walkDown() {
      if (this.game.field.length == this.game.playerPos[0] + 1) {
        return;
      }
      let cellType =
        this.game.field[this.game.playerPos[0] + 1][this.game.playerPos[1]]
          .type;
      if (cellType == 'heart') {
        this.game.$patch({ hearts: this.game.hearts + 1 });
      } else if (cellType == 'stone') {
        return;
      }
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'empty';
      this.game.playerPos[0]++;
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'player';
    },
    walkUp() {
      if (0 == this.game.playerPos[0]) {
        return;
      }
      let cellType =
        this.game.field[this.game.playerPos[0] - 1][this.game.playerPos[1]]
          .type;
      if (cellType == 'heart') {
        this.game.$patch({ hearts: this.game.hearts + 1 });
      } else if (cellType == 'stone') {
        return;
      }
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'empty';
      this.game.playerPos[0]--;
      this.game.field[this.game.playerPos[0]][this.game.playerPos[1]].type =
        'player';
    },
  },
};
</script>
