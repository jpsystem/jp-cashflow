import {auth as authOptions} from '@/lib/auth-config'
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// const handler = NextAuth({
//   pages: {
//     signIn: "/"
//   },
//   providers:[
//     CredentialsProvider({
      
//       name: 'Credentials',

//       credentials: {
//         email: { label: "Email", type: "email",  },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         const rep = await fetch(`http://localhost:3000/api/user?email=${credentials?.email}`);
//         const data = await rep.json();

//         if(!credentials){
//           return null
//         }

//         if(credentials.email === "jpsystem@gmail.com" && credentials.password === "12345"){
//           return {
//             id: "1",
//             name: "João Pedro",
//             email: credentials.email
//           }
//         }
//         //console.log(credentials)
//         return null
//       }
//     })
//   ]
// })

// export { handler as GET, handler as POST }