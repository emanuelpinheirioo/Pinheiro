
import React, { useState } from 'react';
import { generateHeadlines } from '../services/geminiService';
import { ListResponse } from '../types';
import { Button } from './Button';
import { Type, Sparkles, Copy, Check } from 'lucide-react';

export const HeadlineGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ListResponse | null>(null);
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !niche) return;
    setLoading(true);
    try {
      const data = await generateHeadlines({ topic, niche });
      setResult(data);
    } catch (error) {
      alert("Erro ao gerar títulos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Máquina de Títulos</h2>
        <p className="text-gray-500">O título é 80% do sucesso do seu post. Gere ganchos que obrigam o clique.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nicho</label>
            <input 
              type="text" required placeholder="Ex: Investimentos"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              value={niche} onChange={e => setNiche(e.target.value)}
            />
          </div>
          <div className="flex-[2] w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assunto do Post</label>
            <input 
              type="text" required placeholder="Ex: Como começar com pouco dinheiro"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              value={topic} onChange={e => setTopic(e.target.value)}
            />
          </div>
          <div className="w-full md:w-auto">
             <Button type="submit" isLoading={loading} className="w-full h-[50px]">
               <Sparkles size={18} /> Gerar
             </Button>
          </div>
        </form>
      </div>

      {result && (
        <div className="space-y-3 animate-fade-in-up">
          {result.items.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-purple-300 transition-colors">
              <span className="font-medium text-gray-800 text-lg">{item}</span>
              <button 
                onClick={() => handleCopy(item, idx)}
                className="p-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-purple-600 transition-all"
                title="Copiar título"
              >
                {copiedIndex === idx ? <Check size={20} className="text-green-500"/> : <Copy size={20} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
