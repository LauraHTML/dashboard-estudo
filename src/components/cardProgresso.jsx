import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, CheckCircle2, Clock } from 'lucide-react';

export function CardProgresso({ completedCount, totalCount, progressPercentage, tarefas }) {
  const tarefasConcluidas = tarefas.filter(t => t.concluido).length;
  const tarefasPendentes = tarefas.filter(t => !t.concluido).length;
  let totalTarefas = Object.keys(tarefas).length
  const barraProgresso = [(tarefas.filter(t => t.concluido).length) / totalTarefas] * 100;
  const porcentagemArredondado = barraProgresso.toFixed(0)

  return (
    <div className="cyber-card p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 from-primary/10 to-transparent rounded-bl-full" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-secondary/20 rounded-sm">
          <TrendingUp className="w-5 h-5 text-secondary cyber-text-glow" />
        </div>
        <h2 className="text-lg font-semibold tracking-wider uppercase text-foreground">
          Progresso
        </h2>
      </div>

      <div className="space-y-6">
        {/* Main progress display */}
        <div className="text-center py-4">
          <div className="relative inline-flex items-center justify-center">
            <span className="text-6xl font-bold text-primary cyber-text-glow animate-pulse-glow">
              {porcentagemArredondado > 0 ? 
                porcentagemArredondado
              :
                "0"
              }
            </span>
            <span className="text-2xl text-primary ml-1">%</span>
          </div>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            TAXA DE CONCLUSÃO
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress 
            value={porcentagemArredondado} 
            className="h-2 bg-muted"
          />
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <div>
              
              <p className="text-xl font-bold text-foreground">{tarefasConcluidas > 0 ? "Tarefas concluídas: "+tarefasConcluidas : "Nenhuma tarefa concluída"}</p>
              <p className="text-xs font-mono text-muted-foreground">Concluídas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xl font-bold text-foreground">{tarefasPendentes > 0 ? "Tarefas pendentes: "+tarefasPendentes : "Nenhuma tarefa pendente"}</p>
              <p className="text-xs font-mono text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>

        {porcentagemArredondado === 100 && tarefasPendentes > 0 && (
          <div className="p-3 bg-secondary/20 border border-secondary/50 rounded-sm text-center cyber-glow-cyan">
            <Target className="w-5 h-5 text-secondary mx-auto mb-1" />
            <p className="text-sm font-semibold text-secondary">
              MISSÃO CUMPRIDA!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
