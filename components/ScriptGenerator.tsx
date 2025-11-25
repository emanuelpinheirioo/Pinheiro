import React, { useState } from 'react';
import { generateSocialScript } from '../services/geminiService';
import { ContentFormat, CopyFormula, GeneratedContent, ScriptRequest } from '../types';
import { Button } from './Button';
import { ContentCard } from './ContentCard';
import { Wand2, Target, Users, Type } from 'lucide-react';

export const ScriptGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  
  const [formData, setFormData] = useState<ScriptRequest>({
    topic: '',
    niche: '',
    format: ContentFormat.REELS,
    formula: CopyFormula.AIDA,
    tone: 'Inspirador e Prático',
    targetAudience: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic || !formData.niche) return;

    setLoading(true);
    try {
      const data = await generateSocialScript(formData);
      setResult(data);
    } catch (error) {
      alert("Ocorreu um erro ao gerar o roteiro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ScriptRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wand2 className="text-purple-600" />
            Gerador de Roteiros
          </h2>
          <p className="text-gray-500 text-sm mt-1">Crie conteúdo estratégico usando fórmulas de copywriting validadas.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qual é o seu Nicho?</label>
            <div className="relative">
              <input 
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Nutrição Esportiva, Marketing Digital..."
                value={formData.niche}
                onChange={(e) => handleChange('niche', e.target.value)}
              />
              <Target className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Público Alvo</label>
             <div className="relative">
              <input 
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Mulheres de 25-35 anos, iniciantes..."
                value={formData.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
              />
              <Users className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sobre o que vamos falar hoje?</label>
            <textarea 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
              placeholder="Ex: 5 erros comuns ao começar dieta low carb..."
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                value={formData.format}
                onChange={(e) => handleChange('format', e.target.value as ContentFormat)}
              >
                {Object.values(ContentFormat).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fórmula de Copy</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                value={formData.formula}
                onChange={(e) => handleChange('formula', e.target.value as CopyFormula)}
              >
                {Object.values(CopyFormula).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Tom de Voz</label>
             <div className="relative">
              <input 
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Ex: Polêmico, Educativo, Divertido..."
                value={formData.tone}
                onChange={(e) => handleChange('tone', e.target.value)}
              />
              <Type className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
             </div>
          </div>

          <Button type="submit" isLoading={loading} className="w-full text-lg py-3">
            Gerar Roteiro Estratégico
          </Button>
        </form>
      </div>

      {/* Result Section */}
      <div className="flex flex-col">
        {result ? (
          <ContentCard content={result} />
        ) : (
          <div className="flex-1 min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8 bg-gray-50/50">
             <Wand2 size={48} className="mb-4 text-gray-300" />
             <p className="text-center font-medium">Seu roteiro aparecerá aqui.</p>
             <p className="text-center text-sm mt-2 max-w-xs">Preencha o formulário ao lado para a IA criar uma estratégia personalizada para você.</p>
          </div>
        )}
      </div>
    </div>
  );
};