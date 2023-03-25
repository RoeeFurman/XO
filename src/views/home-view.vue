<template>
  <section class="item-app">
    <h1>XO</h1>
    <div>
      <button @click="setStartingPlayer('x')">X</button>
      <button @click="setStartingPlayer('o')">O</button>
      <h1>{{ currPlayer }}</h1>
      <h1>{{ victoryMsg }}</h1>
    </div>

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
  },
  methods: {
    playTurn(item) {
      // console.log("hello");
      this.$store.dispatch({ type: "playTurn", item });
    },
    setStartingPlayer(value) {
      this.$store.commit({ type: "setStartingPlayer", value });
    },
  },
  watch: {
    items: {
      handler() {
        console.log("changed");
      },
      immediate: true,
    },
  },
};
</script>
