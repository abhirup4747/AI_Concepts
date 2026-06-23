import OpenAI from "openai";

const token = process.env["MODELS_API_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  client.embeddings.create({
    input: "The quick brown fox jumps over the lazy dog.",
    model: "openai/text-embedding-3-small"
  }).then((response) => {
    console.log("Embedding response:", response);
  }).catch((err) => {
    console.error("Error creating embedding:", err);
  });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "" },
        { role:"user", content: "What is the capital of France?" }
      ],
      model: model
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});