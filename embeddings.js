import { OpenAIEmbeddings } from '@langchain/openai';
import 'dotenv/config';

const token = process.env.GITHUB_MODELS_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'text-embedding-3-small';

const embeddings = new OpenAIEmbeddings({
  model: model,
  apiKey: token,
  configuration: {
    baseURL: endpoint,
  },
});

export async function main() {
  await embeddings.embedQuery('The quick brown fox jumps over the lazy dog.').then((response) => {
    console.log('Embedding response:\n\n', response);
  });
}

main().catch((err) => {
  console.error('The sample encountered an error:', err);
});
