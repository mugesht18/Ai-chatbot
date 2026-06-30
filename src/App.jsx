import React, { useState } from "react";
import gptLogo from "./assets/chatgpt.svg";
import "./App.css";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";

import { sendMsgToOpenAI } from "./openai";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input; // Save the message

  // Show user message immediately
  setMessages((prev) => [
    ...prev,
    {
      text: userMessage,
      isBot: false,
    },
  ]);

  // Clear the input immediately
  setInput("");

  try {
    const response = await sendMsgToOpenAI(userMessage);

    setMessages((prev) => [
      ...prev,
      {
        text: response,
        isBot: true,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        text: "Something went wrong!",
        isBot: true,
      },
    ]);
  }
};


  const handleNewChat = () => {
  setMessages([]);
  setInput("");
};

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>

          <button className='midBtn' onClick={handleNewChat}>
  <img src={addBtn} alt="new chat" className="addBtn" />
  New Chat
</button>

          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="" />
              What is Programming?
            </button>

            <button className="query">
              <img src={msgIcon} alt="" />
              What is an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listitemsImg" />
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="" className="listitemsImg" />
            Saved
          </div>

          <div className="listItems">
            <img src={rocket} alt="" className="listitemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
       <div className="chats">

  {messages.length === 0 ? (

    <div className="welcome">

      <img src={gptLogo} alt="logo" className="welcomeLogo" />

      <h1>ChatGPT</h1>

      <p>
        I'm ChatGPT, an AI assistant. Ask me anything and I'll do my best to help you.
      </p>

    </div>

  ) : (

    messages.map((msg, index) => (
      <div key={index} className={msg.isBot ? "chat bot" : "chat"}>
        <img
          className="chatImg"
          src={msg.isBot ? gptImgLogo : userIcon}
          alt=""
        />

        <p className="txt">{msg.text}</p>
      </div>
    ))

  )}

</div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>

          <p>
            ChatGPT may produce inaccurate information about people, places or
            facts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;