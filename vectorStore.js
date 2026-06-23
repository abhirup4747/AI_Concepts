import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from '@langchain/core/documents';
import fs from 'node:fs';

const embeddings = new OpenAIEmbeddings({
  // Your GitHub PAT token with `models:read` permissions
  apiKey: process.env.GITHUB_TOKEN,

  // Base URL pointing to the GitHub Models inference endpoint
  configuration: {
    baseURL: 'https://models.github.ai/inference',
  },

  // Specify the targeted OpenAI model available in GitHub Marketplace
  modelName: 'text-embedding-3-small',
});

async function runFaiss() {
  // 2. Prepare mock documents
  const docs = [
    new Document({
      pageContent: 'LangChain.js makes it easy to build LLM apps in Node.js.',
      metadata: { id: 1 },
    }),
    new Document({
      pageContent: 'FAISS is an efficient library for dense vector similarity search.',
      metadata: { id: 2 },
    }),
    new Document({
      pageContent: 'JavaScript developers use npm to manage application dependencies.',
      metadata: { id: 3 },
    }),
  ];

  // 3. Create the vector store from documents
  console.log('Creating FAISS index...');
  const vectorStore = await FaissStore.fromDocuments(docs, embeddings);

  // 4. Save the directory locally to disk
  const directory = './faiss_index';
  await vectorStore.save(directory);
  console.log(`Saved FAISS index to ${directory}`);

  // 5. Load the FAISS vector store from disk
  const loadedVectorStore = await FaissStore.load(directory, embeddings);

  // 6. Perform a similarity/semantic search
  const query = 'What library does fast vector similarity searches?';
  const results = await loadedVectorStore.similaritySearch(query, 1);

  console.log('\nTop Search Result:');
  console.log(results[0].pageContent);
}

runFaiss().catch(console.error);
