import React, {useRef} from "react";
import callAPI from "../apiLogic.js";
import ChatBubble from "./ChatBubble.jsx";

export default function MainContainer() {

    const [output, setOutput] = React.useState('');
    const [input, setInput] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const chatContainerRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    React.useEffect(() => {
        scrollToBottom();
        // main('just type hello world with 25 random emojis!');
    }, [chatHistory])

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleButtonClick = async(e) => {
        e.preventDefault();
        if (input !== "") {
            setIsGenerating(true);
            const inputObj = {
                from: 'user',
                message: input,
            };
            setChatHistory((prevChatHistory) => [...prevChatHistory, inputObj]);
            setInput('');

            const feedbackArray = JSON.stringify(chatHistory);
            const apiResponse = await callAPI(input, feedbackArray);

            const respObj = {
                from: 'system',
                message: apiResponse,
            };
            setChatHistory((prevChatHistory) => [...prevChatHistory, respObj]);
            setOutput(apiResponse);
            setIsGenerating(false);
        }
    }

    return (
        <div className="main-container">
            <div className="output-chat-container" ref={chatContainerRef}>
                {
                    chatHistory.map((item, index) => (
                        <ChatBubble chatObj={item} key={index} />
                    ))
                }
            </div>
            <div className="chat-bottom-container">
                <form onSubmit={handleButtonClick}>
                    <input type="text" name="inputField" id="inputField" autoComplete="off" value={input} onChange={handleInputChange} />
                    <button type="submit" disabled={isGenerating}>{!isGenerating ? "Ask" : <span className="loader"></span>}</button>
                </form>
            </div>
        </div>
    )
}