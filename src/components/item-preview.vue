<template>
  <section class="item-preview">
    <div class="box" v-if="item.isX" @click="play(item)">X</div>
    <div class="box" v-else-if="item.isO" @click="play(item)">O</div>
    <div class="box" v-else @click="play(item)">-</div>
  </section>
</template>

<script>
export default {
  name: "item-preview",
  props: {
    item: Object,
  },
  data() {
    return {
      openPreviewMode: false,
    };
  },
  components: {},
  computed: {
    currPlayer() {
      return this.$store.getters.currPlayer;
    },
  },
  methods: {
    play(item) {
      if (!this.currPlayer) {
        this.$store.commit({
          type: "setVictoryMsg",
          msg: "Choose player",
        });
        return;
      }
      this.$emit("playTurn", item);
    },
    openPreviewLine() {
      this.openPreviewMode = !this.openPreviewMode;
    },
    goToDetail() {
      this.$router.push(`/item/${this.item._id}`);
    },
    goToEdit() {
      this.$router.push(`/item/edit/${this.item._id}`);
    },
    removeItem(itemId) {
      this.$emit("removeItem", itemId);
    },
  },
};
</script>
