<template>
  <header class="main-header">
    <header class="main-nav">
      <div class="logo">XOXO</div>
      <h1 v-if="currPlayer && !gameOver">
        <span class="white">Curr Player: {{ currPlayer.toUpperCase() }} </span>
      </h1>
      <h1 v-else>
        <span class="white">{{ victoryMsg }}</span>
      </h1>

      <!-- <nav> -->

      <!-- <router-link class="link" to="/">Home</router-link> -->
      <!-- <router-link class="link" to="/"
        >Login <img src="@/assets/img/login.png" class="login-img"
      /></router-link> -->
      <!-- <router-link class="link" to="/">Login </router-link> -->
      <!-- <img src="../assets/img/login.png" class="login-img" /> -->
      <!-- </nav> -->
    </header>
  </header>
</template>

<script>
export default {
  name: "app-header",
  computed: {
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
};
</script>
