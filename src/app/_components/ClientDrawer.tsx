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
    <div className="flex flex-col h-screen justify-between">
      <Drawer
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
        <DrawerContent className="flex flex-col h-full">
          <DrawerHeader></DrawerHeader>
          <nav className="flex flex-col items-center w-full sm:w-44 h-full py-4 bg-sky-900 text-sky-50 ">
            <Link
              className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
              href="/home"
              onClick={handleLinkClick}
            >
              <IconHome className="w-6 h-6" />
              <span className="text-base sm:text-3xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                Home
              </span>
            </Link>
            <Link
              className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
              href="/dashboard"
              onClick={handleLinkClick}
            >
              <IconDashBoard className="w-6 h-6" />
              <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                Dashboard
              </span>
            </Link>
            <Link
              className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
              href="/lancamentos"
              onClick={handleLinkClick}
            >
              <IconLancamentos className="w-6 h-6" />
              <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                Lançamentos
              </span>
            </Link>
            <Link
              className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800"
              href="#"
              onClick={handleLinkClick}
            >
              <IconAgenda className="w-6 h-6" />
              <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                Agendamento
              </span>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-col items-center w-full px-3 py-4 text-center hover:bg-sky-800">
                  <IconCadastros className="w-6 h-6" />
                  <span className="text-base sm:text-2xl xl:text-2xl 2xl:text-2xl leading-none md:flex">
                    Cadastros
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-56 min-w-[200px] p-0 bg-cover border-r border-black text-sky-50"
                side="right"
              >
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 text-center hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/grupoDeContas"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="mr-2 h-4 w-4 text-base sm:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:flex" />
                    Grupo de Contas
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 text-center hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/fonte"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="mr-2 h-4 w-4 text-base sm:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:flex " />
                    Contas financeiras
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className="flex items-center w-full px-3 py-4 text-center hover:bg-sky-800 bg-sky-900 bg-cover"
                    href="/cadastros/orcamentos"
                    onClick={handleLinkClick}
                  >
                    <IconCadastros className="mr-2 h-4 w-4 text-base sm:text-2xl xl:text-3xl 2xl:text-4xl leading-none md:flex" />
                    Orçamento
                  </Link>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </nav>
          <DrawerFooter className="p-4 sm:p-6 bg-sky-900 mt-auto h-fit bottom-auto"></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
