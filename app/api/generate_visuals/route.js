import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'ai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const IMG_SIZE = "1024x1024"

export async function POST(req) {
  // Get input vars
  const { story } = await req.json();

  // Determine img prompt
  const extract_prompt = "Please create a prompt for DALLE-3 to generate an image that is based on the last scene of the following RPG story, in the style '8-bit art'. Reply with the DALLE-3 prompt and nothing else. Story: ${story}";

  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant who creates prompts for generating artistic 8-bit images of scenes in RPG stories."},
        {"role": "user", "content": extract_prompt},
        ],
    model: "gpt-4-turbo",
  });

  console.log(completion.choices[0]);

  // Generate img
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: completion.choices[0],
    n: 1,
    size: IMG_SIZE,
  });
  image_url = response.data[0].url;

  return image_url
}
