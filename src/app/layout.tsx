import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import AuthProvider from "@/components/providers/auth-provider";
import Modal from "@/components/ui/jp/modal/modal";
import ActivityIcon from "./ActivityIcon";
import UserCircleIcon from "./UserCircleIcon";
import ClientDrawer from "./ClientDrawer"; // Importando o Client Component
import LogoutButton from "./_components/logoutButton";

//==========================================================
import  Query2ClientProvider from '@/lib/queryProvider';
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
      <body className={inter.className}>
        <AuthProvider>
        <Query2ClientProvider client={queryClient}>
          <div className="flex flex-col min-h-screen text-lg sm:text-2xl">
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
              {session && <ClientDrawer />}
              <div className="flex-1 flex flex-col w-full p-4 min-h-0 bg-white">
                {children}
              </div>
            </div>
            {/* Parte inferior */}
            <div className="flex items-center w-full h-14 px=4 bg-sky-900 border-b-5 dark:border-gray-700">
              <Link
                className="flex items-center gap-2 text-sm sm:text-lg font-semibold"
                href="#"
              >
                <ActivityIcon className="w-6 h-6 text-sky-50 ml-2" />
                <span className="text-sky-50">
                  © 2023 JP System Ltda. All rights reserved.
                </span>
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
                      className="hover:bg-sky-800 hover:text-sky-100 text-sky-50 border-r border-sky-50 mr-2"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {/* <Modal /> */}
          </Query2ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
