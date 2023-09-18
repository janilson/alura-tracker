import {InjectionKey} from 'vue'
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import INotificacao from "@/interfaces/INotificacao";
import {EstadoProjeto, projeto} from "@/store/modules/projeto";
import {EstadoTarefa, tarefa} from "@/store/modules/tarefas";
import {NOTIFICAR} from "@/store/tipo-mutacoes";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => novaNotificacao.id != notificacao.id);
            }, 3000);
        }
    },
    actions: {

    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}