
import React, { useState } from 'react';
import { Layout, PenTool, Calendar, Zap, Rocket, Menu, X, ExternalLink, Fingerprint, Type, Lightbulb, UploadCloud, Globe } from 'lucide-react';
import { ScriptGenerator } from './components/ScriptGenerator';
import { ModelCreator } from './components/ModelCreator';
import { ContentCalendar } from './components/ContentCalendar';
import { BioOptimizer } from './components/BioOptimizer';
import { HeadlineGenerator } from './components/HeadlineGenerator';
import { IdeaBrainstorm } from './components/IdeaBrainstorm';
import { FileAnalyzer } from './components/FileAnalyzer';

type View = 'dashboard' | 'generator' | 'model' | 'bio' | 'headlines' | 'ideas' | 'calendar' | 'analyzer';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('generator');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'generator', label: 'Gerador de Roteiros', icon: PenTool },
    { id: 'headlines', label: 'Máquina de Títulos', icon: Type },
    { id: 'ideas', label: 'Ideias Infinitas', icon: Lightbulb },
    { id: 'analyzer', label: 'Visão de Águia (Arquivos)', icon: UploadCloud },
    { id: 'bio', label: 'Bio Magnética', icon: Fingerprint },
    { id: 'model', label: 'Copiar Criador', icon: Zap },
    { id: 'calendar', label: 'Calendário Editorial', icon: Calendar },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeView) {
      case 'generator': return <ScriptGenerator />;
      case 'model': return <ModelCreator />;
      case 'bio': return <BioOptimizer />;
      case 'headlines': return <HeadlineGenerator />;
      case 'ideas': return <IdeaBrainstorm />;
      case 'analyzer': return <FileAnalyzer />;
      case 'calendar': return <ContentCalendar />;
      default: return (
        <div className="text-center py-20">
          <Rocket size={64} className="mx-auto text-purple-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao EngajaPro</h2>
          <p className="text-gray-500 max-w-md mx-auto">Selecione uma ferramenta no menu lateral para começar a transformar sua presença digital.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
             <button onClick={() => setActiveView('generator')} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
                <PenTool className="text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900">Gerar Roteiro</h3>
                <p className="text-sm text-gray-500 mt-1">Crie posts completos</p>
             </button>
             <button onClick={() => setActiveView('analyzer')} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
                <UploadCloud className="text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900">Analisar Arquivo</h3>
                <p className="text-sm text-gray-500 mt-1">Auditoria de imagem</p>
             </button>
             <button onClick={() => setActiveView('ideas')} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left">
                <Lightbulb className="text-yellow-500 mb-3" />
                <h3 className="font-bold text-gray-900">Ter Ideias</h3>
                <p className="text-sm text-gray-500 mt-1">Acabe com o bloqueio</p>
             </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white z-20 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
         <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-purple-600 to-pink-500 text-white p-1.5 rounded-lg">
              <Rocket size={20} />
            </div>
            <span className="font-bold text-gray-900 text-lg">EngajaPro</span>
         </div>
         <button onClick={toggleSidebar} className="text-gray-600 p-2 rounded-md hover:bg-gray-100">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-20 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 hidden lg:flex items-center gap-3">
             <div className="bg-gradient-to-tr from-purple-600 to-pink-500 text-white p-2 rounded-xl shadow-lg shadow-purple-200">
               <Rocket size={24} />
             </div>
             <div>
               <h1 className="font-bold text-gray-900 text-xl tracking-tight">EngajaPro</h1>
               <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded-full">BETA</span>
             </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2 mt-4">Ferramentas</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                  ${activeView === item.id 
                    ? 'bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon size={20} className={activeView === item.id ? 'text-purple-600' : 'text-gray-400'} />
                {item.label}
              </button>
            ))}

            {/* Official Website Button */}
            <div className="mt-6 px-2">
              <a 
                href="https://website.beacons.ai/emanuel.pinheiroo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-purple-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all group"
              >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <Globe size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Website Oficial</span>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-purple-700 transition-colors">Emanuel Pinheiro</span>
                </div>
                <ExternalLink size={14} className="ml-auto text-gray-300 group-hover:text-purple-400" />
              </a>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Rocket size={64} />
               </div>
               <h3 className="font-bold mb-1 relative z-10">Pro Plan</h3>
               <p className="text-xs text-gray-300 mb-3 relative z-10">Acesso ilimitado a todas as fórmulas de copy.</p>
               <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors border border-white/10 relative z-10">
                 Em Breve
               </button>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                 U
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-900">Usuário Demo</p>
                 <p className="text-xs text-gray-500">Free Tier</p>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full flex flex-col">
          <div className="flex-1">
            {renderContent()}
          </div>

          {/* Footer / Promo Section */}
          <div className="mt-16 md:mt-24 border-t border-gray-200 pt-12 pb-6">
            
            {/* ChatGPT Express 7 Promo */}
            <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-6 md:p-10 shadow-xl text-white relative overflow-hidden group">
              {/* Background Effect */}
              <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                <Rocket size={180} />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left flex-1">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full mb-3 border border-purple-500/30">
                    RECOMENDADO
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">ChatGPT Express 7</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Aprenda a usar o ChatGPT como um profissional e eleve o nível do seu conteúdo. Baixe o material completo agora.
                  </p>
                </div>
                
                <a 
                  href="https://forms.gle/KqCdi23UohziysXUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10 flex items-center gap-2 whitespace-nowrap"
                >
                  Baixar Material
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 text-center border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} EngajaPro. Todos os direitos reservados a <a href="https://website.beacons.ai/emanuel.pinheiroo" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:text-purple-600 transition-colors">Emanuel Pinheiro</a>.
              </p>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default App;
