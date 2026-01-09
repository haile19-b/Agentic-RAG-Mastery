import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkText(text: string) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 60,
  });

  return splitter.splitText(text);
}
