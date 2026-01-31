"use client";
import { useState, useEffect } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, ListTodo } from 'lucide-react';
import { toast } from "sonner";


export function ListaTarefas({ tarefas, concluir, deletar }) {

  let qntTarefas = Object.keys(tarefas).length

  return (
    <div className="cyber-card p-6 h-fit flex flex-col">
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

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {tarefas.map((tarefa) => (
          <div
            key={tarefa.id}
            className={`a-fazer grid grid-cols-2 grid-gap-3 ${tarefa.concluido ? "opacity-60" : ""}`}
          >
            <div className="conteudo">
              <p className={tarefa.concluido ? "line-through text-muted-foreground" : ""}>
                {tarefa.titulo}
              </p>
              <small>{tarefa.categoria}</small>
            </div>
            <div className="flex flex-row gap-3">
              <Button
                variant={tarefa.concluido ? "outline" : "default"}
                onClick={() => concluir(tarefa.id)}
              >
                {tarefa.concluido ? "Desfazer" : "Completar"}
              </Button>
              <Button onClick={() => deletar(tarefa.id)}><Trash2 /></Button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
