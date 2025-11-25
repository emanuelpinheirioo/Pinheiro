
import React, { useState } from 'react';
import { generateBio } from '../services/geminiService';
import { BioRequest, BioResponse } from '../types';
import { Button } from './Button';
import { Fingerprint, Check, Copy } from 'lucide-react';

export const BioOptimizer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BioResponse | null>(null);
  const [formData, setFormData] = useState<BioRequest>({
    name: '',
    niche: '',
    offer: '',
    tone: 'Profissional e Acessível'
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.niche || !formData.offer) return;
    setLoading(true);
    try {
      const data = await generateBio(formData);
      setResult(data);
    } catch (error) {
      alert("Erro ao gerar bios.");
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Fingerprint className="text-pink-600" />
          Bio Magnética
        </h2>
        <p className="text-gray-500">Seu perfil é sua landing page. Transforme visitantes em seguidores com uma bio otimizada.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome / Nome da Marca</label>
              <input 
                type="text" required
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nicho</label>
              <input 
                type="text" required
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Ex: Marketing para Dentistas"
                value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">O que você entrega/ensina? (Sua Promessa)</label>
              <textarea 
                required
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-500 min-h-[80px]"
                placeholder="Ex: Ajudo dentistas a lotarem a agenda usando o Instagram..."
                value={formData.offer} onChange={e => setFormData({...formData, offer: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estilo Desejado</label>
              <input 
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
                value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value})}
              />
            </div>
            <Button type="submit" isLoading={loading} className="w-full">Gerar Bios</Button>
          </form>
        </div>

        <div className="space-y-4">
          {result ? result.options.map((option, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => handleCopy(option.content, idx)}
                  className="p-2 text-gray-400 hover:text-pink-600 transition-colors"
                >
                  {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-full mb-3 inline-block">
                {option.style}
              </span>
              <pre className="font-sans whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
                {option.content}
              </pre>
            </div>
          )) : (
            <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 p-8">
              Preencha os dados para gerar opções de Bio.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
