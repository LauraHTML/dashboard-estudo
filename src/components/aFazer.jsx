import { Button } from '@/components/ui/button';
import { Trash2, ListTodo } from 'lucide-react';



export function ListaTarefas({ tarefa, concluir, deletar }) {

  let qntTarefas = Object.keys(tarefa).length

  return (
    <div className="cyber-card h-fit flex flex-col">

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          <div
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
      </div>
    </div>
  );
}
