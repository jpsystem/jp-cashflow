'use client'

export default function LabelError({children}: any){

  return(
    <span className="text-red-500 relative font-bold text-xs ">⌦ {children}</span>
  )
}