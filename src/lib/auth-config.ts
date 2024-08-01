//import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import { NextAuthOptions, User } from "next-auth";

export const auth: NextAuthOptions = {
  pages: {
    signIn: "/"
  },
  providers:[
    CredentialsProvider({
      
      name: 'Credentials',

      credentials: {
        nickname: {label: "Login", type: "text", },
        //email: { label: "Email", type: "email", placeholder: "your@domin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //Se não retornou as crendencias retorna null
        if(!credentials){
          return null
        }

        const user: User = {
          id: "1",
          name: "vasio",
          email: "vasio",
          nickname: "vasio",
          role: "admin"
        }

        try {
          const rep = await fetch(`http://localhost:3000/api/user?login=${credentials?.nickname}`);
          const retorno = await rep.json();
          const data = retorno.users;
          if(data){
            user.id = data.id.toString();
            user.email = data.email;
            user.name = data.nome.toUpperCase();
            user.nickname = data.login;
            user.role = data.perfil;
          }
          if(credentials.nickname.toUpperCase() ===  data.login && credentials.password === data.senha){
            return user
          }
          return null

        } catch (error) {
          return null
        }

      }
    })
  ],
  callbacks:{
    jwt({token, user}) {
        let nickname: string;

        if(user){
          nickname = user.nickname?.toLowerCase() || "default";
          token.role = user.role;
          token.nickname = nickname;   
          token.id = parseInt(user.id);
        }
        return token;
    },
    session({session, token}) {
        session.user.role = token.role;
        session.user.nickname = token.nickname;
        session.user.id = token.id;

        return session;
    },
  }
}
