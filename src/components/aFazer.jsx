"use client";
import { useState, useEffect } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, ListTodo } from 'lucide-react';
import { toast } from "sonner";

import { supabase } from '@/lib/supabase'

export function ListaTarefas({ tasks, onToggle, onDelete }) {
  const [fetchError, setFetchError] = useState(null);
  const [tarefas, setTarefas] = useState(null);

  useEffect(() => {
    const listarTarefas = async () => {

      const { data, error } = await supabase
      .from('tarefas')
      .select('titulo')
      
      if (error){
        console.log('Não foi possível encontrar sua tarefas ):')
        console.error(error)
        setTarefas(null)
      }
      if(data){
        setTarefas(data)
        setFetchError(null)
      }

      listarTarefas()
  
    }
  },[])

  return (
    <div className="cyber-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-sm">
          <ListTodo className="w-5 h-5 text-primary cyber-text-glow" />
        </div>
        <h2 className="text-lg font-semibold tracking-wider uppercase ">
          Tarefas
        </h2>
        <span className="ml-auto text-sm font-mono text-muted-foreground">
          {/* [{tasks.length}] */}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {tarefas && (
            <div>
              {tarefas.map(tarefa => {
                <p>{tarefa.titulo_tarefa}</p>
              })}
            </div>
        )}
      </div>
    </div>
  );
}
