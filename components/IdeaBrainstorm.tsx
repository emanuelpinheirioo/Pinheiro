
import React, { useState } from 'react';
import { generateIdeas } from '../services/geminiService';
import { ListResponse } from '../types';
import { Button } from './Button';
import { Lightbulb, Target } from 'lucide-react';

export const IdeaBrainstorm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ListResponse | null>(null);
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('Autoridade');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    try {
      const data = await generateIdeas({ niche, goal });
      setResult(data);
    } catch (error) {
      alert("Erro ao gerar ideias.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Controls */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              Ideias Infinitas
            </h2>
            <p className="text-sm text-gray-500 mb-6">Nunca mais sofra com bloqueio criativo.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nicho</label>
                <input 
                  type="text" required
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Ex: Confeitaria Artesanal"
                  value={niche} onChange={e => setNiche(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo do Conteúdo</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                  value={goal} onChange={e => setGoal(e.target.value)}
                >
                  <option value="Autoridade">Gerar Autoridade</option>
                  <option value="Vendas">Fazer Vendas</option>
                  <option value="Engajamento">Explodir Engajamento</option>
                  <option value="Conexão">Criar Conexão</option>
                </select>
              </div>
              <Button type="submit" isLoading={loading} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-none shadow-orange-200">
                Gerar Ideias
              </Button>
            </form>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="w-full md:w-2/3">
          {result ? (
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              {result.items.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-yellow-400 opacity-50">#{idx + 1}</span>
                    <p className="text-gray-800 font-medium pt-1 leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8 bg-gray-50/50">
              <Lightbulb size={48} className="mb-4 text-gray-300" />
              <p className="text-center font-medium">Suas próximas ideias virais aparecerão aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
