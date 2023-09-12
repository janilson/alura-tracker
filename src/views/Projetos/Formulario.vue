<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
            type="text"
            class="input"
            v-model="nomeDoProjeto"
            id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import {useStore} from "@/store";
import {defineComponent} from "vue";

import {ADICIONA_PROJETO, ALTERA_PROJETO} from '@/store/tipo-mutacoes'
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String
    }
  },

  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: ""
    };
  },
  methods: {
    salvar() {
      const notificacao: INotificacao = {
        texto: 'Projeto salvo com sucesso!',
        titulo: 'Novo Projeto',
        tipo: TipoNotificacao.SUCESSO
      };

      if (this.id) {
        notificacao.texto = 'Projeto alterado com sucesso';
        notificacao.titulo = 'Alterar Projeto';

        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
      }

      this.notificar(notificacao.tipo, notificacao.titulo, notificacao.texto);
      this.nomeDoProjeto = "";
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = useStore()
    const {notificar} = useNotificador()
    return {
      store,
      notificar
    }
  }
});
</script>
