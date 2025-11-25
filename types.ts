
export enum ContentFormat {
  REELS = 'Reels (Vídeo Curto)',
  STORIES = 'Stories (Sequência)',
  CAROUSEL = 'Carrossel (Educativo)',
  CAPTION = 'Legenda para Feed',
  LIVE = 'Roteiro de Live',
  TEXT = 'Post de Texto (LinkedIn/Facebook/Instagram)'
}

export enum CopyFormula {
  AIDA = 'AIDA (Atenção, Interesse, Desejo, Ação)',
  PAS = 'PAS (Problema, Agitação, Solução)',
  BAB = 'BAB (Before, After, Bridge)',
  STORYTELLING = 'Jornada do Herói (Storytelling)',
  QUEST = 'Pergunta & Curiosidade'
}

export enum MentalTrigger {
  SCARCITY = 'Escassez',
  AUTHORITY = 'Autoridade',
  SOCIAL_PROOF = 'Prova Social',
  ANTICIPATION = 'Antecipação',
  NOVELTY = 'Novidade',
  RECIPROCITY = 'Reciprocidade'
}

export interface ScriptRequest {
  topic: string;
  niche: string;
  format: ContentFormat;
  formula: CopyFormula;
  tone: string;
  targetAudience: string;
}

export interface GeneratedContent {
  title: string;
  hook: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  visualCues?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  format: ContentFormat;
  status: 'planned' | 'drafted' | 'published';
}

// New Interfaces for added features

export interface BioRequest {
  name: string;
  niche: string;
  offer: string; // What they sell or teach
  tone: string;
}

export interface BioResponse {
  options: {
    style: string;
    content: string;
  }[];
}

export interface HeadlineRequest {
  topic: string;
  niche: string;
}

export interface IdeaRequest {
  niche: string;
  goal: string; // e.g., 'Vendas', 'Engajamento', 'Autoridade'
}

export interface ListResponse {
  items: string[];
}

export interface AnalysisResponse {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  score: number; // 0 to 10
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}