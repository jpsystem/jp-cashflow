import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuCalendarDays } from "react-icons/lu";

interface CardContaProps {
  icone: string
  conta: string
  valor: number
}

export default function CardConta({icone, conta, valor}: CardContaProps ){
  return(
    <>
       <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={"/"+icone} />
            <AvatarFallback>Icone</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-sm font-semibold">{conta}</h1>
            <h1 className="text-lg font-bold">{"R$ "+ valor.toString()}</h1>
            <div className="flex items-center pt-2">
              <LuCalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                ver detalhes...
              </span>
            </div>
          </div>
        </div>   
    </>
  )
}