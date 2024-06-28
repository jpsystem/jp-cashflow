import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  IconAgenda,
  IconCadastros,
  IconDashBoard,
  IconHome,
  IconLancamentos,
} from "./_components/iconsMenu"
import LogoutButton from "./_components/logoutButton"
import AuthProvider from "@/components/providers/auth-provider"
import Modal from "@/components/ui/jp/modal/modal"
import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/lib/auth-config"
import {
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  Popover,
} from "@/components/ui/popover"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JP Cash Flow",
  description: "Para suas necessidades financeiras",
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen text-lg sm:text-2xl">
            {/* Parte superior */}
            <div className="flex items-center w-full h-14 px-4 bg-gray-400 border-b dark:border-gray-700 border-y-5">
              <Link
                className="flex items-center gap-2 text-xl sm:text-2xl font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6" />
                <span className="py-4">JP Cash Flow</span>
              </Link>
              <div className="flex items-center gap-4 ml-auto">
                {session && (
                  <Link
                    className="flex items-center gap-2 text-xl sm:text-2xl font-medium py-4"
                    href="#"
                  >
                    <UserCircleIcon
                      className={`w-6 h-6 ${
                        session.user.role !== "admin"
                          ? "text-blue-700"
                          : "text-green-700"
                      } rounded-full`}
                    />
                    <span>{session.user.name}</span>
                  </Link>
                )}
                {/* <LogoutButton
                  size="lg"
                  text={session ? "Logout" : "Login"}
                  variant="outline"
                  className="hover:bg-gray-100"
                /> */}
              </div>
            </div>
            {/* Parte central */}
            <div className="flex flex-1 w-full min-h-[80vh] bg-gray-200 overflow-hidden">
              {session && (
                <nav className="flex flex-col items-center w-full sm:w-44 h-full py-4 border-r bg-gray-200 dark:bg-gray-800 border-gray-200 dark:border-gray-800">
                  <Link
                    className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                    href="/home"
                  >
                    <IconHome className="w-6 h-6" />
                    <span className="text-base sm:text-2xl leading-none">
                      Home
                    </span>
                  </Link>
                  <Link
                    className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                    href="/dashboard"
                  >
                    <IconDashBoard className="w-6 h-6" />
                    <span className="text-base sm:text-2xl leading-none">
                      Dashboard
                    </span>
                  </Link>
                  <Link
                    className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                    href="/lancamentos"
                  >
                    <IconLancamentos className="w-6 h-6" />
                    <span className="text-base sm:text-2xl leading-none">
                      Lançamentos
                    </span>
                  </Link>
                  <Link
                    className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                    href="#"
                  >
                    <IconAgenda className="w-6 h-6" />
                    <span className="text-base sm:text-2xl leading-none">
                      Agendamento
                    </span>
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Link
                        className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                        href="#"
                      >
                        <IconCadastros className="w-6 h-6" />
                        <span className="text-base sm:text-2xl leading-none">
                          Cadastros
                        </span>
                      </Link>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-56 min-w-[200px] p-2 bg-slate-200"
                      side="right"
                    >
                      {/* <PopoverClose asChild>
                        <Link
                          className="flex items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                          href="/cadastros/fonte"
                        >
                          <IconCadastros className="mr-2 h-4 w-4" />
                          Fontes
                        </Link>
                      </PopoverClose> */}
                      <PopoverClose asChild>
                        <Link
                          className="flex items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                          href="/cadastros/grupoDeContas"
                        >
                          <IconCadastros className="mr-2 h-4 w-4" />
                          Grupo de Contas
                        </Link>
                      </PopoverClose>
                      <PopoverClose asChild>
                        <Link
                          className="flex items-center w-full px-3 py-4 text-center hover:bg-gray-100"
                          href="/cadastros/fonte"
                        >
                          <IconCadastros className="mr-2 h-4 w-4" />
                          Contas financeiras
                        </Link>
                      </PopoverClose>
                    </PopoverContent>
                  </Popover>
                </nav>
              )}
              <div className="flex-1 flex flex-col w-full p-4 min-h-0 bg-white">
                {children}
              </div>
            </div>
            {/* Parte inferior */}
            <div className="flex items-center w-full h-14 px-4 bg-gray-400 border-b-5 dark:border-gray-700 ">
              <Link
                className="flex items-center gap-2 text-sm sm:text-lg font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6" />
                <span>© 2023 JP System Ltda. All rights reserved.</span>
              </Link>
              <div className="flex items-center gap-4 ml-auto">
                {session && (
                  <>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium"
                      href="#"
                    >
                      <UserCircleIcon className="w-4 h-4 rounded-full" />
                      <span className="text-base sm:text-2xl">
                        {session.user.name}
                      </span>
                    </Link>
                    <LogoutButton
                      size="lg"
                      text="Logout"
                      variant="outline"
                      className="hover:bg-gray-100"
                    ></LogoutButton>
                  </>
                )}
                {/* <LogoutButton
                  size="lg"
                  text="Logout"
                  variant="outline"
                  className="hover:bg-gray-100"
                ></LogoutButton> */}
              </div>
            </div>
          </div>
          <Modal />
        </AuthProvider>
      </body>
    </html>
  )
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function UserCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
