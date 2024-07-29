import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import AuthProvider from "@/components/providers/auth-provider";
import Modal from "@/components/ui/jp/modal/modal";
import ActivityIcon from "./_components/ActivityIcon";
import UserCircleIcon from "./_components/UserCircleIcon";
import ClientDrawer from "./_components/ClientDrawer"; // Importando o Client Component
import LogoutButton from "./_components/logoutButton";

//==========================================================
import Query2ClientProvider from "@/lib/queryProvider";
import queryClient from "@/lib/reactQuery";
//==========================================================

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
      <body className={`${inter.className} flex flex-col h-screen`}>
        <AuthProvider>
          <Query2ClientProvider client={queryClient}>
            {/* Parte superior */}
            <header className="fixed top-0 left-0 w-full h-14 px-4 bg-sky-900 border-b dark:border-gray-700 text-sky-50 z-1">
              <div className="flex items-center h-full">
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
            </header>
            {/* Parte central */}
            <div className="flex flex-col flex-grow w-full pt-14 pb-14 overflow-y-auto">
              {session && <ClientDrawer />}
              <div className="flex flex-col flex-grow w-full pr-8 pl-8 pt-2 pb-2 bg-white">
                {children}
              </div>
            </div>
            {/* Parte inferior */}
            <footer className="fixed bottom-0 left-0 w-full h-14 px-4 bg-sky-900 border-t dark:border-gray-700 flex items-center z-1">
              <Link
                className="flex items-center gap-2 text-sm sm:text-lg font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6 text-sky-50" />
                <span className="text-sky-50">
                  © 2023 JP System Ltda. All rights reserved.
                </span>
              </Link>
              <div className="flex items-center gap-4 ml-auto mr-2">
                {session && (
                  <LogoutButton
                    size="lg"
                    text="Logout"
                    variant="outline"
                    className="hover:bg-sky-800 hover:text-sky-100 text-sky-50 border-r border-sky-50"
                  />
                )}
              </div>
            </footer>
          </Query2ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
