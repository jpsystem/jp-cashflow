
import { SelectFontes} from "@/actions/selectActions";
import { useLancamentoContext } from "../contextLancamentoProvider"
import { useGlobalContext } from "@/app/contextGlobal";
import { tySelects } from "@/types/types";
import { useQuery} from 'react-query';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";


export default function ComboFontes () { 
  const {fonteId, setFonteId} = useLancamentoContext();
  const {usuarioId} = useGlobalContext();

  //Carrega os Fontes
  const { data, isLoading, refetch } = useQuery( ["listaFontes", usuarioId], async () => {
    const response:tySelects[] = await SelectFontes(usuarioId);
    return response;
  })

  if(isLoading){
    return(
      <div>
        Carregando...
      </div>
    )
  }

  const onChange = async (value: string) =>{
    setFonteId(Number(value));
    return true
  }

  return(
    <div>
      <Select defaultValue={fonteId.toString()} onValueChange={onChange}>
        <SelectTrigger className="w-full text-sky-800 border-2">
          <SelectValue placeholder="Selecione a conta" />
        </SelectTrigger>
        <SelectContent className="border-2 border-sky-900 p-0 m-0">
          <SelectGroup className="bg-white text-sky-900">
            { data?.map((item, index)=>(
              <SelectItem className="bg-sky-100  text-sky-900"  key={index} value={item.id?.toString()||""}>{item.nome}</SelectItem>
            )

            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )

}