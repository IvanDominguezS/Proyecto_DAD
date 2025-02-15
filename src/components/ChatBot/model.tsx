import {GoogleGenerativeAI} from "@google/generative-ai";
import { context } from "./ChatBotConst";

const genAI = new GoogleGenerativeAI("AIzaSyAsFhupJzregdWK0z8ZWGz1cKqdHaJZldg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt: string) => {

    const fullPrompt = `${context}\nUsuario: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    console.log(result.response.text());
    return result.response.text;

}