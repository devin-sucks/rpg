import { OpenAIStream, StreamingTextResponse } from 'ai';
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const runtime = 'edge';

export async function POST(req) {

    const { input, history } = await req.json();

    console.log(input, history);

    const response = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
            {
                role: "system",
                content: `
                You are a dungeon master creating the ultimate text dungeon adventure storyline
                
                The following is history of the adventure:

                ${JSON.stringify(history)}
                `
            },
            {
                "role": "user",
                "content": `Continue the story based on the following user's action: 

                100 words max

                ${input}
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