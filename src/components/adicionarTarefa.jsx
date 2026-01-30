"use client"

import { useState } from 'react';
import { toast } from "sonner";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Zap } from 'lucide-react';

export function AdicionarTarefa({ AdicionarTarefa }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleTarefa = (e) => {
    e.preventDefault();
    if(!titulo || !categoria ) {
      toast.error("Adicione o título/categoria da tarefa");
      return
    };
    AdicionarTarefa(titulo, categoria);

    setCategoria("");
    setTitulo("")
  }

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

      <form  className="space-y-4" onSubmit={handleTarefa}>
        <div className="space-y-2">
        <label className="text-xs font-mono text-foreground uppercase tracking-wider">
            Foco da tarefa
          </label>
          <select value={categoria} name="" id="" onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            <option value="estudo">Estudo</option>
            <option value="trabalho">Trabalho</option>
            <option value="lição">Lição</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-foreground uppercase tracking-wider">
            Título da Tarefa
          </label>
          <Input
            type="text"
            placeholder="Digite sua tarefa..."
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            className="border-border focus:border-primary focus:ring-primary/30 font-mono text-foreground"
          />
        </div>

        <Button
          type="submit"
         
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
