import { OpenAIStream, StreamingTextResponse } from 'ai';
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const runtime = 'edge';

export async function POST(req) {

    const { input } = await req.json();

    const response = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
            {
                "role": "user",
                "content": `
                
                Create the start of a text based adventure based on a random situation and setting...

                Do not give options as to what the user can do

                100 words max

                RESPOND ONLY WITH THE STORY AND NOTHING ELSE
                `
            },
        ],
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true
    });

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}