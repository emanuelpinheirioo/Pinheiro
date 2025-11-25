import React from 'react';
import { GeneratedContent } from '../types';
import { Copy, Share2, Check } from 'lucide-react';

interface ContentCardProps {
  content: GeneratedContent;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const fullText = `${content.title}\n\n${content.hook}\n\n${content.body}\n\n${content.callToAction}\n\n${content.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-lg">Resultado Gerado</h3>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-purple-600"
            title="Copiar tudo"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1 block">Título / Headline</span>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{content.title}</h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block flex items-center gap-2">
             Gancho (Hook)
          </span>
          <p className="text-gray-800 font-medium">{content.hook}</p>
        </div>

        {content.visualCues && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 italic text-gray-600 text-sm">
            <span className="font-semibold not-italic text-gray-500 block mb-1">💡 Sugestão Visual:</span>
            {content.visualCues}
          </div>
        )}

        <div>
           <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">Corpo do Conteúdo</span>
           <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{content.body}</p>
        </div>

        <div className="border-l-4 border-pink-500 pl-4 py-1">
           <span className="text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1 block">Chamada para Ação (CTA)</span>
           <p className="font-bold text-gray-900">{content.callToAction}</p>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">Hashtags</span>
          <div className="flex flex-wrap gap-2">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};