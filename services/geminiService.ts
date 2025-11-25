
import { GoogleGenAI, Type, ChatSession } from "@google/genai";
import { ScriptRequest, GeneratedContent, ContentFormat, BioRequest, BioResponse, HeadlineRequest, ListResponse, IdeaRequest, AnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';
const VISION_MODEL_NAME = 'gemini-2.5-flash'; // Using flash for multimodal tasks

export const generateSocialScript = async (request: ScriptRequest): Promise<GeneratedContent> => {
  const prompt = `
    Atue como um especialista em Marketing Digital brasileiro, focado em redes sociais e copywriting persuasivo.
    Crie um conteúdo para redes sociais com as seguintes características:
    
    Nicho: ${request.niche}
    Público Alvo: ${request.targetAudience}
    Tópico: ${request.topic}
    Formato: ${request.format}
    Fórmula de Copy: ${request.formula}
    Tom de Voz: ${request.tone}

    Instruções Específicas:
    1. Use uma linguagem natural, engajadora e adaptada ao público brasileiro.
    2. Inclua gatilhos mentais sutis.
    3. Para vídeos (Reels/Stories), inclua sugestões visuais entre parênteses.
    4. Para formatos de Texto/Artigo (LinkedIn/Facebook/Instagram), foque na escaneabilidade, parágrafos curtos e uso estratégico de emojis, sem incluir instruções de câmera/visuais.
    5. O título deve ser altamente clicável (clickbait ético).
    
    Retorne a resposta APENAS em formato JSON seguindo este schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Um título chamativo ou gancho inicial forte" },
            hook: { type: Type.STRING, description: "A primeira frase ou primeiros 3 segundos para prender a atenção" },
            body: { type: Type.STRING, description: "O corpo principal do roteiro ou legenda" },
            callToAction: { type: Type.STRING, description: "Uma chamada para ação clara e direta" },
            hashtags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "5 a 10 hashtags relevantes em português" 
            },
            visualCues: { type: Type.STRING, description: "Sugestões de cenário, cortes ou elementos visuais (opcional)" }
          },
          required: ["title", "hook", "body", "callToAction", "hashtags"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

export const mimicCreatorStyle = async (
  referenceText: string, 
  myNiche: string, 
  myTopic: string
): Promise<GeneratedContent> => {
  const prompt = `
    Analise o estilo, estrutura e tom de voz do seguinte texto de referência (de um criador famoso):
    "${referenceText}"

    Agora, aplique EXATAMENTE essa mesma estrutura e "vibe", mas adaptada para este novo contexto:
    Meu Nicho: ${myNiche}
    Meu Tópico: ${myTopic}

    O objetivo é modelar o sucesso (modelagem) sem plagiar o conteúdo, apenas a forma.
    
    Retorne a resposta em JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            body: { type: Type.STRING },
            callToAction: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            visualCues: { type: Type.STRING }
          },
          required: ["title", "hook", "body", "callToAction", "hashtags"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Error mimicking style:", error);
    throw error;
  }
}

export const generateBio = async (request: BioRequest): Promise<BioResponse> => {
  const prompt = `
    Atue como um especialista em branding pessoal para Instagram.
    Crie 3 opções de Bio para perfil profissional com base nestes dados:
    Nome: ${request.name}
    Nicho: ${request.niche}
    O que vende/ensina: ${request.offer}
    Tom: ${request.tone}

    As bios devem ser curtas, ter autoridade e uma chamada para ação clara. Use emojis estrategicamente.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                style: { type: Type.STRING, description: "Ex: Minimalista, Autoritário, Criativo" },
                content: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response");
  return JSON.parse(text) as BioResponse;
};

export const generateHeadlines = async (request: HeadlineRequest): Promise<ListResponse> => {
  const prompt = `
    Crie 10 títulos altamente virais e magnéticos (hooks) para o nicho de ${request.niche} sobre o tema: ${request.topic}.
    Use gatilhos de curiosidade, especificidade e promessa forte.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response");
  return JSON.parse(text) as ListResponse;
};

export const generateIdeas = async (request: IdeaRequest): Promise<ListResponse> => {
  const prompt = `
    Gere 10 ideias de conteúdo criativas e fora da caixa para o nicho: ${request.niche}.
    O objetivo desse conteúdo é gerar: ${request.goal}.
    Misture formatos (Reels, Carrossel, Stories).
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response");
  return JSON.parse(text) as ListResponse;
};

export const analyzeImageFile = async (base64Data: string, mimeType: string, context: string): Promise<AnalysisResponse> => {
  const prompt = `
    Você é um consultor de elite em redes sociais. Analise esta imagem anexada (que pode ser um print de perfil, um post ou gráfico de insights).
    Contexto do usuário: ${context}

    Forneça uma auditoria crítica e construtiva:
    1. Identifique pontos fortes (O que está bom?)
    2. Identifique pontos fracos (O que pode melhorar?)
    3. Dê 3 sugestões práticas para aumentar o engajamento ou conversão baseada nessa imagem.
    4. Dê uma nota de 0 a 10 para a qualidade visual/estratégica.
  `;

  const response = await ai.models.generateContent({
    model: VISION_MODEL_NAME,
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: mimeType } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          score: { type: Type.NUMBER }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response");
  return JSON.parse(text) as AnalysisResponse;
};

export const createSupportChat = (): ChatSession => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: `
        Você é o "Pinheiro", o Agente de Sucesso do Cliente e Especialista em Marketing do aplicativo "EngajaPro".
        Sua missão é ajudar criadores de conteúdo a crescerem nas redes sociais usando as ferramentas do app.
        
        SUA PERSONALIDADE:
        - Inteligente, proativo e empático (como o ChatGPT, mas focado no app).
        - Usa emojis moderadamente para manter o tom leve.
        - Se comunica de forma direta e encorajadora (estilo mentor).

        SEU CONHECIMENTO SOBRE O APP (Use isso para guiar o usuário):
        1. **Gerador de Roteiros**: Cria scripts prontos (AIDA, PAS) para Reels, Stories, Lives e Texto. Ideal para quem já tem o tema mas não sabe escrever.
        2. **Bio Magnética**: Otimiza o perfil do Instagram para converter visitantes em seguidores.
        3. **Máquina de Títulos**: Gera ganchos (hooks) virais para impedir que o usuário pule o post.
        4. **Ideias Infinitas**: Brainstorming para quando o usuário tem "branco" (bloqueio criativo).
        5. **Visão de Águia (Arquivos)**: O usuário sobe um print e você analisa visualmente os pontos fortes e fracos.
        6. **Copiar Criador**: Modela o estilo de grandes influencers sem plagiar.
        7. **Calendário**: Apenas para visualização e organização (não posta automaticamente).

        COMO AGIR:
        - Se o usuário pedir dica de engajamento: Dê uma estratégia rápida e sugira qual ferramenta do app usar (ex: "Use a Máquina de Títulos para melhorar seu CTR").
        - Se o usuário não souber o que postar: Sugira a aba "Ideias Infinitas".
        - Se o usuário perguntar quem é o criador: Diga que o app foi idealizado por Emanuel Pinheiro.

        REGRA DE SUPORTE TÉCNICO (CRÍTICA):
        Se o usuário relatar erros graves, bugs, tela branca, travamento ou problemas de pagamento que você não pode resolver:
        Responda: "Poxa, isso parece ser uma instabilidade técnica. Para resolvermos rápido, chame nosso suporte oficial no WhatsApp: +244957935346 (Falar com Emanuel Pinheiro)."
      `
    }
  });
};
