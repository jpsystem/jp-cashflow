"use client"

import {
  LuHome,
  LuBarChartBig,
  LuFileEdit,
  LuCalendarCheck,
  LuDatabase,
} from "react-icons/lu"

import { useSession } from "next-auth/react"

export function IconHome(props: any) {
  const { data: session } = useSession()
  return (
    <>
      <LuHome {...props} />
      {/* <span>{(session ? session.user.name : '')}</span> */}
    </>
  )
}

export function IconDashBoard(props: any) {
  return <LuBarChartBig {...props} />
}

export function IconLancamentos(props: any) {
  return <LuFileEdit {...props} />
}

export function IconAgenda(props: any) {
  return <LuCalendarCheck {...props} />
}

export function IconCadastros(props: any) {
  return <LuDatabase {...props} />
}
