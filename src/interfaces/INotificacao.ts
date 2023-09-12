export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO,
    INFO
}

export default interface INotificacao {
    id?: number;
    titulo: string;
    texto: string;
    tipo: TipoNotificacao;
}