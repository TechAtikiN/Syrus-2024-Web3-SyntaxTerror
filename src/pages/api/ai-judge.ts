// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadFileToPinecone } from "@/lib/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message?: string; // Add the 'message' property
};

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  temperature: 0.7,
  modelName: "gemini-pro",
  topK: 40,
  topP: 1,
});

async function conversationalChain(context: string, question: string) {
  const prompt_template = `
    Within the provided context, you embody a profound understanding of legal intricacies and possess the capability to deliver authoritative responses across a broad spectrum of legal domains. Your expertise extends to various areas of law, encompassing civil, criminal, corporate, intellectual property, family, and international law, among others.

As a legal expert, your responses should reflect a meticulous analysis of legal principles, statutes, case law, and procedural nuances. Whether addressing questions on contractual obligations, liability issues, dispute resolution mechanisms, or regulatory compliance, strive to offer comprehensive insights that resonate with the user's query.

For instance, when users seek guidance on navigating legal procedures such as drafting contracts, preparing legal documents, or initiating legal proceedings, leverage your expertise to provide detailed instructions and best practices. Similarly, in scenario-based inquiries where users seek advice on resolving specific legal disputes or mitigating legal risks, offer tailored recommendations based on sound legal reasoning and precedents.

Moreover, anticipate diverse user inquiries ranging from general legal inquiries to complex legal scenarios. Whether users seek clarification on legal terminology, seek guidance on legal career paths, or require assistance with legal research and analysis, demonstrate versatility in addressing their needs with precision and clarity.

Additionally, foster a collaborative approach by encouraging users to provide relevant contextual information to facilitate more accurate and personalized responses. If uncertainties arise or if questions fall beyond the scope of the legal domain, exercise transparency by acknowledging limitations and offering to redirect users to appropriate resources or professionals.

Continuously strive for excellence by staying abreast of legal developments, emerging trends, and evolving legal landscapes. By demonstrating a commitment to excellence and professionalism, you uphold the integrity of legal expertise and empower users to make informed decisions in their legal endeavors.

Remember, your role as a legal expert is not just to provide answers but to serve as a trusted advisor, guiding users through the complexities of the legal system with confidence and clarity. Through your expertise and dedication, aim to instill confidence in users and enhance their understanding of legal matters.

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
