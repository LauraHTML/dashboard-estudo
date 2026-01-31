"use client";
import { useState, useEffect } from 'react';

import { ListaTarefas } from '@/components/aFazer';
import { CardProgresso } from '@/components/cardProgresso';
import { AdicionarTarefa } from '@/components/adicionarTarefa';
import { ControlePaginacao } from "@/components/paginacao/controlePaginacao";
import { Pomodoro } from "@/components/pomodoro";
import BuscarTarefa from "@/components/buscaTarefas";

import { ListTodo } from 'lucide-react';

const Index = () => {

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: 'adicione uma nova tarefa',
      categoria: 'estudo',
      concluido: false,
    },
  ]);

  let qntTarefas = Object.keys(tarefas).length

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
            <div className='flex flex-col gap-3 '>
              <BuscarTarefa pesquisa={pesquisa} setPesquisa={setPesquisa} />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-sm">
                  <ListTodo className="w-5 h-5 text-primary cyber-text-glow" />
                </div>
                <h2 className="text-lg font-semibold tracking-wider uppercase ">
                  Tarefas
                </h2>
                <span className="ml-auto text-sm font-mono text-muted-foreground">
                  {qntTarefas} tarefas
                </span>
              </div>
              {tarefasFiltrados.length > 0 ? (
                <ControlePaginacao
                  items={tarefasFiltrados}
                  renderItem={(tarefa) => (
                    // imagem produto
                    <ListaTarefas key={tarefa.id} tarefa={tarefa} deletar={removerTarefa} concluir={completarTarefa} />
                  )}
                  itemsPerPage={5}
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