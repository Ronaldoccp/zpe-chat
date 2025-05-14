// Configuração da API do DeepSeek
// Em um ambiente de produção, esta chave deveria estar em variáveis de ambiente (.env)
export const DEEPSEEK_API_KEY = 'sk-e84c45ec2bcc4b68983e2ced8db16aff';
export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Interface para mensagens do chat
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Realiza uma chamada para a API do DeepSeek
 */
export async function callDeepSeekAPI(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return `Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.`;
  }
} 