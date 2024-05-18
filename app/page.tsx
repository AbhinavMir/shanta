"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, SetStateAction } from "react";
import { useState } from "react";

// Example JSON data
const messagesData = [
  {
    sender: "bot",
    text: "Hello! I'm ChatGPT, an AI assistant. How can I help you today?",
  },
];

export function Chat() {
  const [messages, setMessages] = useState(messagesData);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: inputValue,
    };

    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("https://5c93-2601-19b-a00-21b0-a60b-2a80-d1e3-5e6a.ngrok-free.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputValue }),
      });

      const data = await response.json();

      console.log(data);
      const botMessage = {
        sender: "bot",
        text: data.answer,
      };


      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setInputValue("");
  };

  return (
    <div className="flex h-[100vh] max-h-[100vh] flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <BotIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">ChatGPT</h1>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end space-x-3" : "items-start space-x-3"}`}
            >
              {message.sender === "bot" && (
                <BotIcon className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-gray-50"
                    : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === "user" && (
                <UserIcon className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            className="flex-1 rounded-md border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
            placeholder="Type your message..."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button size="sm" variant="secondary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function BotIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Chat;
