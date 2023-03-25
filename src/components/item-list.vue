<template>
  <ul class="item-list">
    <item-preview
      class="item-preview"
      @playTurn="playTurn"
      v-for="item in items"
      :item="item"
      :key="item._id"
    />
  </ul>
</template>

<script>
import itemPreview from "./item-preview.vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    itemPreview,
  },
  methods: {
    playTurn(item) {
      // console.log(item);
      this.$emit("playTurn", item);
    },
  },
};
</script>
