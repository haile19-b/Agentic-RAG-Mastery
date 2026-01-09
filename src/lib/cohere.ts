export const getCohereEmbedding = async (text: string) => {
  try {
    const response = await fetch('https://api.cohere.ai/v1/embed', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts: ["hello , how are you?"],       // use the function input
        model: 'embed-english-v3.0',
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cohere API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    // Check embeddings exist
    if (!data.embeddings || !data.embeddings[0]) {
      throw new Error("Invalid embedding returned from Cohere");
    }

    console.log("Embedding array:", data.embeddings[0]); // should log numbers array

    return data.embeddings[0]; // return the array of floats directly

  } catch (error) {
    console.error("Cohere embedding error:", error);
    throw error;
  }
};
