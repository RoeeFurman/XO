<template>
  <ul class="item-list" :style="{ width: calcWidth }" ref="table">
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
  computed: {
    calcWidth() {
      let height;
      this.$nextTick(function () {
        height = this.$refs.table.clientHeight;
        console.log(height);
      });

      return `${height}px`;
    },
  },
  methods: {
    playTurn(item) {
      // console.log(item);
      this.$emit("playTurn", item);
    },
  },
};
</script>
