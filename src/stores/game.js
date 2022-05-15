import { defineStore } from 'pinia';

export const useGameStore = defineStore({
  id: 'game',
  getters: {
    time: (state) =>
      new Date(state.timer * 1000).toISOString().substring(14, 19),
  },
  actions: {
    restart() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let field = [];
      let row = [];
      let randCells = [];

      for (let i = 0, len = Math.floor(screenHeight / 64) - 1; i < len; i++) {
        row = [];
        for (let j = 0, len = Math.floor(screenWidth / 64); j < len; j++) {
          if (i != 0 && j != 0) {
            randCells.push([i, j]);
          }

          row.push({
            type: i == 0 && j == 0 ? 'player' : 'ground',
          });
        }
        field.push(row);
      }

      randCells = randCells.sort(() => Math.random() - 0.5);
      const heartCells = randCells.splice(0, 10);
      const stoneCells = randCells.splice(10, 20);
      heartCells.forEach((cell) => {
        field[cell[0]][cell[1]].type = 'heart';
      });
      stoneCells.forEach((cell) => {
        field[cell[0]][cell[1]].type = 'stone';
      });

      this.$patch({
        started: true,
        gameOver: false,
        timer: 0,
        hearts: 0,
        field: field,
        playerPos: [0, 0],
        timerInterval: null,
      });
    },
  },
  state: () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let field = [];
    let row = [];
    let randCells = [];

    for (let i = 0, len = Math.floor(screenHeight / 64) - 1; i < len; i++) {
      row = [];
      for (let j = 0, len = Math.floor(screenWidth / 64); j < len; j++) {
        if (i != 0 && j != 0) {
          randCells.push([i, j]);
        }

        row.push({
          type: i == 0 && j == 0 ? 'player' : 'ground',
        });
      }
      field.push(row);
    }

    randCells = randCells.sort(() => Math.random() - 0.5);
    const heartCells = randCells.splice(0, 10);
    const stoneCells = randCells.splice(10, 20);
    heartCells.forEach((cell) => {
      field[cell[0]][cell[1]].type = 'heart';
    });
    stoneCells.forEach((cell) => {
      field[cell[0]][cell[1]].type = 'stone';
    });

    return {
      name: null,
      started: false,
      gameOver: false,
      timer: 0,
      hearts: 0,
      field: field,
      playerPos: [0, 0],
      timerInterval: null,
    };
  },
});
