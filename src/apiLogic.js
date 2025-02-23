import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});


// deepseek/deepseek-chat:free
async function callAPI(message, feedbackArray, memories) {
    const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-pro-exp-02-05:free',
        messages: [
            {
                role: "system",
                content: "you are a helper chatbot, so dont do any kind of text formatting and be casual in response " +
                    "and ask follow up questions and just give back the response of my chat" +
                    "Here is the chat history in joined array format" + feedbackArray + "" +
                    "also here are some personal details of the user, use them to make chat more relevant to user: " + memories,
            },
            {
                role: 'user',
                content: message,
            },
        ],
        'temperature': 1.5,
    });

    // console.log(completion.choices[0].message);
    return completion.choices[0].message.content;
}

// google/gemini-2.0-flash-lite-preview-02-05:free
// google/gemini-2.0-pro-exp-02-05:free
async function filterMemories(message, chathistory) {
    const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-pro-exp-02-05:free',
        messages: [
            {
                role: "system",
                content: "I am implementing a chatgpt like memory feature in an ai chatbox" +
                    "so check the message i pass below and tell me if there is any detail that is personal for the user and " +
                    "is required to be stored, if yes, give me a short chatgpt memory like message without any analysis in a string format, if not, send 'nothing to store' as text in reply" +
                    "here is the message: " + message
            }
        ],
        'temperature': 1.0,
    });

    console.log(completion.choices[0].message);
    return completion.choices[0].message.content;
}

export { callAPI, filterMemories };