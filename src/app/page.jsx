"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

import { ListaTarefas } from '@/components/aFazer';
import { CardProgresso } from '@/components/cardProgresso';
import { AdicionarTarefa } from '@/components/adicionarTarefa';
import { CardRadio } from '@/components/radio';
import { Cpu, Zap } from 'lucide-react';

import { ModalInicial } from '@/components/modalnicial';
import { Pomodoro } from "@/components/pomodoro";
import BuscarTarefa from "@/components/buscaTarefas";

const Index = () => {

    const [tarefas, setTarefas] = useState([
    {
        id: 1,
        titulo: 'adicione uma nova tarefa',
        categoria: 'estudo',
        concluido: false,
    },
]);

  const handleAdicionarTarefa = (titulo, categoria) => {
    const novasTarefas = [...tarefas, {
      id: Math.floor(Math.random() * 1000),
      titulo,
      categoria,
      concluido: false
    }];
    setTarefas(novasTarefas);
  };

  const removerTarefa = (id) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
  };

  const completarTarefa = (id) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluido: !tarefa.concluido } : tarefa
      )
    );
  };

  const [pesquisa, setPesquisa] = useState("");
  const [tarefasFiltrados, setTarefasFiltrados] = useState([]);
  
  useEffect(() => {
    if (!pesquisa) {
      setTarefasFiltrados(tarefas); // mostra todas se não houver busca
      return;
    }
  
    const filtrados = tarefas.filter((tarefa) =>
      tarefa.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      tarefa.categoria.toLowerCase().includes(pesquisa.toLowerCase())
    );
    
    setTarefasFiltrados(filtrados);
  }, [pesquisa, tarefas]);
  
  return (
    <>
      <div className="min-h-screen bg-background scanline">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className=''>
              <BuscarTarefa pesquisa={pesquisa} setPesquisa={setPesquisa} />
              {tarefasFiltrados.length > 0 ? (
                <ListaTarefas 
                  tarefas={tarefasFiltrados} 
                  deletar={removerTarefa} 
                  concluir={completarTarefa} 
                  
                />
              ) : (
                <p>Adicione uma tarefa</p>
              )}
              <Pomodoro />
            </div>
          
          <div className="lg:col-span-2 lg:row-span-2">
            <div>
              <CardProgresso tarefas={tarefas} />
            </div>
            <AdicionarTarefa AdicionarTarefa={handleAdicionarTarefa} />
          </div>
          </div>
      </main>
      
      {/* Footer decoration */}
      <footer className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />
    </div>
    </>
  );
};

export default Index;
