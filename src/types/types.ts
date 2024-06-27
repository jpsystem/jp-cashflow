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
  descricao:  string,
  tipo:       string,
  ativo?:     boolean,
  userID?:    number,
}

export type tyFonte = {
  id?:        number;
  nome:       String;
  descricao:  String;
  tipo:       String;
  ativo?:     boolean;
}

export type tySubGrupo = {
  key?:       number,
  id?:        number,
  nome:       string,
  descricao:  string,
  ativo?:     boolean,
  grupoId?:   number,
}

export type tyGrupoLista = {
  id?:            number,
  nome?:          string,
  descricao?:     string,
  ativo?:         boolean,
  qtdSubGrupos?:  number,
}

export type tySelects = {
  id?:            number,
  nome?:          string,
}