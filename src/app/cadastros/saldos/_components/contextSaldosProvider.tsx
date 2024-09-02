"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { tySaldo } from '@/types/types';

interface AppContextProps {
  dados: tySaldo[];
  setDados: (data: tySaldo[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  userId: number|undefined;
  children: ReactNode; // Definindo explicitamente o tipo do children
}

export const SaldosProvider: React.FC<AppProviderProps> = ({children, userId}: AppProviderProps) => {

  const [dados, setDados] = useState<tySaldo[]>([]);

  return (
    <AppContext.Provider value={{ dados, setDados }}>
      {children}
    </AppContext.Provider>
  );
};

export const useSaldoContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
};