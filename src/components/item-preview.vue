<template>
  <section>
    {{ item }}
    <div v-if="item.isX" @click="play(item)">X</div>
    <div v-else-if="item.isO" @click="play(item)">O</div>
    <div v-else @click="play(item)">-</div>
    <!-- <h3>{{ item.isY }}</h3> -->
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
  computed: {},
  methods: {
    play(item) {
      console.log(item);
      // item.isX = !item.isX;
      // item.isY = !item.isY;
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
