// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadFileToPinecone } from "@/lib/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message?: string; // Add the 'message' property
};

const model = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyBOt6J7Tyg8kuo8zYwtKFw455MLCmHoVXI",
  temperature: 0.7,
  modelName: "gemini-pro",
  topK: 40,
  topP: 1,
});

async function conversationalChain(context: string, question: string) {
  const prompt_template = `
    Answer the questions as detailed as possible from the provided context, make sure to answer the questions in a way that is relevant to the context.
    Consider this that you are impersonating as a Legal Chat Tool. If you are not sure about the answer, you can say "I am not sure about this, I will get back to you with the answer".
    If the question is not relevant to the context, you can say "The question is not relevant to the context, please provide a relevant question". Begin your answer with "Answer:".
    Context: ${context}
    Question: ${question}
  `
  const response = await model.invoke(prompt_template)
  return response
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    try {
      const { file_key, file_name, file_url, message } = req.body
      console.log(message)
      // load filekey to pinecone
      const pages = await loadFileToPinecone(file_url)
      const context = pages[0].pageContent
      // return pages
      const response = await conversationalChain(context, message)
      console.log(response)
      // send response
      res.status(200).json({name: JSON.stringify(response.lc_kwargs.content)})
  } catch (error) {
      console.error(error)
    }
  } else {
    // reject the request
    return res.status(405)
  }
}
