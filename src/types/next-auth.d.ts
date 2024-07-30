//Este arquivo é para extender a interface do
//usuário padrão do Next Auth

import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session{
    user:{
      role?:      string;
      nickname?:  string;
      name?:      string;
      email?:     string;
      id?:        number;
    }
  }  
  interface User{
    role:     string | undefined;
    nickname: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role:     string | undefined;
    nickname: string | undefined;
    name:     string | undefined;
    email:    string | undefined;
    id:       number | undefined;
  }
}