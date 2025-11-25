
import React, { useState, useRef } from 'react';
import { analyzeImageFile } from '../services/geminiService';
import { AnalysisResponse } from '../types';
import { Button } from './Button';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export const FileAnalyzer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove data url prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    try {
      const base64Data = await convertToBase64(selectedFile);
      const data = await analyzeImageFile(base64Data, selectedFile.type, context);
      setResult(data);
    } catch (error) {
      alert("Erro ao analisar a imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <UploadCloud className="text-blue-600" />
          Visão de Águia (Análise de Arquivos)
        </h2>
        <p className="text-gray-500">Faça upload de prints do seu perfil ou posts para receber uma auditoria da IA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
              ${previewUrl ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'}
            `}
          >
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden" 
            />
            
            {previewUrl ? (
              <div className="relative w-full h-64">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <span className="text-white font-medium">Trocar Imagem</span>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <ImageIcon className="text-blue-600 w-8 h-8" />
                </div>
                <p className="text-lg font-medium text-gray-700">Clique para enviar imagem</p>
                <p className="text-sm text-gray-400 mt-2">Suporta JPG e PNG (Prints de Bio, Posts, Insights)</p>
              </>
            )}
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Contexto (Opcional)</label>
             <textarea 
               className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Ex: Esse é um post de vendas que não performou bem. O que posso melhorar?"
               value={context}
               onChange={(e) => setContext(e.target.value)}
             />
          </div>

          <Button 
            onClick={handleSubmit} 
            isLoading={loading} 
            disabled={!selectedFile}
            className="w-full py-3 text-lg"
          >
            Analisar Agora
          </Button>
        </div>

        {/* Results Section */}
        <div>
          {result ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="font-bold text-gray-700">Nota da Auditoria</span>
                <div className={`text-2xl font-bold ${result.score >= 7 ? 'text-green-500' : result.score >= 5 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {result.score}/10
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="flex items-center gap-2 font-bold text-green-800 mb-3">
                  <CheckCircle size={20} /> Pontos Fortes
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((item, idx) => (
                    <li key={idx} className="text-green-700 text-sm flex gap-2">
                      <span>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                <h3 className="flex items-center gap-2 font-bold text-red-800 mb-3">
                  <AlertTriangle size={20} /> Pontos de Atenção
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((item, idx) => (
                    <li key={idx} className="text-red-700 text-sm flex gap-2">
                      <span>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-3">
                  <Lightbulb size={20} /> Plano de Ação
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((item, idx) => (
                    <li key={idx} className="text-blue-700 text-sm font-medium flex gap-2">
                      <span>{idx + 1}.</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 p-8 text-center">
              {loading ? (
                <div className="animate-pulse">Analisando pixels estratégicos...</div>
              ) : (
                "O resultado da análise aparecerá aqui."
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
