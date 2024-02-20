// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadFileToPinecone } from "@/lib/pinecone";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message?: string; // Add the 'message' property
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    try {
      const { file_key, file_name, file_url } = req.body
      // load filekey to pinecone
        const pages = await loadFileToPinecone(file_url)
        console.log(pages)
        // return pages
        return res.status(200).json({name: JSON.stringify(pages)})
} catch (error) {
      
    }
  } else {
    // reject the request
    res.status(405)
  }
}
