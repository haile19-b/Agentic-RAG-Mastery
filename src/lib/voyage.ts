import dotenv from "dotenv"
dotenv.config()
const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY!;
const VOYAGE_MODEL = "voyage-3.5";

export async function embedWithVoyage(inputs: string[]) {

    console.log("voyage: ",VOYAGE_API_KEY)


  const response = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: VOYAGE_MODEL,
      input: inputs,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Voyage API error: ${errText}`);
  }

  const data = await response.json();

  // Return only vectors
  return data.data.map((item: any) => item.embedding);
}
