"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tyLancamento, tySelects } from '@/types/types';

interface AppContextProps {
  dados: tyLancamento[];
  setDados: (data: tyLancamento[]) => void;
  grupoId: number;
  setGrupoId: (data: number) => void;
  subGrupoId: number;
  setSubGrupoId: (data: number) => void;
  fonteId: number;
  setFonteId: (data: number) => void;
}

const LancamentoContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode; // Definindo explicitamente o tipo do children
}

export const LancamentoProvider: React.FC<AppProviderProps> = ({children}: AppProviderProps) => {

  const [dados, setDados] = useState<tyLancamento[]>([]);
  const [grupoId, setGrupoId] = useState<number>(0)
  const [subGrupoId, setSubGrupoId] = useState<number>(0)
  const [fonteId, setFonteId] = useState<number>(0)

  return (
    <LancamentoContext.Provider value={{ dados, setDados, 
                                          grupoId, setGrupoId,
                                          subGrupoId, setSubGrupoId,
                                          fonteId, setFonteId
                                        }}>
      {children}
    </LancamentoContext.Provider>
  );
};

export const useLancamentoContext = () => {
  const context = useContext(LancamentoContext);
  if (!context) {
    throw new Error('useLancamentoContext deve ser usado dentro de um AppProvider');
  }
  return context;
};