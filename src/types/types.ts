export type tyUsuario = {
  key:           number,
  id:            number,
  email:         string,
  nome:          string,
  senha:         string,
  perfil:        string,
  login:         string,
  token?:        string,
  dtToken?:      Date,
  confirmaSenha: string,
};

export type tyGrupo = {
  key?:       number,
  id?:        number,
  nome:       string,
  descricao?: string,
  tipo?:      tipoGrupo,
  ativo:      boolean,
  userId?:    number,
}

export type tyFonte = {
  id?:        number;
  nome:       string;
  descricao?: string;
  tipo:       tipoFonte;
  ativo:      boolean;
  userId?:    number,
}

export type tySubGrupo = {
  key?:       number,
  id?:        number,
  nome:       string,
  descricao?: string,
  ativo?:     boolean,
  grupoId?:   number,
  acao?:      string,
}

export type tyGrupoLista = {
  id?:            number,
  nome?:          string,
  descricao?:     string,
  tipo?:          tipoGrupo, 
  tipoDesc?:      string, 
  ativo?:         boolean,
  userId?:        number,
  qtdSubGrupos?:  number,
}

export type tySelects = {
  id?:            number,
  nome?:          string,
}

export type tyErro = {
  name?:          string, 
  code?:          string,
  clientVersion?: string, 
  meta?: {
    modelName?: string, 
    target?:    string
  } 
}

export type tyResult = {
  status?:    string,
  menssagem?: string,
  dados: {},
}
export type tyOrcamento = {
  orcamentoId?: number,
  valor?:       number,
  nomeGrupo?:   string,
  tipoGrupo?:   string,
  grupoId?:     number,
  periodoId?:   number,
}

export enum tipoGrupo{
  Debito = "D",
  Credito = "C",
  Movimento = "M",
}

export enum tipoFonte{
  Aplicacao = "A",
  Credito = "C",
  Movimentacao = "M",
}