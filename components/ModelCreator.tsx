import React, { useState } from 'react';
import { mimicCreatorStyle } from '../services/geminiService';
import { GeneratedContent } from '../types';
import { Button } from './Button';
import { ContentCard } from './ContentCard';
import { UserPlus, Sparkles } from 'lucide-react';

export const ModelCreator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  
  const [referenceText, setReferenceText] = useState('');
  const [myNiche, setMyNiche] = useState('');
  const [myTopic, setMyTopic] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceText || !myTopic) return;

    setLoading(true);
    try {
      const data = await mimicCreatorStyle(referenceText, myNiche, myTopic);
      setResult(data);
    } catch (error) {
      alert("Erro ao modelar criador.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Modelagem de Criador</h2>
        <p className="text-gray-600">Copie a "vibe" e a estrutura de grandes players, mas com o seu conteúdo original.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        <div className="p-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Sparkles size={16} className="text-yellow-500" />
                Cole um texto de referência (Legenda ou Roteiro)
              </label>
              <textarea 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-gray-50 text-sm min-h-[150px]"
                placeholder="Cole aqui um texto de alguém que você admira. A IA vai analisar a estrutura, o tom de voz e os gatilhos usados..."
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nicho</label>
                <input 
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: Finanças Pessoais"
                  value={myNiche}
                  onChange={(e) => setMyNiche(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Novo Tópico</label>
                <input 
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: Como economizar no supermercado"
                  value={myTopic}
                  onChange={(e) => setMyTopic(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" isLoading={loading} className="w-full py-4 text-lg shadow-xl shadow-purple-100">
                <UserPlus size={20} />
                Gerar Versão Modelada
              </Button>
            </div>
          </form>
        </div>
      </div>

      {result && (
        <div className="animate-fade-in">
           <div className="flex items-center gap-2 mb-4 text-purple-700 font-semibold bg-purple-50 w-fit px-4 py-2 rounded-full">
              <Sparkles size={16} />
              Resultado Adaptado
           </div>
           <ContentCard content={result} />
        </div>
      )}
    </div>
  );
};