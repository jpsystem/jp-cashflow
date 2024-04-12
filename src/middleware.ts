import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  
  function middleware(req){
    //req.nextUrl.pathname === "/paginaRestrita" &&
    if( req.nextauth.token?.role !== "admin"){
      return NextResponse.rewrite(new URL("/unauthorized", req.url))
    }
  },
  {
    callbacks: {
      authorized({token}){
        //console.log("CallBack", !!token)
        //return !!token;
        return true;
      }
    }
    
  }
)
//req.nextUrl.pathname === "/paginaRestrita" &&
export const config = {
  //matcher: "/paginaRestrita"
  matcher: [
    "/cadastros/grupoDeContas/:path*",
    "/paginaRestrita"
  ]
}