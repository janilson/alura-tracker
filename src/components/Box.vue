<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'BoxC'

})

</script>

<style scoped>
.box {
  background-color: #faf0ca;
}
</style>