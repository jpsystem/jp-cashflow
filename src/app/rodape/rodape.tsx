import Link from "next/link";
import ActivityIcon from "../_components/ActivityIcon";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";
import LogoutButton from "../_components/logoutButton";

export default async function Rodape() {
  const session = await getServerSession(authOptions);

  return(
    <footer className="fixed bottom-0 left-0 w-full h-14 px-4 bg-sky-900 border-t dark:border-gray-700 flex items-center z-10">
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
  )
}