import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import fs from 'fs';
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter"
import { getEmbeddings } from './embeddings';
import md5 from 'md5';

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
  const response = await fetch(fileUrl)

  if (!response.ok) {
    throw new Error(`Failed to download file from ${fileUrl}`)
  }

  const buffer = await response.arrayBuffer()
  const file = new Uint8Array(buffer)
  console.log(file)

  // from the buffer, load the file to local
  const file_name = 'temp.pdf'
  fs.writeFileSync(file_name, Buffer.from(file))

  const loader = new PDFLoader(file_name)
  const pages = await loader.load() as PDFPage[]

  // split and segment pdf
  const documents = await Promise.all(pages.map(prepareDocument))

  const vectors = await Promise.all(documents.flat().map(embedDocument))

  const client = await getPineConeClient()
  const pineconeIndex = client.Index('syrus')

  // console.log('inserting vectors')
  // const namespace = convertToAscii(fileUrl)

  // upsert the vectors
  pineconeIndex.upsert(vectors)
  return documents[0]
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord

  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let {pageContent, metadata} = page

  pageContent = pageContent.replace(/\n/g, '')

  // split the docs
  const splitter = new RecursiveCharacterTextSplitter()
  const docs = await splitter.splitDocuments([
     new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ])
  return docs
}
