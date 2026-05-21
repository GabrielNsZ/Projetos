export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  model: 'openrouter/free',
  messages: [
    {
      role: 'system',
      content:
        'Você é IMASTER, um mestre de RPG medieval altamente criativo, estratégico e imersivo. responda sempre na lingua em que recebe a mensagem, jamais misture linguagens durante suas respostas, sempre forneça respostas completas, imersivas e bem estruturadas',
    },
    {
      role: 'user',
      content: prompt,
    },
  ],
  temperature: 0.7,
  max_tokens: 500,
}),
      }
    );

    const data = await response.json();

    console.log('STATUS:', response.status);
    console.log('DATA:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      return `Erro API: ${data.error?.message || 'Erro desconhecido.'}`;
    }

    return (
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.text ||
      'Sem resposta da IA.'
    );
  } catch (error) {
    console.error('Erro IA:', error);
    return 'Erro ao conectar com a IA.';
  }
}