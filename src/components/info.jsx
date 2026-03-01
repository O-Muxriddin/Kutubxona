"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FullScreenChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // ⚡ LocalStorage dan yuklash
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // ⚡ Messages o'zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), text };
    setMessages([...messages, newMsg]);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-90 p-4">
      <div className="flex flex-col w-full max-w-md h-[80vh] bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Yordam bo‘limi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mini chat</p>
        </div>

        {/* Chat hududi */}
        <div className="flex-1 p-3 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Bu yerga fikirlar,shikoyatlar va tushunmagan noqulaylik
              tug'diradigan narsalar bo'limlarni yozib qoldiring va u albatta
              to'g'irlanadi.
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-2 p-2 rounded bg-gray-100 dark:bg-gray-700 max-w-[80%]"
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Jo‘natish */}
        <div className="flex p-3 border-t dark:border-gray-700 gap-2">
          <Input
            className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border dark:border-gray-600"
            placeholder="Xabar yozing..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSend}>Jo‘natish</Button>
        </div>
      </div>
    </div>
  );
}
