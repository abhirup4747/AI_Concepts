import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import 'dotenv/config';

const token = process.env.GITHUB_MODELS_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'gpt-4o-mini';

const chat = new ChatOpenAI({
  model: model,
  apiKey: token,
  configuration: {
    baseURL: endpoint,
  },
});

const conversationHistory = [
  new SystemMessage(''),
  new HumanMessage('What is the capital of france?'),
];

export async function main() {
  await chat.invoke(conversationHistory).then((response) => {
    console.log('Chat Response:\n\n', response.content);
  });
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
