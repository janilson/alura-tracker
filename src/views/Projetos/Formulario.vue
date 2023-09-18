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
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import useNotificador from "@/hooks/notificador";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {useStore} from "@/store";
import {ALTERAR_PROJETO, CADASTRAR_PROJETO} from "@/store/tipo-acoes";

export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String
    }
  },

  setup(props) {
    const router = useRouter();
    const store = useStore()
    const {notificar} = useNotificador()

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)

      nomeDoProjeto.value = projeto?.nome || ''
    }

    const finalizarAcao = (notificacao: INotificacao): void => {
      notificar(notificacao.tipo, notificacao.titulo, notificacao.texto);
      nomeDoProjeto.value = "";
      router.push('/projetos')
    }

    const salvar = () => {
      const notificacao: INotificacao = {
        texto: 'Projeto salvo com sucesso!',
        titulo: 'Novo Projeto',
        tipo: TipoNotificacao.SUCESSO
      };

      if (props.id) {
        notificacao.texto = 'Projeto alterado com sucesso';
        notificacao.titulo = 'Alterar Projeto';

        store.dispatch(ALTERAR_PROJETO,
            {
              id: props.id,
              nome: nomeDoProjeto.value
            })
            .then(() => {
              finalizarAcao(notificacao);
            })
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto)
            .then(() => {
              finalizarAcao(notificacao);
            })
      }
    };

    return {
      nomeDoProjeto,
      salvar
    }
  }
});
</script>
