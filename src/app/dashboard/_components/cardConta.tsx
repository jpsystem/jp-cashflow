import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuCalendarDays, LuInfo } from "react-icons/lu";

interface CardContaProps {
  icone: string;
  conta: string;
  valor: number;
}

export default function CardConta({ icone, conta, valor }: CardContaProps) {
  return (
    <>
      <div className="flex justify-between space-x-4 text-sky-800">
        <Avatar>
          <AvatarImage src={"/" + icone} />
          <AvatarFallback>
            <LuInfo />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-sm font-semibold text-sky-900">{conta}</h1>
          <h1 className="text-lg font-bold text-sky-800">
            {"R$ " + valor.toString()}
          </h1>
          <div className="flex items-center pt-2 ">
            <LuCalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground opacity-70 text-sky-800 ">
              ver detalhes...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
