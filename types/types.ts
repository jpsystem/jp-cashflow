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
  key:       number,
  id:        number,
  nome:      string,
  descricao: string,
  tipo:      string,
  userID:    number,
}

export type tySubGrupo = {
  key:       number,
  id:        number,
  nome:      string,
  descricao: string,
}