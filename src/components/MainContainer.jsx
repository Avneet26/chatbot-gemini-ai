import React, {useRef} from "react";
import {callAPI, filterMemories} from "../apiLogic.js";
import ChatBubble from "./ChatBubble.jsx";
import MemoryStoredPopup from "./MemoryStoredPopup.jsx";
import {addDataWithUserId, getDataByUserId} from "../scripts/firebaseFunctions.js";

export default function MainContainer({curruser}) {

    const [output, setOutput] = React.useState('');
    const [input, setInput] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [isPopupShown, setIsPopupShown] = React.useState(false);

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

    const removePopup = () => {
        setTimeout(() => {
            setIsPopupShown(false);
        }, 3000)
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

            let storedMemories;

            if(Object.keys(curruser).length !== 0) {
                storedMemories = await getDataByUserId(curruser.uid, "memories");
                console.log(storedMemories);
                const memoryresponse = await filterMemories(input);
                if(!memoryresponse.includes("nothing to store")) {
                    await addDataWithUserId("memories", {content: memoryresponse});
                    setIsPopupShown(true);
                    removePopup();
                    console.log("data stored");
                }
            }

            console.log(curruser);
            const feedbackArray = JSON.stringify(chatHistory);
            const apiResponse = await callAPI(input, feedbackArray, JSON.stringify(storedMemories));

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
            {(isPopupShown && <MemoryStoredPopup />)}
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