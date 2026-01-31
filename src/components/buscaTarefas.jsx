"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Search } from "lucide-react"

import Link from "next/link";

export default function BuscarTarefa({pesquisa, setPesquisa}) {

  return (
    
    <div className="container d-flex bg-primary align-items-center flex-column mb-5 g-2 conteudo-principal text-white p-4 rounded-md">
      <h1>Pesquisar tarefas:</h1>
      <div className="flex flex-row gap-2 items-center">
        <Search />
        <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} placeholder="Pequisar tarefa" className="bg-[#DEDEDE] w-full text-background p-1 rounded-sm"/>
      </div>
    </div>
  );
}
