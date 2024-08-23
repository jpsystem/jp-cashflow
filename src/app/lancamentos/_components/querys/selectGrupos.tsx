
import { SelectGrupos } from "@/actions/selectActions";
import { useLancamentoContext } from "../contextLancamentoProvider"
import { useGlobalContext } from "@/app/contextGlobal";
import { tySelects } from "@/types/types";
import { useQuery} from 'react-query';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";


export default function ComboGrupos () { 
  const {grupoId, setGrupoId} = useLancamentoContext();
  const {usuarioId} = useGlobalContext();

  //Carrega os Orcamentos
  const { data, isLoading, refetch } = useQuery( ["listaGrupos", usuarioId], async () => {
    const response:tySelects[] = await SelectGrupos(usuarioId);
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
    setGrupoId(Number(value));
    return true
  }

  return(
    <div>
      <Select defaultValue={grupoId.toString()} onValueChange={onChange}>
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