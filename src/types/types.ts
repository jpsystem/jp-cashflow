export type tyUsuario = {
  key:           number,
  id:            number,
  email:         string,
  nome:          string,
  senha:         string,
  perfil:        string,
  login:         string,
  token?:         string,
  dtToken?:       Date,
  confirmaSenha: string,
};

export type tyGrupo = {
  key?:       number,
  id?:        number,
  nome:       string,
  descricao?:  string,
  tipo?:       string,
  ativo?:     boolean,
  userId?:    number,
}

export type tyFonte = {
  id?:        number;
  nome:       string;
  descricao?:  string;
  tipo:       string;
  ativo:     boolean;
  userId:    number,
}

export type tySubGrupo = {
  key?:       number,
  id?:        number,
  nome:       string,
  descricao?:  string,
  ativo?:     boolean,
  grupoId?:   number,
}

export type tyGrupoLista = {
  id?:            number,
  nome?:          string,
  descricao?:     string,
  ativo?:         boolean,
  userId?:         number,
  qtdSubGrupos?:  number,
}

export type tySelects = {
  id?:            number,
  nome?:          string,
}