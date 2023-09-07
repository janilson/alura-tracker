<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa?.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa?.duracaoEmSegundos"/>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Box from "@/components/Box.vue";
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: 'TarefaC',
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },

  components: {
    Box,
    Cronometro
  }
});
</script>

<style scoped>

</style>