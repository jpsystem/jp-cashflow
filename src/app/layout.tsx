import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconAgenda,
  IconCadastros,
  IconDashBoard,
  IconHome,
  IconLancamentos,
  IconMenu,
} from "./_components/iconsMenu";
import LogoutButton from "./_components/logoutButton";
import AuthProvider from "@/components/providers/auth-provider";
import Modal from "@/components/ui/jp/modal/modal";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import {
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  Popover,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JP Cash Flow",
  description: "Para suas necessidades financeiras",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen text-lg sm:text-2xl ">
            {/* Parte superior */}
            <div className="flex items-center w-full h-14 px-4 bg-sky-900 border-b dark:border-gray-700 text-sky-50">
              <Link
                className="flex items-center gap-2 text-xl sm:text-2xl font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6 text-sky-50" />
                <span className="py-4 text-sky-50">JP Cash Flow</span>
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
                    <span className="text-sky-50">{session.user.name}</span>
                  </Link>
                )}
              </div>
            </div>
            {/* Parte central */}
            <div className="flex flex-1 w-full min-h-[80vh] overflow-hidden md:flex">
              {session && (
                <Drawer>
                  <DrawerTrigger asChild>
                    <div className="w-10">
                      <Button variant="ghost">
                        <IconMenu></IconMenu>
                      </Button>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader  className="">
                    </DrawerHeader>
                    <nav className="flex flex-col items-center w-full sm:w-44 h-full py-4 text-sky-50 ">
                      <Link
                        className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
                        href="/home"
                      >
                        <IconHome className="w-6 h-6" />
                        <span className="text-base sm:text-3xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                          Home
                        </span>
                      </Link>
                      <Link
                        className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
                        href="/dashboard"
                      >
                        <IconDashBoard className="w-6 h-6" />
                        <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                          Dashboard
                        </span>
                      </Link>
                      <Link
                        className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
                        href="/lancamentos"
                      >
                        <IconLancamentos className="w-6 h-6" />
                        <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                          Lançamentos
                        </span>
                      </Link>
                      <Link
                        className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
                        href="#"
                      >
                        <IconAgenda className="w-6 h-6" />
                        <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                          Agendamento
                        </span>
                      </Link>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Link
                            className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
                            href="#"
                          >
                            <IconCadastros className="w-6 h-6" />
                            <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex hover:bg-sky-800">
                              Cadastros
                            </span>
                          </Link>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="w-56 min-w-[200px] p-0 bg-cover border-r border-black text-sky-50"
                          side="right"
                        >
                          <PopoverClose asChild>
                            <Link
                              className="flex items-center w-full px-3 py-4 text-center hover:bg-sky-800 bg-sky-900 bg-cover"
                              href="/cadastros/grupoDeContas"
                            >
                              <IconCadastros className="mr-2 h-4 w-4 text-base sm:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:flex" />
                              Grupo de Contas
                            </Link>
                          </PopoverClose>
                          <PopoverClose asChild>
                            <Link
                              className="flex items-center w-full px-3 py-4 text-center hover:bg-sky-800 bg-sky-900 bg-cover"
                              href="/cadastros/fonte"
                            >
                              <IconCadastros className="mr-2 h-4 w-4 text-base sm:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:flex " />
                              Contas financeiras
                            </Link>
                          </PopoverClose>
                        </PopoverContent>
                      </Popover>
                    </nav>
                   {/* <DrawerFooter>
                    salve
                   </DrawerFooter> */}
                  </DrawerContent>
                </Drawer>
              )}
              <div className="flex-1 flex flex-col w-full p-4 min-h-0 bg-white">
                {children}
              </div>
            </div>
            {/* Parte inferior */}
            <div className="flex items-center w-full h-14 px-4 bg-sky-900 border-b-5 dark:border-gray-700">
              <Link
                className="flex items-center gap-2 text-sm sm:text-lg font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6 text-sky-50" />
                <span className="text-sky-50">© 2023 JP System Ltda. All rights reserved.</span>
              </Link>
              <div className="flex items-center gap-4 ml-auto">
                {session && (
                  <>
                    <Link
                      className="flex items-center gap-2 text-xs sm:text-sm font-medium"
                      href="#"
                    ></Link>
                    <LogoutButton
                      size="lg"
                      text="Logout"
                      variant="outline"
                      className="hover:bg-sky-800 text-sky-50 border-r border-black"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <Modal />
        </AuthProvider>
      </body>
    </html>
  );
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
  );
}

function UserCircleIcon(props: any) {
  return (
    <svg
      {...props}
      className="text-white"
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
  );
}
