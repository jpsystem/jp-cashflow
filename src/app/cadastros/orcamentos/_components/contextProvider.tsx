"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import queryClient from "@/lib/reactQuery";
import { tyOrcamento } from '@/types/types';
//import {useSession } from "next-auth/react"


interface AppContextProps {
  usuarioId: number;
  setUsuarioId: (data: number) => void;
  periodoId: number;
  setPeriodoId: (data: number) => void;
  dados: tyOrcamento[];
  setDados: (data: tyOrcamento[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  userId: number|undefined;
  children: ReactNode; // Definindo explicitamente o tipo do children
}

export const AppProvider: React.FC<AppProviderProps> = ({children, userId}) => {

  //const { data: session } = useSession();

  const [usuarioId, setUsuarioId] = useState<number>(userId||0);
  const [periodoId, setPeriodoId] = useState<number>(0);
  const [dados, setDados] = useState<tyOrcamento[]>([]);

  return (
    <AppContext.Provider value={{ usuarioId, setUsuarioId, 
                                  periodoId, setPeriodoId,
                                  dados, setDados }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
};
