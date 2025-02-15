import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

async function callAPI(message, feedbackArray) {
    const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-pro-exp-02-05:free',
        messages: [
            {
                role: "system",
                content: "you are a helper chatbot, so dont do any kind of text formatting and be casual in response " +
                    "and ask follow up questions and just give back the response of my chat" +
                    "Here is the chat history in joined array format" + feedbackArray,
            },
            {
                role: 'user',
                content: message,
            },
        ],
        'temperature': 1.0,
    });

    console.log(completion.choices[0].message);
    return completion.choices[0].message.content;
}

export default callAPI;