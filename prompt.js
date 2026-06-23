import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const token = process.env.GITHUB_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'gpt-4o-mini';

const chat = new ChatOpenAI({
  model: model,
  apiKey: process.env.GITHUB_TOKEN,
  configuration: {
    baseURL: endpoint,
  },
});

const conversationHistory = [
  new SystemMessage('Explain to an expert.'),
  new HumanMessage('How can I optimize a nested for-loop in JavaScript?'),
];

export async function main() {
  await chat.invoke(conversationHistory).then((response) => {
    console.log('Chat Response:\n\n', response.content);
  });
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
