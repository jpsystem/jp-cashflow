'use client'

import { LuHome, LuBarChartBig, LuFileEdit, LuCalendarCheck, LuDatabase } from "react-icons/lu";

export function IconHome(props: any ){
  return(
    <LuHome {...props} />
  )
}

export function IconDashBoard(props: any ){
  return(
    <LuBarChartBig {...props} />
  )
}

export function IconLancamentos(props: any ){
  return(
    <LuFileEdit {...props} />
  )
}

export function IconAgenda(props: any ){
  return(
    <LuCalendarCheck {...props} />
  )
}

export function IconCadastros(props: any ){
  return(
    <LuDatabase {...props} />
  )
}

