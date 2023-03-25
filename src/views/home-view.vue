<template>
  <section class="item-app">
    <!-- <h1>XO</h1> -->
    <div class="user-msg">
      <div v-if="gameOver">
        <button @click="restartGame">
          <img src="@/assets/img/replay-2.svg" class="replay-logo" />
        </button>
      </div>
      <div v-if="!currPlayer" class="choose-player">
        <!-- <h1>Choose player:</h1> -->
        <button @click="setStartingPlayer('x')">X</button>
        <h1>?</h1>
        <button @click="setStartingPlayer('o')">O</button>
      </div>
    </div>
    <!-- <h1 v-if="currPlayer && !gameOver">Curr Player: {{ currPlayer }}</h1> -->

    <!-- <h2>Mister Item</h2> -->
    <item-list v-if="items" :items="items" @playTurn="playTurn" />
  </section>
</template>

<script>
import itemList from "../components/item-list.vue";
export default {
  name: "home",
  components: {
    itemList,
  },
  computed: {
    items() {
      return this.$store.getters.items;
    },
    currPlayer() {
      return this.$store.getters.currPlayer;
    },
    victoryMsg() {
      return this.$store.getters.victoryMsg;
    },
    gameOver() {
      return this.$store.getters.gameOver;
    },
  },
  methods: {
    playTurn(item) {
      this.$store.dispatch({ type: "playTurn", item });
    },
    setStartingPlayer(value) {
      this.$store.commit({ type: "setStartingPlayer", value });
    },
    restartGame() {
      this.$store.dispatch({ type: "restartGame" });
    },
  },
  watch: {
    items: {
      handler() {},
      immediate: true,
    },
  },
};
</script>
