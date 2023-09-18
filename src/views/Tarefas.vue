<template>
  <Formulario @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Box v-if="tarefas.length == 0">
      Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index" @aoTarefaClicada="selecionarTarefa"/>
    <ModalC :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoTarefa" class="label">Descricao</label>
          <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </template>
    </ModalC>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";

import Box from "@/components/Box.vue";
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import useNotificador from "@/hooks/notificador";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/ITarefa";
import {useStore} from "@/store";
import {ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS} from "@/store/tipo-acoes";
import ModalC from "@/components/Modal.vue";

export default defineComponent({
  name: "TarefaC",
  components: {
    ModalC,
    Formulario,
    Tarefa,
    Box
  },

  setup() {
    const tarefaSelecionada = ref<ITarefa | null>(null);
    const store = useStore()
    const {notificar} = useNotificador()

    const filtro = ref("");
    const tarefas = computed(() => store.state.tarefa.tarefas);

    store.dispatch(OBTER_TAREFAS);

    const salvarTarefa = (tarefa: ITarefa): void => {
      store.dispatch(CADASTRAR_TAREFA, tarefa)
          .then(() => {
            const notificacao: INotificacao = {
              texto: 'Tarefa salva com sucesso!',
              titulo: 'Nova Tarefa',
              tipo: TipoNotificacao.SUCESSO
            };

            notificar(notificacao.tipo, notificacao.titulo, notificacao.texto);
          });
    };

    const alterarTarefa = (): void => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
          .then(() => {
            const notificacao: INotificacao = {
              texto: 'Tarefa alterada com sucesso!',
              titulo: 'Alterar Tarefa',
              tipo: TipoNotificacao.SUCESSO
            };

            notificar(notificacao.tipo, notificacao.titulo, notificacao.texto);
            fecharModal();
          });
    };

    const selecionarTarefa = (tarefa: ITarefa): void => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = (): void => {
      tarefaSelecionada.value = null;
    };

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefaSelecionada,
      tarefas,
      filtro,
      salvarTarefa,
      alterarTarefa,
      selecionarTarefa,
      fecharModal
    }
  }
});
</script>
