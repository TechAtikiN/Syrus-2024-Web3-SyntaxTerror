import { Pinecone } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import fs from 'fs';

export const getPineConeClient = async () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })
  return pinecone
}

type PDFPage = {
  pageContent: string
  metadata: {
    loc: {
      pageNumber: number
    }
  }
}

export const loadFileToPinecone = async (fileUrl: string) => {
  const pinecone = await getPineConeClient()
  const response = await fetch(fileUrl)

  if (!response.ok) {
    throw new Error(`Failed to download file from ${fileUrl}`)
  }

  const buffer = await response.arrayBuffer()
  const file = new Uint8Array(buffer)
  console.log(file)

  // from the buffer, load the file to local
  const file_name = `/tmp/pdf-${Date.now()}.pdf`
  fs.writeFileSync(file_name, Buffer.from(file))

  const loader = new PDFLoader(file_name)
  const pages = await loader.load() as PDFPage[]
  return pages
}
