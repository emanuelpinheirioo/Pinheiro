import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock, FileEdit } from 'lucide-react';
import { CalendarEvent, ContentFormat } from '../types';

export const ContentCalendar: React.FC = () => {
  // Mock data for visualization
  const events: CalendarEvent[] = [
    { id: '1', date: '2023-10-25', title: '5 Erros no Marketing', format: ContentFormat.REELS, status: 'published' },
    { id: '2', date: '2023-10-26', title: 'Bastidores do dia', format: ContentFormat.STORIES, status: 'published' },
    { id: '3', date: '2023-10-27', title: 'Tutorial Passo a Passo', format: ContentFormat.CAROUSEL, status: 'planned' },
    { id: '4', date: '2023-10-28', title: 'Live de Tira Dúvidas', format: ContentFormat.LIVE, status: 'drafted' },
    { id: '5', date: '2023-10-30', title: 'Mito vs Verdade', format: ContentFormat.REELS, status: 'planned' },
  ];

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = 27; // Mock today

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'drafted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'published': return <CheckCircle size={12} />;
      case 'planned': return <Clock size={12} />;
      case 'drafted': return <FileEdit size={12} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="text-pink-600" />
            Planejamento de Conteúdo
          </h2>
          <p className="text-gray-500">Visualize e organize sua constância nas redes.</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          + Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Days */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid (Simplified for UI Demo) */}
        <div className="grid grid-cols-7 auto-rows-fr min-h-[500px]">
          {Array.from({ length: 35 }).map((_, idx) => {
            const dayNum = idx - 2; // Offset to start month correctly (mock)
            const isCurrentMonth = dayNum > 0 && dayNum <= 31;
            const isToday = dayNum === today;
            
            const dayEvents = isCurrentMonth ? events.filter(e => {
              const eventDay = parseInt(e.date.split('-')[2]);
              return eventDay === dayNum;
            }) : [];

            return (
              <div key={idx} className={`border-b border-r border-gray-100 p-2 min-h-[100px] hover:bg-gray-50 transition-colors relative ${!isCurrentMonth ? 'bg-gray-50/50' : ''}`}>
                {isCurrentMonth && (
                  <span className={`text-sm font-medium ${isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center absolute top-2 left-2' : 'text-gray-700 block mb-2'}`}>
                    {dayNum}
                  </span>
                )}
                
                <div className={`space-y-1 ${isToday ? 'mt-8' : ''}`}>
                  {dayEvents.map(evt => (
                    <div key={evt.id} className={`text-xs p-1.5 rounded border ${getStatusColor(evt.status)} cursor-pointer hover:opacity-80 transition-opacity truncate`}>
                       <div className="flex items-center gap-1 mb-0.5">
                          {getStatusIcon(evt.status)}
                          <span className="font-bold opacity-75">{evt.format.split(' ')[0]}</span>
                       </div>
                       {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};