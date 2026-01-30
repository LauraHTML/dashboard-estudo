"use client";
import { useState, useEffect } from 'react';

import { ListaTarefas } from '@/components/aFazer';
import { CardProgresso } from '@/components/cardProgresso';
import { AdicionarTarefa } from '@/components/adicionarTarefa';
import { CardRadio } from '@/components/radio';
import { Cpu, Zap } from 'lucide-react';

import { ModalInicial } from '@/components/modalnicial';

const Index = () => {

    const [tarefas, setTarefas] = useState([
    {
        id: 1,
        titulo: 'estudar',
        categoria: 'estudo',
        concluido: false,
    },
    {
        id: 2,
        titulo: 'trabalhar',
        categoria: 'trabalho',
        concluido: false,
    },
    {
        id: 3,
        titulo: 'exercicios',
        categoria: 'exercicios',
        concluido: false,
    }
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

  return (
    <>
    <div className="min-h-screen bg-background scanline">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <ListaTarefas tarefas={tarefas} deletar={removerTarefa} />
          </div>
          <div className="lg:col-span-2 lg:row-span-2">
            <div>
              <CardProgresso />
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
