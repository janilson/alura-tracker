<template>
  <div class="notificacoes">
    <article
        class="message"
        v-for="notificacao in notificacoes"
        :id="notificacao.id"
        :key="notificacao.id"
        :class="contexto[notificacao.tipo]">
      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
        <button class="delete" aria-label="delete" @click="() => {}"></button>
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
    <!--    <article class="message is-success">-->
    <!--      <div class="message-header">-->
    <!--        <p>Success</p>-->
    <!--        <button class="delete" aria-label="delete"></button>-->
    <!--      </div>-->
    <!--      <div class="message-body">-->
    <!--        Success-->
    <!--      </div>-->
    <!--    </article>-->
    <!--    <article class="message is-warning">-->
    <!--      <div class="message-header">-->
    <!--        <p>Warning</p>-->
    <!--        <button class="delete" aria-label="delete"></button>-->
    <!--      </div>-->
    <!--      <div class="message-body">-->
    <!--        Warning-->
    <!--      </div>-->
    <!--      <article class="message is-danger">-->
    <!--        <div class="message-header">-->
    <!--          <p>Danger</p>-->
    <!--          <button class="delete" aria-label="delete"></button>-->
    <!--        </div>-->
    <!--        <div class="message-body">-->
    <!--          Error-->
    <!--        </div>-->
    <!--      </article>-->
    <!--    </article>-->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  name: "NotificacoesC",

  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes)
    }
  },

  data() {
    return {
     contexto:{
       [TipoNotificacao.SUCESSO]: 'is-success',
       [TipoNotificacao.ATENCAO]: 'is-warning',
       [TipoNotificacao.FALHA]: 'is-danger',
       [TipoNotificacao.INFO]: 'is-info'
     }
    }
  },

  methods: {},

  computed: {}
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 100000;
}
</style>