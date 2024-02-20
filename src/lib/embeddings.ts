// import google generativeai from genai
import * as genai from 'genai'
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


// enter your google api key here
const apiKey = 'AIzaSyBOt6J7Tyg8kuo8zYwtKFw455MLCmHoVXI'

const model = new GoogleGenerativeAIEmbeddings({
  apiKey: apiKey,
  modelName: "embedding-001",
});

export async function getEmbeddings(text: string) {
  try {
    const response = await model.embedQuery(text)
    return response
  } catch (error) {
    console.error(error)
  }
}