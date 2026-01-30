import { ListaTarefas } from '@/components/aFazer';
import { CardProgresso } from '@/components/cardProgresso';
import { AdicionarTarefa } from '@/components/adicionarTarefa';
import { CardRadio } from '@/components/radio';
import { Cpu, Zap } from 'lucide-react';

import { ModalInicial } from '@/components/modalnicial';

const Index = () => {

  return (
    <>
      <ModalInicial></ModalInicial>
    <div className="min-h-screen bg-background scanline">
      {/* Header */}

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <ListaTarefas />

          </div>
          <div className="lg:col-span-2 lg:row-span-2">
            <div>
              <CardProgresso />
            </div>
            <AdicionarTarefa />
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
