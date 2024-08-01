"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconAgenda,
  IconCadastros,
  IconDashBoard,
  IconHome,
  IconLancamentos,
  IconMenu,
} from "./iconsMenu";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";

export default function ClientDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Drawer
        scroll-smooth
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="left"
      >
        <DrawerTrigger asChild>
          <div className="w-10">
            <Button variant="ghost" onClick={() => setIsDrawerOpen(true)}>
              <IconMenu />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col h-[calc(100vh-86px)]">
          <nav className="flex flex-col py-0 bg-sky-900 text-sky-50 flex-1 justify-center mb-24">
            <Link
              className="flex items-center w-full px-3 py-4 hover:bg-sky-800"
              href="/home"
              onClick={handleLinkClick}
            >
              <IconHome className="w-6 h-6 mr-3" />
              <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                Home
              </span>
            </Link>
            <Link
              className="flex items-center w-full px-3 py-4 hover:bg-sky-800"
              href="/dashboard"
              onClick={handleLinkClick}
            >
              <IconDashBoard className="w-6 h-6 mr-3" />
              <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                Dashboard
              </span>
            </Link>
            <Link
              className="flex items-center w-full px-3 py-4 hover:bg-sky-800"
              href="/lancamentos"
              onClick={handleLinkClick}
            >
              <IconLancamentos className="w-6 h-6 mr-3" />
              <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                Lançamentos
              </span>
            </Link>
            <Link
              className="flex items-center w-full px-3 py-4 hover:bg-sky-800"
              href="/agendamentos"
              onClick={handleLinkClick}
            >
              <IconAgenda className="w-6 h-6 mr-3" />
              <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                Agendamento
              </span>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center w-full px-3 py-4 hover:bg-sky-800">
                  <IconCadastros className="w-6 h-6 mr-3" />
                  <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                    Cadastros
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-56 min-w-[200px] p-0 bg-cover border-r border-black text-sky-50 mb-16"
                side="right"
              >
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/grupoDeContas"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="w-5 h-5 mr-3" />
                    <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                      Grupo de Contas
                    </span>
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/fonte"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="w-5 h-5 mr-3" />
                    <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                      Contas financeiras
                    </span>
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/orcamentos"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="w-5 h-5 mr-3" />
                    <span className="text-base xs:text-sm sm:text-lg xl:text-xl 2xl:text-2xl flex items-center">
                      Orçamento
                    </span>
                  </Link>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
