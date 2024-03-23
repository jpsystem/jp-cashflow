import { NextResponse, type NextRequest  } from "next/server";
import { getServerSession } from "next-auth";

export async function middleware(request: NextRequest){

  const testes = request.cookies.get("next-auth.csrf-token");
  console.log("Seção: ", testes);
  return null;
}

// export const config = {
//   matcher: "/home/:path*"
// })