"use client"

import { supabase } from '@/lib/supabase'

import { useState } from 'react';
import { toast } from "sonner";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Zap } from 'lucide-react';

export function AdicionarTarefa({ onAddTask }) {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titulo = e.target[0]?.value;
    console.log(titulo);

    const { id_usuario } = await supabase
      .from('usuario')
      .select('id')
      console.log(id_usuario)

    if (!titulo ) {
      toast.error('Insira o nome da tarefa');
      return
    }
    const { error } = await supabase
      .from('tarefas')
      .insert({ titulo: titulo, concluido: false, user_id: id_usuario })

    if (error) {
      console.error('Erro completo:', error)
        console.error('Mensagem:', error.message)
        console.error('Detalhes:', error.details)
        console.error('Hint:', error.hint)
      toast.error('Erro ao inserir:', error)
    } else {
      toast('Inserido com sucesso!')
    }
  };

  return (
    <div className="cyber-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-sm">
          <Plus className="w-5 h-5 text-accent-foreground cyber-text-glow" />
        </div>
        <h2 className="text-lg font-semibold tracking-wider uppercase text-foreground">
          Nova Tarefa
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-mono text-foreground uppercase tracking-wider">
            Título da Tarefa
          </label>
          <Input
            type="text"
            placeholder="Digite sua tarefa..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border-border focus:border-primary focus:ring-primary/30 font-mono text-foreground"
          />
        </div>

        <Button
          type="submit"
          disabled={!titulo.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] disabled:opacity-50"
        >
          <Zap className="w-4 h-4 mr-2" />
          Adicionar Tarefa
        </Button>
      </form>

      {/* Quick tips */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs font-mono text-foreground">
          <span className="text-secondary">&gt;</span> Dica: Divida tarefas grandes em subtarefas menores
        </p>
      </div>
    </div>
  );
}
